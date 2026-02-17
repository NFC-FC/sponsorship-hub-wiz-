import React from 'react';
import { SiteConfig } from '../App.tsx';

interface Props {
  config: SiteConfig;
}

// Added config prop to match App.tsx usage and brand the component dynamically
export const Footer: React.FC<Props> = ({ config }) => {
  return (
    <footer className="bg-black text-gray-600 py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-black text-xl uppercase tracking-tighter" style={{ color: config.primaryColor }}>{config.projectName}</span>
              <span className="font-black text-xl text-white uppercase tracking-tighter italic">{config.projectCity}</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              A private-public infrastructure partnership building {config.courtCount} <span className="text-white">Fitness Courts</span> for the residents of {config.projectCity}.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:text-white transition-all cursor-pointer" style={{ '--hover-bg': config.primaryColor } as any} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = config.primaryColor)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                <span className="text-xs font-bold">TW</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:text-white transition-all cursor-pointer" style={{ '--hover-bg': config.primaryColor } as any} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = config.primaryColor)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                <span className="text-xs font-bold">IG</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:text-white transition-all cursor-pointer" style={{ '--hover-bg': config.primaryColor } as any} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = config.primaryColor)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                <span className="text-xs font-bold">YT</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <div className="text-[10px] font-black text-white uppercase tracking-widest mb-6">Network</div>
              <ul className="space-y-4 text-xs font-medium uppercase tracking-wider">
                <li><a href="#hero" className="hover:text-white transition-colors">Hero</a></li>
                <li><a href="#master-plan" className="hover:text-white transition-colors">Master Plan</a></li>
                <li><a href="#fitness-app" className="hover:text-white transition-colors">Fitness App</a></li>
              </ul>
            </div>
            <div>
              <div className="text-[10px] font-black text-white uppercase tracking-widest mb-6">Company</div>
              <ul className="space-y-4 text-xs font-medium uppercase tracking-wider">
                <li><a href="#opportunity" className="hover:text-white transition-colors">Partnerships</a></li>
                <li><a href="#impact" className="hover:text-white transition-colors">Impact Data</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About NFC</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em]">
          <div>
            © {new Date().getFullYear()} National Fitness Campaign x {config.sponsorName}.
          </div>
          <div className="flex gap-8 opacity-60 items-center">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};