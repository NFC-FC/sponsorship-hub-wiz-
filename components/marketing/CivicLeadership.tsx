import React from 'react';
import { SiteConfig } from '../../App.tsx';

interface Props {
  config: SiteConfig;
}

export const CivicLeadership: React.FC<Props> = ({ config }) => {
  // Utility to handle singular vs plural labels
  const getSingularTerm = (plural: string) => {
    if (plural === 'Districts') return 'District';
    if (plural === 'Council Districts') return 'Council District';
    return 'Ward';
  };

  const singularTerm = getSingularTerm(config.wardType || 'Wards');
  const wardNames = config.wardNames || [];

  // Generate dynamic ward list based on wardCount
  const count = parseInt(config.wardCount) || 1;
  const wards = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${singularTerm} ${i + 1}`,
    memberName: wardNames[i] || 'TBD',
    focus: "Innovation Zone",
    color: i % 3 === 0 ? config.primaryColor : i % 3 === 1 ? config.secondaryColor : config.accentColor,
  }));

  const leaders = config.leaders || [];

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
          <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none mb-4">
            CITY OF <br/><span style={{ color: config.primaryColor }}>{config.projectCity.toUpperCase()}</span> SELECTED.
          </h2>
          <div className="max-w-5xl mx-auto">
              <p className="text-white text-lg md:text-2xl font-black uppercase tracking-[0.2em] mb-10 leading-tight">
                ONE NATIONAL SEARCH. SIX CITIES SELECTED. <br className="hidden md:block" /> DEFINING THE FUTURE OF COMMUNITY WELLNESS IN AMERICA.
              </p>
              
              <p className="text-gray-400 text-xl font-medium leading-relaxed mb-10 max-w-4xl mx-auto">
                The {config.projectCity} City Council has officially approved the <span className="text-white">Healthy Infrastructure Master Plan</span>, authorizing the deployment of world-class Fitness Courts city-wide. With a committed local funding strategy and National Fitness Campaign contributing over <span className="text-white">$500,000</span> in planning and management services, this partnership is defining the future of community wellness.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                  <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center">
                    <span className="text-3xl font-black italic" style={{ color: config.primaryColor }}>{config.wardCount}</span>
                      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">{config.wardType || 'Wards'} Covered</span>
                  </div>
                  <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center">
                      <span className="text-white text-3xl font-black italic">100%</span>
                      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Unanimous Vote</span>
                  </div>
                  <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center">
                    <span className="text-3xl font-black italic" style={{ color: config.secondaryColor }}>{config.courtCount}</span>
                      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Approved Sites</span>
                  </div>
              </div>
          </div>
        </div>

        {/* Centered Leadership Row */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-16 mb-32 border-t border-white/10 pt-24">
          {leaders.map((leader, i) => (
            <div key={leader.id || i} className="flex flex-col items-center text-center group relative min-w-[160px]">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
                <div className="w-40 h-40 md:w-48 lg:w-56 md:h-48 lg:h-56 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-white/30 transition-all relative z-10 grayscale group-hover:grayscale-0 shadow-2xl bg-zinc-800">
                  {leader.image ? (
                    <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-900 border-2 border-dashed border-white/10">
                      <svg className="w-12 h-12 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                  )}
                </div>
              </div>
              <div className="relative z-10 flex flex-col items-center w-full px-2">
                <h4 className="text-white font-black text-lg md:text-xl uppercase italic tracking-tighter mb-2">{leader.name}</h4>
                <p className="text-gray-500 text-[10px] md:text-xs uppercase font-bold tracking-[0.2em] leading-tight mx-auto">{leader.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Ward Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wards.map((item, i) => (
            <div key={i} className="glass p-10 rounded-[3rem] border-white/5 group hover:border-[#009cdc]/30 transition-all duration-500 hover:-translate-y-2">
              <div className="w-12 h-1 bg-current mb-8 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: item.color }}></div>
              <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-1">{item.name}</h3>
              <div className="text-white font-bold text-sm mb-4 tracking-tight uppercase opacity-80">{item.memberName}</div>
              <p style={{ color: config.primaryColor }} className="text-[10px] font-black uppercase tracking-widest mb-6">{item.focus}</p>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Council Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};