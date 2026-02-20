import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const INFRASTRUCTURE_IMAGE = 'https://i.postimg.cc/gkbg7F6b/screenshot-ref-720.png';

interface Props {
  config: {
    primaryColor: string;
    secondaryColor: string;
  };
}

const Section3Reality: React.FC<Props> = ({ config }) => {
  const containerRef = useRef(null);
  const [imgError, setImgError] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const textX = useTransform(scrollYProgress, [0, 0.5, 1], [-30, 0, 30]);

  return (
    <section ref={containerRef} className="relative min-h-[100vh] flex items-center justify-center py-12 sm:py-24 bg-[#020617] w-full max-w-[100vw] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center">
          
          <div className="relative w-full min-h-[200px] rounded-3xl overflow-hidden group shadow-[0_0_50px_rgba(0,114,206,0.15)] border border-white/5 bg-slate-900">
            <motion.div 
              style={{ y: imgY }} 
              className="relative w-full overflow-hidden bg-slate-800/50"
            >
              {!imgError ? (
                <img 
                  src={INFRASTRUCTURE_IMAGE} 
                  alt="Healthy infrastructure — outdoor fitness and community wellness"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto block brightness-95 contrast-[1.05]"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full min-h-[200px] flex items-center justify-center text-white/50 text-center px-4">
                  <span className="text-sm font-medium">Healthy infrastructure</span>
                </div>
              )}
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
            <h3 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-6xl text-white font-black leading-tight break-words">
              BUILDING HEALTHY CITIES OF THE FUTURE.
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-white/60 font-light leading-relaxed max-w-lg min-w-0">
              Building Healthier Communities by redesigning the built environment for every-day outdoor movement, health and happiness.
            </p>
            
            <div className="mt-2 space-y-2">
              <p className="text-white/40 text-base md:text-lg font-medium italic leading-relaxed">
          
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Section3Reality;