
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Hotspot {
  id: string;
  title: string;
  description: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  color: string;
  number: number;
}

interface Props {
  config: {
    primaryColor: string;
    secondaryColor: string;
    sponsorName: string;
    sponsorRender: string;
  };
}

const Section4Product: React.FC<Props> = ({ config }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const hotspots: Hotspot[] = [
    {
      id: 'structure',
      number: 1,
      title: 'Marketing Visibility',
      description: `Earn long-term brand exposure through major media coverage and daily visibility in the city’s most beloved parks and wellness spaces. ${config.sponsorName} becomes part of the community experience — not just an ad.`,
      position: { top: '8%', right: '4%' },
      color: config.primaryColor
    },
    {
      id: 'artwork',
      number: 2,
      title: 'Corporate Social Responsibility',
      description: 'Make a lasting investment in public health by bringing free outdoor wellness infrastructure to the community in your name. This is visible, meaningful impact that builds trust and strengthens your legacy citywide.',
      position: { top: '22%', right: '4%' },
      color: config.secondaryColor
    },
    {
      id: 'surface',
      number: 3,
      title: 'Employee Wellness Benefits',
      description: 'Give employees citywide access to world-class, free fitness—right where they live. A powerful wellness benefit that supports healthier lifestyles beyond the workplace.',
      position: { top: '36%', right: '4%' },
      color: config.primaryColor
    }
  ];

  const activeHotspot = hotspots.find(h => h.id === activeId);

  return (
    <section className="relative min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden py-32">
      <div className="absolute inset-0 pointer-events-none opacity-[0.12]">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] blur-[200px] rounded-full translate-x-1/3 -translate-y-1/3" style={{ backgroundColor: config.secondaryColor }} />
        <div className="absolute bottom-0 left-0 w-[60%] h-[60%] blur-[200px] rounded-full -translate-x-1/3 translate-y-1/3" style={{ backgroundColor: config.primaryColor }} />
      </div>

      <div className="container mx-auto px-6 text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-bold tracking-[0.4em] text-[10px] uppercase block mb-4" style={{ color: config.primaryColor }}>Title Sponsorship Tier</span>
          <h2 className="font-display text-5xl md:text-7xl text-slate-900 font-black uppercase mb-6 leading-none">
            Program Value Delivery:<br/>
            <span style={{ color: config.secondaryColor }}>{config.sponsorName} Fitness Court</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative w-full max-w-7xl px-4 lg:px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative group"
        >
          <div className="relative bg-[#f8fafc] rounded-[3rem] overflow-hidden shadow-[0_80px_180px_-40px_rgba(0,0,0,0.18)] border border-slate-200/60">
            <div className="relative flex items-center justify-center overflow-hidden bg-slate-50 w-full">
               <img 
                 src={config.sponsorRender} 
                 alt="Fitness Court 3D Render"
                 className="w-full h-auto relative z-10 block"
                 onError={(e) => { e.currentTarget.src = "https://github.com/NFC-FC/NFC-image-hosting/blob/main/FC%20Side%20View-1.png?raw=true"; }}
               />
               <div className="absolute inset-0 mix-blend-multiply pointer-events-none z-20" style={{ background: `linear-gradient(tr, ${config.primaryColor}1A, transparent)` }} />
            </div>

            <div className="absolute inset-0 z-30 pointer-events-none">
               {hotspots.map((hotspot) => (
                 <motion.div 
                   key={hotspot.id}
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   transition={{ delay: 1 }}
                   style={hotspot.position}
                   className="absolute pointer-events-auto cursor-pointer"
                   onClick={() => setActiveId(activeId === hotspot.id ? null : hotspot.id)}
                 >
                    <div className="relative flex items-center justify-end gap-3 group/hotspot">
                      <div 
                        className={`whitespace-nowrap glass bg-white/95 px-4 py-2 rounded-full text-[10px] font-black text-slate-800 border-white shadow-lg transition-all duration-500 transform ${activeId === hotspot.id ? 'scale-105 ring-2 ring-slate-100' : 'opacity-80 scale-100 group-hover/hotspot:opacity-100'}`} 
                        style={{ borderLeft: `4px solid ${hotspot.color}` }}
                      >
                        {hotspot.title}
                      </div>

                      <div className="flex items-center justify-center relative flex-shrink-0">
                        <div className="w-12 h-12 rounded-full animate-ping absolute opacity-30" style={{ backgroundColor: hotspot.color }} />
                        <div className={`w-9 h-9 rounded-full shadow-2xl transition-transform duration-500 group-hover/hotspot:scale-110 flex items-center justify-center z-10 ${activeId === hotspot.id ? 'scale-110 ring-4 ring-white shadow-xl' : ''}`} style={{ backgroundColor: hotspot.color }}>
                          <span className="text-[14px] font-black text-white leading-none">{hotspot.number}</span>
                        </div>
                      </div>
                    </div>
                 </motion.div>
               ))}
            </div>

            <AnimatePresence>
              {activeId && activeHotspot && (
                <motion.div 
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.95 }}
                  className="absolute bottom-8 right-8 z-50 w-80 glass bg-white/98 p-8 rounded-[2.5rem] border-slate-100 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] pointer-events-auto"
                >
                  <button 
                    onClick={() => setActiveId(null)}
                    className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors"
                  >
                    ✕
                  </button>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-lg" style={{ backgroundColor: activeHotspot.color }}>
                      {activeHotspot.number}
                    </div>
                    <div className="h-1 flex-grow rounded-full bg-slate-100 overflow-hidden">
                      <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        className="h-full w-full rounded-full"
                        style={{ backgroundColor: activeHotspot.color }}
                      />
                    </div>
                  </div>
                  <h4 className="text-slate-900 font-black text-sm uppercase tracking-widest mb-3 leading-tight">{activeHotspot.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">
                    {activeHotspot.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Section4Product;
