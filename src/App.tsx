import React, { useState, useEffect } from 'react';
import { Users, Leaf, AlertCircle, Droplet, Fish, Trash2, Recycle, TrendingUp, Globe, ExternalLink, Sun, Moon, Loader2, Quote, ArrowRight } from 'lucide-react';

interface PlasticData {
  TIME_PERIOD: string;
  OBS_VALUE: string | number;
}

interface FormattedData {
  year: string;
  value: string;
  percentHeight: number;
  isLastYear?: boolean;
}

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [realGrowthData, setRealGrowthData] = useState<FormattedData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://backend-plastic-pollution.onrender.com/stats/plastic');
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const data: PlasticData[] = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
          const sorted = [...data].sort((a, b) => parseInt(a.TIME_PERIOD) - parseInt(b.TIME_PERIOD));

          const grouped: { [key: string]: number } = {};
          sorted.forEach(item => {
            const year = parseInt(item.TIME_PERIOD);
            const periodStart = Math.floor(year / 5) * 5; 
            const val = parseFloat(item.OBS_VALUE.toString()) || 0;
            if (!grouped[periodStart]) grouped[periodStart] = 0;
            grouped[periodStart] += val;
          });

          const latestEntry = sorted[sorted.length - 1];
          const latestValue = parseFloat(latestEntry.OBS_VALUE.toString()) || 0;
          const periods = Object.keys(grouped).sort();
          const allValues = [...Object.values(grouped), latestValue];
          
          const maxVal = Math.max(...allValues);
          const minVal = Math.min(...allValues);
          const diff = maxVal - minVal;

          const getPercentHeight = (current: number) => {
            if (diff === 0) return 80;
            return 20 + ((current - minVal) / diff) * 80;
          };

          const formattedPeriods = periods.map(year => ({
            year: `${year}s`,
            value: `${Math.round(grouped[year])}M`,
            percentHeight: getPercentHeight(grouped[year])
          }));

          const lastYearCol = {
            year: latestEntry.TIME_PERIOD,
            value: `${Math.round(latestValue)}M`,
            percentHeight: getPercentHeight(latestValue),
            isLastYear: true
          };

          setRealGrowthData([...formattedPeriods, lastYearCol]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const team = [
    { name: "Artem Peresada", role: "Backend / Logic / Design", task: "Integration of API data, pollution statistics and design", github: "REvDl"},
    { name: "Mihailo Petrović", role: "DevOps / Deploy / Design", github: "VargKernel", task: "Site deployment, maintenance and design" }
  ];

  const statistics = [
    { icon: TrendingUp, value: "460M", label: "Produced Annually", color: "text-red-600" },
    { icon: Droplet, value: "11M", label: "Oceans Entry/Year", color: "text-blue-600" },
    { icon: Fish, value: "1M+", label: "Animals Affected", color: "text-cyan-600" },
    { icon: Globe, value: "171T", label: "Ocean Particles", color: "text-emerald-600" }
  ];

  const impacts = [
    { title: "Marine Life Threat", description: "Sea turtles, whales, and seabirds mistake plastic for food. Ingestion causes physical blockages and starvation.", icon: Fish },
    { title: "Microplastic Cycle", description: "Microplastics absorb toxins and are eaten by plankton. These pollutants eventually reach humans through the food chain.", icon: Leaf },
    { title: "Human Health", description: "Research has detected microplastics in human blood. Chemical additives like BPA are linked to endocrine issues.", icon: AlertCircle }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-200 transition-colors duration-500">
      
      {/* Theme Toggle */}
      <button onClick={toggleTheme} className="fixed top-6 right-6 z-50 p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-xl hover:scale-110 active:scale-95 transition-all">
        {isDark ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-blue-600" />}
      </button>

      <style>{`
        @keyframes growUp { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        .animate-grow { transform-origin: bottom; animation: growUp 1.2s cubic-bezier(0.33, 1, 0.68, 1) forwards; }
        .custom-scrollbar::-webkit-scrollbar { height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
      `}</style>

      {/* Header */}
      <header className="relative bg-slate-900 text-white py-32 px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center bg-blue-500/20 backdrop-blur-xl px-4 py-2 rounded-full mb-8 border border-white/10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] flex items-center">
              <Droplet className="w-4 h-4 mr-2 text-blue-400 animate-bounce" /> Live OECD Environmental Intelligence
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
            Plastic <br/>Symphony
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Every minute, the equivalent of one garbage truck of plastic is dumped into our ocean. 
            Track the history of global waste production and its irreversible impact.
          </p>
        </div>
      </header>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {statistics.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 transition-all hover:-translate-y-2">
              <stat.icon className={`w-8 h-8 mb-6 ${stat.color}`} />
              <div className="text-4xl font-black mb-1 tracking-tight">{stat.value}</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* NEW HERO CHART SECTION */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Column: Context & CTA */}
          <div className="lg:w-1/3 space-y-10">
            <div className="space-y-4">
              <Quote className="w-12 h-12 text-blue-600 dark:text-blue-500 opacity-50" />
              <h2 className="text-4xl font-black leading-tight tracking-tight dark:text-white">
                The growth of waste is <span className="text-blue-600">exponential</span>. 
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Since 1950, humans have produced over 8.3 billion metric tons of plastic. Half of this has been produced in just the last 15 years.
              </p>
            </div>

            <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl">
              <h4 className="text-emerald-600 dark:text-emerald-400 font-bold mb-2 flex items-center">
                <Info className="w-4 h-4 mr-2" /> Quick Fact
              </h4>
              <p className="text-sm text-emerald-800/80 dark:text-emerald-400/80 leading-snug">
                The most recent year in our dataset reflects a massive shift towards industrial single-use polymers.
              </p>
            </div>

            <button className="group flex items-center gap-3 bg-slate-900 dark:bg-white dark:text-black text-white px-8 py-4 rounded-2xl font-bold transition-all hover:gap-5 hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white">
              Take Action Now <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right Column: The Chart */}
          <div className="lg:w-2/3 w-full bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-inner border border-slate-100 dark:border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <span className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div> Live Feed
              </span>
            </div>
            
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-16">Global Waste Volumetrics</h3>
            
            <div className="h-80 flex items-end justify-between gap-3 border-b-2 border-slate-100 dark:border-slate-800 pb-2">
              {isLoading ? (
                <div className="w-full flex justify-center"><Loader2 className="animate-spin text-blue-600" /></div>
              ) : (
                realGrowthData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold py-1.5 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 z-50">
                      {d.value}
                    </div>
                    <div 
                      className={`w-full max-w-[50px] rounded-t-xl transition-all duration-1000 ease-out animate-grow group-hover:brightness-125 ${
                        d.isLastYear 
                          ? 'bg-gradient-to-t from-emerald-600 to-teal-400 shadow-[0_-10px_20px_-5px_rgba(16,185,129,0.3)]' 
                          : 'bg-gradient-to-t from-blue-700 via-blue-500 to-cyan-400 shadow-[0_-10px_20px_-5px_rgba(59,130,246,0.2)]'
                      }`}
                      style={{ height: `${d.percentHeight}%` }}
                    />
                    <span className={`text-[10px] font-black mt-6 tracking-tighter ${
                      d.isLastYear ? 'text-emerald-500' : 'text-slate-400'
                    }`}>
                      {d.year}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="max-w-7xl mx-auto px-8 py-24 bg-white/50 dark:bg-slate-900/50 rounded-[4rem]">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black mb-4 tracking-tight">The Cost of Inaction</h2>
          <p className="text-slate-500">The ecological consequences are already irreversible.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {impacts.map((impact, index) => (
            <div key={index} className="group">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 transform group-hover:rotate-12 transition-transform shadow-xl shadow-blue-600/20">
                <impact.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{impact.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{impact.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team & Sources Section */}
      <section className="max-w-7xl mx-auto px-8 py-32 border-t border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          <div className="lg:col-span-1 space-y-12">
            <div>
              <h3 className="text-2xl font-black mb-8">Data Sources</h3>
              <div className="space-y-6">
                {[
                  { name: "OECD Global Plastics", url: "https://www.oecd.org/en/topics/sub-issues/plastics.html" },
                  { name: "Science Journal (2017)", url: "https://www.science.org/doi/10.1126/sciadv.1700782" },
                  { name: "UNEP Report 2024", url: "https://www.unep.org/intergovernmental-negotiating-committee-plastic-pollution" }
                ].map((s, idx) => (
                  <a key={idx} href={s.url} target="_blank" rel="noreferrer" className="flex items-center text-slate-500 hover:text-blue-600 transition-colors font-bold text-sm">
                    {s.name} <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="flex items-center mb-12">
              <Users className="w-6 h-6 mr-3 text-blue-600" />
              <h2 className="text-2xl font-black">Core Contributors</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {team.map((member, index) => (
                <div key={index} className="flex items-center space-x-6 p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-slate-800 group">
                  <a href={`https://github.com/${member.github}`} target="_blank" rel="noreferrer">
                    <img src={`https://github.com/${member.github}.png`} className="w-20 h-20 rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-500 shadow-lg" alt={member.name} />
                  </a>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white">{member.name}</h4>
                    <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.2em] mb-2">{member.role}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">{member.task}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center py-20 border-t border-slate-200 dark:border-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-[0.5em]">
        Group Project — Scientific Visualization 2026
      </footer>
    </div>
  );
};

export default App;
