
import React from 'react';
import { SiteConfig } from '../App.tsx';

interface Props {
  config: SiteConfig;
}

export const InfrastructureDelivery: React.FC<Props> = ({ config }) => {
  return (
    <div className="bg-white py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Render Image Container */}
        <div className="relative mb-20 flex justify-center">
           <div className="w-full max-w-5xl rounded-[2rem] overflow-hidden shadow-2xl bg-slate-50 border border-slate-100 p-8 md:p-12 transition-transform hover:scale-[1.02] duration-700">
              <img 
                src="https://images.squarespace-cdn.com/content/v1/559aec35e4b01e46950269f1/1706649733052-I4Z7G8J3P0S9S9S9S9S9/Allegiant+Fitness+Court.png" 
                alt={`${config.sponsorName} Branded Fitness Court`} 
                className="w-full h-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop";
                }}
              />
              <div className="text-right mt-4">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Example Title Sponsorship Artwork Tier Shown</span>
              </div>
           </div>
        </div>

        {/* Secondary Banner */}
        <div className="bg-slate-900 py-12 px-8 text-center rounded-3xl mb-12 shadow-xl border-b-8 border-slate-700">
          <h2 className="text-xl md:text-3xl font-black text-white leading-tight uppercase italic tracking-tighter">
            <span style={{ color: config.primaryColor }}>{config.courtCount} FITNESS COURTS</span> DEPLOYED ACROSS THE CITY OF {config.projectCity.toUpperCase()} <span style={{ color: config.secondaryColor }}>STARTING 2024.</span>
          </h2>
        </div>

        {/* Logo Strip */}
        <div className="flex flex-wrap items-center justify-center gap-12 py-10 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
           <img src={config.sponsorLogo} alt={config.sponsorName} className="h-8 md:h-12" />
           <div className="w-[1px] h-12 bg-slate-200"></div>
           <img src={config.nfcLogo} alt="NFC" className="h-8 md:h-12" />
           <div className="w-[1px] h-12 bg-slate-200"></div>
           <div className="flex flex-col items-center">
              <span className="font-black text-xs text-slate-800 uppercase tracking-tighter">CITY OF</span>
              <span className="font-black text-lg text-slate-800 uppercase tracking-tighter leading-none italic">{config.projectCity.toUpperCase()}</span>
           </div>
           <div className="w-[1px] h-12 bg-slate-200"></div>
           <div className="flex flex-col items-center opacity-60">
              <span className="font-bold text-[10px] text-slate-500 uppercase tracking-[0.2em]">PARKS & REC</span>
              <div className="flex gap-1 mt-1">
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22c55e' }}></div>
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config.secondaryColor }}></div>
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config.primaryColor }}></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
