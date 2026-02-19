
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

  const handlePortalAccess = () => {
    const query = accessKey.trim();
    if (!query) return;

    // Special handling for Master Admin Access Key
    if (query === 'nfc-admin-2026' || query.toUpperCase() === 'NFC-ADMIN') {
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
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePortalAccess();
    }
  };

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#020617] text-white selection:bg-[#009cdc] font-sans flex flex-col items-center justify-center p-4 sm:p-6 relative">
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
        className="relative z-10 w-full max-w-xl flex flex-col items-center px-2 sm:px-0 min-w-0"
      >
        <div className="flex flex-col items-center mb-6 sm:mb-12 md:mb-16">
          <img 
            src="https://github.com/NFC-FC/NFC-image-hosting/blob/main/01-Main-Shield.png?raw=true" 
            className="h-12 sm:h-16 md:h-24 lg:h-28 mb-3 sm:mb-6 md:mb-8 drop-shadow-[0_0_30px_rgba(0,156,220,0.5)] max-w-full object-contain" 
            alt="National Fitness Campaign" 
          />
          <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-7xl font-black italic uppercase tracking-tighter text-center leading-tight">
            <span className="block break-words">National Wellness</span>
            <span className="block text-[#009cdc] break-words">Innovation Zone.</span>
          </h1>
          <p className="mt-3 sm:mt-4 md:mt-6 text-zinc-500 font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[8px] sm:text-[9px] md:text-xs">
            Public-Private Partnership Briefing Portal
          </p>
        </div>

        {/* Access Key Input */}
        <div className="w-full relative group mb-2">
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
            className={`w-full bg-white/5 border rounded-xl sm:rounded-2xl px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 text-base sm:text-base md:text-xl font-bold tracking-[0.15em] sm:tracking-[0.2em] outline-none backdrop-blur-xl transition-all relative z-10 placeholder:text-zinc-600 text-center shadow-2xl min-h-[2.75rem] ${
              error ? 'border-red-500/50 text-red-400' : isFocused ? 'border-[#009cdc]' : 'border-white/10'
            }`}
          />
          
          <div className={`mt-4 text-center h-4 transition-opacity duration-300 ${error ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.2em]">Invalid Authorization Key</span>
          </div>
        </div>

        {/* Access Portal Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={handlePortalAccess}
          className="group relative w-[70%] sm:w-[55%] md:w-1/2 mx-auto px-5 py-3.5 sm:px-7 sm:py-4 md:px-10 md:py-6 bg-[#009cdc] hover:bg-[#007ba8] rounded-xl sm:rounded-2xl transition-all duration-300 shadow-[0_0_40px_rgba(0,156,220,0.2)]"
        >
          <span className="relative z-10 text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white">
            Access Portal
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.button>

        <div className="mt-3 sm:mt-4 text-center">
          <div className={`transition-opacity duration-1000 ${isFocused && !accessKey ? 'opacity-40' : 'opacity-0'}`}>
            <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.4em] sm:tracking-[0.5em] text-white mb-2 sm:mb-4">Enter credential to unlock portal</p>
          </div>
          <button 
            onClick={() => navigate('/admin')}
            className="text-[7px] sm:text-[8px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white opacity-20 hover:opacity-60 transition-opacity cursor-pointer border-none bg-transparent"
          >
            Internal NFC Admin Login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SponsorEntryPage;
