
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
    <section className="bg-[#020617] py-32 px-6 relative overflow-hidden flex flex-col items-center">
      {/* 1. Header Section */}
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4"
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
        <div className="grid grid-cols-3 gap-3 md:gap-8">
          
          {/* STEP 1 */}
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 md:p-12 flex flex-col items-center text-center shadow-lg min-h-[280px] sm:min-h-[400px] justify-center">
            <span className="text-[9px] sm:text-xs font-black italic uppercase tracking-widest text-slate-800 mb-4 sm:mb-10">STEP 1</span>
            <h3 className="text-sm sm:text-2xl md:text-3xl font-black text-slate-900 uppercase italic leading-none tracking-tighter mb-4 sm:mb-8">
              30-60 DAY<br/>MUTUAL REVIEW<br/>PERIOD
            </h3>
            <p className="text-[10px] md:text-xs font-bold text-slate-500 italic leading-relaxed uppercase tracking-tight max-w-[220px]">
              First right of refusal provided or category exclusivity on first-come, first served basis for qualified invitees.
            </p>
          </div>

          {/* STEP 2 */}
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 md:p-12 flex flex-col items-center text-center shadow-lg min-h-[280px] sm:min-h-[400px] justify-center">
            <span className="text-[9px] sm:text-xs font-black italic uppercase tracking-widest text-slate-800 mb-4 sm:mb-10">STEP 2</span>
            <h3 className="text-sm sm:text-2xl md:text-3xl font-black text-slate-900 uppercase italic leading-none tracking-tighter mb-4 sm:mb-8">
              NOTICE TO PROCEED<br/>REQUESTED ON OR<br/>BEFORE APRIL 15TH<br/>2026
            </h3>
            <p className="text-[10px] md:text-xs font-bold text-slate-500 italic leading-relaxed uppercase tracking-tight max-w-[220px]">
              Final internal review, funding source identification, board approval as required.
            </p>
          </div>

          {/* STEP 3 */}
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 md:p-12 flex flex-col items-center text-center shadow-lg min-h-[280px] sm:min-h-[400px] justify-center relative">
            <span className="text-[9px] sm:text-xs font-black italic uppercase tracking-widest text-slate-800 mb-4 sm:mb-10">STEP 3</span>
            <h3 className="text-sm sm:text-2xl md:text-3xl font-black text-slate-900 uppercase italic leading-none tracking-tighter mb-4 sm:mb-8">
              CORE SPONSORSHIPS<br/>CONFIRMED<br/>JUNE 15
            </h3>
            
            <p className="text-[10px] md:text-xs font-bold text-slate-500 italic leading-relaxed uppercase tracking-tight max-w-[220px]">
              Infrastructure build‑out and launch preparation through June 15.
            </p>
          </div>

        </div>
      </motion.div>

      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-[#00AEEF1A] to-transparent pointer-events-none" />
    </section>
  );
};
