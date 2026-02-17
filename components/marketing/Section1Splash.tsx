
import React from 'react';
import { motion } from 'framer-motion';

interface SplashProps {
  onEnter: () => void;
  config: {
    nfcLogo: string;
    sponsorLogo: string;
    projectCity: string;
    primaryColor: string;
    cityLogo: string;
  };
}

const Section1Splash: React.FC<SplashProps> = ({ onEnter, config }) => {
  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020617]"
    >
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#005587] rounded-full blur-[150px] opacity-30" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FBAB18] rounded-full blur-[150px] opacity-20" />
      </div>

      <div className="relative z-10 glass p-12 md:p-20 rounded-3xl flex flex-col items-center max-w-4xl mx-4 text-center">
        {/* Partnership Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-10 md:gap-14 mb-16"
        >
          <img 
            src={config.sponsorLogo}
            alt="Sponsor" 
            className="h-8 md:h-10 object-contain"
          />
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          
          <img 
            src={config.cityLogo}
            alt="City Seal" 
            className="h-12 md:h-16 object-contain"
          />

         <div className="w-px h-12 bg-white/10 hidden md:block" />
         <img 
            src={config.nfcLogo} 
            alt="NFC" 
            className="h-12 md:h-16 object-contain"
          />
        </motion.div>

        {/* Elegant Typography - Updated per user request */}
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="text-white text-xl md:text-2xl font-light tracking-[0.15em] leading-relaxed mb-12 uppercase"
        >
          On behalf of the City of {config.projectCity}, <br/>
          the <span className="font-bold text-white">{config.projectCity} Mayor and Council</span>, <br/>
          and <span className="font-bold" style={{ color: config.primaryColor }}>National Fitness Campaign</span>
        </motion.h1>

        {/* Enter Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={onEnter}
          className="group relative px-12 py-5 overflow-hidden rounded-full border border-white/20 hover:border-white/50 transition-all duration-500"
        >
          <span className="relative z-10 text-white tracking-[0.4em] font-black text-xs uppercase">Enter Experience</span>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
          <motion.div 
            className="absolute bottom-0 left-0 h-[1px] bg-white w-full shadow-[0_0_10px_white]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          />
        </motion.button>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <svg width="100%" height="100%">
          <pattern id="grid-splash" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-splash)" />
        </svg>
      </div>
    </motion.div>
  );
};

export default Section1Splash;
