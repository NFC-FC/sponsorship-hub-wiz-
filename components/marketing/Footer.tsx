import React from 'react';
import { motion } from 'framer-motion';
import { Section9SponsorLogos } from './Section9SponsorLogos';

interface Props {
  config: {
    projectCity: string;
    sponsorLogo: string;
    nfcLogo: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    sponsorName: string;
    cityLogo: string;
  };
}

export const Footer: React.FC<Props> = ({ config }) => {
  return (
    <footer className="relative bg-[#020617] overflow-hidden w-full max-w-[100vw]">
      {/* FULL-BLEED GRADIENT SECTION */}
      <section 
        className="w-full relative py-10 sm:py-16 md:py-32 flex flex-col items-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${config.primaryColor} 0%, ${config.secondaryColor} 50%, ${config.accentColor} 100%)` }}
      >
        {/* Grain/Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 flex justify-center w-full min-w-0">
          {/* Main White Card matching the user's provided image format */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white rounded-2xl sm:rounded-[3rem] md:rounded-[6rem] p-5 sm:p-8 md:p-20 shadow-[0_40px_100px_rgba(0,0,0,0.3)] max-w-7xl w-full flex flex-col items-center min-w-0"
          >
            {/* 1. Impact Statement — first part primary/bold, second part secondary/less bold */}
            <div className="text-center mb-6 sm:mb-8 md:mb-12 px-2 sm:px-4 md:px-12 min-w-0 w-full">
              <h3 className="text-xs sm:text-lg md:text-3xl lg:text-5xl italic uppercase tracking-tighter leading-tight break-words">
                <span className="font-black" style={{ color: config.primaryColor }}>
                  {config.sponsorName.toUpperCase()} DELIVERS $10M DOLLAR COMMUNITY WELLNESS CAMPAIGN ACROSS THE CITY OF {config.projectCity.toUpperCase()},
                </span>{' '}
                <span className="font-bold" style={{ color: config.secondaryColor }}>
                  TO IMPROVE HEALTH AND HAPPINESS FOR HUNDREDS OF THOUSANDS OF RESIDENTS.
                </span>
              </h3>
            </div>

            {/* 2. Centered Divider */}
            <div className="w-full h-px bg-slate-100 mb-6 sm:mb-8 md:mb-12 max-w-5xl" />

            {/* 3. Partnership Logos Row — same height for all three */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-12 mb-6 sm:mb-8 md:mb-12">
              <img 
                src={config.sponsorLogo} 
                alt={config.sponsorName} 
                className="h-8 sm:h-10 md:h-14 object-contain" 
              />
              
              <div className="w-px h-8 sm:h-10 md:h-14 bg-slate-200 hidden sm:block" />
              
              <img 
                src={config.cityLogo} 
                alt="City Seal" 
                className="h-8 sm:h-10 md:h-14 object-contain" 
              />
              
              <div className="w-px h-8 sm:h-10 md:h-14 bg-slate-200 hidden sm:block" />
              
              <img 
                src={config.nfcLogo} 
                alt="NFC" 
                className="h-8 sm:h-10 md:h-14 object-contain" 
              />
            </div>

            {/* 4. Contact Info — smaller on mobile */}
            <div className="text-center">
              <p className="text-[8px] sm:text-[9px] md:text-xs font-black text-slate-400 uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                FOR NEXT STEPS, CONTACT TRENT (<a href="mailto:trent@NFCHQ.com" className="text-slate-900 hover:text-[#00AEEF] transition-colors underline underline-offset-4 decoration-slate-300">TRENT@NFCHQ.COM</a>) OR YOUR NFC REPRESENTATIVE.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Sponsor logos — "Brought to You by America's Largest Healthcare Providers" */}
        <Section9SponsorLogos config={{ nfcLogo: config.nfcLogo, primaryColor: config.primaryColor }} />

        {/* Legal Strip (Subtle Footer) */}
        <div className="w-full mt-10 sm:mt-16 md:mt-20">
          <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 w-full min-w-0">
            <p className="text-[9px] text-white/40 font-black uppercase tracking-[0.4em]">
              © {new Date().getFullYear()} National Fitness Campaign • Public-Private Infrastructure Briefing
            </p>
            <div className="flex gap-6 opacity-40 text-[8px] font-black uppercase tracking-[0.15em] text-white">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};