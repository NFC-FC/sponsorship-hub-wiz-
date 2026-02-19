import React from 'react';
import { motion } from 'framer-motion';

const RAW_BASE = 'https://raw.githubusercontent.com/olivialem/NFC-FC/14e7a2672244bc10d12f6bda6dfc3a6c647361c4';

/** Sponsor logos in order: Row A (A1–A7), Row B (B1–B7), Row C (C1–C6). */
const DEFAULT_LOGO_URLS: string[] = [
  `${RAW_BASE}/SL-A1-PH.jpeg`,
  `${RAW_BASE}/SL-A2-BCBSIL.jpg`,
  `${RAW_BASE}/SL-A3-MVP.png`,
  `${RAW_BASE}/SL-A4-BCBSTX.jpg`,
  `${RAW_BASE}/SL-A5-BCBSMA.jpeg`,
  `${RAW_BASE}/SL-A6-UCH.png`,
  `${RAW_BASE}/SL-A7-BCBSAL.png`,
  `${RAW_BASE}/SL-B1-RENOWN.png`,
  `${RAW_BASE}/SL-B2-BCBSMN.png`,
  `${RAW_BASE}/SL-B3-BCBSKS.png`,
  `${RAW_BASE}/SL-B4-HMSA.png`,
  `${RAW_BASE}/SL-B5-BCBSMT.jpg`,
  `${RAW_BASE}/SL-B6-AETNA.png`,
  `${RAW_BASE}/SL-B7-BCBSOK.jpg`,
  `${RAW_BASE}/SL-C1-ACH.jpg`,
  `${RAW_BASE}/SL-C2-HORIZON.png`,
  `${RAW_BASE}/SL-C3-BCBSNM.jpg`,
  `${RAW_BASE}/SL-C4-UCH2.png`,
  `${RAW_BASE}/SL-C5-IBX.png`,
  `${RAW_BASE}/SL-C6-TGH.jpg`,
];

const LOGO_COUNT = DEFAULT_LOGO_URLS.length;

interface Props {
  config: {
    nfcLogo: string;
    primaryColor: string;
  };
  /** Optional logo URLs; when provided, replaces defaults. Same order: A1–A7, B1–B7, C1–C6. */
  logoUrls?: (string | null)[];
}

export const Section9SponsorLogos: React.FC<Props> = ({ config, logoUrls }) => {
  const urls = logoUrls ?? DEFAULT_LOGO_URLS;
  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden flex flex-col items-center w-full max-w-[100vw]">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Campaign logo */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-4 sm:mb-6"
        >
          <img
            src={config.nfcLogo}
            alt="National Fitness Campaign"
            className="h-16 sm:h-20 md:h-24 w-auto object-contain"
          />
        </motion.div>

        {/* Subtitle — white; "Join America's Largest Public-Private Wellness Partnership" */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-bold text-white text-base sm:text-lg md:text-xl mb-8 sm:mb-12"
        >
          Join America's Largest Public-Private Wellness Partnership
        </motion.p>

        {/* Logo grid: Row A (7), Row B (7), Row C (6) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-7 gap-2 sm:gap-6 md:gap-8 w-full"
        >
          {Array.from({ length: LOGO_COUNT }, (_, i) => {
            const url = urls[i];
            return (
              <div
                key={i}
                className="aspect-[2/1] sm:aspect-[16/10] flex items-center justify-center bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden"
              >
                {url ? (
                  <img
                    src={url}
                    alt=""
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <span className="text-slate-400 text-[10px] sm:text-xs font-medium uppercase tracking-wider">
                    Logo
                  </span>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
