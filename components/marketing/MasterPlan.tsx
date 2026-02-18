
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { MapMarker, MapCallout, SiteConfig } from '../../App';

interface Props {
  config: SiteConfig;
  isEditMode?: boolean;
  onUpdateMap?: (markers: MapMarker[], callouts: MapCallout[]) => void;
}

export const MasterPlan: React.FC<Props> = ({ config, isEditMode, onUpdateMap }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragItem, setDragItem] = useState<{ id: string, type: 'marker' | 'callout' } | null>(null);

  const markers = config.markers || [];
  const callouts = config.callouts || [];

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
    <div className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center lg:text-left">
          <div className="inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-4" style={{ backgroundColor: `${config.primaryColor}1A`, color: config.primaryColor }}>
            Deployment Roadmap
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase italic tracking-tighter">
            HEALTHY INFRASTRUCTURE <span style={{ color: config.primaryColor }}>MASTER PLAN.</span>
          </h2>
          <div className="max-w-3xl">
            <p className="text-white text-xl font-bold uppercase tracking-tight mb-2">
              Prioritizing High-Need Neighborhoods
            </p>
            <p className="text-gray-400 text-lg font-medium leading-relaxed">
              Each proposed location in this network is positioned to serve high-need areas. These sites help form a cohesive and balanced coverage plan, offering consistent access across different parts of the city.
            </p>
          </div>
        </div>

        {/* The Interactive Map Component */}
        <div 
          ref={containerRef}
          className="relative aspect-[16/18] md:aspect-[16/14] lg:aspect-[16/11] bg-[#1a1a1a] rounded-[3rem] overflow-hidden border border-white/5 shadow-[0_0_100px_rgba(0,156,220,0.15)]"
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

          {/* KEY (Legend) */}
          <div className="absolute top-6 left-6 z-30 w-56 md:w-64 bg-white/90 backdrop-blur-xl p-4 md:p-6 rounded-2xl border border-white/10 shadow-2xl scale-90 md:scale-100 origin-top-left pointer-events-none">
            <div className="text-[9px] font-black text-zinc-500 tracking-[0.4em] uppercase mb-4 border-b border-black/10 pb-2">KEY</div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#002D72] flex items-center justify-center border border-white/20 shadow-lg shadow-[#002D72]/40">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">Proposed Fitness Court Studio</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center border border-white/20 shadow-lg" style={{ backgroundColor: config.primaryColor }}>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">Proposed Fitness Court</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center border border-white/20">
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
                <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: `${config.primaryColor}33` }}></div>
                <span className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest leading-tight">10 Min Bike Radius Accessibility</span>
              </div>
            </div>
          </div>

          {/* Accessibility Zones */}
          {markers.map((m) => (
            <div 
              key={`zone-${m.id}`}
              className="absolute rounded-full border border-white/10 -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-sm"
              style={{ 
                left: `${m.x}%`, 
                top: `${m.y}%`, 
                width: '14%', 
                height: '24%',
                backgroundColor: `${config.primaryColor}1A`,
                opacity: hovered === m.id ? 0.8 : 0.4
              }}
            />
          ))}

          {/* Interactive Custom Markers */}
          {markers.map((m) => (
            <div
              key={m.id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group/marker ${isEditMode ? 'cursor-move' : 'cursor-pointer'}`}
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
              onMouseEnter={() => !dragItem && setHovered(m.id)}
              onMouseLeave={() => !dragItem && setHovered(null)}
              onMouseDown={(e) => handleMouseDown(e, m.id, 'marker')}
            >
              <div className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center shadow-xl transition-all ${hovered === m.id ? 'scale-125' : ''} ${
                m.type === 'studio' ? 'bg-[#002D72]' : 
                m.type === 'pod' ? 'bg-[#1DBBB4]' : 
                m.type === 'existing' ? 'bg-gray-700' : ''
              }`} style={m.type === 'standard' ? { backgroundColor: config.primaryColor } : {}}>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
              
              {(hovered === m.id || (dragItem && dragItem.id === m.id)) && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 glass p-4 rounded-xl border-white/10 shadow-2xl min-w-[150px] z-50 pointer-events-none">
                  <div className="text-[9px] font-black uppercase tracking-widest mb-1" style={{ color: config.primaryColor }}>
                    {m.type === 'studio' ? 'Proposed Fitness Court Studio' : 
                     m.type === 'pod' ? 'Proposed Fitness Court Pod' :
                     m.type === 'existing' ? 'Existing Fitness Court' : 'Proposed Fitness Court'}
                  </div>
                  <div className="mt-2 h-[1px] bg-white/10 w-full"></div>
                  <div className="text-[8px] text-gray-500 mt-2 uppercase font-black">{m.name}</div>
                  {isEditMode && <div className="text-[7px] text-[#009cdc] font-black uppercase mt-1">Dragging Enabled</div>}
                </div>
              )}
            </div>
          ))}

          {/* Isometric Callouts */}
          {callouts.map((c) => (
            <div 
              key={c.id}
              className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-transform ${isEditMode ? 'cursor-move' : ''}`}
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
              onMouseDown={(e) => handleMouseDown(e, c.id, 'callout')}
            >
              <div className="relative group">
                <div 
                  className={`absolute w-[1px] h-32 -left-10 -top-16 opacity-40 transition-transform ${c.x > 50 ? 'rotate-[130deg]' : '-rotate-[130deg]'}`}
                  style={{ backgroundImage: `linear-gradient(to top, ${c.colorType === 'primary' ? config.primaryColor : c.colorType === 'secondary' ? config.secondaryColor : '#1DBBB4'}, transparent)` }}
                ></div>
                <div className="glass p-3 rounded-2xl border-white/10 w-48 shadow-2xl backdrop-blur-2xl transition-transform hover:-translate-y-1">
                  <div className="w-full aspect-[16/10] bg-white/5 rounded-lg mb-3 overflow-hidden border border-white/5">
                    <img src={c.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div 
                    className="text-[10px] font-black tracking-[0.2em] uppercase" 
                    style={{ color: c.colorType === 'primary' ? config.primaryColor : c.colorType === 'secondary' ? config.secondaryColor : '#1DBBB4' }}
                  >
                    {c.title}
                  </div>
                  {isEditMode && (
                     <div className="mt-2 text-[7px] font-black text-zinc-600 uppercase tracking-widest text-center border-t border-white/5 pt-2">Drag to Reposition</div>
                  )}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};
