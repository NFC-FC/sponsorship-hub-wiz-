
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
    <section className="relative min-h-[80vh] bg-white flex items-center justify-center py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative w-72 h-72 md:w-96 md:h-96 flex-shrink-0"
          >
            <div className="absolute inset-4 border-2 border-slate-100 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-0 bg-slate-100 rounded-full overflow-hidden shadow-2xl border-8 border-white">
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
            <div className="absolute -bottom-6 -right-6 p-6 rounded-[2rem] text-white shadow-2xl ring-8 ring-white flex items-center gap-4" style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})` }}>
               <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-xs font-black">Official</span>
               </div>
               <div>
                 <div className="text-[9px] font-black uppercase tracking-widest opacity-80 mb-0.5">Verified Endorsement</div>
                 <div 
                   className={`font-display font-black text-sm md:text-base whitespace-nowrap ${isEditMode ? 'cursor-pointer hover:underline' : ''}`}
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

          <div className="flex-grow max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h3 
                className={`text-3xl md:text-5xl font-light italic leading-snug text-slate-800 mb-8 ${isEditMode ? 'cursor-pointer hover:bg-slate-50' : ''}`}
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
              <div className="flex flex-col gap-1">
                <div className="text-xl font-black text-slate-900 uppercase tracking-tight">Executive Endorsement</div>
                <div className="text-slate-500 font-light tracking-wide uppercase text-sm">City of {config.projectCity}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section6Endorsement;
