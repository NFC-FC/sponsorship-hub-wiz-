import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import type { CityGroup } from './App';

export interface AdminPageProps {
  cities: CityGroup[];
  setCities: React.Dispatch<React.SetStateAction<CityGroup[]>>;
  onEditSponsor: (cityId: string, sponsorId: string) => void;
  onEditCityTemplate: (cityId: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  cities,
  setCities,
  onEditSponsor,
  onEditCityTemplate,
  isAuthenticated,
  setIsAuthenticated,
}) => {
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
