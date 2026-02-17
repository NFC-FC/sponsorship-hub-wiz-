
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
          className="w-full bg-zinc-900 border border-white/5 rounded-xl p-3 text-xs text-white outline-none focus:border-[#009cdc] transition-all"
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
            className="flex-1 bg-zinc-900 border border-white/5 rounded-xl p-3 text-[10px] text-white font-mono uppercase"
          />
        </div>
      ) : type === 'textarea' ? (
        <textarea 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-zinc-900 border border-white/5 rounded-xl p-3 text-xs text-white outline-none focus:border-[#009cdc] transition-all min-h-[100px] resize-none"
        />
      ) : (
        <input 
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-zinc-900 border border-white/5 rounded-xl p-3 text-xs text-white outline-none focus:border-[#009cdc] transition-all"
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
        className="w-full bg-zinc-900 border border-white/5 rounded-xl p-3 text-xs text-white outline-none focus:border-[#009cdc] transition-all"
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
        sponsorLogo: city.sponsors[0]?.sponsorLogo || '', 
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] bg-black/98 flex flex-col font-sans"
    >
      <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-zinc-950 shrink-0">
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
            <img src="https://github.com/NFC-FC/NFC-image-hosting/blob/main/01-Main-Shield.png?raw=true" className="w-6" alt="NFC" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-white leading-none mb-1">
              Visual Studio <span className="text-zinc-600 font-medium">|</span> <span className="text-[#009cdc] italic">{isEditingSponsor ? 'Sponsor Overrides' : 'City Template'}</span>
            </h2>
            <p className="text-[9px] font-black uppercase text-zinc-500 tracking-[0.3em]">{city.name} {isEditingSponsor ? `• ${sponsor?.sponsorName}` : ''}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={onClose} className="px-6 py-3 rounded-xl border border-white/10 text-zinc-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all">Cancel</button>
          <button onClick={handleSave} className="px-10 py-3 rounded-xl bg-[#009cdc] text-white hover:scale-105 transition-all text-[10px] font-black uppercase tracking-widest shadow-[0_0_30px_rgba(0,156,220,0.3)]">Publish</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        <aside className="w-[400px] border-r border-white/10 bg-zinc-950 flex flex-col overflow-y-auto custom-scrollbar">
          <div className="p-8 space-y-12">
            
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
                <SponsorSidebarInput 
                  label="Sponsor Render Link" 
                  value={localSponsor.sponsorRender || ''}
                  onChange={(val) => handleUpdateSponsorField('sponsorRender', val)}
                />
              </section>
            ) : (
              <>
                <section className="space-y-6">
                  <h3 className="text-[10px] font-black text-[#009cdc] uppercase tracking-[0.4em] border-b border-white/5 pb-4">Hub Configuration</h3>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">City Hub Name</label>
                    <input type="text" value={localCityName} onChange={(e) => setLocalCityName(e.target.value.toUpperCase())} className="w-full bg-zinc-900 border border-white/5 rounded-xl p-3 text-xs text-white outline-none focus:border-[#009cdc]" />
                  </div>
                  <SidebarInput 
                    label="City Logo Link" 
                    value={localTemplate.cityLogo}
                    onChange={(val) => handleUpdateField('cityLogo', val)}
                  />
                </section>

                <section className="space-y-6">
                   <h3 className="text-[10px] font-black text-[#009cdc] uppercase tracking-[0.4em] border-b border-white/5 pb-4">Map Editor Hints</h3>
                   <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[10px] text-zinc-400 font-bold leading-relaxed">
                        Drag pins and callout images directly on the map preview to reposition them for this city hub.
                      </p>
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
                              onChange={(e) => handleSidebarUpdateLeader(leader.id, { name: e.target.value.toUpperCase() })}
                              className="w-full bg-black/40 border border-white/5 rounded-lg p-2 text-[11px] text-white outline-none focus:border-[#009cdc]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[7px] font-black uppercase text-zinc-600 tracking-widest">Title</label>
                            <input 
                              type="text" 
                              value={leader.title}
                              onChange={(e) => handleSidebarUpdateLeader(leader.id, { title: e.target.value })}
                              className="w-full bg-black/40 border border-white/5 rounded-lg p-2 text-[11px] text-white outline-none focus:border-[#009cdc]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[7px] font-black uppercase text-zinc-600 tracking-widest">Image URL</label>
                            <input 
                              type="text" 
                              value={leader.image}
                              onChange={(e) => handleSidebarUpdateLeader(leader.id, { image: e.target.value })}
                              className="w-full bg-black/40 border border-white/5 rounded-lg p-2 text-[10px] text-zinc-400 outline-none focus:border-[#009cdc]"
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
                  <SidebarInput 
                    label="Speaker Name" 
                    value={localTemplate.endorsementName}
                    onChange={(val) => handleUpdateField('endorsementName', val)}
                  />
                  <SidebarInput 
                    label="Endorsement Image URL" 
                    value={localTemplate.endorsementImage}
                    onChange={(val) => handleUpdateField('endorsementImage', val)}
                  />
                </section>
              </>
            )}

            <div className="pt-8 opacity-20 pointer-events-none">
              <p className="text-[8px] font-black uppercase tracking-[0.3em] text-center">NFC System Config v4.2.1</p>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-hidden relative p-8 md:p-16 flex justify-center bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
          <div className="w-full max-w-5xl h-full bg-[#020617] rounded-[3.5rem] shadow-[0_100px_200px_rgba(0,0,0,0.9)] border border-white/10 overflow-y-auto overflow-x-hidden relative" id="studio-canvas">
            <div style={{ 
              ['--brand-primary' as any]: previewConfig.primaryColor, 
              ['--brand-accent' as any]: previewConfig.accentColor, 
              ['--brand-secondary' as any]: previewConfig.secondaryColor 
            } as any}>
              <Section2Hero config={previewConfig} />
              <FullWidthVideo />
              <Section3Reality config={previewConfig} />
              <CivicLeadership config={previewConfig} />
              <MasterPlan 
                config={previewConfig} 
                isEditMode={!isEditingSponsor}
                onUpdateMap={handleUpdateMapData}
              />
              <Impact config={previewConfig} />
              <Section4Product config={previewConfig} />
              <Section5Ecosystem config={previewConfig} />
              <Section6Endorsement 
                config={previewConfig} 
                isEditMode={true} 
                onUpdateField={handleUpdateField}
              />
              <CampaignVideo config={previewConfig} />
              <Footer config={previewConfig} />
            </div>
          </div>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #222; border-radius: 10px; }
      `}</style>
    </motion.div>
  );
};
