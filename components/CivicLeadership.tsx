import React from 'react';
import { SiteConfig } from '../App.tsx';

interface Props {
  config: SiteConfig;
}

export const CivicLeadership: React.FC<Props> = ({ config }) => {
  // Generate dynamic ward list based on wardCount
  const count = parseInt(config.wardCount) || 1;
  const wardNames = config.wardNames || [];
  
  const wards = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: config.projectCity === 'ATLANTA' ? `District ${i + 1}` : `Ward ${i + 1}`,
    memberName: wardNames[i] || 'TBD',
    focus: "Innovation Zone",
    color: i % 3 === 0 ? config.primaryColor : i % 3 === 1 ? config.secondaryColor : config.accentColor,
  }));

  return (
    <div className="bg-[#111] py-32 px-6 border-b border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-full opacity-5 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth="0.1" />
              <line x1="100" y1="0" x2="0" y2="100" stroke="white" strokeWidth="0.1" fill="none" />
              <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.1" fill="none" />
          </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none mb-8">
            CITY OF <br/><span style={{ color: config.primaryColor }}>{config.projectCity.toUpperCase()}</span> SELECTED.
          </h2>
          <div className="max-w-3xl mx-auto">
              <p className="text-gray-400 text-xl font-medium leading-relaxed mb-10">
                One national search. Six cities selected. Defining the future of community wellness.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                  <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center">
                      <span className="text-[var(--brand-primary)] text-3xl font-black italic">{config.wardCount}</span>
                      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Districts Covered</span>
                  </div>
                  <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center">
                      <span className="text-white text-3xl font-black italic">100%</span>
                      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Unanimous Vote</span>
                  </div>
                  <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center">
                      <span className="text-[var(--brand-secondary)] text-3xl font-black italic">{config.courtCount}</span>
                      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Approved Sites</span>
                  </div>
              </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {wards.map((item, i) => (
            <div key={i} className="glass p-10 rounded-[3rem] border-white/5 group hover:border-[#009cdc]/30 transition-all duration-500 hover:-translate-y-2">
              <div 
                className="w-12 h-1 bg-current mb-8 opacity-40 group-hover:opacity-100 transition-opacity" 
                style={{ color: item.color }}
              ></div>
              <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">{item.name}</h3>
              <div className="text-white font-bold text-sm mb-4 tracking-tight uppercase opacity-80">
                {item.memberName}
              </div>
              <p style={{ color: config.primaryColor }} className="text-[10px] font-black uppercase tracking-widest mb-6">{item.focus}</p>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Council Verified</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-10" style={{ background: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})` }}>
           <div className="md:w-2/3">
              <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-2 shadow-xl">
                      <img src={config.nfcLogo} className="w-full h-auto" alt="NFC" />
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-tight">
                    HEALTH EQUITY <br/> AT THE CORE.
                  </h3>
              </div>
              <p className="text-white/70 font-medium text-lg leading-relaxed">
                By 2026, the full network will be active, removing financial barriers to world-class equipment and democratizing fitness for all residents.
              </p>
           </div>
           <button className="bg-white text-slate-900 px-10 py-5 rounded-full font-black uppercase italic tracking-tighter hover:scale-105 transition-transform whitespace-nowrap shadow-[0_20px_40px_rgba(255,255,255,0.3)]">
              View Approved Map
           </button>
        </div>
      </div>
    </div>
  );
};