
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Hotspot {
  id: string;
  title: string;
  description: string;
  color: string;
  number: number;
}

interface ValuePillar {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
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
      id: 'v1',
      number: 1,
      title: 'Marketing Visibility',
      description: `Earn long-term brand exposure through major media coverage and daily visibility in the city’s most beloved parks. ${config.sponsorName} becomes part of the community experience.`,
      color: config.primaryColor
    },
    {
      id: 'v2',
      number: 2,
      title: 'Corporate Social Responsibility',
      description: 'Make a lasting investment in public health by bringing free outdoor wellness infrastructure to the community. This builds deep trust and civic legacy.',
      color: config.secondaryColor
    },
    {
      id: 'v3',
      number: 3,
      title: 'Employee Wellness Benefits',
      description: 'Give employees citywide access to world-class, free fitness—right where they live. A powerful wellness benefit that supports healthier lifestyles.',
      color: config.primaryColor
    },
    {
      id: 'v4',
      number: 4,
      title: 'CSR',
      description: 'Executive and Leadership Platform. Strengthen and build relationships with municipal and school leaders through high-impact civic partnership.',
      color: config.secondaryColor
    },
    {
      id: 'v5',
      number: 5,
      title: 'Storytelling',
      description: 'Human-centric narratives and regional storytelling opportunities via local launch celebrations and ongoing community success stories.',
      color: config.primaryColor
    },
    {
      id: 'v6',
      number: 6,
      title: 'Human Impact',
      description: 'Directly improve the lives of residents by reducing barriers to healthy lifestyles. Access and wellness impact delivered to every neighborhood.',
      color: config.secondaryColor
    }
  ];

  const valuePillars: ValuePillar[] = [
    {
      id: 1,
      title: "CSR",
      subtitle: "Corporate Social Responsibility",
      description: "Executive and Leadership Platform",
      image: "https://github.com/olivialem/NFC-FC/blob/1b73327b6cac01e2b63e5fb7f1a0c485045dc684/VD-01%202.jpeg?raw=true"
    },
    {
      id: 2,
      title: "RELATIONSHIPS",
      subtitle: "Strengthen and Build",
      description: "Build statewide relationships with municipal and school leaders",
      image: "https://github.com/olivialem/NFC-FC/blob/7d9b8c4f2452978283cb6702da66b84a6d10de81/VD-02.jpg?raw=true"
    },
    {
      id: 3,
      title: "STORYTELLING",
      subtitle: "Human Impact",
      description: "National, local and regional storytelling opportunities via local launch celebrations",
      image: "https://github.com/olivialem/NFC-FC/blob/7d9b8c4f2452978283cb6702da66b84a6d10de81/VD-03.png?raw=true"
    },
    {
      id: 4,
      title: "VISIBILITY",
      subtitle: "Long-lasting presence",
      description: "Receive long lasting visibility in cherished public spaces via local sponsor art murals",
      image: "https://github.com/olivialem/NFC-FC/blob/7d9b8c4f2452978283cb6702da66b84a6d10de81/VD-04.jpg?raw=true"
    },
    {
      id: 5,
      title: "HUMAN IMPACT",
      subtitle: "Healthy Infrastructure",
      description: "Access and wellness impact delivered to employees and community members city-wide",
      image: "https://github.com/olivialem/NFC-FC/blob/7d9b8c4f2452978283cb6702da66b84a6d10de81/VD-05.jpg?raw=true"
    },
    {
      id: 6,
      title: "LEVERAGE FUNDING",
      subtitle: "Public-Private Multiplier",
      description: "Millions of dollars in local and state funding delivered in the name of leading local sponsors",
      image: "https://github.com/olivialem/NFC-FC/blob/7d9b8c4f2452978283cb6702da66b84a6d10de81/VD-06.jpg?raw=true"
    }
  ];

  const activeHotspot = hotspots.find(h => h.id === activeId);

  return (
    <section className="relative bg-white flex flex-col items-center justify-center overflow-hidden py-12 sm:py-24 md:py-32 w-full max-w-[100vw]">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.12]">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] blur-[200px] rounded-full translate-x-1/3 -translate-y-1/3" style={{ backgroundColor: config.secondaryColor }} />
        <div className="absolute bottom-0 left-0 w-[60%] h-[60%] blur-[200px] rounded-full -translate-x-1/3 translate-y-1/3" style={{ backgroundColor: config.primaryColor }} />
      </div>

      {/* Top Header */}
      <div className="container mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-16 relative z-10 w-full min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-bold tracking-[0.4em] text-[10px] uppercase block mb-4" style={{ color: config.primaryColor }}>Title Sponsorship Tier</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-slate-900 font-black uppercase mb-6 leading-tight break-words">
            Program Value Delivery:<br/>
            <span style={{ color: config.secondaryColor }}>{config.sponsorName} Fitness Court</span>
          </h2>
        </motion.div>
      </div>

      {/* INTERACTIVE RENDER BOX */}
      <div className="relative w-full max-w-7xl px-4 sm:px-6 mb-16 sm:mb-32 min-w-0">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative group"
        >
          <div className="relative bg-[#f8fafc] rounded-[3rem] overflow-hidden shadow-[0_80px_180px_-40px_rgba(0,0,0,0.18)] border border-slate-200/60">
            <div className="relative flex items-center justify-center overflow-hidden bg-slate-50 w-full min-h-[250px] sm:min-h-[500px]">
               <img
                 src= "https://github.com/NFC-FC/NFC-image-hosting/blob/main/FC%20Side%20View-1.png?raw=true"
                 alt="Fitness Court 3D Render"
                 decoding="async"
                 className="w-full h-auto relative z-10 block"
                 onError={(e) => { e.currentTarget.src = "https://github.com/NFC-FC/NFC-image-hosting/blob/main/FC%20Side%20View-1.png?raw=true"; }}
               />
               <div className="absolute inset-0 mix-blend-multiply pointer-events-none z-20" style={{ background: `linear-gradient(tr, ${config.primaryColor}1A, transparent)` }} />
            </div>

            {/* Description Pop-up (Top Right) */}
            <div className="absolute inset-0 z-40 pointer-events-none">
              <AnimatePresence mode="wait">
                {activeId && activeHotspot && (
                  <motion.div 
                    key={activeId}
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="absolute top-3 right-3 sm:top-8 sm:right-8 w-44 sm:w-80 glass bg-white/98 p-3 sm:p-8 rounded-xl sm:rounded-[2.5rem] border-slate-100 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] pointer-events-auto"
                  >
                    <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-6">
                      <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-black text-xs sm:text-sm shadow-lg flex-shrink-0" style={{ backgroundColor: activeHotspot.color }}>
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
                    <h4 className="text-slate-900 font-black text-[9px] sm:text-sm uppercase tracking-widest mb-1 sm:mb-3 leading-tight">{activeHotspot.title}</h4>
                    <p className="text-slate-500 text-[8px] sm:text-sm leading-relaxed font-light">
                      {activeHotspot.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Selector Buttons Row (Bottom Center) */}
            <div className="absolute bottom-10 left-0 w-full flex justify-center z-50 px-6">
               <div className="glass bg-white/60 backdrop-blur-2xl p-1.5 sm:p-3 rounded-full flex gap-1 sm:gap-3 shadow-2xl border-white/50">
                  {hotspots.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => setActiveId(h.id)}
                      className={`w-4 h-4 sm:w-12 sm:h-12 rounded-full font-black text-[7px] sm:text-sm transition-all duration-500 border sm:border-2 ${
                        activeId === h.id 
                        ? 'text-white scale-110 shadow-lg border-white' 
                        : 'bg-white text-slate-400 border-transparent hover:border-slate-200'
                      }`}
                      style={activeId === h.id ? { backgroundColor: h.color } : {}}
                    >
                      {h.number}
                    </button>
                  ))}
               </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* SIX-AREA VALUE FRAMEWORK SECTION - UNCHANGED */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full min-w-0">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-slate-900 font-black uppercase tracking-tight leading-none mb-4">
            SPONSORSHIP <span style={{ color: config.primaryColor }}>VALUE DELIVERY</span>
          </h2>
          <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-xs md:text-sm italic">
            DELIVERING ROI AND IMPACT FOR LEADING CORPORATE PARTNERS
          </p>
        </motion.div>

        {/* 6-Column Value Cards Grid */}
        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-6 gap-2 sm:gap-4">
          {valuePillars.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-100 group hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="p-3 sm:p-6 flex-1 flex flex-col" style={{ background: `linear-gradient(to bottom, ${config.primaryColor}15, transparent)` }}>
                <div className="text-sm sm:text-4xl md:text-6xl font-black italic mb-1 sm:mb-6 leading-none opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: config.primaryColor }}>{pillar.id}</div>
                <h4 className="text-[10px] sm:text-lg font-black text-slate-900 uppercase italic tracking-tighter mb-1 sm:mb-4 leading-none">
                  {pillar.title}
                </h4>
                <p className="text-[7px] sm:text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-widest leading-relaxed flex-1">
                  {pillar.description}
                </p>
              </div>

              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img 
                  src={pillar.image} 
                  alt={pillar.title} 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  style={pillar.id === 1 ? { objectPosition: 'right' } : undefined}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-[8px] font-black text-white/60 uppercase tracking-widest mb-1">{pillar.subtitle}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section4Product;
