
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiteConfig } from '../App.tsx';

gsap.registerPlugin(ScrollTrigger);

interface CinematicScrollerProps {
  config: SiteConfig;
}

export const CinematicScroller: React.FC<CinematicScrollerProps> = ({ config }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
  // Visual Layers
  const videoLayer1 = useRef<HTMLDivElement>(null);
  const videoLayer2 = useRef<HTMLDivElement>(null);
  const colorLayer1 = useRef<HTMLDivElement>(null); // Leadership Grid
  const impactLayer = useRef<HTMLDivElement>(null); // Impact Chart
  const legacyLayer = useRef<HTMLDivElement>(null); // Permanent Commitment
  const colorLayer2 = useRef<HTMLDivElement>(null); // App / CTA

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=1500%', 
          pin: true,
          scrub: 1.5,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
          }
        }
      });

      // Set Initial States
      gsap.set([colorLayer1.current, impactLayer.current, videoLayer2.current, legacyLayer.current, colorLayer2.current], { 
        yPercent: 100 
      });
      gsap.set(".chart-bar", { scaleY: 0, transformOrigin: "bottom" });

      // --- SEQUENCE 0: Hero Header to Mask ---
      tl.fromTo(videoLayer1.current, 
        { scale: 1, borderRadius: '0rem' },
        { scale: 0.6, borderRadius: '4rem', duration: 2.5 }
      )
      .fromTo(".header-content", { opacity: 1 }, { opacity: 0, y: -100, duration: 1.5 }, 0.5);

      // --- SEQUENCE 1: Video 1 Vision Expansion ---
      tl.to(videoLayer1.current, { scale: 1, borderRadius: '0rem', duration: 2.5 })
        .fromTo(".ch-1", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5 }, "-=1.5")
        .to(".ch-1", { opacity: 0, y: -50, duration: 1 }, "+=0.5");

      // --- SEQUENCE 2: Leadership Grid ---
      tl.to(colorLayer1.current, { yPercent: 0, duration: 3, ease: "power2.inOut" })
        .fromTo(".leader-card", { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, duration: 1.2 }, "-=1.5")
        .to(colorLayer1.current, { yPercent: -100, duration: 2 }, "+=1");

      // --- SEQUENCE 3: Impact Lab ---
      tl.to(impactLayer.current, { yPercent: 0, duration: 3, ease: "power2.inOut" }, "-=1.5")
        .to(".chart-bar", { scaleY: 1, stagger: 0.15, duration: 2, ease: "elastic.out(1, 0.4)" }, "-=2")
        .to(".metric-card", { opacity: 1, x: 0, stagger: 0.2, duration: 1 }, "-=1.5")
        .to(impactLayer.current, { yPercent: -100, duration: 2 }, "+=1.5");

      // --- SEQUENCE 4: Master Plan ---
      tl.to(videoLayer2.current, { yPercent: 0, duration: 3, ease: "power2.inOut" }, "-=1.5")
        .fromTo(".ch-3", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.5 }, "-=1.5")
        .to(videoLayer2.current, { yPercent: -100, duration: 2 }, "+=1.5");

      // --- SEQUENCE 5: Permanent Commitment ---
      tl.to(legacyLayer.current, { yPercent: 0, duration: 3, ease: "power2.inOut" }, "-=1.5")
        .fromTo(".legacy-media", { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 2 }, "-=2")
        .to(legacyLayer.current, { yPercent: -100, duration: 2 }, "+=1.5");

      // --- SEQUENCE 6: App / Join ---
      tl.to(colorLayer2.current, { yPercent: 0, duration: 3, ease: "power2.inOut" }, "-=2")
        .fromTo(".phone-mockup", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5 }, "-=1.5")
        .to(".app-internal-scroll", { y: -200, duration: 3 }, "+=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, [config]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black text-white selection:bg-[var(--brand-primary)]">
      {/* Progress Bar */}
      <div ref={progressRef} className="absolute bottom-0 left-0 h-1 bg-[var(--brand-primary)] z-[100] transition-all" />

      {/* Video 1 (Hero & Vision) */}
      <div ref={videoLayer1} className="absolute inset-0 z-0 overflow-hidden bg-zinc-900 origin-center">
        <video key={config.heroVideo} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale opacity-40">
          <source src={config.heroVideo} type="video/mp4" />
        </video>
        <div className="header-content absolute inset-0 flex flex-col items-center justify-center text-center z-50 pointer-events-none">
          <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-white">City Council Approved Master Plan</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter">
            {config.sponsorName.toUpperCase()} X NFC
          </h1>
          <p className="text-xl uppercase tracking-[0.5em] text-[var(--brand-primary)] font-bold">
            THE {config.projectCity.toUpperCase()} INFRASTRUCTURE PROJECT
          </p>
        </div>
      </div>

      {/* Slide 1: Leadership Grid */}
      <div ref={colorLayer1} className="absolute inset-0 z-10 bg-[#1A1A1A] flex flex-col items-center justify-center p-20 border-t border-white/10">
        <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-16 text-[var(--brand-primary)]">Civic Leadership</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="leader-card flex flex-col items-center opacity-0">
              <div className="w-full aspect-square bg-zinc-800 rounded-[2.5rem] border border-white/5 mb-6 bg-gradient-to-br from-[var(--brand-primary)]/20 to-black" />
              <p className="font-bold uppercase tracking-tighter text-sm">Ward Director {i}</p>
              <p className="text-[10px] text-[var(--brand-primary)] font-black uppercase mt-1">Infrastructure Delivery</p>
            </div>
          ))}
        </div>
      </div>

      {/* Slide 2: Impact Lab */}
      <div ref={impactLayer} className="absolute inset-0 z-20 bg-black flex items-center justify-center px-24">
        <div className="flex w-full max-w-7xl gap-20 items-end">
          <div className="flex-1 bg-zinc-900/40 p-16 rounded-[4rem] border border-white/5">
             <div className="mb-12">
                <p className="text-[var(--brand-primary)] font-black text-xs uppercase tracking-widest mb-2">Network Performance</p>
                <h3 className="text-5xl font-black italic uppercase">The Impact <span className="text-[var(--brand-primary)]">By Years.</span></h3>
             </div>
            <div className="flex items-end h-80 gap-6">
              {[25, 40, 55, 75, 100].map((h, i) => (
                <div key={i} className={`chart-bar flex-1 rounded-t-2xl ${i === 4 ? 'bg-[var(--brand-secondary)]' : 'bg-[var(--brand-primary)]'}`} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6 w-80">
            <div className="metric-card bg-[#111] p-10 rounded-[3rem] border-l-8 border-[var(--brand-secondary)] opacity-0 translate-x-8">
              <span className="text-6xl font-black tracking-tighter italic">100k+</span>
              <p className="text-[10px] uppercase font-bold opacity-50 mt-2 tracking-widest leading-tight">Active Residents <br/> (Year 5 Projection)</p>
            </div>
            <div className="metric-card bg-[#111] p-10 rounded-[3rem] border-l-8 border-[var(--brand-primary)] opacity-0 translate-x-8">
              <span className="text-6xl font-black tracking-tighter italic">7 Min</span>
              <p className="text-[10px] uppercase font-bold opacity-50 mt-2 tracking-widest leading-tight">Optimized <br/> Daily Circuit</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 3: Master Plan */}
      <div ref={videoLayer2} className="absolute inset-0 z-30 overflow-hidden bg-black">
        <video key={config.secondaryVideo} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30 blur-sm">
          <source src={config.secondaryVideo} type="video/mp4" />
        </video>
        <div className="ch-3 absolute inset-0 flex items-center justify-center p-20 opacity-0">
          <div className="w-full h-full rounded-[4rem] border border-white/10 bg-zinc-900/80 backdrop-blur-3xl flex flex-col items-center justify-center text-center">
              <h2 className="text-8xl font-black italic uppercase tracking-tighter text-white mb-4">Master Plan</h2>
              <p className="text-[var(--brand-secondary)] font-black tracking-[0.5em] uppercase text-sm italic">2.5 Mile Radius {config.projectCity} Coverage</p>
          </div>
        </div>
      </div>

      {/* Slide 4: Permanent Commitment */}
      <div ref={legacyLayer} className="absolute inset-0 z-40 bg-zinc-950 flex items-center">
        <div className="w-1/2 p-24">
          <span className="text-[var(--brand-primary)] text-xs font-black uppercase tracking-widest">Civic Health Alliance</span>
          <h2 className="text-8xl font-black italic uppercase leading-[0.8] tracking-tighter mt-8 mb-10">A Permanent<br/><span className="text-[var(--brand-primary)]">Commitment.</span></h2>
          <p className="text-zinc-500 text-xl max-w-md italic font-medium leading-relaxed">Engineered for legacy health generations to come. Performance-grade materials designed for extreme {config.projectCity} climate.</p>
        </div>
        <div className="legacy-media w-1/2 h-[90%] bg-zinc-900 mr-10 rounded-[4rem] relative overflow-hidden">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50 grayscale">
            <source src={config.heroVideo} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Slide 5: Join / App */}
      <div ref={colorLayer2} className="absolute inset-0 z-50 bg-[var(--brand-accent)] flex items-center justify-around px-24 shadow-2xl">
        <div className="max-w-xl">
          <h2 className="text-8xl font-black italic uppercase tracking-tighter leading-none mb-10 text-white">The App.</h2>
          <p className="text-2xl font-bold italic tracking-tight text-white/90 uppercase">Track. Compete. Conquer. <br/> Your digital guide to public fitness.</p>
          <button className="mt-12 bg-white text-[var(--brand-accent)] px-16 py-6 rounded-full text-xl font-black uppercase italic tracking-tighter shadow-2xl hover:scale-105 transition-transform pointer-events-auto">
            EXPLORE THE PLAN
          </button>
        </div>
        <div className="phone-mockup relative w-80 h-[600px] bg-zinc-900 rounded-[4rem] border-[14px] border-zinc-800 shadow-[0_50px_100px_rgba(0,0,0,0.6)] overflow-hidden opacity-0">
          <div className="app-internal-scroll absolute top-0 left-0 w-full p-8 space-y-8">
             <div className="h-48 bg-[var(--brand-primary)] rounded-[2rem] w-full shadow-xl" />
             <div className="h-72 bg-zinc-800 rounded-[2rem] w-full" />
             <div className="h-72 bg-zinc-800 rounded-[2rem] w-full" />
          </div>
        </div>
      </div>

      {/* Vision Overlay */}
      <div className="relative z-[55] w-full h-full pointer-events-none">
        <div className="ch-1 absolute inset-0 flex flex-col items-center justify-center text-center px-8 opacity-0">
          <h1 className="text-7xl md:text-[11vw] font-black leading-[0.8] tracking-tighter uppercase italic mb-8 drop-shadow-2xl">
            {config.projectName} <br />
            <span className="text-[var(--brand-primary)]">{config.projectCity}.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl font-medium tracking-tight uppercase">
            {config.courtCount} Fitness Courts. <br/> Accessible health infrastructure for every resident.
          </p>
        </div>
      </div>
    </div>
  );
};
