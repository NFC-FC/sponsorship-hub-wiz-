import React, { Suspense, useEffect, useMemo, useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase } from './src/supabaseClient';

import SponsorEntryPage from './pages/SponsorEntryPage';

// Lazy-loaded marketing sections (reduces initial bundle for faster mobile load)
const Section1Splash = React.lazy(() => import('./components/marketing/Section1Splash'));
const Section2Hero = React.lazy(() => import('./components/marketing/Section2Hero'));
const FullWidthVideo = React.lazy(() => import('./components/marketing/FullWidthVideo').then(m => ({ default: m.FullWidthVideo })));
const CivicLeadership = React.lazy(() => import('./components/marketing/CivicLeadership').then(m => ({ default: m.CivicLeadership })));
const Section3Reality = React.lazy(() => import('./components/marketing/Section3Reality'));
const MasterPlan = React.lazy(() => import('./components/marketing/MasterPlan').then(m => ({ default: m.MasterPlan })));
const Impact = React.lazy(() => import('./components/marketing/Impact').then(m => ({ default: m.Impact })));
const Section4Product = React.lazy(() => import('./components/marketing/Section4Product'));
const Section5Ecosystem = React.lazy(() => import('./components/marketing/Section5Ecosystem'));
const Section6Endorsement = React.lazy(() => import('./components/marketing/Section6Endorsement'));
const Section7SponsorshipLevels = React.lazy(() => import('./components/marketing/Section7SponsorshipLevels'));
const CampaignVideo = React.lazy(() => import('./components/marketing/CampaignVideo').then(m => ({ default: m.CampaignVideo })));
const Section8Timeline = React.lazy(() => import('./components/marketing/Section8Timeline').then(m => ({ default: m.Section8Timeline })));
const Footer = React.lazy(() => import('./components/marketing/Footer').then(m => ({ default: m.Footer })));

import { AdminPanel } from './components/AdminPanel';
import { Dashboard } from './components/Dashboard';

/**
 * Definition for civic leaders shown in the leadership section.
 */
export interface Leader {
  id: string;
  name: string;
  title: string;
  image: string;
}

export interface MapMarker {
  id: string;
  x: number;
  y: number;
  name: string;
  type: 'studio' | 'standard' | 'pod' | 'existing';
}

export interface MapCallout {
  id: string;
  x: number;
  y: number;
  title: string;
  image: string;
  colorType: 'primary' | 'secondary' | 'pod';
}

/**
 * The rendered configuration used by the UI components.
 * This is computed on the fly by merging City + Sponsor data.
 */
export interface SiteConfig {
  id: string;
  projectName: string;
  projectCity: string;
  cityLogo: string;
  sponsorName: string;
  sponsorLogo: string;
  sponsorPassword?: string;
  sponsorRender: string;
  nfcLogo: string;
  primaryColor: string;
  accentColor: string;
  secondaryColor: string;
  investmentAmount: string;
  courtCount: string;
  wardCount: string;
  wardType: string;
  wardNames: string[];
  heroVideo: string;
  secondaryVideo: string;
  masterPlanBackground: string;
  isArchived?: boolean;
  leaders: Leader[];
  endorsementQuote: string;
  endorsementName: string;
  endorsementImage: string;
  markers: MapMarker[];
  callouts: MapCallout[];
  communityAccess: string;
  annualUses: string;
  caloriesBurned: string;
}

/**
 * Shared fields that live at the City level.
 */
export interface CityTemplate {
  projectName: string;
  cityLogo: string;
  nfcLogo: string;
  primaryColor: string;
  accentColor: string;
  secondaryColor: string;
  investmentAmount: string;
  courtCount: string;
  wardCount: string;
  wardType: string;
  wardNames: string[];
  heroVideo: string;
  secondaryVideo: string;
  masterPlanBackground: string;
  leaders: Leader[];
  endorsementQuote: string;
  endorsementName: string;
  endorsementImage: string;
  sponsorRender: string;
  markers: MapMarker[];
  callouts: MapCallout[];
  communityAccess: string;
  annualUses: string;
  caloriesBurned: string;
}

/**
 * Unique data for a specific Sponsor.
 */
export interface SponsorRecord {
  id: string;
  sponsorName: string;
  sponsorLogo: string;
  sponsorPassword?: string;
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
const defaultRender = 'https://nationalfitnesscampaign.com/wp-content/uploads/2023/06/LV_ALLEGIANT_RENDER_HQ.png';
const defaultCityLogo = 'https://github.com/NFC-FC/NFC-image-hosting/blob/main/Seal_of_Las_Vegas,_Nevada.svg.png?raw=true';

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
    sponsorPassword: sponsor.sponsorPassword,
    sponsorRender: sponsor.overrides?.sponsorRender || city.template.sponsorRender,
    projectCity: city.name,
    cityLogo: sponsor.overrides.cityLogo || city.template.cityLogo,
    isArchived: sponsor.isArchived || city.isArchived,
  };
};

