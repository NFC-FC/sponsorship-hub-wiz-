
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { MapMarker, MapCallout, SiteConfig } from '../../App';

interface Props {
  config: SiteConfig;
  isEditMode?: boolean;
  onUpdateMap?: (markers: MapMarker[], callouts: MapCallout[]) => void;
}

const CALLOUT_BACK_CONTENT: Record<'studio' | 'standard' | 'pod', { title: string; dimensions: string; bullets: string[] }> = {
  pod: {
    title: "FITNESS COURT® POD",
    dimensions: "(16' x 16')",
    bullets: [
      'Compact footprint. Full-body training.',
      'Designed for parks, trails, and urban spaces.',
      'Delivers big impact in small community spaces.',
    ],
  },
  standard: {
    title: "FITNESS COURT®",
    dimensions: "(32' x 32')",
    bullets: [
      'Complete outdoor bodyweight training system.',
      'Built for all ability levels.',
      '7 functional zones. Thousands of workout combinations.',
    ],
  },
  studio: {
    title: "FITNESS COURT® STUDIO",
    dimensions: "(32' x 73')",
    bullets: [
      'Expands programming with dedicated class space.',
      'Ideal for yoga, Zumba, Pilates, dance & more.',
      'Creates a flexible outdoor wellness hub.',
    ],
  },
};

function getCalloutForMarkerType(
  callouts: MapCallout[],
  type: MapMarker['type']
): MapCallout | null {
  if (type === 'existing') return null;
  return (
    callouts.find((c) => {
      const t = c.title.toUpperCase();
      if (type === 'studio') return t.includes('STUDIO') && !t.includes('POD');
      if (type === 'pod') return t.includes('POD');
      if (type === 'standard') return t.includes('FITNESS COURT') && !t.includes('STUDIO') && !t.includes('POD');
      return false;
    }) ?? null
  );
}

