import React from 'react';
import { motion } from 'framer-motion';
import { CityTemplate } from '../../App.tsx';

interface Props {
  config: {
    projectCity: string;
    primaryColor: string;
    secondaryColor: string;
    endorsementQuote?: string;
    endorsementName?: string;
    endorsementImage?: string;
  };
  isEditMode?: boolean;
  onUpdateField?: (key: keyof CityTemplate, value: any) => void;
}

const Section6Endorsement: React.FC<Props> = ({ config, isEditMode, onUpdateField }) => {
  return (
    <section className="relative min-h-0 sm:min-h-[50vh] bg-white flex items-center justify-center pt-4 pb-6 sm:py-12 md:py-20 overflow-hidden w-full max-w-[100vw]">
      <div className="container mx-auto px-4 sm:px-6 w-full min-w-0">
        <div className="flex flex-col items-center text-center gap-4 sm:gap-8 md:gap-12">
          
          {/* Mobile: headshot then badge stacked (no overlap). Desktop: headshot with badge absolute below */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative flex flex-col sm:block items-center w-full sm:w-auto flex-shrink-0 sm:pb-20 md:pb-16"
          >
            {/* Circular headshot - always visible and centered */}
            <div className="relative w-24 h-24 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 flex-shrink-0 mx-auto">
              <div className="absolute inset-1.5 sm:inset-4 border-2 border-slate-100 rounded-full animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-0 bg-slate-100 rounded-full overflow-hidden shadow-xl border-2 sm:border-4 border-white">
                <img 
                  src={config.endorsementImage || "https://github.com/NFC-FC/NFC-image-hosting/blob/main/Las_Vegas_Mayor_Shelley_Berkley_app_June-23-2025-600x800.jpg?raw=true"} 
                  alt="Mayor" 
                  className="w-full h-full object-cover grayscale brightness-110 contrast-110"
                />
                {isEditMode && onUpdateField && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={() => {
                    const url = prompt("Enter endorsement image URL:", config.endorsementImage);
                    if (url !== null) onUpdateField('endorsementImage', url);
                  }}>
                    <span className="text-white text-[10px] font-black uppercase tracking-widest">Change Photo</span>
                  </div>
                )}
              </div>
            </div>

            {/* Badge: below headshot on mobile (mt-3), absolute on sm+ */}
            <div 
              className="mt-3 sm:mt-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:-bottom-8 md:-bottom-5 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-[1.5rem] text-white shadow-lg ring-2 sm:ring-4 ring-white flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 w-fit mx-auto"
              style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})` }}
            >
              <div className="w-4 h-4 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[6px] sm:text-[10px] font-black">✓</span>
              </div>
              <div className="min-w-0">
                <div className="text-[6px] sm:text-[8px] font-black uppercase tracking-widest opacity-80 mb-0.5 whitespace-nowrap sm:whitespace-normal"></div>
                <div
                  className={`font-display font-black text-[7px] sm:text-xs md:text-sm whitespace-nowrap ${isEditMode ? 'cursor-pointer hover:underline' : ''}`}
                  onClick={() => {
                    if (isEditMode && onUpdateField) {
                      const name = prompt("Enter speaker name:", config.endorsementName);
                      if (name !== null) onUpdateField('endorsementName', name);
                    }
                  }}
                >
                  {config.endorsementName || "OFFICE OF THE MAYOR"}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex-grow max-w-4xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="space-y-2 sm:space-y-4 md:space-y-6"
            >
              <h3 
                className={`text-xs sm:text-xl md:text-3xl lg:text-5xl font-light italic leading-snug text-slate-800 ${isEditMode ? 'cursor-pointer hover:bg-slate-50' : ''}`}
                onClick={() => {
                  if (isEditMode && onUpdateField) {
                    const quote = prompt("Enter endorsement quote:", config.endorsementQuote);
                    if (quote !== null) onUpdateField('endorsementQuote', quote);
                  }
                }}
              >
                {config.endorsementQuote ? (
                  config.endorsementQuote.split('"').map((part, i) => i % 2 === 1 ? <span key={i} className="font-bold" style={{ color: config.primaryColor }}>{part}</span> : part)
                ) : (
                  <>
                    "Our partnership marks a pivotal turning point for the health of our city. This isn't just about a gym; it's about <span className="font-bold" style={{ color: config.primaryColor }}>democratizing wellness</span> and building a more resilient, connected {config.projectCity} for generations to come."
                  </>
                )}
              </h3>
              <div className="flex flex-col gap-0.5 items-center pt-1 sm:pt-0">
                <div className="text-slate-500 font-bold tracking-[0.2em] uppercase text-[8px] sm:text-[9px] md:text-[10px]">City of {config.projectCity}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section6Endorsement;