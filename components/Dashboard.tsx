import React, { useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { CityGroup, SponsorRecord, CityTemplate } from "../App";

interface Props {
  cities: CityGroup[];
  setCities: React.Dispatch<React.SetStateAction<CityGroup[]>>;
  onEditSponsor: (cityId: string, sponsorId: string) => void;
  onEditCityTemplate: (cityId: string) => void;
}

const normalizeCity = (s: string) => s.trim();
const makeId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

type PendingAction =
  | { kind: "archiveCity"; cityId: string }
  | { kind: "purgeCity"; cityId: string }
  | { kind: "archiveSponsor"; cityId: string; sponsorId: string }
  | { kind: "purgeSponsor"; cityId: string; sponsorId: string }
  | null;

export const Dashboard: React.FC<Props> = ({ cities, setCities, onEditSponsor, onEditCityTemplate }) => {
  const navigate = useNavigate();
  const [showArchive, setShowArchive] = useState(false);
  const [isCreateCityOpen, setIsCreateCityOpen] = useState(false);
  const [isAddSponsorOpen, setIsAddSponsorOpen] = useState(false);
  const [newCityName, setNewCityName] = useState("");
  const [selectedCityId, setSelectedCityId] = useState<string>("");
  const [newSponsorName, setNewSponsorName] = useState("");
  const [pending, setPending] = useState<PendingAction>(null);

  const activeCities = useMemo(() => {
    return cities
      .filter((c) => !c.isArchived)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [cities]);

  const handleCreateCity = (e: React.FormEvent) => {
    e.preventDefault();
    const name = normalizeCity(newCityName);
    if (!name) return;

    // Initialize with a clean slate of placeholder text instead of copying existing data
    const blankTemplate: CityTemplate = {
      projectName: 'Community Wellness Innovation',
      cityLogo: 'https://via.placeholder.com/400x400?text=City+Seal+Link',
      nfcLogo: 'https://github.com/NFC-FC/NFC-image-hosting/blob/main/01-Main-Shield.png?raw=true',
      primaryColor: '#009cdc',
      accentColor: '#FF5432',
      secondaryColor: '#FBAB18',
      investmentAmount: '$0',
      courtCount: '0',
      wardCount: '1',
      wardType: 'Wards',
      wardNames: ['Enter Council Member Name'],
      heroVideo: 'https://cdn.prod.website-files.com/638a20d9b98c2f709f1402cb/63efc95f26ac7b6b0e192a29_V14%20(1920%20%C3%97%20650%20px)-transcode.mp4',
      secondaryVideo: 'https://cdn.prod.website-files.com/638a20d9b98c2f709f1402cb/63efc95f26ac7b6b0e192a29_V14%20(1920%20%C3%97%20650%20px)-transcode.mp4',
      masterPlanBackground: 'https://via.placeholder.com/1920x1080?text=Map+Layer+Background+Link',
      sponsorRender: 'https://nationalfitnesscampaign.com/wp-content/uploads/2023/06/LV_ALLEGIANT_RENDER_HQ.png',
      leaders: [],
      endorsementQuote: '"Enter the official city leadership quote here. This is a placeholder for your partnership endorsement."',
      endorsementName: 'NAME OF SPEAKER',
      endorsementImage: 'https://via.placeholder.com/600x800?text=Leader+Portrait+Link',
      markers: [],
      callouts: [],
      communityAccess: '650k+',
      annualUses: '250k+',
      caloriesBurned: '25M+',
    };

    const newCity: CityGroup = {
      id: makeId("city"),
      name,
      template: blankTemplate,
      sponsors: [],
      isArchived: false,
    };

    setCities((prev) => [...prev, newCity]);
    setNewCityName("");
    setIsCreateCityOpen(false);
  };

  const handleAddSponsor = (e: React.FormEvent) => {
    e.preventDefault();
    const sponsorName = newSponsorName.trim();
    if (!selectedCityId || !sponsorName) return;

    const newSponsor: SponsorRecord = {
      id: makeId("proj"),
      sponsorName,
      sponsorLogo: "https://via.placeholder.com/200x100?text=Sponsor+Logo",
      overrides: {},
      isArchived: false,
    };

    setCities((prev) =>
      prev.map((c) =>
        c.id === selectedCityId ? { ...c, sponsors: [...c.sponsors, newSponsor] } : c
      )
    );

    setNewSponsorName("");
    setIsAddSponsorOpen(false);
  };

  const archiveCity = (cityId: string) => {
    setCities((prev) => prev.map((c) => (c.id === cityId ? { ...c, isArchived: true } : c)));
    setPending(null);
  };

  const archiveSponsor = (cityId: string, sponsorId: string) => {
    setCities((prev) =>
      prev.map((city) => 
        city.id === cityId 
          ? { ...city, sponsors: city.sponsors.map(s => s.id === sponsorId ? { ...s, isArchived: true } : s) } 
          : city
      )
    );
    setPending(null);
  };

  const isPending = (check: PendingAction) => {
    if (!pending || !check) return false;
    return JSON.stringify(pending) === JSON.stringify(check);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 font-sans selection:bg-[#009cdc]">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/10 pb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.4em]">System Console v4.5</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
              NFC PORTAL <span className="text-[#009cdc]">DASHBOARD</span>
            </h1>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setIsCreateCityOpen(true)} className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl">
              + New City Hub
            </button>
            <button 
              onClick={() => {
                if (activeCities.length > 0) {
                  setSelectedCityId(activeCities[0].id);
                  setIsAddSponsorOpen(true);
                }
              }} 
              className="bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest border border-white/10"
            >
              + Add Sponsor
            </button>
          </div>
        </header>

        <div className="space-y-24">
          {activeCities.map((city) => (
            <section key={city.id}>
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
                <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-white/90">
                  {city.name}
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent"></div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => onEditCityTemplate(city.id)}
                    className="bg-[#009cdc]/10 text-[#009cdc] hover:bg-[#009cdc]/20 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-[#009cdc]/20"
                  >
                    Edit Template
                  </button>
                  {!isPending({ kind: "archiveCity", cityId: city.id }) ? (
                    <button onClick={() => setPending({ kind: "archiveCity", cityId: city.id })} className="bg-zinc-900 text-zinc-500 hover:text-red-500 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5">
                      Archive Hub
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={() => archiveCity(city.id)} className="bg-red-500 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest">Confirm</button>
                      <button onClick={() => setPending(null)} className="text-zinc-500 px-4 py-2.5 text-[10px] uppercase font-bold">Cancel</button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {city.sponsors.filter(s => !s.isArchived).map((sponsor) => (
                  <div key={sponsor.id} className="bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-6 flex flex-col group hover:border-white/20">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 overflow-hidden flex items-center justify-center">
                        <img src={sponsor.sponsorLogo} alt={sponsor.sponsorName} className="w-10 h-10 object-contain" />
                      </div>
                      <h3 className="font-bold uppercase tracking-tight text-white truncate text-sm">{sponsor.sponsorName}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      <button onClick={() => navigate(`/site/${sponsor.id}`)} className="bg-white text-black py-3 rounded-xl text-[9px] font-black uppercase tracking-widest">Launch</button>
                      <button onClick={() => onEditSponsor(city.id, sponsor.id)} className="bg-white/5 hover:bg-white/10 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest">Edit</button>
                      {!isPending({ kind: "archiveSponsor", cityId: city.id, sponsorId: sponsor.id }) ? (
                        <button onClick={() => setPending({ kind: "archiveSponsor", cityId: city.id, sponsorId: sponsor.id })} className="col-span-2 bg-zinc-800 text-zinc-500 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest mt-1">Archive Sponsor</button>
                      ) : (
                        <div className="col-span-2 flex gap-2 mt-1">
                          <button onClick={() => archiveSponsor(city.id, sponsor.id)} className="flex-1 bg-red-500 py-3 rounded-xl text-[9px] font-black uppercase">Delete</button>
                          <button onClick={() => setPending(null)} className="flex-1 bg-zinc-800 py-3 rounded-xl text-[9px] font-black uppercase">Cancel</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Create City Modal */}
        <AnimatePresence>
          {isCreateCityOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setIsCreateCityOpen(false)} />
              <motion.form initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onSubmit={handleCreateCity} className="relative w-full max-w-lg bg-zinc-900 border border-white/10 p-10 rounded-[3rem]">
                <h2 className="text-2xl font-black italic uppercase text-center mb-8 tracking-tighter">Initialize City Hub</h2>
                <input required autoFocus type="text" placeholder="e.g. San Francisco" value={newCityName} onChange={(e) => setNewCityName(e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white tracking-widest outline-none focus:border-[#009cdc] mb-6" />
                <button type="submit" className="w-full bg-[#009cdc] text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest">Create Hub</button>
              </motion.form>
            </div>
          )}
        </AnimatePresence>

        {/* Add Sponsor Modal */}
        <AnimatePresence>
          {isAddSponsorOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setIsAddSponsorOpen(false)} />
              <motion.form initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onSubmit={handleAddSponsor} className="relative w-full max-w-lg bg-zinc-900 border border-white/10 p-10 rounded-[3rem]">
                <h2 className="text-2xl font-black italic uppercase text-center mb-8 tracking-tighter">Deploy New Sponsor</h2>
                <div className="space-y-4">
                  <select value={selectedCityId} onChange={(e) => setSelectedCityId(e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white uppercase tracking-widest outline-none">
                    {activeCities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <input required type="text" placeholder="Sponsor Name" value={newSponsorName} onChange={(e) => setNewSponsorName(e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white tracking-widest outline-none focus:border-[#009cdc]" />
                </div>
                <button type="submit" className="w-full bg-[#009cdc] text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest mt-8">Add Sponsor</button>
              </motion.form>
            </div>
          )}
        </AnimatePresence>

        <button onClick={() => navigate("/")} className="fixed bottom-10 left-10 text-white/20 hover:text-white transition-colors text-[9px] font-black uppercase tracking-[0.5em]">
          ← Return to Gateway
        </button>
      </div>
    </div>
  );
};