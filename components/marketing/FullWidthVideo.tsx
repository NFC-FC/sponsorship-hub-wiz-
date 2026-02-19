import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SiteConfig } from '../../App.tsx';

interface Props {
  config: SiteConfig;
}

export const FullWidthVideo: React.FC<Props> = ({ config }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const src = config.sponsorRender;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setVideoSrc((prev) => prev ?? src);
      },
      { rootMargin: '300px', threshold: 0.01 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [config.sponsorRender]);

  return (
    <section ref={sectionRef} className="bg-[#020617] border-b border-white/5 relative overflow-hidden w-full max-w-[100vw]">
      {/* Abstract background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#009cdc]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[100vw] h-auto relative group bg-black overflow-hidden min-w-0"
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
        
        {videoSrc ? (
        <video
          key={config.sponsorRender}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect fill='%23020617' width='1' height='1'/%3E%3C/svg%3E"
          className="w-full h-auto scale-100 group-hover:scale-105 transition-transform duration-[4s] ease-out block"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        ) : (
          <div className="w-full aspect-video bg-[#020617] flex items-center justify-center min-h-[200px]" aria-hidden>
            <img src="https://github.com/NFC-FC/NFC-image-hosting/blob/main/01-Main-Shield.png?raw=true" alt="" className="h-16 md:h-24 opacity-30 animate-pulse" loading="eager" />
          </div>
        )}

        {/* Cinematic Overlays - tighter on mobile so text doesn't cover video */}
        <div className="absolute top-2 left-4 z-20 flex items-center gap-3 sm:top-4 sm:left-6 md:top-12 md:left-12">
          <div className="w-2 h-2 rounded-full bg-[#009cdc] animate-pulse shadow-[0_0_10px_#009cdc]" />
          <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.4em] drop-shadow-md">{config.sponsorName} Fitness Court </span>
        </div>

        <div className="absolute bottom-8 right-8 z-20 md:bottom-12 md:right-12">
          <img 
            src="https://github.com/NFC-FC/NFC-image-hosting/blob/main/01-Main-Shield.png?raw=true" 
            alt="NFC Shield" 
            loading="lazy"
            decoding="async"
            className="h-12 md:h-16 opacity-40 grayscale brightness-200 drop-shadow-lg"
          />
        </div>

        {/* Scanline / Texture overlay for extra cinematic feel */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </motion.div>
    </section>
  );
};