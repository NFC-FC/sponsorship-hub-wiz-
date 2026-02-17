
import React from 'react';
import { SiteConfig } from '../App.tsx';

interface Props {
  config: SiteConfig;
}

export const PartnershipOpportunity: React.FC<Props> = ({ config }) => {
  return (
    <div className="bg-black py-40 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{ background: `linear-gradient(to right, transparent, ${config.primaryColor}80, transparent)` }}></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass p-12 md:p-24 rounded-[4rem] border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" style={{ backgroundColor: `${config.primaryColor}0D` }}></div>
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10" style={{ backgroundColor: `${config.secondaryColor}1A`, color: config.secondaryColor }}>
              Legacy Partnership Opportunity
            </div>
            
            <h2 className="text-6xl md:text-8xl font-black text-white mb-10 italic uppercase tracking-tighter leading-none">
              COME JOIN <br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})` }}>THE MOVEMENT.</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-16 leading-relaxed font-medium">
              We are building {config.courtCount} <span className="text-white">Fitness Courts</span> that will serve the City of {config.projectCity} for decades. This is more than a sponsorship—it's a permanent piece of the city's healthy infrastructure.
            </p>

            <button 
              className="nfc-btn-primary scale-125 px-16 py-6"
              style={{ backgroundColor: config.primaryColor, boxShadow: `0 0 50px ${config.primaryColor}4D` }}
            >
              Request Partner Prospectus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
