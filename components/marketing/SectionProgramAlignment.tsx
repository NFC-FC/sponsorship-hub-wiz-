import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  config: {
    sponsorName: string;
    primaryColor: string;
    secondaryColor: string;
    programAlignmentCards?: string[];
  };
}

const SectionProgramAlignment: React.FC<Props> = ({ config }) => {
  const cards = config.programAlignmentCards ?? [];
  if (cards.length === 0) return null;

  return (
    <section className="relative min-h-0 pt-12 sm:pt-24 pb-8 sm:pb-14 bg-[#020617] w-full max-w-[100vw] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full min-w-0">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-10 uppercase italic tracking-tighter leading-tight break-words text-center"
        >
          <span style={{ color: config.primaryColor }}>{config.sponsorName}</span> PROGRAM ALIGNMENT
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {cards.map((text, i) => {
            const raw = text.trim();
            const colonIndex = raw.indexOf(':');
            const hasKeyPoint = colonIndex > 0;
            const keyPoint = hasKeyPoint ? raw.slice(0, colonIndex).trim() : '';
            const subtext = hasKeyPoint ? raw.slice(colonIndex + 1).trim() : raw;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.06 }}
                className="relative basis-[calc(50%-0.75rem)] max-w-[calc(50%-0.75rem)] sm:basis-auto sm:max-w-[200px] p-3 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm text-left flex flex-col"
              >
                <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full flex-shrink-0 mt-0.5" style={{ backgroundColor: config.primaryColor }} />
                <div className="text-xs sm:text-sm leading-relaxed pl-4 space-y-1">
                  {hasKeyPoint ? (
                    <>
                      <p className="font-bold italic whitespace-pre-line" style={{ color: config.secondaryColor }}>
                        {keyPoint}
                      </p>
                      <p className="text-white/90 whitespace-pre-line">{subtext}</p>
                    </>
                  ) : (
                    <p className="text-white/90 whitespace-pre-line">{subtext}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectionProgramAlignment;