export const MasterPlan: React.FC<Props> = ({ config, isEditMode, onUpdateMap }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [calloutFlipped, setCalloutFlipped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragItem, setDragItem] = useState<{ id: string, type: 'marker' | 'callout' } | null>(null);
  const [keyVisible, setKeyVisible] = useState(true);

  const markers = config.markers || [];
  const callouts = config.callouts || [];

  useEffect(() => {
    setCalloutFlipped(false);
  }, [selectedMarkerId]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    if (mq.matches) setKeyVisible(false);
  }, []);

  const handleMouseDown = (e: React.MouseEvent, id: string, type: 'marker' | 'callout') => {
    if (!isEditMode) return;
    e.stopPropagation();
    setDragItem({ id, type });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragItem || !containerRef.current || !onUpdateMap) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Constrain to 0-100
    const constrainedX = Math.max(0, Math.min(100, x));
    const constrainedY = Math.max(0, Math.min(100, y));

    if (dragItem.type === 'marker') {
      const nextMarkers = markers.map(m => 
        m.id === dragItem.id ? { ...m, x: constrainedX, y: constrainedY } : m
      );
      onUpdateMap(nextMarkers, callouts);
    } else {
      const nextCallouts = callouts.map(c => 
        c.id === dragItem.id ? { ...c, x: constrainedX, y: constrainedY } : c
      );
      onUpdateMap(markers, nextCallouts);
    }
  }, [dragItem, markers, callouts, onUpdateMap]);

  const handleMouseUp = useCallback(() => {
    setDragItem(null);
  }, []);

  useEffect(() => {
    if (dragItem) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragItem, handleMouseMove, handleMouseUp]);

  return (
    <div className="bg-black py-12 sm:py-24 w-full max-w-[100vw] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full min-w-0">
        <div className="mb-16 text-center">
          <div className="inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-4" style={{ backgroundColor: `${config.primaryColor}1A`, color: config.primaryColor }}>
            Deployment Roadmap
          </div>
          <h2 className="text-lg sm:text-3xl md:text-5xl lg:text-7xl font-black text-white mb-4 sm:mb-6 uppercase italic tracking-tighter leading-tight break-words">
            HEALTHY INFRASTRUCTURE <span style={{ color: config.primaryColor }}>MASTER PLAN.</span>
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-white text-sm sm:text-xl font-bold uppercase tracking-tight mb-1 sm:mb-2">
              Prioritizing High-Need Neighborhoods
            </p>
            <p className="text-gray-400 text-xs sm:text-lg font-medium leading-relaxed">
              Each proposed location in this network is positioned to serve high-need areas. These sites help form a cohesive and balanced coverage plan, offering consistent access across different parts of the city.
            </p>
          </div>
        </div>

        {/* The Interactive Map Component */}
        <div 
          ref={containerRef}
          className="relative aspect-[16/11] bg-[#1a1a1a] rounded-[3rem] overflow-hidden border border-white/5 shadow-[0_0_100px_rgba(0,156,220,0.15)]"
          onClick={() => !isEditMode && setSelectedMarkerId(null)}
        >
          
          {/* Base Map Image - Stylized Grid */}
          <div 
            className="absolute inset-0 opacity-100 transition-all duration-700 bg-center bg-cover"
            style={{ 
              backgroundImage: `url('${config.masterPlanBackground}')`, 
            }}
          />
          
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')] opacity-20 pointer-events-none"></div>

          {/* KEY (Legend) - Open by default; right-aligned */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 origin-top-right max-w-[calc(100%-2rem)] max-h-[calc(100%-2rem)]">
            {keyVisible ? (
              <div className="w-56 md:w-64 bg-white/90 backdrop-blur-xl p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl scale-95 sm:scale-90 md:scale-100">
                <button
                  type="button"
                  onClick={() => setKeyVisible(false)}
                  className="w-full text-left text-[9px] font-black text-zinc-500 tracking-[0.4em] uppercase mb-4 border-b border-black/10 pb-2 hover:text-zinc-700 focus:outline-none"
                >
                  KEY ▼
                </button>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#002D72] flex items-center justify-center border border-white/20 shadow-lg shadow-[#002D72]/40">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">Proposed Fitness Court Studio</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center border border-white/20 shadow-lg bg-[#00AEEF] shadow-[#00AEEF]/40">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">Proposed Fitness Court</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-500 flex items-center justify-center border border-white/20">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">Existing Fitness Court</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#1DBBB4] flex items-center justify-center border border-white/20 shadow-lg shadow-[#1DBBB4]/40">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">Proposed Fitness Court Pod</span>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-5 h-5 rounded-full border border-white/20 bg-[#00AEEF]/20"></div>
                    <span className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest leading-tight">10 Min Bike Radius Accessibility</span>
                  </div>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setKeyVisible(true)}
                className="px-2 py-1.5 sm:px-3 sm:py-2 rounded-md sm:rounded-lg bg-white/90 backdrop-blur-xl border border-white/10 shadow-lg text-[8px] sm:text-[9px] font-black text-zinc-600 tracking-[0.25em] sm:tracking-[0.3em] uppercase hover:bg-white focus:outline-none"
              >
                KEY ▲
              </button>
            )}
          </div>

          {/* Accessibility Zones — hidden on mobile */}
          {markers.map((m) => (
            <div 
              key={`zone-${m.id}`}
              className="absolute rounded-full border border-white/10 -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-sm hidden md:block"
              style={{ 
                left: `${m.x}%`, 
                top: `${m.y}%`, 
                width: '14%', 
                height: '24%',
                backgroundColor: '#00AEEF1A',
                opacity: hovered === m.id ? 0.8 : 0.4
              }}
            />
          ))}

          {/* Interactive Custom Markers — visible on all breakpoints */}
          {markers.map((m) => {
            const callout = getCalloutForMarkerType(callouts, m.type);
            const isSelected = selectedMarkerId === m.id;
            return (
            <div
              key={m.id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 group/marker block ${isSelected ? 'z-50' : 'z-20'} ${isEditMode ? 'cursor-move' : 'cursor-pointer'}`}
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
              onMouseEnter={() => !dragItem && setHovered(m.id)}
              onMouseLeave={() => !dragItem && setHovered(null)}
              onMouseDown={(e) => handleMouseDown(e, m.id, 'marker')}
              onClick={(e) => {
                if (isEditMode) return;
                e.stopPropagation();
                setSelectedMarkerId((prev) => (prev === m.id ? null : m.id));
              }}
            >
              <div className={`w-[13.3px] h-[13.3px] sm:w-[21.3px] sm:h-[21.3px] rounded-full border-2 sm:border-[2px] border-white flex items-center justify-center shadow-xl transition-transform ${(hovered === m.id || isSelected) ? 'scale-125' : ''} ${
                m.type === 'studio' ? 'bg-[#002D72]' : 
                m.type === 'pod' ? 'bg-[#1DBBB4]' : 
                m.type === 'existing' ? 'bg-gray-500' : ''
              }`} style={m.type === 'standard' ? { backgroundColor: '#00AEEF' } : {}}>
                <div className="w-[3.8px] h-[3.8px] sm:w-[5.3px] sm:h-[5.3px] bg-white rounded-full animate-pulse"></div>
              </div>

              {/* Click popup: flip card (front = image + title + arrow; back = details) when this pin is selected */}
              {isSelected && callout && (() => {
                const backContent = m.type !== 'existing' ? CALLOUT_BACK_CONTENT[m.type] : null;
                const pinColor = m.type === 'studio' ? '#002D72' : m.type === 'pod' ? '#1DBBB4' : '#00AEEF';
                return (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 pointer-events-auto md:top-auto md:mt-0 md:bottom-full md:mb-2" onClick={(e) => e.stopPropagation()}>
                  <div className="w-48" style={{ perspective: '1000px' }}>
                    <div 
                      className="relative w-full transition-transform duration-500"
                      style={{ transformStyle: 'preserve-3d', transform: calloutFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                    >
                      {/* Front */}
                      <div className="glass p-3 rounded-2xl border-white/10 shadow-2xl backdrop-blur-2xl w-full" style={{ backfaceVisibility: 'hidden' }}>
                        <div className="w-full aspect-[16/10] bg-white/5 rounded-lg mb-2 overflow-hidden border border-white/5">
                          <img src={callout.image} alt="" className="w-full h-full object-cover opacity-80" />
                        </div>
                        <div className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: pinColor }}>
                          {callout.title}
                        </div>
                        {backContent && (
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setCalloutFlipped(true); }}
                            className="mt-2 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-[8px] font-black uppercase tracking-widest text-slate-600"
                          >
                            More info
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                          </button>
                        )}
                      </div>
                      {/* Back */}
                      {backContent && (
                        <div 
                          className="absolute inset-0 flex flex-col glass p-3 rounded-2xl border-white/10 shadow-2xl backdrop-blur-2xl w-full"
                          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                        >
                          <div className="text-[9px] font-black tracking-[0.15em] uppercase mb-2 text-center flex-shrink-0" style={{ color: pinColor }}>
                            {backContent.title}
                            <div className="text-[8px] font-bold normal-case tracking-wide mt-0.5" style={{ color: pinColor }}>{backContent.dimensions}</div>
                          </div>
                          <ul className="space-y-1.5 text-[8px] text-slate-600 font-medium leading-snug flex-1 min-h-0 overflow-y-auto">
                            {backContent.bullets.map((b, i) => (
                              <li key={i} className="flex gap-1.5">
                                <span className="text-slate-500 flex-shrink-0">•</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="flex justify-center flex-shrink-0 pt-2 mt-auto">
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setCalloutFlipped(false); }}
                              className="flex items-center justify-center gap-1 py-1.5 px-4 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-[8px] font-black uppercase tracking-widest text-slate-600"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                              Back
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );})()}
            </div>
          );})}

                  </div>
      </div>
    </div>
  );
};
