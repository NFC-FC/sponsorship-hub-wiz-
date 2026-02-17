
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  config: {
    primaryColor: string;
    secondaryColor: string;
    projectCity: string;
    nfcLogo: string;
  };
}

const Section5Ecosystem: React.FC<Props> = ({ config }) => {
  return (
    <section className="relative min-h-screen bg-slate-50 text-slate-900 py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* Smartphone Mockup */}
          <div className="flex justify-center order-2 lg:order-1">
            <motion.div 
              initial={{ rotate: -5, y: 50, opacity: 0 }}
              whileInView={{ rotate: 0, y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-[320px] h-[640px] bg-slate-950 rounded-[3rem] p-4 shadow-[0_50px_100px_rgba(0,0,0,0.3)] border-[8px] border-slate-900"
            >
              <div className="w-full h-full rounded-[2.2rem] overflow-hidden relative flex flex-col" style={{ backgroundColor: config.primaryColor }}>
                <div className="p-6 pt-12">
                   <img src={config.nfcLogo} className="h-10 mb-8 brightness-0 invert" alt="NFC App" />
                   <div className="text-white text-3xl font-black leading-none mb-4 uppercase italic">TRAIN WITH THE BEST.</div>
                   <div className="w-full aspect-video bg-white/10 rounded-xl mb-4 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="font-display text-4xl md:text-6xl font-black leading-none mb-6">
                THE DIGITAL<br/>WELLNESS ECOSYSTEM
              </h2>
              <p className="text-xl text-slate-600 font-light leading-relaxed max-w-lg">
                Connecting {config.projectCity} citizens to free, world-class coaching via the network.
              </p>
            </motion.div>

            <ul className="space-y-8">
              {[
                { title: "Smart City Integration", desc: "Real-time usage data reporting back to city planning dashboards.", color: config.primaryColor },
                { title: "Digital Wellness Data", desc: "Gamified fitness rewards and community-wide challenges.", color: config.secondaryColor },
                { title: "Free On-Demand Coaching", desc: "7-minute workouts designed for all ages and ability levels.", color: config.primaryColor }
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: item.color }}>
                     {i + 1}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                    <p className="text-slate-500 font-light leading-snug">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section5Ecosystem;
