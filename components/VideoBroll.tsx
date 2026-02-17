
import React from 'react';
import { SiteConfig } from '../App.tsx';

interface Props {
  config: SiteConfig;
}

// Added config prop to match App.tsx usage and brand the component dynamically
export const VideoBroll: React.FC<Props> = ({ config }) => {
  return (
    <div className="bg-black py-10 relative h-[60vh] md:h-[80vh] overflow-hidden group">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* B-roll of active lifestyle (Vegas specific placeholder search result style) */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-70 transition-all duration-1000 scale-105 group-hover:scale-100"
        >
          <source src={config.secondaryVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
      </div>

      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-4xl">
           <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none mb-6 drop-shadow-2xl">
             MADE IN <span style={{ color: config.secondaryColor }}>{config.projectCity.toUpperCase()}.</span>
           </h2>
           <p className="text-lg md:text-2xl text-gray-300 font-bold uppercase tracking-[0.2em] drop-shadow-lg">
             The world's premier outdoor fitness infrastructure.
           </p>
        </div>
      </div>

      {/* Decorative side text */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2 rotate-90 origin-right hidden lg:block">
        <span className="text-[10px] font-black tracking-[1em] text-white/10 uppercase">{config.projectCity.toUpperCase()} UNSTOPPABLE</span>
      </div>
      <div className="absolute top-1/2 left-4 -translate-y-1/2 -rotate-90 origin-left hidden lg:block">
        <span className="text-[10px] font-black tracking-[1em] uppercase" style={{ color: `${config.primaryColor}33` }}>NATIONAL FITNESS CAMPAIGN</span>
      </div>
    </div>
  );
};