const initialCities: CityGroup[] = [
  {
    id: 'city-vegas',
    name: 'LAS VEGAS',
    template: {
      projectName: 'National Wellness Innovation',
      cityLogo: defaultCityLogo,
      nfcLogo: nfcShield,
      primaryColor: '#009cdc',
      accentColor: '#FF5432',
      secondaryColor: '#FBAB18',
      investmentAmount: '$6 MILLION',
      courtCount: '30+',
      wardCount: '6',
      wardType: 'Wards',
      wardNames: ['Shelley Berkley', 'Brian Knudsen', 'Victoria Seaman', 'Olivia Diaz', 'Cedric Crear', 'Nancy Brune'],
      heroVideo: defaultVideo,
      secondaryVideo: defaultVideo,
      masterPlanBackground: 'https://github.com/NFC-FC/NFC-image-hosting/blob/04b9dee17b734ea8e2b55df7ce56a6ef817d0b01/vegas-MP.png?raw=true',
      sponsorRender: defaultRender,
      markers: [
        { id: 'm1', x: 50, y: 45, name: 'Downtown Wellness Hub', type: 'studio' },
        { id: 'm2', x: 25, y: 35, name: 'Summerlin North Park', type: 'standard' },
        { id: 'm3', x: 75, y: 60, name: 'Henderson Gateway', type: 'pod' },
        { id: 'm4', x: 60, y: 30, name: 'Sunrise Mountain Trail', type: 'pod' },
        { id: 'm5', x: 40, y: 70, name: 'St. Rose Parkway Site', type: 'existing' },
        { id: 'm6', x: 30, y: 55, name: 'Spring Valley Central', type: 'standard' },
        { id: 'm7', x: 65, y: 20, name: 'North Las Vegas Station', type: 'standard' },
        { id: 'm8', x: 45, y: 15, name: 'Centennial Hills Park', type: 'existing' },
      ],
      callouts: [
        { id: 'c1', x: 88, y: 28, title: 'FITNESS COURT STUDIO', image: 'https://github.com/NFC-FC/NFC-image-hosting/blob/main/FC_Studio.png?raw=true', colorType: 'primary' },
        { id: 'c2', x: 95, y: 58, title: 'FITNESS COURT', image: 'https://github.com/NFC-FC/NFC-image-hosting/blob/main/FC.png?raw=true', colorType: 'secondary' },
        { id: 'c3', x: 10, y: 85, title: 'FITNESS COURT POD', image: 'https://github.com/NFC-FC/NFC-image-hosting/blob/main/FC-Pod.png?raw=true', colorType: 'pod' },
      ],
      leaders: [
        {
          id: 'l1',
          name: "Shelley Berkley",
          title: "Mayor, City of Las Vegas",
          image: "https://www.sandiego.edu/uploads/7d8423fa1a9c1c212c60e6bfa1863092.jpg?raw=true"
        },
        {
          id: 'l2',
          name: "Brian Knudsen",
          title: "Mayor Pro Tem",
          image: "https://sawebfilesprod001.blob.core.windows.net/images/Knudsen-Headshot.jpg?raw=true"
        },
        {
          id: 'l3',
          name: "Maggie Plaster",
          title: "Parks & Rec Director",
          image: "https://github.com/NFC-FC/NFC-image-hosting/blob/04b9dee17b734ea8e2b55df7ce56a6ef817d0b01/maggie%20headshot.jpeg?raw=true"
        },
        {
          id: 'l4',
          name: "Sallie Doebler",
          title: "CEO, Mayors Fund",
          image: "https://businesspress.vegas/wp-content/uploads/2018/03/10214386_web1_sallie-doebler-head-shot.jpg?raw=true"
        },
        {
          id: 'l5',
          name: "Mitch Menaged",
          title: "NFC Founder",
          image: "https://assets.isu.pub/document-structure/230124185444-17c24fe7983cafa14389e16ccecb4dde/v1/39e8f199c13a4857b5b7372d691432b0.jpeg?raw=true"
        }
      ],
      endorsementQuote: '"Our partnership marks a pivotal turning point for the health of our city. This isn\'t just about a gym; it\'s about democratizing wellness and building a more resilient, connected Las Vegas for generations to come."',
      endorsementName: 'OFFICE OF THE MAYOR',
      endorsementImage: 'https://github.com/NFC-FC/NFC-image-hosting/blob/main/Las_Vegas_Mayor_Shelley_Berkley_app_June-23-2025-600x800.jpg?raw=true',
      communityAccess: '650k+',
      annualUses: '250k+',
      caloriesBurned: '25M+',
    },
    sponsors: [
      {
        id: 'default-vegas',
        sponsorName: 'Allegiant Air',
        sponsorLogo: 'https://github.com/NFC-FC/NFC-image-hosting/blob/main/Allegiant_Air_logo.svg.png?raw=true',
        sponsorPassword: 'vegas-allegiant-2026',
        overrides: {},
      },
      {
        id: 'vegas-dignity',
        sponsorName: 'Dignity Health',
        sponsorLogo: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Dignity_Health_logo.svg',
        sponsorPassword: 'vegas-dignity-2026',
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
      className="relative min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#020617]"
      style={
        {
          ['--brand-primary' as any]: config.primaryColor,
          ['--brand-accent' as any]: config.accentColor,
          ['--brand-secondary' as any]: config.secondaryColor,
        } as any
      }
    >
      <Suspense fallback={<div className="min-h-screen w-full bg-[#020617]" />}>
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
          {/* New Feature Video below Hero */}
          <FullWidthVideo config={config} />
          {/* Reordered: Reality (Impact/Infrastructure) with rotating GIF now follows Hero immediately */}
          <Section3Reality config={config} />
          {/* Adoption Section (Legislative Approval) follows impact */}
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
      </Suspense>

      {isEntered && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-40 w-full max-w-[100vw] box-border bg-black/80 backdrop-blur-xl min-h-14 sm:min-h-20 md:min-h-24 pt-[env(safe-area-inset-top)] flex items-center justify-between gap-2 px-3 sm:px-6 md:px-12 border-b border-white/10 overflow-hidden"
        >
          {/* Left: text shrinks and truncates so it always fits */}
          <div className="min-w-0 flex-1 flex items-center">
            <span
              onClick={() => navigate('/')}
              className="text-white/40 text-[7px] sm:text-[10px] font-black tracking-[0.15em] sm:tracking-[0.3em] uppercase cursor-pointer hover:text-white transition-colors truncate block"
              title="National Wellness Innovation Zone"
            >
              National Wellness Innovation Zone
            </span>
          </div>

          {/* Right: logos shrink to fit, never cut off */}
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
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-black flex flex-col items-center justify-center font-sans px-4">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-900/80 backdrop-blur-md border border-white/10 p-6 sm:p-10 rounded-2xl sm:rounded-[2rem] shadow-2xl flex flex-col gap-6 w-full max-w-md min-w-0"
      >
        <div className="text-center min-w-0">
          <h2 className="text-xl sm:text-2xl font-black text-white italic uppercase tracking-tighter break-words">
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
          className="bg-black/50 border border-white/10 text-white px-4 py-3 rounded-xl outline-none focus:border-[#009cdc] transition-colors text-base sm:text-sm text-center tracking-widest min-h-[2.75rem]"
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
  const [cities, setCities] = useState<CityGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    if (!supabase) {
      setCities(initialCities);
      setLoading(false);
      return;
    }
    try {
      const { data: citiesData, error: citiesError } = await supabase
        .from('cities')
        .select('*');
      
      const { data: sponsorsData, error: sponsorsError } = await supabase
        .from('sponsors')
        .select('*');

      if (citiesError) throw citiesError;
      if (sponsorsError) throw sponsorsError;

      if (citiesData && sponsorsData) {
        const mergedCities: CityGroup[] = citiesData.map(city => ({
          id: city.id,
          name: city.name,
          isArchived: city.is_archived,
          template: city.template,
          sponsors: sponsorsData
            .filter(s => s.city_id === city.id)
            .map(s => ({
              id: s.id,
              sponsorName: s.sponsor_name,
              sponsorLogo: s.sponsor_logo,
              sponsorPassword: s.sponsor_password,
              isArchived: s.is_archived,
              overrides: s.overrides || {},
            }))
        }));

        setCities(mergedCities);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setCities(initialCities);
    } finally {
      setLoading(false);
    }
  }

  const [activeEdit, setActiveEdit] = useState<{ cityId: string; sponsorId?: string } | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (loading) return;
    saveCities();
  }, [cities, loading]);

  async function saveCities() {
    if (!supabase) return;
    try {
      for (const city of cities) {
        await supabase
          .from('cities')
          .upsert({
            id: city.id,
            name: city.name,
            is_archived: city.isArchived,
            template: city.template,
          });

        for (const sponsor of city.sponsors) {
          await supabase
            .from('sponsors')
            .upsert({
              id: sponsor.id,
              city_id: city.id,
              sponsor_name: sponsor.sponsorName,
              sponsor_logo: sponsor.sponsorLogo,
              sponsor_password: sponsor.sponsorPassword,
              is_archived: sponsor.isArchived,
              overrides: sponsor.overrides,
            });
        }
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

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
      
      // Case 1: Updating City Template (AdminPanel sends { name, ...template })
      if (!sponsorId) {
        const { name: updatedName, ...templateOnly } = updatedData;
        return {
          ...city,
          ...(updatedName !== undefined && { name: updatedName }),
          template: templateOnly,
        };
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

      {activeEdit && (() => {
        const editCity = cities.find(c => c.id === activeEdit.cityId);
        if (!editCity) return null;
        return (
          <AdminPanel
            city={editCity}
            sponsorId={activeEdit.sponsorId}
            isOpen={true}
            onClose={() => setActiveEdit(null)}
            onUpdate={(data) => handleUpdate(activeEdit.cityId, activeEdit.sponsorId, data)}
          />
        );
      })()}
    </>
  );
};

export default App;