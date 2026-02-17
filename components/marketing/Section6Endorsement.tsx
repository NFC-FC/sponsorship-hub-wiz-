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
    <section className="relative min-h-[50vh] bg-white flex items-center justify-center py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-10 md:gap-14">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0"
          >
            <div className="absolute inset-4 border-2 border-slate-100 rounded-full animate-[spin_30s_linear_infinite]" />
            <div className="absolute inset-0 bg-slate-100 rounded-full overflow-hidden shadow-xl border-4 border-white">
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
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 p-4 rounded-[1.5rem] text-white shadow-lg ring-4 ring-white flex items-center gap-3" style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})` }}>
               <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-[10px] font-black">Official</span>
               </div>
               <div>
                 <div className="text-[8px] font-black uppercase tracking-widest opacity-80 mb-0.5">Verified Endorsement</div>
                 <div 
                   className={`font-display font-black text-xs md:text-sm whitespace-nowrap ${isEditMode ? 'cursor-pointer hover:underline' : ''}`}
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

          <div className="flex-grow max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h3 
                className={`text-2xl md:text-4xl lg:text-5xl font-light italic leading-snug text-slate-800 mb-8 ${isEditMode ? 'cursor-pointer hover:bg-slate-50' : ''}`}
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
              <div className="flex flex-col gap-0.5 items-center">
                <div className="text-xl font-black text-slate-900 uppercase tracking-tight italic">Executive Endorsement</div>
                <div className="text-slate-500 font-bold tracking-[0.2em] uppercase text-[10px]">City of {config.projectCity}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section6Endorsement;