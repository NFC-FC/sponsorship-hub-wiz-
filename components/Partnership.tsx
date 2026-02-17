
import React from 'react';
import { SiteConfig } from '../App.tsx';

interface Props {
  config: SiteConfig;
}

// Added config prop to match App.tsx usage and brand the component dynamically
export const Partnership: React.FC<Props> = ({ config }) => {
  return (
    <div className="relative py-40 px-6 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
        <div className="lg:w-1/2">
          <div className="inline-block px-4 py-1 rounded-full bg-white/5 font-black text-[10px] tracking-[0.3em] uppercase mb-10" style={{ color: config.primaryColor }}>
            Civic Health Alliance
          </div>
          
          <h2 className="text-7xl font-black mb-10 tracking-tighter leading-none text-white uppercase italic">
            A PERMANENT <br />
            <span style={{ color: config.primaryColor }}>COMMITMENT.</span>
          </h2>
          
          <p className="text-gray-400 text-xl mb-12 leading-relaxed font-medium">
            {config.sponsorName} Fitness Courts are engineered for high-performance use and extreme climate resilience. This isn't a temporary installation—it's legacy infrastructure that will promote health for generations.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="glass p-8 rounded-3xl border-white/5 hover:border-[#009cdc]/30 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg" style={{ backgroundColor: `${config.primaryColor}1A`, color: config.primaryColor }}>
                 <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h4 className="font-black text-white text-xl mb-3 uppercase italic tracking-tighter">Precision Circuit</h4>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">The NFC 7-minute bodyweight routine is the world's most efficient workout.</p>
            </div>
            <div className="glass p-8 rounded-3xl border-white/5 hover:border-[#FBAB18]/30 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg" style={{ backgroundColor: `${config.secondaryColor}1A`, color: config.secondaryColor }}>
                 <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21.355r-.347-.133L9.482 20.21l-.03-.015a11.956 11.956 0 01-4.834-4.86l-.03-.05A11.954 11.954 0 012.944 12c0-1.61.316-3.145.892-4.555a11.955 11.955 0 013.04-4.102z" /></svg>
              </div>
              <h4 className="font-black text-white text-xl mb-3 uppercase italic tracking-tighter">Extreme Legacy</h4>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">Aerospace-grade materials designed for the Nevada heat and high-volume use.</p>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 relative">
          <div className="relative rounded-[4rem] overflow-hidden shadow-[0_0_100px_rgba(0,156,220,0.1)] aspect-[4/5] border-[1px] border-white/10 group">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop" 
              alt="People exercising on Fitness Court" 
              className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute bottom-16 left-16 text-white">
              <img src={config.nfcLogo} alt="NFC" className="h-5 brightness-0 invert opacity-40 mb-6" />
              <div className="text-5xl font-black uppercase italic leading-none tracking-tighter">THE STUDIO <br/> FITNESS COURT</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
