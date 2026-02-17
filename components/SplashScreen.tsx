
import React, { useState, useEffect } from 'react';
import { SiteConfig } from '../App.tsx';

interface Props {
  config: SiteConfig;
  onComplete: () => void;
}

export const SplashScreen: React.FC<Props> = ({ config, onComplete }) => {
  const [buttonReady, setButtonReady] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonReady(true);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <div
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-3xl"></div>

      <div className="relative z-10 flex flex-col items-center bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[3rem] shadow-[0_0_80px_rgba(0,0,0,0.8)] p-10 md:p-16 lg:p-20 w-[90%] max-w-5xl mx-auto text-center overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[var(--brand-primary)] to-transparent opacity-50"></div>

        {/* Partnership Header Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mb-12">
          <img
            src={config.nfcLogo}
            alt="National Fitness Campaign"
            className="h-10 md:h-14 object-contain brightness-0 invert"
          />
          <div className="hidden md:block w-[1px] h-10 bg-white/10"></div>
          
          <div className="flex flex-col items-center">
              <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Official City Partner</span>
              <span className="text-xl font-black text-white italic tracking-tighter uppercase">{config.projectCity}</span>
          </div>

          <div className="hidden md:block w-[1px] h-10 bg-white/10"></div>
          <img
            src={config.sponsorLogo}
            alt={config.sponsorName}
            className="h-8 md:h-10 object-contain brightness-0 invert"
          />
        </div>

        {/* Center Text - Updated per user request */}
        <h1 className="text-xl md:text-2xl lg:text-3xl text-white font-light leading-relaxed md:leading-snug tracking-wide mb-14 uppercase">
          On behalf of the City of {config.projectCity}, <br />
          the <span className="font-bold text-white uppercase italic tracking-tighter">{config.projectCity} Mayor and Council</span>,<br />
          and <span className="font-bold text-[#009cdc] drop-shadow-[0_0_15px_rgba(0,156,220,0.5)] italic uppercase">National Fitness Campaign…</span>
        </h1>

        {/* Enter Button */}
        <div className="relative group">
            <div className={`absolute inset-0 bg-[var(--brand-primary)] blur-2xl opacity-20 transition-all duration-1000 ${buttonReady ? 'scale-110' : 'scale-50 opacity-0'}`}></div>
            <button
              onClick={handleEnter}
              className={`relative px-16 py-6 border border-white/20 rounded-full text-white uppercase tracking-[0.3em] text-xs font-black hover:bg-white hover:text-black hover:scale-105 transition-all duration-700 shadow-2xl ${
                buttonReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Launch Master Plan
            </button>
        </div>
        
        <p className={`mt-8 text-[9px] text-zinc-500 uppercase tracking-widest transition-opacity duration-1000 ${buttonReady ? 'opacity-60' : 'opacity-0'}`}>
            Public-Private Infrastructure Briefing v2.5
        </p>
      </div>
    </div>
  );
};
