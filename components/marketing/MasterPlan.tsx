
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
  const [showExploreHint, setShowExploreHint] = useState(true);

  const markers = config.markers || [];
  const callouts = config.callouts || [];

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || timeoutId !== null) return;
        timeoutId = setTimeout(() => {
          setShowExploreHint(false);
          timeoutId = null;
        }, 1800);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (selectedMarkerId) setShowExploreHint(false);
  }, [selectedMarkerId]);

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
          >
            <div
              className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${
                showExploreHint ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <p className="text-white/90 text-center text-sm sm:text-base font-bold uppercase tracking-[0.2em] px-4 drop-shadow-lg">
                Click and explore locations to learn more
              </p>
            </div>
          </div>
          
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')] opacity-20 pointer-events-none"></div>

          {/* KEY (Legend) - Open by default; right-aligned */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 origin-top-right max-w-[calc(100%-2rem)] max-h-[calc(100%-2rem)]">
            {keyVisible ? (
              <div className="w-56 md:w-64 bg-white/90 backdrop-blur-xl p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl scale-[0.7] sm:scale-90 md:scale-100 origin-top-right">
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
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 group/marker block z-20 ${isEditMode ? 'cursor-move' : 'cursor-pointer'}`}
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
              <div className={`w-[15.3px] h-[15.3px] sm:w-[21.3px] sm:h-[21.3px] rounded-full border border-[1px] sm:border-[2px] border-white flex items-center justify-center shadow-xl transition-transform ${(hovered === m.id || isSelected) ? 'scale-125' : ''} ${
                m.type === 'studio' ? 'bg-[#002D72]' : 
                m.type === 'pod' ? 'bg-[#1DBBB4]' : 
                m.type === 'existing' ? 'bg-gray-500' : ''
              }`} style={m.type === 'standard' ? { backgroundColor: '#00AEEF' } : {}}>
                <div className="w-[4.4px] h-[4.4px] sm:w-[5.3px] sm:h-[5.3px] bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          );})}

          {/* Fixed detail panel — shows when a pin is selected (proposed or existing) */}
          {(() => {
            const selectedMarker = markers.find((m) => m.id === selectedMarkerId);
            const selectedCallout = selectedMarker ? getCalloutForMarkerType(callouts, selectedMarker.type) : null;
            const isExisting = selectedMarker?.type === 'existing';
            const isPanelVisible = !!(selectedMarker && (selectedCallout || isExisting));
            const backContent = selectedMarker && selectedMarker.type !== 'existing' ? CALLOUT_BACK_CONTENT[selectedMarker.type] : null;
            const pinColor = selectedMarker ? (selectedMarker.type === 'studio' ? '#002D72' : selectedMarker.type === 'pod' ? '#1DBBB4' : selectedMarker.type === 'existing' ? '#64748b' : '#00AEEF') : '';
            const existingImage = selectedMarker?.type === 'existing' ? (selectedMarker.imageLink ?? config.existingSiteImageLink ?? '') : '';
            const existingName = selectedMarker?.type === 'existing' ? (selectedMarker.name || config.existingSiteName || 'Existing Site') : '';
            const existingLaunch = selectedMarker?.type === 'existing' ? (selectedMarker.launchDate ?? config.existingSiteLaunchDate ?? '') : '';
            const existingAddress = selectedMarker?.type === 'existing' ? (selectedMarker.siteAddress ?? config.existingSiteAddress ?? '') : '';
            return (
              <div
                className={`absolute top-4 right-4 sm:top-6 sm:right-6 w-[32%] h-[48%] min-w-[160px] min-h-[200px] z-50 transition-opacity duration-200 rounded-2xl md:rounded-3xl bg-white/95 backdrop-blur-xl p-2 sm:p-4 md:p-5 shadow-2xl flex flex-col overflow-hidden ${isPanelVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={(e) => e.stopPropagation()}
              >
                {isPanelVisible && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setSelectedMarkerId(null); }}
                      className="absolute top-1 right-1 z-10 w-6 h-6 sm:top-2 sm:right-2 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-black/10 text-zinc-500 hover:text-zinc-800 transition-colors text-base sm:text-lg leading-none"
                      aria-label="Close"
                    >
                      ×
                    </button>
                    <div className="flex-1 min-h-0 flex flex-col" style={{ perspective: '1000px' }}>
                      <div
                        className="relative w-full h-full flex-1 min-h-0 transition-transform duration-500"
                        style={{ transformStyle: 'preserve-3d', transform: calloutFlipped && !isExisting ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                      >
                        {/* Front — proposed (callout) or existing site */}
                        <div className="absolute inset-0 flex flex-col" style={{ backfaceVisibility: 'hidden' }}>
                          <div className="flex-1 min-h-0 rounded-lg overflow-hidden border border-white/10 mb-1 sm:mb-2 flex items-center justify-center bg-white">
                            {isExisting ? (
                              existingImage ? (
                                <img src={existingImage} alt="" className="w-full h-full object-contain opacity-80" />
                              ) : (
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">No image</span>
                              )
                            ) : (
                              <img
                                src={selectedCallout!.image}
                                alt=""
                                className={`w-full h-full object-contain opacity-80 ${selectedMarker?.type === 'pod' ? 'scale-[0.6]' : ''}`}
                              />
                            )}
                          </div>
                          <div className="text-[10px] sm:text-xs md:text-sm font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase flex-shrink-0 leading-tight" style={{ color: pinColor }}>
                            {isExisting ? (existingName || 'Existing Site') : selectedCallout!.title}
                          </div>
                          {isExisting ? (
                            <div className="mt-1 sm:mt-2 space-y-0.5 sm:space-y-1 flex-shrink-0 overflow-hidden min-h-0">
                              <p className="text-[9px] sm:text-[10px] text-slate-600 font-bold uppercase tracking-widest truncate" title={existingLaunch}>Launch date: {existingLaunch || '—'}</p>
                              <p className="text-[9px] sm:text-[10px] text-slate-600 font-medium truncate" title={existingAddress}>Address: {existingAddress || '—'}</p>
                            </div>
                          ) : backContent ? (
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setCalloutFlipped(true); }}
                              className="mt-1 sm:mt-2 w-full flex items-center justify-center gap-0.5 sm:gap-1 py-1 sm:py-2 rounded-lg border border-white/10 hover:bg-black/5 transition-colors text-[8px] sm:text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-600"
                            >
                              More info
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                          ) : null}
                        </div>
                        {/* Back — proposed only */}
                        {backContent && !isExisting && (
                          <div
                            className="absolute inset-0 flex flex-col overflow-y-auto"
                            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                          >
                            <div className="text-[10px] sm:text-[11px] md:text-xs font-black tracking-[0.1em] sm:tracking-[0.15em] uppercase mb-1 sm:mb-2 text-center flex-shrink-0 pt-2 sm:pt-[25pt] leading-tight" style={{ color: pinColor }}>
                              {backContent.title}
                              <div className="text-[9px] sm:text-[9px] md:text-[10px] font-bold normal-case tracking-wide mt-0.5" style={{ color: pinColor }}>{backContent.dimensions}</div>
                            </div>
                            <ul className="space-y-0.5 sm:space-y-1.5 text-[10px] sm:text-[10px] md:text-xs text-slate-600 font-medium leading-snug flex-1 min-h-0 mb-2 sm:mb-3 flex flex-col max-w-[95%] sm:max-w-[80%] mx-auto w-full text-left">
                              {backContent.bullets.map((b, i) => (
                                <li key={i} className="flex items-center gap-1.5">
                                  <span className="text-slate-500 flex-shrink-0">•</span>
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setCalloutFlipped(false); }}
                              className="w-full flex items-center justify-center gap-0.5 sm:gap-1 py-1 sm:py-2 rounded-lg border border-white/10 hover:bg-black/5 transition-colors text-[8px] sm:text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-600 flex-shrink-0"
                            >
                              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                              Back
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })()}

                  </div>
      </div>
    </div>
  );
};
