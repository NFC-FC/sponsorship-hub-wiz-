
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  config: {
    primaryColor: string;
    secondaryColor: string;
    projectCity: string;
    nfcLogo: string;
    sponsorName: string;
  };
}

const Section5Ecosystem: React.FC<Props> = ({ config }) => {
  const handlePlayClick = () => {
    window.open('https://www.youtube.com/watch?v=O5p7U_ktEnM', '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative min-h-[70vh] bg-slate-50 text-slate-900 py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Custom Phone Mockup with Play Button */}
          <div className="flex justify-center order-2 lg:order-1">
            <motion.div 
              initial={{ rotate: -2, y: 30, opacity: 0 }}
              whileInView={{ rotate: 0, y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full max-w-[320px] group flex items-center justify-center"
            >
              {/* Main Phone Image */}
              <img 
                src="https://i.postimg.cc/nhDtyMJM/phone.png" 
                alt="NFC App Interface" 
                className="w-full h-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.2)] relative z-10"
              />
              
              {/* Interactive Play Button Overlay - Centered using Flexbox to avoid drift during scale */}
              <div className="absolute inset-0 flex items-center justify-center z-30">
                <motion.div 
                  className="cursor-pointer"
                  onClick={handlePlayClick}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative group/play flex flex-col items-center">
                    {/* Outer Ripple */}
                    <div 
                      className="absolute inset-0 rounded-full animate-ping opacity-40 group-hover/play:opacity-60 transition-opacity"
                      style={{ backgroundColor: config.primaryColor }}
                    />
                    {/* Button Body */}
                    <div 
                      className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 border-4 border-white/20 backdrop-blur-sm"
                      style={{ backgroundColor: config.primaryColor }}
                    >
                      <svg 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="w-8 h-8 md:w-10 md:h-10 text-white ml-1.5"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    
                    {/* Label Text - Positioned below the button */}
                    <div className="absolute top-[calc(100%+1rem)] whitespace-nowrap">
                      <span className="bg-black/80 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] backdrop-blur-md border border-white/10 opacity-0 group-hover/play:opacity-100 transition-opacity duration-300 pointer-events-none">
                        Watch Video
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Background Glow behind the phone */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] blur-[120px] rounded-full pointer-events-none opacity-[0.15] z-0" 
                style={{ backgroundColor: config.primaryColor }} 
              />
            </motion.div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <span className="font-bold tracking-[0.4em] text-[10px] uppercase block mb-4" style={{ color: config.primaryColor }}>The Digital Portal</span>
              <h2 className="font-display text-5xl md:text-6xl font-black leading-none mb-6 uppercase tracking-tighter">
                THE DIGITAL<br/>WELLNESS <span style={{ color: config.primaryColor }}>ECOSYSTEM</span>
              </h2>
              <p className="text-xl text-slate-600 font-light leading-relaxed max-w-lg">
                The Fitness Court App is the ultimate companion to the physical infrastructure, providing world-class coaching to every resident of {config.projectCity}.
              </p>
            </motion.div>

            <ul className="space-y-8">
              {[
                { 
                  title: "Digital Training Library", 
                  desc: "Access hundreds of expert-led bodyweight routines for all ages and abilities.", 
                  color: config.primaryColor 
                },
                { 
                  title: "Challenges & Rewards", 
                  desc: "Join community-wide challenges and track your progress on city leaderboards.", 
                  color: config.secondaryColor 
                },
                { 
                  title: `${config.sponsorName} Fitness Court Locator`, 
                  desc: `GPS-enabled mapping to every ${config.sponsorName} Fitness Court site across the city.`, 
                  color: config.primaryColor 
                }
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg" style={{ backgroundColor: item.color }}>
                     {i + 1}
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase italic tracking-tight mb-1">{item.title}</h4>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-md">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-8 flex flex-wrap gap-4"
            >
              <button 
                onClick={handlePlayClick}
                className="bg-black text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform shadow-xl"
              >
                Learn More Here!
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section5Ecosystem;
