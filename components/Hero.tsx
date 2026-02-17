
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-40 mix-blend-screen grayscale"
        >
          <source src="https://cdn.prod.website-files.com/638a20d9b98c2f709f1402cb/63efc95f26ac7b6b0e192a29_V14%20(1920%20%C3%97%20650%20px)-transcode.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-8 max-w-7xl mx-auto text-center flex flex-col items-center">
        <div className="flex items-center gap-6 mb-8">
          <img src="https://images.squarespace-cdn.com/content/v1/559aec35e4b01e46950269f1/1574100914856-RJSK09K5U7V7V7V7V7V7/NFC-Logo.png" alt="National Fitness Campaign" className="h-8 brightness-0 invert opacity-80" />
          <div className="w-[1px] h-6 bg-white/20"></div>
          <img src="https://logolook.net/wp-content/uploads/2023/10/Allegiant-Air-Logo.png" alt="Allegiant Air" className="h-6 brightness-0 invert opacity-80" />
        </div>
        
        <h1 className="text-7xl md:text-[11rem] font-black text-white leading-[0.8] tracking-tighter mb-8 uppercase italic drop-shadow-2xl">
          HEALTHY <br />
          <span className="text-[#009cdc]">VEGAS.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-12 font-medium leading-relaxed drop-shadow-lg">
          Transforming Las Vegas with <span className="text-white font-bold">30+ Fitness Courts</span>. <br/>
          Building the most accessible outdoor gym network on Earth.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <button className="nfc-btn-primary text-lg px-12 py-5 shadow-nfc scale-110">
            Explore Fitness Courts
          </button>
        </div>
      </div>

      {/* Corporate Partners Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-xl border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center text-gray-400">
           <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Healthy Infrastructure Coalition</div>
           <div className="flex gap-12 items-center opacity-60">
              <span className="font-bold text-[11px] tracking-widest uppercase hover:text-white transition-colors cursor-default">City of Las Vegas</span>
              <span className="font-bold text-[11px] tracking-widest uppercase hover:text-white transition-colors cursor-default">Allegiant Air</span>
              <span className="font-bold text-[11px] tracking-widest uppercase hover:text-white transition-colors cursor-default">NFC Campaign</span>
           </div>
        </div>
      </div>
    </div>
  );
};
