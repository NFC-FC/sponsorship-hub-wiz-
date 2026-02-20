
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  config: {
    primaryColor: string;
    secondaryColor: string;
    projectCity: string;
  };
}

export const Section8Timeline: React.FC<Props> = ({ config }) => {
  return (
    <section className="bg-[#020617] py-12 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden flex flex-col items-center w-full max-w-[100vw]">
      {/* 1. Header Section */}
      <div className="text-center mb-8 sm:mb-12 w-full min-w-0">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-4 break-words"
        >
          SPONSORSHIP NEXT STEPS
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em]"
          style={{ color: config.primaryColor }}
        >
          NATIONAL WELLNESS INNOVATION ZONE
        </motion.p>
      </div>

      {/* 2. City Banner / Arrow */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="relative flex items-center mb-16 h-14"
      >
        <div className="flex items-center bg-[#0a1025] pl-2 pr-12 rounded-l-xl h-full relative group">
          {/* Icon Box */}
          <div className="w-10 h-10 bg-[#00AEEF] rounded-lg flex items-center justify-center mr-6 shadow-[0_0_20px_rgba(0,174,239,0.4)]">
             <div className="flex gap-0.5">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
             </div>
          </div>
          {/* City Name */}
          <span className="text-white text-lg font-black italic uppercase tracking-[0.3em] whitespace-nowrap">
            {config.projectCity}
          </span>
          
          {/* Arrow Tip */}
          <div 
            className="absolute left-full top-0 h-full w-10"
            style={{ 
              clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
              backgroundColor: '#0a1025'
            }}
          />
        </div>
      </motion.div>

      {/* 3. Steps Container */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-[#d1dbe5] p-6 md:p-12 rounded-[3rem] md:rounded-[4rem] w-full max-w-7xl shadow-2xl"
      >
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 items-stretch">
          
          {/* STEP 1 — labels/titles top-aligned; body text centered in remaining space */}
          <div className="bg-white rounded-xl sm:rounded-[2rem] p-3 sm:p-6 md:p-8 lg:p-12 flex flex-col items-center text-center shadow-lg min-h-[200px] sm:min-h-[280px] md:min-h-[400px] justify-start">
            <span className="text-[7px] sm:text-[9px] md:text-xs font-black italic uppercase tracking-widest text-slate-800 mb-2 sm:mb-4 md:mb-10 flex-shrink-0">STEP 1</span>
            <h3 className="text-[10px] sm:text-sm md:text-2xl lg:text-3xl font-black text-slate-900 uppercase italic leading-tight tracking-tighter mb-2 sm:mb-4 md:mb-8 flex-shrink-0">
              30-60 DAY<br/>MUTUAL REVIEW<br/>PERIOD
            </h3>
            <div className="flex-1 flex items-center justify-center min-h-0">
              <p className="text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs font-bold text-slate-500 italic leading-snug uppercase tracking-tight max-w-[140px] sm:max-w-[180px] md:max-w-[220px]">
                First right of refusal provided or category exclusivity on first-come, first served basis for qualified invitees.
              </p>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="bg-white rounded-xl sm:rounded-[2rem] p-3 sm:p-6 md:p-8 lg:p-12 flex flex-col items-center text-center shadow-lg min-h-[200px] sm:min-h-[280px] md:min-h-[400px] justify-start">
            <span className="text-[7px] sm:text-[9px] md:text-xs font-black italic uppercase tracking-widest text-slate-800 mb-2 sm:mb-4 md:mb-10 flex-shrink-0">STEP 2</span>
            <h3 className="text-[10px] sm:text-sm md:text-2xl lg:text-3xl font-black text-slate-900 uppercase italic leading-tight tracking-tighter mb-2 sm:mb-4 md:mb-8 flex-shrink-0">
              NOTICE TO PROCEED<br/>REQUESTED ON OR BEFORE APRIL 15TH<br/>2026
            </h3>
            <div className="flex-1 flex items-center justify-center min-h-0">
              <p className="text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs font-bold text-slate-500 italic leading-snug uppercase tracking-tight max-w-[140px] sm:max-w-[180px] md:max-w-[220px]">
                Final internal review, funding source identification, board approval as required.
              </p>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="bg-white rounded-xl sm:rounded-[2rem] p-3 sm:p-6 md:p-8 lg:p-12 flex flex-col items-center text-center shadow-lg min-h-[200px] sm:min-h-[280px] md:min-h-[400px] justify-start relative">
            <span className="text-[7px] sm:text-[9px] md:text-xs font-black italic uppercase tracking-widest text-slate-800 mb-2 sm:mb-4 md:mb-10 flex-shrink-0">STEP 3</span>
            <h3 className="text-[10px] sm:text-sm md:text-2xl lg:text-3xl font-black text-slate-900 uppercase italic leading-tight tracking-tighter mb-2 sm:mb-4 md:mb-8 flex-shrink-0">
              CORE SPONSORSHIPS<br/>CONFIRMED<br/>JUNE 15
            </h3>
            <div className="flex-1 flex items-center justify-center min-h-0">
              <p className="text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs font-bold text-slate-500 italic leading-snug uppercase tracking-tight max-w-[140px] sm:max-w-[180px] md:max-w-[220px]">
                Healthy Infrastructure build‑out and launch preparation begins.
              </p>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-[#00AEEF1A] to-transparent pointer-events-none" />
    </section>
  );
};
