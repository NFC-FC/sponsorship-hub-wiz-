
import React, { useState } from 'react';
import { SiteConfig } from '../App.tsx';

interface Props {
  config: SiteConfig;
}

const markers = [
  { id: 1, type: 'studio', name: 'Downtown Hub', x: 48, y: 42 },
  { id: 2, type: 'pod', name: 'Innovation Pod', x: 25, y: 35 },
  { id: 3, type: 'standard', name: 'Community Court', x: 55, y: 40 },
  { id: 4, type: 'existing', name: 'Legacy Site', x: 35, y: 55 },
  { id: 5, type: 'standard', name: 'Regional Park Site', x: 82, y: 78 },
  { id: 6, type: 'studio', name: 'Expansion Hub', x: 72, y: 32 },
  { id: 7, type: 'pod', name: 'Transit Center Pod', x: 42, y: 80 },
  { id: 8, type: 'existing', name: 'Original Site', x: 48, y: 18 },
];

export const MasterPlan: React.FC<Props> = ({ config }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="bg-black py-20">
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

        <div className="relative aspect-[16/18] md:aspect-[16/14] lg:aspect-[16/11] bg-[#1a1a1a] rounded-[3rem] overflow-hidden border border-white/5 shadow-[0_0_100px_rgba(0,156,220,0.15)]">
          
          <div 
            className="absolute inset-0 opacity-70 grayscale hover:grayscale-0 transition-all duration-700 bg-center bg-cover"
            style={{ 
              backgroundImage: `url('${config.masterPlanBackground}')`, 
            }}
          />
          
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')] opacity-20 pointer-events-none"></div>

          <div className="absolute top-6 left-6 z-30 w-56 md:w-64 bg-white/90 backdrop-blur-xl p-4 md:p-6 rounded-2xl border border-white/10 shadow-2xl scale-90 md:scale-100 origin-top-left">
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
              <div className="flex items-center gap-3 pt-1">
                <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: `${config.primaryColor}33` }}></div>
                <span className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest leading-tight">10 Min Accessibility Radius</span>
              </div>
            </div>
          </div>

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

          {markers.map((m) => (
            <div
              key={m.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group/marker"
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
              onMouseEnter={() => setHovered(m.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center shadow-xl transition-all group-hover/marker:scale-125 ${
                m.type === 'studio' ? 'bg-[#002D72]' : 
                m.type === 'pod' ? 'bg-[#1DBBB4]' : 
                m.type === 'existing' ? 'bg-gray-700' : ''
              }`} style={m.type === 'standard' ? { backgroundColor: config.primaryColor } : {}}>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
              
              {hovered === m.id && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 glass p-4 rounded-xl border-white/10 shadow-2xl min-w-[150px] z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="text-[9px] font-black uppercase tracking-widest mb-1" style={{ color: config.primaryColor }}>
                    {m.type === 'studio' ? 'Proposed Fitness Court Studio' : 
                     m.type === 'pod' ? 'Proposed Fitness Court Pod' :
                     m.type === 'existing' ? 'Existing Fitness Court' : 'Proposed Fitness Court'}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
