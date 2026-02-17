import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
interface Props {
  config: { primaryColor: string; secondaryColor: string; accentColor?: string; projectCity?: string; projectName?: string; courtCount?: string; nfcLogo?: string };
}

const data = [
  { name: 'Year 1', activity: 20000 },
  { name: 'Year 2', activity: 60000 },
  { name: 'Year 3', activity: 120000 },
  { name: 'Year 4', activity: 190000 },
  { name: 'Year 5', activity: 475000 },
];

export const Impact: React.FC<Props> = ({ config }) => {
  return (
    <div className="bg-black py-16 px-6 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-3" style={{ backgroundColor: `${config.primaryColor}1A`, color: config.primaryColor }}>
            Network Performance
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase italic tracking-tighter leading-none">THE IMPACT BY <span style={{ color: config.primaryColor }}>YEARS.</span></h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base font-medium leading-relaxed">
            Sustainability over a decade. Every Fitness Court is a permanent catalyst for community health growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2 glass p-6 rounded-[2rem] h-[450px] border-white/5 shadow-inner flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: config.primaryColor }}>Active Network Users Growth (Annual)</h3>
              <div className="text-[10px] font-bold text-white/30 tracking-widest uppercase">Targeted Engagement</div>
            </div>
            <div className="flex-grow w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="impactGradientPrimary" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={config.primaryColor} stopOpacity={1} />
                      <stop offset="100%" stopColor={config.primaryColor} stopOpacity={0.3} />
                    </linearGradient>
                    <linearGradient id="impactGradientSecondary" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={config.secondaryColor} stopOpacity={1} />
                      <stop offset="100%" stopColor={config.secondaryColor} stopOpacity={0.3} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#666" 
                    fontSize={10} 
                    fontWeight="800" 
                    tickLine={false} 
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis hide domain={[0, 500000]} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                    contentStyle={{ 
                      backgroundColor: '#050505', 
                      border: '1px solid rgba(255,255,255,0.1)', 
                      borderRadius: '20px', 
                      padding: '12px',
                      boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                    }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '12px' }}
                    labelStyle={{ color: config.primaryColor, marginBottom: '4px', fontWeight: 'bold', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                    formatter={(value: number) => [`${value.toLocaleString()} Users`, 'Active Network']}
                  />
                  <Bar dataKey="activity" radius={[12, 12, 12, 12]} barSize={48} animationDuration={1500}>
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 4 ? "url(#impactGradientSecondary)" : "url(#impactGradientPrimary)"} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-col gap-4 h-[450px]">
            <div className="glass p-6 rounded-[1.5rem] flex-1 flex flex-col justify-center border-white/5 relative overflow-hidden group">
              <div className="text-4xl font-black text-white mb-0.5 tracking-tighter">475k+</div>
              <div className="uppercase text-[8px] font-black tracking-[0.4em]" style={{ color: config.primaryColor }}>Active Residents (Year 5)</div>
              <p className="text-[9px] text-gray-500 mt-2 leading-relaxed">Projected annual engagement across {config.courtCount} Fitness Courts by year five.</p>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            </div>
            <div className="glass p-6 rounded-[1.5rem] flex-1 flex flex-col justify-center border-white/5 relative overflow-hidden group">
              <div className="text-4xl font-black text-white mb-0.5 tracking-tighter">7 min</div>
              <div className="uppercase text-[8px] font-black tracking-[0.4em]" style={{ color: config.secondaryColor }}>Optimized Daily Circuit</div>
              <p className="text-[9px] text-gray-500 mt-2 leading-relaxed">Functional bodyweight training designed for efficiency and community flow.</p>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            </div>
            <div className="glass p-6 rounded-[1.5rem] flex-1 flex flex-col justify-center border-white/5 relative overflow-hidden group">
              <div className="text-4xl font-black text-white mb-0.5 tracking-tighter">$0</div>
              <div className="uppercase text-[8px] font-black tracking-[0.4em]" style={{ color: config.accentColor }}>Access Barriers</div>
              <p className="text-[9px] text-gray-500 mt-2 leading-relaxed">Democratizing health by removing financial barriers to world-class equipment.</p>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};