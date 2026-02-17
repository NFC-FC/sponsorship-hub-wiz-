
import React from 'react';
import { SiteConfig } from '../App.tsx';

interface Props {
  config: SiteConfig;
}

// Added config prop to match App.tsx usage and brand the component dynamically
export const FitnessApp: React.FC<Props> = ({ config }) => {
  const getSingularTerm = (plural: string) => {
    if (plural === 'Districts') return 'DISTRICT';
    if (plural === 'Council Districts') return 'COUNCIL DISTRICT';
    return 'WARD';
  };

  const singularTerm = getSingularTerm(config.wardType || 'Wards');

  return (
    <div className="bg-white py-32 px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        <div className="lg:w-1/2">
          <div className="inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10" style={{ backgroundColor: `${config.primaryColor}1A`, color: config.primaryColor }}>
            Digital Ecosystem
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 uppercase italic tracking-tighter leading-none">
            THE WORLD <br/> IS YOUR <span style={{ color: config.primaryColor }}>GYM.</span>
          </h2>
          <p className="text-slate-500 text-xl mb-12 leading-relaxed font-medium">
            The free Fitness Court App is the digital coach in your pocket. Track your 7-minute circuit, compete on {config.projectCity} city-wide leaderboards, and join free classes led by local ambassadors.
          </p>
          
          <div className="space-y-6">
            {[
              { title: "7-Minute Workouts", desc: "Expert-led circuits for all fitness levels." },
              { title: "Leaderboards", desc: `See how your neighborhood stacks up against the rest of ${config.projectCity}.` },
              { title: "Real-time Locater", desc: `GPS mapping to all ${config.courtCount} locations in the Master Plan.` }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: config.primaryColor }}>
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase italic tracking-tight text-lg">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <div className="h-14 w-44 bg-black rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
               <span className="text-white font-bold text-xs uppercase tracking-widest">App Store</span>
            </div>
            <div className="h-14 w-44 bg-black rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
               <span className="text-white font-bold text-xs uppercase tracking-widest">Google Play</span>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 relative">
          <div className="relative mx-auto w-72 h-[600px] bg-slate-900 rounded-[3.5rem] border-[12px] border-slate-800 shadow-[0_50px_100px_rgba(0,0,0,0.15)] overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full p-6 flex flex-col gap-4 bg-white">
                <div className="h-44 w-full rounded-3xl flex items-end p-4 shadow-lg" style={{ backgroundColor: config.primaryColor, boxShadow: `0 10px 20px ${config.primaryColor}4D` }}>
                   <div className="text-white font-black italic uppercase text-2xl leading-none">{config.projectCity.toUpperCase()} <br/> CHALLENGE</div>
                </div>
                <div className="flex-1 space-y-4 pt-4">
                   <div className="h-3 w-full bg-slate-100 rounded-full"></div>
                   <div className="h-3 w-3/4 bg-slate-100 rounded-full"></div>
                   <div className="grid grid-cols-2 gap-3 mt-6">
                      <div className="aspect-square bg-slate-100 rounded-2xl flex flex-col items-center justify-center p-4">
                         <div className="text-xs font-black text-slate-400 uppercase">{singularTerm} 1</div>
                         <div className="text-2xl font-black" style={{ color: config.primaryColor }}>#1</div>
                      </div>
                      <div className="aspect-square bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center justify-center p-4">
                         <div className="text-xs font-black text-slate-400 uppercase">POINTS</div>
                         <div className="text-2xl font-black text-slate-800">12k</div>
                      </div>
                   </div>
                   <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="text-[10px] font-black text-slate-400 uppercase mb-2">Upcoming Session</div>
                      <div className="font-bold text-slate-800 text-sm">Downtown Hub @ 6:00 PM</div>
                   </div>
                </div>
             </div>
             <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-800 rounded-full"></div>
          </div>
          
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-[90px] opacity-10" style={{ backgroundColor: config.secondaryColor }}></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-[110px] opacity-10" style={{ backgroundColor: config.primaryColor }}></div>
        </div>
      </div>
    </div>
  );
};
