
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Props {
  config: {
    primaryColor: string;
    secondaryColor: string;
  };
}

const Section3Reality: React.FC<Props> = ({ config }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const textX = useTransform(scrollYProgress, [0, 0.5, 1], [-30, 0, 30]);

  return (
    <section ref={containerRef} className="relative min-h-[100vh] flex items-center justify-center py-24 bg-[#020617]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          <div className="relative w-full rounded-3xl overflow-hidden group shadow-[0_0_50px_rgba(0,114,206,0.15)] border border-white/5 bg-slate-900">
            <motion.div 
              style={{ y: imgY }} 
              className="relative w-full overflow-hidden"
            >
              {/* Infrastructure image/animation updated per user request */}
              <img 
                src="https://i.postimg.cc/gkbg7F6b/screenshot-ref-720.png" 
                alt="Infrastructure Animation"
                className="w-full h-auto brightness-95 contrast-[1.05] block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/40 via-transparent to-transparent pointer-events-none" />
            </motion.div>
            
            <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none z-20" />
            
            <div className="absolute top-4 left-4 flex gap-2 z-20">
              <div className="w-2 h-2 rounded-full shadow-[0_0_100px_#FBAB18]" style={{ backgroundColor: config.secondaryColor }} />
              <div className="w-2 h-2 rounded-full shadow-[0_0_100px_#0072CE]" style={{ backgroundColor: config.primaryColor }} />
            </div>
          </div>

          <motion.div 
            style={{ x: textX }}
            className="flex flex-col gap-6"
          >
            <span className="font-bold tracking-[0.3em] text-xs uppercase" style={{ color: config.primaryColor }}>Community Impact</span>
            <h3 className="font-display text-5xl md:text-7xl text-white font-black leading-none">
              MAKING WORLD CLASS FITNESS FREE FOR HUNDREDS OF THOUSANDS OF PEOPLE.
            </h3>
            <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-lg">
              Building Healthier Communities by Redesigning the Built Environment for Every-Day Outdoor Movement, Health and Happiness.
            </p>
            
            <div className="flex items-center gap-6 mt-6">
              <div className="p-4 rounded-2xl glass flex items-center gap-4 border-white/10">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg ring-2 ring-white/10" style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})` }}>NFC</div>
                <div>
                  <div className="text-white font-bold tracking-tight">Public Priority</div>
                  <div className="text-xs text-white/50 tracking-wider">Health Equity Redefined</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Section3Reality;
