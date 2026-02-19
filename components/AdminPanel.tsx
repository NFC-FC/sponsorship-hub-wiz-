
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CityGroup, CityTemplate, SponsorRecord, SiteConfig, Leader, MapMarker, MapCallout } from '../App';
import { mergeSponsorConfig } from '../App';

// Import the marketing components for the live preview
import Section1Splash from './marketing/Section1Splash';
import Section2Hero from './marketing/Section2Hero';
import { FullWidthVideo } from './marketing/FullWidthVideo';
import { CivicLeadership } from './marketing/CivicLeadership';
import Section3Reality from './marketing/Section3Reality';
import { MasterPlan } from './marketing/MasterPlan';
import { Impact } from './marketing/Impact';
import Section4Product from './marketing/Section4Product';
import Section5Ecosystem from './marketing/Section5Ecosystem';
import Section6Endorsement from './marketing/Section6Endorsement';
import Section7SponsorshipLevels from './marketing/Section7SponsorshipLevels';
import { Section8Timeline } from './marketing/Section8Timeline';
import { Section9SponsorLogos } from './marketing/Section9SponsorLogos';
import { CampaignVideo } from './marketing/CampaignVideo';
import { Footer } from './marketing/Footer';

interface AdminPanelProps {
  city: CityGroup;
  sponsorId?: string;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: any) => void;
}

/**
 * Sub-components moved outside to prevent focus loss on re-render.
 */
