
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  config: {
    primaryColor: string;
    projectCity: string;
  };
}

const PitchIcon: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case "PLANNING":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <path d="M12 2L12 22M12 2L18 8M12 2L6 8M4 18C4 18 6 20 12 20C18 20 20 18 20 18" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "PHASING":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.9955 13.7H12.0045M8.29053 13.7H8.29951M15.7006 13.7H15.7095M11.9955 16.7H12.0045M8.29053 16.7H8.29951M15.7006 16.7H15.7095" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "LAYOUTS":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <rect x="3" y="4" width="18" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 9H21M9 20V9" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "PROJECTIONS":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <path d="M22 7L13.5 15.5L8.5 10.5L2 17" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 7H22V13" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "SCORES":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12L11 14L15 10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "MAPPING":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <path d="M9 20L3 17V4L9 7M9 20L15 17M9 20V7M15 17L21 20V7L15 4M15 17V4M9 7L15 4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "TRAILS":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <path d="M4 12C4 12 7 9 12 9C17 9 20 12 20 12M4 17C4 17 7 14 12 14C17 14 20 17 20 17" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="5" r="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return null;
  }
};

export const Section3bPitch: React.FC<Props> = ({ config }) => {
  const iconLabels = [
    "PLANNING",
    "PHASING",
    "LAYOUTS",
    "PROJECTIONS",
    "SCORES",
    "MAPPING",
    "TRAILS"
  ];

  return (
    <section className="relative bg-white flex flex-col min-h-[95vh] overflow-hidden">
      {/* Top Content Row */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Side: Core Message (Deck Style) */}
        <div 
          className="lg:w-[32%] p-10 md:p-14 flex flex-col justify-center text-white relative overflow-hidden"
          style={{ backgroundColor: config.primaryColor }}
        >
          {/* Subtle Branding Mark */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-3xl md:text-4xl font-black tracking-widest uppercase opacity-90">WHAT <span className="font-light">WE DO</span></span>
              <h2 className="text-4xl md:text-5xl font-black mt-8 mb-6 leading-[1.1]">
                Healthy<br/>Infrastructure
              </h2>
              <p className="text-lg md:text-xl font-medium leading-snug italic opacity-95 max-w-sm">
                Building Healthier Communities by Redesigning the Built Environment for Every-Day Outdoor Movement, Health and Happiness.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-8 pt-8 border-t border-white/20"
            >
              <div className="space-y-2">
                <h4 className="font-black uppercase tracking-wider text-[12px] italic">What We Create:</h4>
                <p className="text-sm leading-relaxed font-medium opacity-80">
                  Free, outdoor <span className="underline decoration-white/30 underline-offset-2">Public Health Movement Systems</span> that bring people outdoors and help communities build health and connection every day.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-black uppercase tracking-wider text-[12px] italic">What We Connect:</h4>
                <p className="text-sm leading-relaxed font-medium opacity-80">
                  Outdoor wellness centers incentivize daily movement practices, linked into the broader environment through connections to trails, parks, and pedestrian infrastructure.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="font-black uppercase tracking-wider text-[12px] italic">The Impact:</h4>
                <h3 className="text-2xl md:text-3xl font-black italic leading-tight">
                  Healthier, happier communities and healthcare cost reduction at scale.
                </h3>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Network Visual */}
        <div className="lg:w-[68%] relative bg-slate-100 overflow-hidden min-h-[500px]">
          {/* Aerial Map Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center contrast-[1.1] grayscale-[0.2]"
            style={{ backgroundImage: `url('https://github.com/NFC-FC/NFC-image-hosting/blob/main/atlanta_aerial.png?raw=true')` }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
          
          {/* Small Network Highlight Card (Top Right) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="absolute top-10 right-10 z-30 w-64 glass bg-white/90 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl p-6"
          >
             <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#009cdc] flex items-center justify-center text-white shadow-lg">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L12 22M2 12L22 12" strokeLinecap="round"/></svg>
                </div>
                <div>
                   <div className="text-[10px] font-black text-[#009cdc] uppercase tracking-widest leading-none">Smart Health</div>
                   <div className="text-slate-900 font-black text-lg italic uppercase tracking-tighter leading-none">85% SCORE</div>
                </div>
             </div>
             <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                City-Wide Network optimized for total resident coverage.
             </p>
          </motion.div>

          {/* Floating UI Elements (Mobile App) */}
          <div className="absolute bottom-10 right-10 z-20">
            <motion.div 
              whileHover={{ y: -5 }}
              className="relative w-48 aspect-[9/16] bg-slate-950 rounded-[2.5rem] border-4 border-slate-900 shadow-2xl overflow-hidden"
            >
               <img 
                 src="https://github.com/NFC-FC/NFC-image-hosting/blob/main/FC_Studio.png?raw=true" 
                 className="w-full h-full object-cover opacity-90"
                 alt="App Preview"
               />
               <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-white font-black text-[8px] uppercase tracking-widest text-center">
                    HOW IT WORKS
                  </div>
               </div>
            </motion.div>
          </div>
          
          <div className="absolute top-10 left-10 opacity-30">
             <img src="https://github.com/NFC-FC/NFC-image-hosting/blob/main/01-Main-Shield.png?raw=true" className="h-12" alt="NFC" />
          </div>
        </div>
      </div>

      {/* Bottom Row: Icon Infrastructure Bar */}
      <div className="bg-[#004b7a] py-14 px-10">
        <div className="container mx-auto flex flex-wrap justify-center lg:justify-between items-center gap-12 lg:gap-6">
          {iconLabels.map((label, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="flex flex-col items-center gap-5 group cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full border-2 border-white/30 flex items-center justify-center transition-all group-hover:bg-white group-hover:scale-110 shadow-lg text-white group-hover:text-[#004b7a]">
                 <PitchIcon type={label} />
              </div>
              <span className="text-[10px] md:text-[11px] font-black text-white/80 tracking-widest uppercase group-hover:text-white transition-colors">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Slide footer metadata */}
      <div className="bg-white py-4 px-10 flex justify-between items-center border-t border-slate-100">
         <span className="text-[10px] font-black text-red-600 uppercase tracking-widest italic">CONFIDENTIAL | NOT FOR EXTERNAL USE</span>
         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">© {new Date().getFullYear()} National Fitness Campaign</span>
      </div>
    </section>
  );
};

export default Section3bPitch;
