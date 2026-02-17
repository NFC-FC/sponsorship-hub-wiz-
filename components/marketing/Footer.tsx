
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  config: {
    projectCity: string;
    sponsorLogo: string;
    nfcLogo: string;
    secondaryColor: string;
    primaryColor: string;
    sponsorName: string;
    cityLogo: string;
  };
}

// Fix: Use named export to align with MasterPlan and Impact components, and resolve import issues in App.tsx
export const Footer: React.FC<Props> = ({ config }) => {
  return (
    <footer className="relative bg-[#020617] pt-32 pb-24 border-t border-white/5 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-7xl text-white font-black uppercase tracking-tight leading-none mb-4">
            SPONSORSHIP NEXT STEPS
          </h2>
          <p className="text-[#009cdc] font-black uppercase tracking-[0.4em] text-xs md:text-sm italic">
            National Wellness Innovation Zone
          </p>
        </motion.div>

        {/* Timeline Arrow & Content Container */}
        <div className="max-w-6xl mx-auto">
          {/* The City Arrow */}
          <div className="relative flex justify-center mb-12">
            <div className="relative flex items-center">
              {/* Shield Icon Decoration (Simulated) */}
              <div className="absolute left-0 -translate-x-1/2 z-20 w-16 h-16 bg-[#009cdc] border-4 border-white rounded-xl flex flex-col items-center justify-center shadow-xl rotate-0">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />)}
                </div>
                <div className="w-10 h-0.5 bg-white/50" />
              </div>
              
              {/* Arrow Body */}
              <div className="bg-[#0f172a] h-16 md:h-20 flex items-center justify-center px-16 md:px-24 rounded-l-lg">
                <span className="text-white font-black uppercase tracking-[0.3em] text-lg md:text-2xl italic">
                  {config.projectCity}
                </span>
              </div>
              
              {/* Arrow Tip */}
              <div 
                className="w-0 h-0 border-t-[32px] md:border-t-[40px] border-t-transparent border-l-[40px] md:border-l-[50px] border-l-[#0f172a] border-b-[32px] md:border-b-[40px] border-b-transparent"
              />
            </div>
          </div>

          {/* Timeline Cards Grid */}
          <div className="bg-[#cbd5e1] rounded-[2rem] p-6 md:p-10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-8 shadow-lg flex flex-col items-center text-center min-h-[320px]"
              >
                <div className="text-[#0f172a] font-black italic uppercase tracking-tighter text-2xl mb-8">STEP 1</div>
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="text-[#0f172a] text-xl md:text-2xl font-black italic uppercase leading-tight mb-6">
                    30-60 Day <br/> Mutual Review Period
                  </h4>
                  <p className="text-slate-500 text-sm font-bold italic leading-relaxed">
                    First right of refusal provided or category exclusivity on first-come, first served basis for qualified invitees.
                  </p>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-8 shadow-lg flex flex-col items-center text-center min-h-[320px]"
              >
                <div className="text-[#0f172a] font-black italic uppercase tracking-tighter text-2xl mb-8">STEP 2</div>
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="text-[#0f172a] text-xl md:text-2xl font-black italic uppercase leading-tight mb-6">
                    Notice required on or <br/> before April 15th 2026
                  </h4>
                  <p className="text-slate-500 text-sm font-bold italic leading-relaxed">
                    Final internal review, funding source identification, board approval as required.
                  </p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-8 shadow-lg flex flex-col items-center text-center min-h-[320px]"
              >
                <div className="text-[#0f172a] font-black italic uppercase tracking-tighter text-2xl mb-8">STEP 3</div>
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="text-[#0f172a] text-xl md:text-2xl font-black italic uppercase leading-tight mb-6">
                    Sponsorships Confirmed <br/> by June 1st 2026.
                  </h4>
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <span className="text-[#0f172a] text-lg font-black italic uppercase">Phase 1 Infrastructure</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Brand Partnership Bottom Section - Reordered/Restyled to match splash screen */}
        <div className="mt-40 pt-16 border-t border-white/5">
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="flex flex-col items-center gap-12"
           >
              <div className="flex flex-wrap items-center justify-center gap-10 md:gap-20">
                {/* Sponsor Logo */}
                <img 
                  src={config.sponsorLogo} 
                  alt={config.sponsorName}
                  className="h-8 md:h-10 object-contain"
                />
                
                <div className="w-px h-16 bg-white/10 hidden md:block" />
                
                {/* City Seal */}
                <img 
                  src={config.cityLogo}
                  alt="City Seal" 
                  className="h-12 md:h-16 object-contain"
                />

                <div className="w-px h-16 bg-white/10 hidden md:block" />
                
                {/* NFC Logo */}
                <img 
                  src={config.nfcLogo}
                  alt="NFC" 
                  className="h-12 md:h-16 object-contain"
                />
              </div>

              <div className="flex flex-col items-center text-center gap-2">
                <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.5em]">
                  © {new Date().getFullYear()} National Fitness Campaign • Public-Private Infrastructure Briefing
                </p>
                <div className="flex gap-8 opacity-20 text-[9px] font-black uppercase tracking-widest text-white">
                  <span>Privacy Policy</span>
                  <span>Terms of Use</span>
                  <span>Accessibility</span>
                </div>
              </div>
           </motion.div>
        </div>
      </div>
    </footer>
  );
};
