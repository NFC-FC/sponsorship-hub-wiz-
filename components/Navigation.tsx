import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SiteConfig } from '../App.tsx';

interface Props {
  activeSection: string;
  config: SiteConfig;
  onEditClick: () => void;
}

export const Navigation: React.FC<Props> = ({ activeSection, config }) => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  const navigate = useNavigate();

  const goToAdmin = () => {
    navigate('/admin');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-8 py-6 pointer-events-none">
      {/* Branding Pill */}
      <div className="pointer-events-auto bg-black/85 backdrop-blur-2xl px-6 py-4 rounded-[2.5rem] border border-white/10 flex items-center gap-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-white/20">
        
        {/* Logos Container: Content Aware */}
        <div className="flex items-center gap-5 shrink-0">
          <div 
            className="h-10 w-auto flex items-center justify-center cursor-pointer group/logo"
            onClick={goToAdmin}
            title="Access Admin Console"
          >
            <img 
              src={config.nfcLogo} 
              alt="NFC" 
              className="max-h-full w-auto object-contain transition-transform duration-500 group-hover/logo:scale-110 group-hover/logo:brightness-125" 
            />
          </div>
          
          <div className="w-[1px] h-8 bg-white/20"></div>
          
          <div className="h-6 w-auto flex items-center justify-center">
            <img 
              src={config.sponsorLogo} 
              alt={config.sponsorName} 
              className="max-h-full w-auto object-contain transition-transform duration-500 hover:scale-105" 
            />
          </div>
        </div>

        {/* Text Container */}
        <div className="flex flex-col justify-center leading-none">
          <span 
            className="font-black text-[14px] uppercase tracking-tighter" 
            style={{ color: config.primaryColor }}
          >
            {config.projectName}
          </span>
          <span className="text-[18px] font-black tracking-tighter text-white uppercase italic mt-0.5">
            {config.projectCity}
          </span>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <div className="pointer-events-auto hidden lg:flex items-center gap-8 px-10 py-3 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 shadow-lg">
        {['Hero', 'Delivery', 'Master Plan', 'Impact', 'Opportunity'].map((item) => {
          const id = item.toLowerCase().replace(' ', '-');
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`text-[10px] uppercase font-black tracking-[0.2em] transition-all relative group ${
                activeSection === id ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {item}
              <div 
                className={`absolute -bottom-1 left-0 h-[2px] transition-all duration-300 bg-[var(--brand-primary)] ${
                  activeSection === id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Action Button */}
      <div className="pointer-events-auto pr-24 lg:pr-0">
        <button 
          onClick={() => scrollTo('opportunity')}
          className="nfc-btn-primary text-[10px] px-8 py-3 shadow-nfc flex items-center gap-2 group"
          style={{ backgroundColor: config.primaryColor }}
        >
          <span>PARTNER WITH US</span>
          <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </nav>
  );
};