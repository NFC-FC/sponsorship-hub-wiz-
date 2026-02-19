import React, { useEffect, useMemo, useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import SponsorEntryPage from './pages/SponsorEntryPage';

// Import Marketing-style components
import Section1Splash from './components/marketing/Section1Splash';
import Section2Hero from './components/marketing/Section2Hero';
import { FullWidthVideo } from './components/marketing/FullWidthVideo';
import { CivicLeadership } from './components/marketing/CivicLeadership';
import Section3Reality from './components/marketing/Section3Reality';
import { MasterPlan } from './components/marketing/MasterPlan';
import { Impact } from './components/marketing/Impact';
import Section4Product from './components/marketing/Section4Product';
import Section5Ecosystem from './components/marketing/Section5Ecosystem';
import Section6Endorsement from './components/marketing/Section6Endorsement';
// Fix: Use named import for Footer to match its updated export in components/marketing/Footer.tsx
import { Footer } from './components/marketing/Footer';

import { ChatBot } from './components/ChatBot';
import { AdminPanel } from './components/AdminPanel';
import { Dashboard } from './components/Dashboard';

/**
 * The rendered configuration used by the UI components.
 * This is computed on the fly by merging City + Sponsor data.
 */
export interface SiteConfig {
  id: string;
  projectName: string;
  projectCity: string;
  sponsorName: string;
  sponsorLogo: string;
  nfcLogo: string;
  primaryColor: string;
  accentColor: string;
  secondaryColor: string;
  investmentAmount: string;
  courtCount: string;
  wardCount: string;
  heroVideo: string;
  secondaryVideo: string;
  masterPlanBackground: string;
  isArchived?: boolean;
}

/**
 * Shared fields that live at the City level.
 */
export interface CityTemplate {
  projectName: string;
  nfcLogo: string;
  primaryColor: string;
  accentColor: string;
  secondaryColor: string;
  investmentAmount: string;
  courtCount: string;
  wardCount: string;
  heroVideo: string;
  secondaryVideo: string;
  masterPlanBackground: string;
}

/**
 * Unique data for a specific Sponsor.
 */
export interface SponsorRecord {
  id: string;
  sponsorName: string;
  sponsorLogo: string;
  isArchived?: boolean;
  overrides: Partial<CityTemplate>;
}

/**
 * Top-level City structure.
 */
export interface CityGroup {
  id: string;
  name: string;
  isArchived?: boolean;
  template: CityTemplate;
  sponsors: SponsorRecord[];
}

const nfcShield = 'https://github.com/NFC-FC/NFC-image-hosting/blob/main/01-Main-Shield.png?raw=true';
const defaultVideo = 'https://cdn.prod.website-files.com/638a20d9b98c2f709f1402cb/63efc95f26ac7b6b0e192a29_V14%20(1920%20%C3%97%20650%20px)-transcode.mp4';

/**
 * Utility to merge a City's template with a Sponsor's unique identity/overrides.
 */
export const mergeSponsorConfig = (city: CityGroup, sponsor: SponsorRecord): SiteConfig => {
  return {
    ...city.template,      // 1. Defaults from City
    ...sponsor.overrides,  // 2. Overrides from Sponsor
    id: sponsor.id,        // 3. Keep Sponsor Identity
    sponsorName: sponsor.sponsorName,
    sponsorLogo: sponsor.sponsorLogo,
    projectCity: city.name,
    isArchived: sponsor.isArchived || city.isArchived,
  };
};

const initialCities: CityGroup[] = [
  {
    id: 'city-vegas',
    name: 'LAS VEGAS',
    template: {
      projectName: 'HEALTHY',
      nfcLogo: nfcShield,
      primaryColor: '#009cdc',
      accentColor: '#FF5432',
      secondaryColor: '#FBAB18',
      investmentAmount: '$6 MILLION',
      courtCount: '30+',
      wardCount: '6',
      heroVideo: defaultVideo,
      secondaryVideo: defaultVideo,
      masterPlanBackground: 'https://github.com/NFC-FC/NFC-image-hosting/blob/04b9dee17b734ea8e2b55df7ce56a6ef817d0b01/vegas-MP.png?raw=true',
    },
    sponsors: [
      {
        id: 'default-vegas',
        sponsorName: 'Allegiant Air',
        sponsorLogo: 'https://github.com/NFC-FC/NFC-image-hosting/blob/04b9dee17b734ea8e2b55df7ce56a6ef817d0b01/Allegiant_Air_logo.svg.png?raw=true',
        overrides: {},
      },
      {
        id: 'vegas-dignity',
        sponsorName: 'Dignity Health',
        sponsorLogo: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Dignity_Health_logo.svg',
        overrides: {
          projectName: 'VIBRANT',
          primaryColor: '#0072ce',
          investmentAmount: '$4 MILLION',
          courtCount: '20+',
        },
      },
    ],
  },
];

const SitePreview: React.FC<{ config: SiteConfig }> = ({ config }) => {
  const [isEntered, setIsEntered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isEntered ? 'auto' : 'hidden';
    window.scrollTo(0, 0);
  }, [isEntered, config.id]);

  return (
    <div
      className="relative min-h-screen bg-[#020617]"
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
        className={`${
          isEntered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } transition-opacity duration-1000`}
      >
        <Section2Hero config={config} />
        {/* New Feature Video below Hero */}
        <FullWidthVideo />
        {/* Reordered: Reality (Impact/Infrastructure) with rotating GIF now follows Hero immediately */}
        <Section3Reality config={config} />
        {/* Adoption Section (Legislative Approval) follows impact */}
        <CivicLeadership config={config} />
        <MasterPlan config={config} />
        <Impact config={config} />
        <Section4Product config={config} />
        <Section5Ecosystem config={config} />
        <Section6Endorsement config={config} />
        <Footer config={config} />
      </div>

      {isEntered && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl h-20 md:h-24 flex items-center justify-between px-6 md:px-12 border-b border-white/10"
        >
          <div className="flex gap-4 items-center">
            <span
              onClick={() => navigate('/')}
              className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase cursor-pointer hover:text-white transition-colors"
            >
              Innovation Hub
            </span>
          </div>

          <div className="flex items-center gap-6 md:gap-10">
            {/* Header Logos — same height for all three */}
            <img
              src={config.sponsorLogo}
              className="h-8 md:h-10 object-contain brightness-200 grayscale transition-opacity hover:opacity-100 opacity-90"
              alt={config.sponsorName}
            />
            
            <div className="w-px h-8 md:h-10 bg-white/10 hidden sm:block" />
            
            <img 
              src="https://github.com/NFC-FC/NFC-image-hosting/blob/main/Seal_of_Las_Vegas,_Nevada.svg.png?raw=true"
              alt="City Seal" 
              className="h-8 md:h-10 object-contain brightness-200 grayscale opacity-90"
            />

            <div className="w-px h-8 md:h-10 bg-white/10 hidden sm:block" />
            
            <img
              src={config.nfcLogo}
              className="h-8 md:h-10 object-contain brightness-0 invert opacity-80 transition-opacity hover:opacity-100 grayscale"
              alt="NFC"
            />
          </div>
        </motion.div>
      )}

      <div
        className={`transition-opacity duration-1000 ${
          isEntered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ChatBot config={config} />
      </div>
    </div>
  );
};

const AdminRoute: React.FC<{
  cities: CityGroup[];
  setCities: React.Dispatch<React.SetStateAction<CityGroup[]>>;
  onEditSponsor: (cityId: string, sponsorId: string) => void;
  onEditCityTemplate: (cityId: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ cities, setCities, onEditSponsor, onEditCityTemplate, isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
    if (password === 'Fitnesscourt0987!') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password. Access denied.');
    }
  };

  if (isAuthenticated) {
    return (
      <Dashboard 
        cities={cities} 
        setCities={setCities} 
        onEditSponsor={onEditSponsor} 
        onEditCityTemplate={onEditCityTemplate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center font-sans">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-900/80 backdrop-blur-md border border-white/10 p-10 rounded-[2rem] shadow-2xl flex flex-col gap-6 w-[90%] max-sm"
      >
        <div className="text-center">
          <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">
            Admin Access Panel
          </h2>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-2">
            Authentication Required
          </p>
        </div>
        <input
          type="password"
          name="password"
          autoFocus
          placeholder="Enter Password"
          className="bg-black/50 border border-white/10 text-white px-4 py-3 rounded-xl outline-none focus:border-[#009cdc] transition-colors text-sm text-center tracking-widest"
        />
        <button
          type="submit"
          className="bg-[#009cdc] hover:bg-[#007ba8] transition-colors text-white px-4 py-3 rounded-xl font-bold uppercase text-xs tracking-widest shadow-[0_0_20px_rgba(0,156,220,0.3)]"
        >
          Enter Portal
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors mt-2"
        >
          Return to Hub
        </button>
      </form>
    </div>
  );
};

const STORAGE_KEY = 'nfc-cities-v4';

const App: React.FC = () => {
  const [cities, setCities] = useState<CityGroup[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialCities;
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? (parsed as CityGroup[]) : initialCities;
    } catch {
      return initialCities;
    }
  });

  const [activeEdit, setActiveEdit] = useState<{ cityId: string; sponsorId?: string } | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
  }, [cities]);

  // Derived: Merged public sponsors
  const allSponsorsMerged = useMemo(() => {
    return cities
      .filter((c) => !c.isArchived)
      .flatMap((city) => 
        city.sponsors
          .filter(s => !s.isArchived)
          .map(sponsor => mergeSponsorConfig(city, sponsor))
      );
  }, [cities]);

  const SitePreviewRoute: React.FC = () => {
    const { id } = useParams();
    const active = useMemo(
      () => allSponsorsMerged.find((s) => s.id === id) || allSponsorsMerged[0],
      [id]
    );
    return active ? <SitePreview config={active} /> : <Navigate to="/" replace />;
  };

  const handleUpdate = (cityId: string, sponsorId: string | undefined, updatedData: any) => {
    setCities(prev => prev.map(city => {
      if (city.id !== cityId) return city;
      
      // Case 1: Updating City Template
      if (!sponsorId) {
        return { ...city, template: updatedData };
      }
      
      // Case 2: Updating Sponsor Identity + Overrides
      return {
        ...city,
        sponsors: city.sponsors.map(s => s.id === sponsorId ? updatedData : s)
      };
    }));
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<SponsorEntryPage projects={allSponsorsMerged} />} />
        <Route
          path="/admin"
          element={
            <AdminRoute
              cities={cities}
              setCities={setCities}
              onEditSponsor={(cid, sid) => setActiveEdit({ cityId: cid, sponsorId: sid })}
              onEditCityTemplate={(cid) => setActiveEdit({ cityId: cid })}
              isAuthenticated={isAdminAuthenticated}
              setIsAuthenticated={setIsAdminAuthenticated}
            />
          }
        />
        <Route path="/site/:id" element={<SitePreviewRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {activeEdit && (
        <AdminPanel
          city={cities.find(c => c.id === activeEdit.cityId)!}
          sponsorId={activeEdit.sponsorId}
          isOpen={true}
          onClose={() => setActiveEdit(null)}
          onUpdate={(data) => handleUpdate(activeEdit.cityId, activeEdit.sponsorId, data)}
        />
      )}
    </>
  );
};

export default App;