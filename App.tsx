import React, { Suspense, useEffect, useMemo, useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate,
} from 'react-router-dom';
import { supabase } from './src/supabaseClient';

import SponsorEntryPage from './pages/SponsorEntryPage';

// Lazy load heavy routes so initial load (hub) is fast on mobile
const SitePreviewPage = React.lazy(() => import('./SitePreviewPage').then(m => ({ default: m.SitePreviewPage })));
const AdminPage = React.lazy(() => import('./AdminPage').then(m => ({ default: m.AdminPage })));
const AdminPanel = React.lazy(() => import('./components/AdminPanel').then(m => ({ default: m.AdminPanel })));

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

const STORAGE_KEY = 'nfc-cities-v4';

const App: React.FC = () => {
  const [cities, setCities] = useState<CityGroup[]>(initialCities);
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
      [id, allSponsorsMerged]
    );
    return active ? (
      <Suspense fallback={<div className="min-h-screen bg-[#020617] flex items-center justify-center"><span className="text-white/60 text-sm">Loading...</span></div>}>
        <SitePreviewPage config={active} />
      </Suspense>
    ) : (
      <Navigate to="/" replace />
    );
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
            <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><span className="text-white/60 text-sm">Loading...</span></div>}>
              <AdminPage
                cities={cities}
                setCities={setCities}
                onEditSponsor={(cid, sid) => setActiveEdit({ cityId: cid, sponsorId: sid })}
                onEditCityTemplate={(cid) => setActiveEdit({ cityId: cid })}
                isAuthenticated={isAdminAuthenticated}
                setIsAuthenticated={setIsAdminAuthenticated}
              />
            </Suspense>
          }
        />
        <Route path="/site/:id" element={<SitePreviewRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {activeEdit && (() => {
        const editCity = cities.find(c => c.id === activeEdit.cityId);
        if (!editCity) return null;
        return (
          <Suspense fallback={null}>
            <AdminPanel
              city={editCity}
              sponsorId={activeEdit.sponsorId}
              isOpen={true}
              onClose={() => setActiveEdit(null)}
              onUpdate={(data) => handleUpdate(activeEdit.cityId, activeEdit.sponsorId, data)}
            />
          </Suspense>
        );
      })()}
    </>
  );
};

export default App;