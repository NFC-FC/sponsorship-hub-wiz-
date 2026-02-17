import React from 'react';
import { motion } from 'framer-motion';

export const FullWidthVideo: React.FC = () => {
  return (
    <section className="bg-[#020617] border-b border-white/5 relative overflow-hidden w-full py-12 md:py-20 px-4 md:px-12">
      {/* Dynamic background glow centered on the video player */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#009cdc]/10 blur-[160px] rounded-full pointer-events-none opacity-50" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto relative group overflow-hidden rounded-[2.5rem] md:rounded-[4rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] bg-transparent"
      >
        {/* Subtle top edge lighting to sell the "frame" effect */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-30" />
        
        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none group-hover:opacity-40 transition-opacity duration-1000" />
        
        {/* "Window Frame" UI controls - visible on hover */}
        <div className="absolute top-0 left-0 w-full h-12 bg-white/5 border-b border-white/5 z-20 flex items-center px-8 gap-2 opacity-0 group-hover:opacity-100 transition-all duration-700 backdrop-blur-md">
          <div className="w-2.5 h-2.5 rounded-full bg-white/10 shadow-inner" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10 shadow-inner" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10 shadow-inner" />
          <div className="flex-1" />
        </div>

        {/* The Video Source - Drives the height of the entire container */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-auto scale-100 group-hover:scale-[1.02] transition-transform duration-[5s] ease-out block relative z-0">
          <source src="https://github.com/NFC-FC/NFC-image-hosting/blob/main/video%20edit%20(1).mp4?raw=true" type="video/mp4" />
        </video>

        {/* Feature Branding Label */}
        <div className="absolute top-8 left-8 z-20 flex items-center gap-4 md:top-14 md:left-14">
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-[#009cdc] animate-ping absolute opacity-40" />
            <div className="w-3 h-3 rounded-full bg-[#009cdc] shadow-[0_0_20px_#009cdc]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-[0.4em] drop-shadow-lg">
              Allegiant Fitness Court
            </span>
            <span className="text-[7px] font-bold text-[#009cdc] uppercase tracking-[0.3em] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              Live Preview • Las Vegas
            </span>
          </div>
        </div>

        {/* Floating Partnership Shield */}
        <div className="absolute bottom-8 right-8 z-20 md:bottom-14 md:right-14 group-hover:translate-y-[-5px] transition-transform duration-700">
          <img 
            src="https://github.com/NFC-FC/NFC-image-hosting/blob/main/01-Main-Shield.png?raw=true" 
            alt="NFC Shield" 
            className="h-12 md:h-16 opacity-60 grayscale brightness-150 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-1000 group-hover:opacity-100 group-hover:grayscale-0 group-hover:brightness-100"
          />
        </div>

        {/* Atmospheric Film Grain/Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </motion.div>
    </section>
  );
};