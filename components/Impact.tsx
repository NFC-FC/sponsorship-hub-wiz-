
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SiteConfig } from '../App.tsx';

interface Props {
  config: SiteConfig;
}

const data = [
  { name: 'Year 1', activity: 4000 },
  { name: 'Year 2', activity: 12000 },
  { name: 'Year 3', activity: 24000 },
  { name: 'Year 4', activity: 38000 },
  { name: 'Year 5', activity: 95000 },
];

// Added config prop to match App.tsx usage and brand the component dynamically
export const Impact: React.FC<Props> = ({ config }) => {
  return (
    <div className="bg-black py-32 px-6 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <div className="inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ backgroundColor: `${config.primaryColor}1A`, color: config.primaryColor }}>
            Network Performance
          </div>
          <h2 className="text-6xl font-black text-white mb-8 uppercase italic tracking-tighter leading-none">THE IMPACT BY <span style={{ color: config.primaryColor }}>YEARS.</span></h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
            Sustainability over a decade. Every Fitness Court is a permanent catalyst for community health growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 glass p-10 rounded-[3rem] h-[500px] border-white/5 shadow-inner">
            <h3 className="text-xs font-black mb-10 uppercase tracking-[0.4em]" style={{ color: config.primaryColor }}>Active Network Users Growth (Annual)</h3>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#666" fontSize={11} fontWeight="800" tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '16px' }}
                  itemStyle={{ color: config.primaryColor, fontWeight: 'bold' }}
                />
                <Bar dataKey="activity" radius={[16, 16, 16, 16]} barSize={44}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 4 ? config.secondaryColor : config.primaryColor} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col gap-6">
            <div className="glass p-10 rounded-[2.5rem] flex-1 flex flex-col justify-center border-white/5 relative overflow-hidden group">
              <div className="text-6xl font-black text-white mb-2 tracking-tighter">100k+</div>
              <div className="uppercase text-[10px] font-black tracking-[0.4em]" style={{ color: config.primaryColor }}>Active Residents (Year 5)</div>
              <p className="text-[10px] text-gray-500 mt-4 leading-relaxed">Projected annual engagement across {config.courtCount} Fitness Courts by year five.</p>
            </div>
            <div className="glass p-10 rounded-[2.5rem] flex-1 flex flex-col justify-center border-white/5 relative overflow-hidden group">
              <div className="text-6xl font-black text-white mb-2 tracking-tighter">7 min</div>
              <div className="uppercase text-[10px] font-black tracking-[0.4em]" style={{ color: config.secondaryColor }}>Optimized Daily Circuit</div>
              <p className="text-[10px] text-gray-500 mt-4 leading-relaxed">Functional bodyweight training designed for efficiency and community flow.</p>
            </div>
            <div className="glass p-10 rounded-[2.5rem] flex-1 flex flex-col justify-center border-white/5 relative overflow-hidden group">
              <div className="text-6xl font-black text-white mb-2 tracking-tighter">$0</div>
              <div className="uppercase text-[10px] font-black tracking-[0.4em]" style={{ color: config.accentColor }}>Access Barriers</div>
              <p className="text-[10px] text-gray-500 mt-4 leading-relaxed">Democratizing health by removing financial barriers to world-class equipment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
