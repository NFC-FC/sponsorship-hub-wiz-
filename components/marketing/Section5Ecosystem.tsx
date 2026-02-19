
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleAppLink = () => {
    window.open('https://www.nationalfitnesscampaign.com/app', '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative min-h-0 sm:min-h-[70vh] bg-slate-50 text-slate-900 pt-10 pb-10 sm:py-24 overflow-hidden w-full max-w-[100vw]">
      <div className="container mx-auto px-4 sm:px-6 w-full max-w-full min-w-0">
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-16 items-center">

          {/* Custom Phone Mockup with Play Button — left on all sizes, tight to container on mobile */}
          <div className="flex justify-center min-w-0">
            <motion.div
              initial={{ rotate: -2, y: 30, opacity: 0 }}
              whileInView={{ rotate: 0, y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full max-w-[140px] sm:max-w-[320px] group flex items-center justify-center"
            >
              {/* Main Phone Image */}
              <img
                src="https://i.postimg.cc/nhDtyMJM/phone.png"
                alt="NFC App Interface"
                className="w-full h-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.2)] relative z-10"
              />

              {/* Interactive Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-30">
                <motion.div
                  className="cursor-pointer"
                  onClick={() => setShowVideoModal(true)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative group/play flex flex-col items-center">
                    <div
                      className="absolute inset-0 rounded-full animate-ping opacity-40 group-hover/play:opacity-60 transition-opacity"
                      style={{ backgroundColor: config.primaryColor }}
                    />
                    <div
                      className="relative w-8 h-8 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 border-2 sm:border-4 border-white/20 backdrop-blur-sm"
                      style={{ backgroundColor: config.primaryColor }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white ml-0.5 sm:ml-1.5"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] blur-[120px] rounded-full pointer-events-none opacity-[0.15] z-0"
                style={{ backgroundColor: config.primaryColor }}
              />
            </motion.div>
          </div>

          {/* Text Content — right on all sizes */}
          <div className="space-y-3 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <span className="font-bold tracking-[0.3em] text-[8px] sm:text-[10px] uppercase block mb-1 sm:mb-4" style={{ color: config.primaryColor }}>The Digital Portal</span>
              <h2 className="font-display text-lg sm:text-5xl md:text-6xl font-black leading-none mb-2 sm:mb-6 uppercase tracking-tighter">
                THE DIGITAL<br/>WELLNESS <span style={{ color: config.primaryColor }}>ECOSYSTEM</span>
              </h2>
              <p className="hidden sm:block text-base sm:text-xl text-slate-600 font-light leading-relaxed max-w-lg">
                The Fitness Court App is the ultimate companion to the physical infrastructure, providing world-class coaching to every resident of {config.projectCity}.
              </p>
            </motion.div>

            <ul className="space-y-2 sm:space-y-8">
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
                  className="flex gap-2 sm:gap-6 items-start"
                >
                  <div className="flex-shrink-0 w-6 h-6 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl flex items-center justify-center text-white font-black text-[10px] sm:text-lg shadow-lg" style={{ backgroundColor: item.color }}>
                     {i + 1}
                  </div>
                  <div>
                    <h4 className="text-[10px] sm:text-xl font-black uppercase italic tracking-tight mb-0.5 sm:mb-1 leading-tight">{item.title}</h4>
                    <p className="hidden sm:block text-slate-500 font-medium text-sm leading-relaxed max-w-md">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-2 sm:pt-8 flex flex-wrap gap-2 sm:gap-4"
            >
              <button
                onClick={handleAppLink}
                className="bg-black text-white px-4 sm:px-8 py-2 sm:py-4 rounded-xl sm:rounded-2xl font-black uppercase text-[8px] sm:text-[10px] tracking-widest hover:scale-105 transition-transform shadow-xl"
              >
                Learn More
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Video Modal Popup */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute -top-10 right-0 text-white/80 hover:text-white transition-colors p-2"
                aria-label="Close video"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/O5p7U_ktEnM?si=nCem1eu_9VPaTrCm&autoplay=1&controls=0"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Section5Ecosystem;