const SidebarInput = ({ 
  label, 
  value, 
  onChange, 
  type = 'text', 
  options, 
  isOverridden 
}: { 
  label: string; 
  value: any; 
  onChange: (val: any) => void; 
  type?: string; 
  options?: string[]; 
  isOverridden?: boolean;
}) => {
  return (
    <div className="space-y-2 group">
      <div className="flex justify-between items-center">
        <label className="text-[9px] font-black uppercase text-zinc-500 tracking-[0.2em] group-focus-within:text-[#009cdc] transition-colors">
          {label}
        </label>
        {isOverridden && (
           <span className="text-[7px] font-black uppercase text-[#009cdc]">Overridden</span>
        )}
      </div>
      
      {type === 'select' ? (
        <select 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-zinc-900 border border-white/5 rounded-xl p-3 text-base sm:text-xs text-white outline-none focus:border-[#009cdc] transition-all min-h-[2.75rem] sm:min-h-0"
        >
          {options?.map((o: string) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : type === 'color' ? (
        <div className="flex gap-2 items-center">
          <input 
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-10 h-10 bg-transparent border-none cursor-pointer"
          />
          <input 
            type="text" 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 bg-zinc-900 border border-white/5 rounded-xl p-3 text-base sm:text-[10px] text-white font-mono min-h-[2.75rem] sm:min-h-0"
          />
        </div>
      ) : type === 'textarea' ? (
        <textarea 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-zinc-900 border border-white/5 rounded-xl p-3 text-base sm:text-xs text-white outline-none focus:border-[#009cdc] transition-all min-h-[100px] resize-none"
        />
      ) : (
        <input 
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-zinc-900 border border-white/5 rounded-xl p-3 text-base sm:text-xs text-white outline-none focus:border-[#009cdc] transition-all min-h-[2.75rem] sm:min-h-0"
        />
      )}
    </div>
  );
};

const SponsorSidebarInput = ({ 
  label, 
  value, 
  onChange, 
  type = 'text', 
  hint 
}: { 
  label: string; 
  value: string; 
  onChange: (val: string) => void; 
  type?: string; 
  hint?: string;
}) => {
  return (
    <div className="space-y-2 group">
      <label className="text-[9px] font-black uppercase text-zinc-500 tracking-[0.2em] group-focus-within:text-[#009cdc] transition-colors">
        {label}
      </label>
      <input 
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-zinc-900 border border-white/5 rounded-xl p-3 text-base sm:text-xs text-white outline-none focus:border-[#009cdc] transition-all min-h-[2.75rem] sm:min-h-0"
      />
      {hint && <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest">{hint}</p>}
    </div>
  );
};

export const AdminPanel: React.FC<AdminPanelProps> = ({ city, sponsorId, isOpen, onClose, onUpdate }) => {
  const isEditingSponsor = !!sponsorId;
  const sponsor = isEditingSponsor ? city.sponsors.find(s => s.id === sponsorId) : null;

  // Local state for the config being edited
  const [localCityName, setLocalCityName] = useState(city.name);
  const [localTemplate, setLocalTemplate] = useState<CityTemplate>({ ...city.template });
  const [localSponsor, setLocalSponsor] = useState<SponsorRecord | null>(sponsor ? JSON.parse(JSON.stringify(sponsor)) : null);

  // Compute the temporary merged config for the preview
  const previewConfig: SiteConfig = isEditingSponsor && localSponsor
    ? mergeSponsorConfig({ ...city, name: localCityName, template: localTemplate }, localSponsor)
    : mergeSponsorConfig({ ...city, name: localCityName, template: localTemplate }, { 
        id: 'preview', 
        sponsorName: 'PREVIEW MODE', 
        sponsorLogo: city.sponsors[0]?.sponsorLogo || city.template.nfcLogo, 
        overrides: {} 
      });

  const handleUpdateField = (key: keyof CityTemplate, value: any) => {
    if (isEditingSponsor && localSponsor) {
      const overrides = { ...localSponsor.overrides };
      if (JSON.stringify(value) === JSON.stringify(localTemplate[key])) {
        delete overrides[key];
      } else {
        overrides[key] = value;
      }
      setLocalSponsor({ ...localSponsor, overrides });
    } else {
      setLocalTemplate(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleUpdateSponsorField = (key: keyof SponsorRecord, value: any) => {
    if (localSponsor) {
      setLocalSponsor({ ...localSponsor, [key]: value });
    }
  };

  const handleUpdateMapData = (markers: MapMarker[], callouts: MapCallout[]) => {
    handleUpdateField('markers', markers);
    handleUpdateField('callouts', callouts);
  };

  const handleAddMarker = () => {
    const newMarker: MapMarker = {
      id: `marker-${Date.now()}`,
      x: 50,
      y: 50,
      name: 'New Location',
      type: 'standard',
    };
    setLocalTemplate(prev => ({ ...prev, markers: [...(prev.markers || []), newMarker] }));
  };

  const handleRemoveMarker = (id: string) => {
    setLocalTemplate(prev => ({ ...prev, markers: prev.markers.filter(m => m.id !== id) }));
  };

  const handleUpdateMarker = (id: string, updates: Partial<MapMarker>) => {
    setLocalTemplate(prev => ({
      ...prev,
      markers: prev.markers.map(m => m.id === id ? { ...m, ...updates } : m),
    }));
  };

  const handleAddCallout = () => {
    const newCallout: MapCallout = {
      id: `callout-${Date.now()}`,
      x: 50,
      y: 30,
      title: 'NEW CALLOUT',
      image: '',
      colorType: 'primary',
    };
    setLocalTemplate(prev => ({ ...prev, callouts: [...(prev.callouts || []), newCallout] }));
  };

  const handleRemoveCallout = (id: string) => {
    setLocalTemplate(prev => ({ ...prev, callouts: prev.callouts.filter(c => c.id !== id) }));
  };

  const handleUpdateCallout = (id: string, updates: Partial<MapCallout>) => {
    setLocalTemplate(prev => ({
      ...prev,
      callouts: prev.callouts.map(c => c.id === id ? { ...c, ...updates } : c),
    }));
  };

  const handleAddLeader = () => {
    const newLeader: Leader = {
      id: `leader-${Date.now()}`,
      name: 'NEW LEADER',
      title: 'TITLE',
      image: ''
    };
    if (isEditingSponsor && localSponsor) {
      const currentLeaders = localSponsor.overrides.leaders || [...localTemplate.leaders];
      setLocalSponsor({ ...localSponsor, overrides: { ...localSponsor.overrides, leaders: [...currentLeaders, newLeader] } });
    } else {
      setLocalTemplate(prev => ({ ...prev, leaders: [...prev.leaders, newLeader] }));
    }
  };

  const handleRemoveLeader = (id: string) => {
    if (isEditingSponsor && localSponsor) {
      const currentLeaders = localSponsor.overrides.leaders || [...localTemplate.leaders];
      setLocalSponsor({ ...localSponsor, overrides: { ...localSponsor.overrides, leaders: currentLeaders.filter(l => l.id !== id) } });
    } else {
      setLocalTemplate(prev => ({ ...prev, leaders: prev.leaders.filter(l => l.id !== id) }));
    }
  };

  const handleSidebarUpdateLeader = (leaderId: string, updates: Partial<Leader>) => {
    const currentLeaders = isEditingSponsor 
      ? (localSponsor?.overrides.leaders || [...localTemplate.leaders])
      : [...localTemplate.leaders];

    const nextLeaders = currentLeaders.map(l => l.id === leaderId ? { ...l, ...updates } : l);
    
    if (isEditingSponsor && localSponsor) {
      setLocalSponsor({ 
        ...localSponsor, 
        overrides: { ...localSponsor.overrides, leaders: nextLeaders } 
      });
    } else {
      setLocalTemplate(prev => ({ ...prev, leaders: nextLeaders }));
    }
  };

  const handleUpdateWardName = (index: number, name: string) => {
    const nextWardNames = [...(isEditingSponsor ? (localSponsor?.overrides.wardNames || localTemplate.wardNames) : localTemplate.wardNames)];
    nextWardNames[index] = name;
    handleUpdateField('wardNames', nextWardNames);
  };

  const handleSave = () => {
    if (isEditingSponsor) {
      onUpdate(localSponsor);
    } else {
      onUpdate({ name: localCityName, ...localTemplate });
    }
    onClose();
  };

  const leadersToRender = isEditingSponsor 
    ? (localSponsor?.overrides.leaders || localTemplate.leaders)
    : localTemplate.leaders;

  const wardCountNum = parseInt(localTemplate.wardCount) || 0;
  const currentWardNames = isEditingSponsor 
    ? (localSponsor?.overrides.wardNames || localTemplate.wardNames)
    : localTemplate.wardNames;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] bg-black/98 flex flex-col font-sans w-full max-w-[100vw] overflow-x-hidden"
    >
      <header className="h-16 sm:h-20 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-8 bg-zinc-950 shrink-0">
        <div className="flex items-center gap-3 sm:gap-6 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white flex items-center justify-center flex-shrink-0">
            <img src="https://github.com/NFC-FC/NFC-image-hosting/blob/main/01-Main-Shield.png?raw=true" className="w-4 sm:w-6" alt="NFC" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-widest text-white leading-none mb-0.5 sm:mb-1 truncate">
              Visual Studio <span className="text-zinc-600 font-medium hidden sm:inline">|</span> <span className="text-[#009cdc] italic">{isEditingSponsor ? 'Sponsor Overrides' : 'City Template'}</span>
            </h2>
            <p className="text-[8px] sm:text-[9px] font-black uppercase text-zinc-500 tracking-[0.2em] sm:tracking-[0.3em] truncate">{city.name} {isEditingSponsor ? `• ${sponsor?.sponsorName}` : ''}</p>
          </div>
        </div>

        <div className="flex gap-2 sm:gap-4 flex-shrink-0">
          <button onClick={onClose} className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-white/10 text-zinc-500 hover:text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all">Cancel</button>
          <button onClick={handleSave} className="px-6 sm:px-10 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-[#009cdc] text-white hover:scale-105 transition-all text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow-[0_0_30px_rgba(0,156,220,0.3)]">Publish</button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        
        <aside className="w-full lg:w-[400px] lg:max-w-[400px] border-r border-white/10 bg-zinc-950 flex flex-col overflow-y-auto custom-scrollbar flex-shrink-0 lg:flex-shrink-0 min-w-0">
          <div className="p-4 sm:p-6 lg:p-8 space-y-8 sm:space-y-12">
            
            {isEditingSponsor && localSponsor ? (
              <section className="space-y-6">
                <h3 className="text-[10px] font-black text-[#009cdc] uppercase tracking-[0.4em] border-b border-white/5 pb-4">Sponsor Identity</h3>
                <SponsorSidebarInput 
                  label="Sponsor Name" 
                  value={localSponsor.sponsorName}
                  onChange={(val) => handleUpdateSponsorField('sponsorName', val)}
                />
                <SponsorSidebarInput 
                  label="Sponsor Password" 
                  value={localSponsor.sponsorPassword || ''}
                  onChange={(val) => handleUpdateSponsorField('sponsorPassword', val)}
                  hint="Internal Info Only" 
                />
                <div className="grid grid-cols-1 gap-4">
                  <SidebarInput 
                    label="Main Color (Primary)" 
                    value={localSponsor.overrides.primaryColor ?? localTemplate.primaryColor}
                    onChange={(val) => handleUpdateField('primaryColor', val)}
                    type="color" 
                    isOverridden={localSponsor.overrides.primaryColor !== undefined}
                  />
                  <SidebarInput 
                    label="Secondary Color" 
                    value={localSponsor.overrides.secondaryColor ?? localTemplate.secondaryColor}
                    onChange={(val) => handleUpdateField('secondaryColor', val)}
                    type="color" 
                    isOverridden={localSponsor.overrides.secondaryColor !== undefined}
                  />
                  <SidebarInput 
                    label="Accent Color" 
                    value={localSponsor.overrides.accentColor ?? localTemplate.accentColor}
                    onChange={(val) => handleUpdateField('accentColor', val)}
                    type="color" 
                    isOverridden={localSponsor.overrides.accentColor !== undefined}
                  />
                </div>
                <SponsorSidebarInput 
                  label="Sponsor Logo Link" 
                  value={localSponsor.sponsorLogo}
                  onChange={(val) => handleUpdateSponsorField('sponsorLogo', val)}
                />
                <SidebarInput
                  label="Sponsor Render Link"
                  value={localSponsor.overrides.sponsorRender ?? localTemplate.sponsorRender}
                  onChange={(val) => handleUpdateField('sponsorRender', val)}
                  isOverridden={localSponsor.overrides.sponsorRender !== undefined}
                />
              </section>
            ) : (
              <>
                <section className="space-y-6">
                  <h3 className="text-[10px] font-black text-[#009cdc] uppercase tracking-[0.4em] border-b border-white/5 pb-4">Hub Configuration</h3>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">City Hub Name</label>
                    <input type="text" value={localCityName} onChange={(e) => setLocalCityName(e.target.value)} className="w-full bg-zinc-900 border border-white/5 rounded-xl p-3 text-base sm:text-xs text-white outline-none focus:border-[#009cdc] min-h-[2.75rem] sm:min-h-0" />
                  </div>
                  <SidebarInput 
                    label="City Logo Link" 
                    value={localTemplate.cityLogo}
                    onChange={(val) => handleUpdateField('cityLogo', val)}
                  />
                </section>

                <section className="space-y-8">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <h3 className="text-[10px] font-black text-[#009cdc] uppercase tracking-[0.4em]">Map Markers</h3>
                    <button
                      onClick={handleAddMarker}
                      className="text-[8px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors"
                    >
                      + Add
                    </button>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 -mt-4">
                    <p className="text-[9px] text-zinc-500 font-bold leading-relaxed">Drag pins on the map preview to reposition.</p>
                  </div>
                  <div className="space-y-6">
                    {(localTemplate.markers || []).map((marker) => (
                      <div key={marker.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 relative group/marker-card">
                        <button
                          onClick={() => handleRemoveMarker(marker.id)}
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover/marker-card:opacity-100"
                        >
                          ✕
                        </button>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-[7px] font-black uppercase text-zinc-600 tracking-widest">Name</label>
                            <input
                              type="text"
                              value={marker.name}
                              onChange={(e) => handleUpdateMarker(marker.id, { name: e.target.value })}
                              className="w-full bg-black/40 border border-white/5 rounded-lg p-2 text-base sm:text-[11px] text-white outline-none focus:border-[#009cdc] min-h-[2.75rem] sm:min-h-0"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[7px] font-black uppercase text-zinc-600 tracking-widest">Type</label>
                            <select
                              value={marker.type}
                              onChange={(e) => handleUpdateMarker(marker.id, { type: e.target.value as MapMarker['type'] })}
                              className="w-full bg-black/40 border border-white/5 rounded-lg p-2 text-base sm:text-[11px] text-white outline-none focus:border-[#009cdc] min-h-[2.75rem] sm:min-h-0"
                            >
                              <option value="standard">Fitness Court</option>
                              <option value="studio">Fitness Court Studio</option>
                              <option value="pod">Fitness Court Pod</option>
                              <option value="existing">Existing Fitness Court</option>
                            </select>
                          </div>
                          <div className="flex gap-3 text-[7px] font-black text-zinc-700 uppercase tracking-widest">
                            <span>X: {marker.x.toFixed(1)}%</span>
                            <span>Y: {marker.y.toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {(localTemplate.markers || []).length === 0 && (
                      <p className="text-[9px] text-zinc-700 font-bold uppercase tracking-widest text-center py-2">No markers yet — click + Add above.</p>
                    )}
                  </div>
                </section>

                <section className="space-y-8">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <h3 className="text-[10px] font-black text-[#009cdc] uppercase tracking-[0.4em]">Map Callouts</h3>
                    <button
                      onClick={handleAddCallout}
                      className="text-[8px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors"
                    >
                      + Add
                    </button>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 -mt-4">
                    <p className="text-[9px] text-zinc-500 font-bold leading-relaxed">Drag callout cards on the map preview to reposition.</p>
                  </div>
                  <div className="space-y-6">
                    {(localTemplate.callouts || []).map((callout) => (
                      <div key={callout.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 relative group/callout-card">
                        <button
                          onClick={() => handleRemoveCallout(callout.id)}
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover/callout-card:opacity-100"
                        >
                          ✕
                        </button>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-[7px] font-black uppercase text-zinc-600 tracking-widest">Title</label>
                            <input
                              type="text"
                              value={callout.title}
                              onChange={(e) => handleUpdateCallout(callout.id, { title: e.target.value })}
                              className="w-full bg-black/40 border border-white/5 rounded-lg p-2 text-base sm:text-[11px] text-white outline-none focus:border-[#009cdc] min-h-[2.75rem] sm:min-h-0"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[7px] font-black uppercase text-zinc-600 tracking-widest">Image URL</label>
                            <input
                              type="text"
                              value={callout.image}
                              onChange={(e) => handleUpdateCallout(callout.id, { image: e.target.value })}
                              className="w-full bg-black/40 border border-white/5 rounded-lg p-2 text-base sm:text-[10px] text-zinc-400 outline-none focus:border-[#009cdc] min-h-[2.75rem] sm:min-h-0"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[7px] font-black uppercase text-zinc-600 tracking-widest">Color</label>
                            <select
                              value={callout.colorType}
                              onChange={(e) => handleUpdateCallout(callout.id, { colorType: e.target.value as MapCallout['colorType'] })}
                              className="w-full bg-black/40 border border-white/5 rounded-lg p-2 text-base sm:text-[11px] text-white outline-none focus:border-[#009cdc] min-h-[2.75rem] sm:min-h-0"
                            >
                              <option value="primary">Primary Color</option>
                              <option value="secondary">Secondary Color</option>
                              <option value="pod">Pod Teal</option>
                            </select>
                          </div>
                          <div className="flex gap-3 text-[7px] font-black text-zinc-700 uppercase tracking-widest">
                            <span>X: {callout.x.toFixed(1)}%</span>
                            <span>Y: {callout.y.toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {(localTemplate.callouts || []).length === 0 && (
                      <p className="text-[9px] text-zinc-700 font-bold uppercase tracking-widest text-center py-2">No callouts yet — click + Add above.</p>
                    )}
                  </div>
                </section>

                <section className="space-y-6">
                  <h3 className="text-[10px] font-black text-[#009cdc] uppercase tracking-[0.4em] border-b border-white/5 pb-4">Key Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                     <SidebarInput 
                      label="Territory Count" 
                      value={localTemplate.wardCount}
                      onChange={(val) => handleUpdateField('wardCount', val)}
                      type="number" 
                    />
                     <SidebarInput 
                      label="Term Type" 
                      value={localTemplate.wardType}
                      onChange={(val) => handleUpdateField('wardType', val)}
                      type="select" 
                      options={['Wards', 'Districts', 'Council Districts']} 
                    />
                  </div>
                  <SidebarInput 
                    label="Total Fitness Courts" 
                    value={localTemplate.courtCount}
                    onChange={(val) => handleUpdateField('courtCount', val)}
                  />
                  <SidebarInput 
                    label="Investment Value" 
                    value={localTemplate.investmentAmount}
                    onChange={(val) => handleUpdateField('investmentAmount', val)}
                  />
                </section>

                <section className="space-y-6">
                  <h3 className="text-[10px] font-black text-[#009cdc] uppercase tracking-[0.4em] border-b border-white/5 pb-4">Impact Stats</h3>
                  <SidebarInput 
                    label="Community Access (e.g. 650k+)"
                    value={localTemplate.communityAccess ?? '650k+'}
                    onChange={(val) => handleUpdateField('communityAccess', val)}
                  />
                  <SidebarInput 
                    label="Annual Uses (e.g. 250k+)"
                    value={localTemplate.annualUses ?? '250k+'}
                    onChange={(val) => handleUpdateField('annualUses', val)}
                  />
                  <SidebarInput 
                    label="Calories Burned (e.g. 25M+)"
                    value={localTemplate.caloriesBurned ?? '25M+'}
                    onChange={(val) => handleUpdateField('caloriesBurned', val)}
                  />
                </section>

                <section className="space-y-8">
                  <h3 className="text-[10px] font-black text-[#009cdc] uppercase tracking-[0.4em] border-b border-white/5 pb-4">Ward Council Members</h3>
                  <div className="space-y-4">
                    {Array.from({ length: wardCountNum }).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <label className="text-[7px] font-black uppercase text-zinc-600 tracking-widest">{localTemplate.wardType.slice(0, -1)} {i + 1} Member Name</label>
                        <input 
                          type="text" 
                          value={currentWardNames[i] || ''}
                          onChange={(e) => handleUpdateWardName(i, e.target.value)}
                          placeholder="Council Member Name"
                          className="w-full bg-zinc-900 border border-white/5 rounded-xl p-3 text-base sm:text-xs text-white outline-none focus:border-[#009cdc] min-h-[2.75rem] sm:min-h-0"
                        />
                      </div>
                    ))}
                  </div>
                </section>

                <section className="space-y-8">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <h3 className="text-[10px] font-black text-[#009cdc] uppercase tracking-[0.4em]">Key Leaders</h3>
                    <button 
                      onClick={handleAddLeader}
                      className="text-[8px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors"
                    >
                      + Add
                    </button>
                  </div>
                  
                  <div className="space-y-8">
                    {leadersToRender.map((leader) => (
                      <div key={leader.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 relative group/leader-card">
                        <button 
                          onClick={() => handleRemoveLeader(leader.id)}
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover/leader-card:opacity-100"
                        >
                          ✕
                        </button>
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <label className="text-[7px] font-black uppercase text-zinc-600 tracking-widest">Name</label>
                            <input 
                              type="text" 
                              value={leader.name}
                              onChange={(e) => handleSidebarUpdateLeader(leader.id, { name: e.target.value })}
                              className="w-full bg-black/40 border border-white/5 rounded-lg p-2 text-base sm:text-[11px] text-white outline-none focus:border-[#009cdc] min-h-[2.75rem] sm:min-h-0"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[7px] font-black uppercase text-zinc-600 tracking-widest">Title</label>
                            <input 
                              type="text" 
                              value={leader.title}
                              onChange={(e) => handleSidebarUpdateLeader(leader.id, { title: e.target.value })}
                              className="w-full bg-black/40 border border-white/5 rounded-lg p-2 text-base sm:text-[11px] text-white outline-none focus:border-[#009cdc] min-h-[2.75rem] sm:min-h-0"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[7px] font-black uppercase text-zinc-600 tracking-widest">Image URL</label>
                            <input 
                              type="text" 
                              value={leader.image}
                              onChange={(e) => handleSidebarUpdateLeader(leader.id, { image: e.target.value })}
                              className="w-full bg-black/40 border border-white/5 rounded-lg p-2 text-base sm:text-[10px] text-zinc-400 outline-none focus:border-[#009cdc] min-h-[2.75rem] sm:min-h-0"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="space-y-6">
                  <h3 className="text-[10px] font-black text-[#009cdc] uppercase tracking-[0.4em] border-b border-white/5 pb-4">Media Infrastructure</h3>
                  <SidebarInput 
                    label="Hero Background Video" 
                    value={localTemplate.heroVideo}
                    onChange={(val) => handleUpdateField('heroVideo', val)}
                  />
                  <SidebarInput 
                    label="Secondary B-Roll" 
                    value={localTemplate.secondaryVideo}
                    onChange={(val) => handleUpdateField('secondaryVideo', val)}
                  />
                  <SidebarInput
                    label="Master Plan Map Layer"
                    value={localTemplate.masterPlanBackground}
                    onChange={(val) => handleUpdateField('masterPlanBackground', val)}
                  />
                </section>

                <section className="space-y-6">
                  <h3 className="text-[10px] font-black text-[#009cdc] uppercase tracking-[0.4em] border-b border-white/5 pb-4">Endorsement Studio</h3>
                  <SidebarInput 
                    label="Quote Content" 
                    value={localTemplate.endorsementQuote}
                    onChange={(val) => handleUpdateField('endorsementQuote', val)}
                    type="textarea" 
                  />
                  {/* Fixed Speaker Name SidebarInput by adding missing value and onChange props */}
                  <SidebarInput 
                    label="Speaker Name"
                    value={localTemplate.endorsementName}
                    onChange={(val) => handleUpdateField('endorsementName', val)}
                  />
                  <SidebarInput 
                    label="Speaker Photo URL" 
                    value={localTemplate.endorsementImage}
                    onChange={(val) => handleUpdateField('endorsementImage', val)}
                  />
                </section>
              </>
            )}
          </div>
        </aside>

        <main className="flex-1 min-w-0 bg-zinc-900 overflow-auto relative custom-scrollbar">
          {/* Live Preview Area - responsive scale so preview fits viewport */}
          <div className="p-4 sm:p-8 lg:p-20 overflow-x-auto overflow-y-hidden">
            <div className="origin-top-left scale-[0.4] sm:scale-[0.5] md:scale-[0.65] lg:scale-[0.8] xl:scale-100 w-[1200px] min-w-[1200px]">
             <div className="bg-[#020617] shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-2xl sm:rounded-[4rem] overflow-hidden">
                <Section2Hero config={previewConfig} />
                <FullWidthVideo config={previewConfig} />
                <Section3Reality config={previewConfig} />
                <CivicLeadership config={previewConfig} />
                <MasterPlan config={previewConfig} isEditMode={true} onUpdateMap={handleUpdateMapData} />
                <Impact config={previewConfig} />
                <Section4Product config={previewConfig} />
                <Section5Ecosystem config={previewConfig} />
                <Section6Endorsement config={previewConfig} isEditMode={true} onUpdateField={handleUpdateField} />
                <Section7SponsorshipLevels config={previewConfig} />
                <CampaignVideo config={previewConfig} />
                <Section8Timeline config={previewConfig} />
                <Section9SponsorLogos config={previewConfig} />
                <Footer config={previewConfig} />
             </div>
            </div>
          </div>
          
          <div className="fixed top-20 sm:top-24 right-4 sm:right-12 z-50 pointer-events-none">
             <div className="glass px-6 py-3 rounded-2xl border-white/10 shadow-2xl">
                <span className="text-[10px] font-black uppercase text-[#009cdc] tracking-widest">Live Editor Preview</span>
             </div>
          </div>
        </main>

      </div>
    </motion.div>
  );
};
