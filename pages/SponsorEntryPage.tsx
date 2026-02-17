
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SiteConfig } from '../App';

interface Props {
  projects: SiteConfig[];
}

const SponsorEntryPage: React.FC<Props> = ({ projects }) => {
  const [accessKey, setAccessKey] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const query = accessKey.trim();
      if (!query) return;

      // Special handling for Master Admin Access Key
      if (query === 'nfc-admin-2026') {
        navigate('/admin');
        return;
      }

      /**
       * Secure Match:
       * Check against individual sponsor passwords configured in the Admin Panel.
       */
      const match = projects.find(p => p.sponsorPassword === query);

      if (match) {
        navigate(`/site/${match.id}`);
      } else {
        // Fallback for demo: if no password matches, check if it matches City/Sponsor name (case insensitive)
        const fallbackMatch = projects.find(p => 
          p.id.toLowerCase() === query.toLowerCase() || 
          p.projectCity.toLowerCase() === query.toLowerCase() ||
          p.sponsorName.toLowerCase() === query.toLowerCase()
        );

        if (fallbackMatch) {
          navigate(`/site/${fallbackMatch.id}`);
        } else {
          setError(true);
          setTimeout(() => setError(false), 2000);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-[#009cdc] font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#009cdc] rounded-full blur-[200px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FBAB18] rounded-full blur-[200px] opacity-10 pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid-entry" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-entry)" />
        </svg>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-xl flex flex-col items-center"
      >
        <div className="flex flex-col items-center mb-16">
          <img 
            src="https://github.com/NFC-FC/NFC-image-hosting/blob/main/01-Main-Shield.png?raw=true" 
            className="h-20 md:h-28 mb-8 drop-shadow-[0_0_30px_rgba(0,156,220,0.5)]" 
            alt="National Fitness Campaign" 
          />
          <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-center leading-[0.85]">
            INNOVATION <br/> <span className="text-[#009cdc]">ZONE.</span>
          </h1>
          <p className="mt-6 text-zinc-500 font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs">
            Public-Private Partnership Briefing Portal
          </p>
        </div>

        {/* Access Key Input */}
        <div className="w-full relative group mb-8">
          <div className={`absolute inset-0 bg-[#009cdc] blur-3xl opacity-10 transition-opacity duration-500 ${isFocused ? 'opacity-30' : 'opacity-10'}`} />
          
          <input 
            type="text"
            placeholder="ENTER ACCESS KEY"
            value={accessKey}
            onFocus={() => {
              setIsFocused(true);
              setError(false);
            }}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setAccessKey(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`w-full bg-white/5 border rounded-2xl px-8 py-6 text-xl font-bold tracking-[0.2em] outline-none backdrop-blur-xl transition-all relative z-10 placeholder:text-zinc-600 text-center uppercase shadow-2xl ${
              error ? 'border-red-500/50 text-red-400' : isFocused ? 'border-[#009cdc]' : 'border-white/10'
            }`}
          />
          
          <div className={`mt-4 text-center h-4 transition-opacity duration-300 ${error ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.2em]">Invalid Authorization Key</span>
          </div>
        </div>

        {/* Direct Admin Access Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate('/admin')}
          className="group relative px-10 py-4 bg-white/5 hover:bg-[#009cdc]/10 border border-white/10 hover:border-[#009cdc]/50 rounded-2xl transition-all duration-300 backdrop-blur-md"
        >
          <span className="relative z-10 text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">
            Access Admin Console
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#009cdc]/0 via-[#009cdc]/5 to-[#009cdc]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.button>

        <div className={`mt-12 text-center transition-opacity duration-1000 ${isFocused && !accessKey ? 'opacity-40' : 'opacity-0'}`}>
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white">Enter credential to unlock portal</p>
        </div>
      </motion.div>
    </div>
  );
};

export default SponsorEntryPage;
