import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Props {
  config: {
    heroVideo: string;
    sponsorName: string;
    projectCity: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    projectName: string;
  };
}

const Section2Hero: React.FC<Props> = ({ config }) => {
  const { scrollY } = useScroll();
  const yTranslate = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative h-screen min-h-[320px] overflow-hidden bg-[#020617] w-full max-w-[100vw]">
      {/* Background Video Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          preload="metadata"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect fill='%23020617' width='1' height='1'/%3E%3C/svg%3E"
          className="w-full h-full object-cover contrast-[1.1] brightness-100 opacity-80 transition-opacity duration-1000"
        >
          <source src={config.heroVideo} type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] opacity-30" />
      </div>
      
      {/* Overlay Content */}
      <motion.div 
        style={{ y: yTranslate, opacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative px-4 py-12 w-full max-w-none min-w-0"
        >
          <div className="absolute inset-0 bg-black/95 blur-[120px] -z-10 rounded-full scale-110 opacity-90" />
          
          <span className="tracking-[0.7em] font-black text-[10px] md:text-xs uppercase mb-8 block drop-shadow-[0_0_10px_rgba(251,171,24,0.3)]" style={{ color: config.secondaryColor }}>
            The Vision
          </span>
            <h2 className="font-display text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-[5.5vw] text-white font-black leading-[0.95] w-full max-w-full uppercase tracking-tighter drop-shadow-2xl break-words">
              {config.sponsorName.toUpperCase()} DELIVERS <br/>
               <span style={{ color: config.primaryColor }}>
              COMMUNITY WELLNESS CAMPAIGN 
             </span>{" "} <br/>
              ACROSS THE CITY OF {config.projectCity.toUpperCase()}
            </h2>


          <div className="w-32 sm:w-60 h-1.5 mx-auto mt-10 sm:mt-16 shadow-[0_0_45px_rgba(0,85,135,1)] rounded-full" style={{ backgroundColor: config.secondaryColor }} />
        </motion.div>
      </motion.div>

      {/* Aesthetic Accents */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
        <span className="text-[9px] tracking-[0.5em] uppercase font-black text-white/40">Scroll to Discover</span>
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-[2px] h-16 bg-gradient-to-b from-white/20 to-transparent rounded-full"
        />
      </div>
    </section>
  );
};

export default Section2Hero;