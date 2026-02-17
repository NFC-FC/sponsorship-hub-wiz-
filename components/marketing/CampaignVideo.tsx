
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  config: {
    primaryColor: string;
  };
}

export const CampaignVideo: React.FC<Props> = ({ config }) => {
  return (
    <section className="bg-[#020617] py-24 px-6 border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 block" style={{ color: config.primaryColor }}>The Movement</span>
          <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter">
            WATCH THE <span style={{ color: config.primaryColor }}>CAMPAIGN VIDEO.</span>
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative aspect-video w-full rounded-[2rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/10 bg-black"
        >
          <iframe 
            id="js_video_iframe"
            className="absolute inset-0 w-full h-full"
            src="https://jumpshare.com/embed/tZtAdGc0oJiQyCRHnYTp" 
            title="Campaign Video" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </motion.div>
      </div>
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#009cdc]/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};
