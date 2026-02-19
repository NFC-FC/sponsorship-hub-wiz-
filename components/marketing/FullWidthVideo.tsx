import React from 'react';
import { motion } from 'framer-motion';
import { SiteConfig } from '../../App.tsx';

interface Props {
  config: SiteConfig;
}

export const FullWidthVideo: React.FC<Props> = ({ config }) => {
  return (
    <section className="bg-[#020617] border-b border-white/5 relative overflow-hidden w-full max-w-[100vw]">
      {/* Abstract background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#009cdc]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Mobile: label above the video so it doesn't sit on top of it */}
      <div className="md:hidden flex items-center gap-3 px-6 py-4">
        <div className="w-2 h-2 rounded-full bg-[#009cdc] animate-pulse shadow-[0_0_10px_#009cdc] flex-shrink-0" />
        <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.4em]">{config.sponsorName} Fitness Court</span>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[100vw] h-auto relative group bg-black overflow-hidden min-w-0"
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
        
        <video
          key={config.sponsorRender}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto scale-100 group-hover:scale-105 transition-transform duration-[4s] ease-out block"
        >
          <source src={config.sponsorRender} type="video/mp4" />
        </video>

        {/* Desktop: cinematic overlay on the video */}
        <div className="hidden md:flex absolute top-12 left-12 z-20 items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#009cdc] animate-pulse shadow-[0_0_10px_#009cdc]" />
          <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.4em] drop-shadow-md">{config.sponsorName} Fitness Court </span>
        </div>

        <div className="absolute bottom-8 right-8 z-20 md:bottom-12 md:right-12">
          <img 
            src="https://github.com/NFC-FC/NFC-image-hosting/blob/main/01-Main-Shield.png?raw=true" 
            alt="NFC Shield" 
            className="h-12 md:h-16 opacity-40 grayscale brightness-200 drop-shadow-lg"
          />
        </div>

        {/* Scanline / Texture overlay for extra cinematic feel */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </motion.div>
    </section>
  );
};