
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  config: { 
    primaryColor: string; 
    secondaryColor: string; 
    accentColor?: string; 
    projectCity?: string; 
    projectName?: string; 
    courtCount?: string; 
    nfcLogo?: string 
  };
}

const savingsData = [
  { year: 'Yr 1', savings: 0.8 },
  { year: 'Yr 2', savings: 2.2 },
  { year: 'Yr 3', savings: 4.5 },
  { year: 'Yr 4', savings: 7.1 },
  { year: 'Yr 5', savings: 10.2 },
  { year: 'Yr 6', savings: 13.5 },
  { year: 'Yr 7', savings: 16.8 },
  { year: 'Yr 8', savings: 19.4 },
  { year: 'Yr 9', savings: 21.2 },
  { year: 'Yr 10', savings: 22.5 },
];

export const Impact: React.FC<Props> = ({ config }) => {
  return (
    <div className="bg-black py-24 px-6 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-4" style={{ backgroundColor: `${config.primaryColor}1A`, color: config.primaryColor }}>
            Legacy of Wellness
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-white mb-6 uppercase italic tracking-tighter leading-none">THE IMPACT <span style={{ color: config.primaryColor }}>OVER A DECADE.</span></h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-medium leading-relaxed">
            A permanent catalyst for community health growth. By transforming the built environment, we unlock multi-generational health benefits.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          <div className="lg:col-span-2 glass p-8 rounded-[3rem] h-[300px] sm:h-[500px] border-white/5 shadow-2xl flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white" style={{ color: config.primaryColor }}>Projected Healthcare Savings</h3>
                <p className="text-[9px] font-bold text-white/30 tracking-widest uppercase mt-1">Cumulative USD Impact (Millions)</p>
              </div>
              <div className="text-[10px] font-bold text-white/30 tracking-widest uppercase">10-Year Roadmap</div>
            </div>
            <div className="flex-grow w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={savingsData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="impactAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={config.primaryColor} stopOpacity={0.4}/>
                      <stop offset="95%" stopColor={config.primaryColor} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="year" 
                    stroke="#444" 
                    fontSize={10} 
                    fontWeight="900" 
                    tickLine={false} 
                    axisLine={false}
                    dy={15}
                  />
                  <YAxis hide domain={[0, 25]} />
                  <Tooltip 
                    cursor={{ stroke: config.primaryColor, strokeWidth: 1, strokeDasharray: '4 4' }}
                    contentStyle={{ 
                      backgroundColor: '#050505', 
                      border: '1px solid rgba(255,255,255,0.1)', 
                      borderRadius: '24px', 
                      padding: '16px',
                      boxShadow: '0 25px 60px rgba(0,0,0,0.8)'
                    }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '14px' }}
                    labelStyle={{ color: config.primaryColor, marginBottom: '4px', fontWeight: 'bold', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                    formatter={(value: number) => [`$${value} Million`, 'Cumulative Savings']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="savings" 
                    stroke={config.primaryColor} 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#impactAreaGradient)" 
                    animationDuration={2500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-3 lg:flex lg:flex-col gap-3 lg:gap-6">
            <div className="glass p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] flex-1 flex flex-col justify-center border-white/5 relative overflow-hidden group">
              <div className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-1 tracking-tighter">650k+</div>
              <div className="uppercase text-[8px] sm:text-[9px] font-black tracking-[0.4em]" style={{ color: config.primaryColor }}>Community Access</div>
              <p className="hidden sm:block text-[10px] text-gray-500 mt-3 leading-relaxed">Residents served by 10 min accessibility radius.</p>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            </div>

            <div className="glass p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] flex-1 flex flex-col justify-center border-white/5 relative overflow-hidden group">
              <div className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-1 tracking-tighter">250k+</div>
              <div className="uppercase text-[8px] sm:text-[9px] font-black tracking-[0.4em]" style={{ color: config.secondaryColor }}>Annual Uses</div>
              <p className="hidden sm:block text-[10px] text-gray-500 mt-3 leading-relaxed">Projected annual workout sessions across the city-wide network.</p>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            </div>

            <div className="glass p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] flex-1 flex flex-col justify-center border-white/5 relative overflow-hidden group">
              <div className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-1 tracking-tighter">25M+</div>
              <div className="uppercase text-[8px] sm:text-[9px] font-black tracking-[0.4em]" style={{ color: config.accentColor }}>Calories Burned</div>
              <p className="hidden sm:block text-[10px] text-gray-500 mt-3 leading-relaxed">Cumulative active energy expenditure contributing to lower BMI city-wide.</p>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
