
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  config: {
    primaryColor: string;
    secondaryColor: string;
    sponsorName: string;
  };
}

const Section7SponsorshipLevels: React.FC<Props> = ({ config }) => {
  const [selectedLevel, setSelectedLevel] = useState<'title' | 'presenting' | null>(null);

  const levels = [
    {
      id: 'title',
      title: 'Title Sponsor',
      subtitle: 'Primary Infrastructure Partner',
      description: 'The highest tier of community alignment, providing permanent name-in-title visibility across the entire city-wide network.',
      detailsImage: 'https://raw.githubusercontent.com/NFC-FC/NFC-image-hosting/main/TITLE%20SPONSOR.png',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white w-8 h-8 sm:w-16 sm:h-16">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
        </svg>
      ),
      color: '#FBAB18' 
    },
    {
      id: 'presenting',
      title: 'Presenting Sponsor',
      subtitle: 'Program Tier Partner',
      description: 'Strategic alignment with specific neighborhood hubs and program-based activation opportunities city-wide.',
      detailsImage: 'https://github.com/olivialem/NFC-FC/blob/main/Presenting%20Sponsor%20Funding%20Card.png?raw=true',
      icon: (
        <img 
          src="https://raw.githubusercontent.com/NFC-FC/NFC-image-hosting/79f217a46638bf99776ee5f17fb2151b8cb5cf39/Medal.png" 
          alt="Presenting Icon" 
          className="w-10 h-10 sm:w-24 sm:h-24 object-contain brightness-0 invert"
        />
      ),
      color: '#009cdc'
    }
  ];

  return (
    <section className="relative bg-slate-50 py-12 sm:py-32 overflow-hidden border-t border-slate-200 w-full max-w-[100vw]">
      <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full min-w-0">
        <div className="text-center mb-6 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-bold tracking-[0.4em] text-[10px] uppercase block mb-4" style={{ color: config.primaryColor }}>Investment Roadmap</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-slate-900 font-black uppercase mb-6 leading-tight tracking-tighter break-words">
              Sponsorship Levels <br/>
              <span style={{ color: config.primaryColor }}>for Consideration</span>
            </h2>
            <div className="w-24 h-1 mx-auto mt-8 rounded-full" style={{ backgroundColor: config.secondaryColor }} />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-10 max-w-6xl mx-auto">
          {levels.map((level, idx) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              onClick={() => setSelectedLevel(level.id as any)}
              className="group cursor-pointer bg-white rounded-2xl sm:rounded-[3.5rem] overflow-hidden shadow-xl border border-slate-100 flex flex-col hover:-translate-y-2 transition-transform duration-500"
            >
              <div 
                className="aspect-[16/10] flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: level.color }}
              >
                <div className="absolute right-0 bottom-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative z-10 hidden sm:block"
                >
                  {level.icon}
                </motion.div>
                
                <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8">
                  <span className="text-white/60 font-black uppercase tracking-[0.3em] text-[9px] sm:text-[10px] block mb-1 sm:mb-2">{level.subtitle}</span>
                  <h3 className="text-white text-lg sm:text-3xl font-black uppercase italic tracking-tighter leading-none">{level.title}</h3>
                </div>
              </div>
              <div className="p-4 sm:p-10 flex flex-col flex-1">
                <p className="text-slate-500 font-medium leading-relaxed mb-2 sm:mb-4 flex-1 text-[9px] sm:text-sm">
                  {level.description}
                </p>
                <div
                  className="flex items-center gap-1 sm:gap-2 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em]"
                  style={{ color: level.color }}
                >
                  View Details <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for detail slides */}
      <AnimatePresence>
        {selectedLevel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center p-4 md:p-12 bg-slate-950/95 backdrop-blur-xl overflow-y-auto"
            onClick={() => setSelectedLevel(null)}
          >
            {(() => {
              const selected = levels.find(l => l.id === selectedLevel);
              if (!selected) return null;

              const isPdf = selected.detailsImage.toLowerCase().endsWith('.pdf');

              return (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 20 }}
                  className="relative max-w-5xl w-full bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl my-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    onClick={() => setSelectedLevel(null)}
                    className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-slate-900/10 hover:bg-slate-900/20 text-slate-900 flex items-center justify-center transition-colors backdrop-blur-md"
                  >
                    ✕
                  </button>
                  
                  {/* Flexible Container: supports both image and PDF content */}
                  <div className="w-full bg-white flex items-center justify-center p-4 md:p-8">
                    {isPdf ? (
                      <iframe
                        src={selected.detailsImage}
                        className="w-full max-h-[85vh] h-[85vh] rounded-lg shadow-md"
                        title={`${selected.title} Details`}
                      />
                    ) : (
                      <img 
                        src={selected.detailsImage}
                        className="w-full max-h-[85vh] h-auto object-contain shadow-md rounded-lg"
                        style={{ imageRendering: 'auto' }}
                        alt="Sponsorship Detail Slide" 
                      />
                    )}
                  </div>

                  {/* Enhanced Footer to match Screenshot Aesthetic */}
                  <div className="p-6 sm:p-10 md:p-14 border-t border-slate-50 flex flex-col items-start justify-between bg-white text-left">
                    <div className="mb-4">
                      <h4 className="text-[#020617] font-black text-2xl md:text-3xl uppercase tracking-tighter italic leading-none mb-3">
                        {selected.title} Details
                      </h4>
                      <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[9px] md:text-[10px]">2026 NFC Wellness Innovation Zone</p>
                    </div>
                    
                    <div className="w-full flex justify-end">
                       <button 
                        onClick={() => setSelectedLevel(null)}
                        className="px-10 py-4 bg-[#020617] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-xl"
                       >
                         Exit Viewer
                       </button>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Section7SponsorshipLevels;
