
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

interface Config {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  projectCity: string;
  courtCount: string;
}

interface Props {
  config: Config;
}

const annualData = [
  { name: 'Year 1', activity: 25 },
  { name: 'Year 2', activity: 42 },
  { name: 'Year 3', activity: 65 },
  { name: 'Year 4', activity: 88 },
  { name: 'Year 5', activity: 100 },
];

export const ImpactLab: React.FC<Props> = ({ config }) => {
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
          <div className="lg:col-span-2 flex flex-col">
            {/* Unified Growth Graph */}
            <div className="glass p-12 rounded-[4rem] h-[600px] flex flex-col border-white/5 shadow-2xl overflow-hidden group">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="text-lg font-black uppercase tracking-[0.4em] text-white mb-2">Active Network Users Growth</h3>
                  <p className="text-[10px] font-bold text-white/30 tracking-widest uppercase">Projected Annual Community Engagement Index</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config.primaryColor }}></div>
                    <span className="text-[9px] font-black text-white/50 uppercase">Initial Phase</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config.secondaryColor }}></div>
                    <span className="text-[9px] font-black text-white/50 uppercase">Maturity</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-grow w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={annualData}
                    margin={{ top: 20, right: 30, left: -20, bottom: 40 }}
                  >
                    <defs>
                      <linearGradient id="barGradientPrimary" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={config.primaryColor} stopOpacity={1} />
                        <stop offset="100%" stopColor={config.primaryColor} stopOpacity={0.4} />
                      </linearGradient>
                      <linearGradient id="barGradientSecondary" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={config.secondaryColor} stopOpacity={1} />
                        <stop offset="100%" stopColor={config.secondaryColor} stopOpacity={0.4} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.03)" strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#444" 
                      fontSize={11} 
                      fontWeight="900" 
                      tickLine={false} 
                      axisLine={false}
                      dy={20}
                    />
                    <YAxis hide domain={[0, 110]} />
                    <Tooltip 
                      cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                      contentStyle={{ 
                        backgroundColor: '#0a0a0a', 
                        border: '1px solid rgba(255,255,255,0.1)', 
                        borderRadius: '32px', 
                        padding: '24px',
                        boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
                        backdropFilter: 'blur(20px)'
                      }}
                      itemStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '14px' }}
                      labelStyle={{ color: config.primaryColor, marginBottom: '8px', fontWeight: '900', letterSpacing: '0.1em', fontSize: '10px', textTransform: 'uppercase' }}
                      formatter={(value: number) => [`${value}% Engagement`, 'Activity']}
                    />
                    <Bar 
                      dataKey="activity" 
                      radius={[16, 16, 16, 16]} 
                      barSize={60}
                      animationDuration={2000}
                    >
                      {annualData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={index === 4 ? "url(#barGradientSecondary)" : "url(#barGradientPrimary)"}
                          className="transition-all duration-500 hover:opacity-100 opacity-80"
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="glass p-10 rounded-[2.5rem] flex-1 flex flex-col justify-center border-white/5 relative overflow-hidden group">
              <div className="text-6xl font-black text-white mb-2 tracking-tighter">100k+</div>
              <div className="uppercase text-[10px] font-black tracking-[0.4em]" style={{ color: config.primaryColor }}>Active Residents (Year 5)</div>
              <p className="text-[10px] text-gray-500 mt-4 leading-relaxed">Projected annual engagement across {config.courtCount} Fitness Courts by year five.</p>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            </div>
            <div className="glass p-10 rounded-[2.5rem] flex-1 flex flex-col justify-center border-white/5 relative overflow-hidden group">
              <div className="text-6xl font-black text-white mb-2 tracking-tighter">7 min</div>
              <div className="uppercase text-[10px] font-black tracking-[0.4em]" style={{ color: config.secondaryColor }}>Optimized Daily Circuit</div>
              <p className="text-[10px] text-gray-500 mt-4 leading-relaxed">Functional bodyweight training designed for efficiency and community flow.</p>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            </div>
            <div className="glass p-10 rounded-[2.5rem] flex-1 flex flex-col justify-center border-white/5 relative overflow-hidden group">
              <div className="text-6xl font-black text-white mb-2 tracking-tighter">$0</div>
              <div className="uppercase text-[10px] font-black tracking-[0.4em]" style={{ color: config.accentColor }}>Access Barriers</div>
              <p className="text-[10px] text-gray-500 mt-4 leading-relaxed">Democratizing health by removing financial barriers to world-class equipment.</p>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            </div>
            <div className="glass p-10 rounded-[2.5rem] flex-1 flex flex-col justify-center border-white/5 bg-gradient-to-br from-[#005587]/20 to-transparent">
              <div className="text-sm font-black text-white uppercase tracking-[0.2em] mb-4">Network Resilience</div>
              <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                Our deployment strategy ensures that over 90% of the population resides within a 10-minute bike ride of a Fitness Court.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
