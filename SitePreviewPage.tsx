import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import type { SiteConfig } from './App';

import Section1Splash from './components/marketing/Section1Splash';
import Section2Hero from './components/marketing/Section2Hero';
import { FullWidthVideo } from './components/marketing/FullWidthVideo';
import Section3Reality from './components/marketing/Section3Reality';
import { CivicLeadership } from './components/marketing/CivicLeadership';
import { MasterPlan } from './components/marketing/MasterPlan';
import { Impact } from './components/marketing/Impact';
import Section4Product from './components/marketing/Section4Product';
import Section5Ecosystem from './components/marketing/Section5Ecosystem';
import Section6Endorsement from './components/marketing/Section6Endorsement';
import Section7SponsorshipLevels from './components/marketing/Section7SponsorshipLevels';
import { Section8Timeline } from './components/marketing/Section8Timeline';
import { CampaignVideo } from './components/marketing/CampaignVideo';
import { Footer } from './components/marketing/Footer';

export const SitePreviewPage: React.FC<{ config: SiteConfig }> = ({ config }) => {
  const [isEntered, setIsEntered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isEntered ? 'auto' : 'hidden';
    window.scrollTo(0, 0);
  }, [isEntered, config.id]);

  return (
    <div
      className="relative min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#020617]"
      style={
        {
          ['--brand-primary' as any]: config.primaryColor,
          ['--brand-accent' as any]: config.accentColor,
          ['--brand-secondary' as any]: config.secondaryColor,
        } as any
      }
    >
      <AnimatePresence mode="wait">
        {!isEntered && (
          <Section1Splash
            key={`${config.id}-splash`}
            onEnter={() => setIsEntered(true)}
            config={config}
          />
        )}
      </AnimatePresence>

      <div
        className={`w-full max-w-[100vw] overflow-x-hidden ${
          isEntered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } transition-opacity duration-1000`}
      >
        <Section2Hero config={config} />
        <FullWidthVideo config={config} />
        <Section3Reality config={config} />
        <CivicLeadership config={config} />
        <MasterPlan config={config} />
        <Impact config={config} />
        <Section4Product config={config} />
        <Section5Ecosystem config={config} />
        <Section6Endorsement config={config} />
        <Section7SponsorshipLevels config={config} />
        <CampaignVideo config={config} />
        <Section8Timeline config={config} />
        <Footer config={config} />
      </div>

      {isEntered && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-40 w-full max-w-[100vw] box-border bg-black/80 backdrop-blur-xl min-h-14 sm:min-h-20 md:min-h-24 pt-[env(safe-area-inset-top)] flex items-center justify-between gap-2 px-3 sm:px-6 md:px-12 border-b border-white/10 overflow-hidden"
        >
          <div className="min-w-0 flex-1 flex items-center">
            <span
              onClick={() => navigate('/')}
              className="text-white/40 text-[7px] sm:text-[10px] font-black tracking-[0.15em] sm:tracking-[0.3em] uppercase cursor-pointer hover:text-white transition-colors truncate block"
              title="National Wellness Innovation Zone"
            >
              National Wellness Innovation Zone
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-6 md:gap-10 min-w-0 flex-shrink-0 justify-end">
            <img
              src={config.sponsorLogo}
              className="h-5 w-auto max-h-6 sm:max-h-8 md:max-h-10 object-contain object-right transition-transform hover:scale-105 flex-shrink-0"
              alt={config.sponsorName}
            />
            <div className="w-px h-5 sm:h-8 md:h-10 bg-white/10 hidden sm:block flex-shrink-0" />
            <img
              src={config.cityLogo}
              alt="City Seal"
              className="h-5 w-auto max-h-6 sm:max-h-8 md:max-h-10 object-contain transition-transform hover:scale-105 flex-shrink-0"
            />
            <div className="w-px h-5 sm:h-8 md:h-10 bg-white/10 hidden sm:block flex-shrink-0" />
            <img
              src={config.nfcLogo}
              className="h-5 w-auto max-h-6 sm:max-h-8 md:max-h-10 object-contain transition-transform hover:scale-105 flex-shrink-0"
              alt="NFC"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};
