import React, { useState, useEffect } from 'react';
import { Users, Leaf, AlertCircle, Droplet, Fish, Recycle, TrendingUp, Globe, ExternalLink, Sun, Moon, Loader2, Quote, ArrowRight, Info } from 'lucide-react';

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
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-900 dark:to-slate-900 text-white py-24 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30">
            <span className="text-xs font-bold uppercase tracking-widest flex items-center">
              <Droplet className="w-4 h-4 mr-2 animate-pulse" /> Live OECD Environmental Data
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Plastic Pollution</h1>
        </div>
      </header>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-8 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 transform hover:-translate-y-2 transition-all duration-300">
              <stat.icon className={`w-10 h-10 mb-4 ${stat.color}`} />
              <div className="text-4xl font-black mb-1 dark:text-white">{stat.value}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TWO-COLUMN CHART SECTION */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left Side: Context & Quote */}
          <div className="lg:w-1/3 space-y-8">
            <div className="relative">
              <Quote className="absolute -top-6 -left-6 w-12 h-12 text-blue-600/10 dark:text-blue-400/10" />
              <h2 className="text-4xl font-black leading-tight tracking-tight dark:text-white">
                The pace of waste is <span className="text-blue-600">accelerating</span>. 
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                Since 1950, humans have produced over 8.3 billion metric tons of plastic. Without systemic change, this volume is set to triple by 2060.
              </p>
            </div>

            <div className="flex items-start gap-4 p-5 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
              <Info className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
              <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                Our interactive model tracks real-world production growth. Hover over the bars to see historical metrics.
              </p>
            </div>

            <button className="group flex items-center gap-3 bg-slate-900 dark:bg-white dark:text-black text-white px-8 py-4 rounded-xl font-bold transition-all hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white">
              Take Action <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Side: Interactive Chart */}
          <div className="lg:w-2/3 w-full bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 dark:border-slate-800 relative">
            <h3 className="text-xl font-black mb-12 flex items-center dark:text-white uppercase tracking-widest text-sm opacity-60">
              <TrendingUp className="w-5 h-5 mr-3 text-blue-600" /> Annual Waste Projection (M Tons)
            </h3>
            
            <div className="relative">
              {isLoading ? (
                <div className="h-72 flex flex-col items-center justify-center text-slate-400">
                  <Loader2 className="w-10 h-10 animate-spin mb-4" />
                </div>
              ) : error ? (
                <div className="h-72 flex items-center justify-center text-red-500">{error}</div>
              ) : (
                <div className="overflow-x-auto custom-scrollbar pb-10">
                  <div className="flex items-end justify-between gap-3 min-w-full h-80 border-b-2 border-slate-100 dark:border-slate-800 px-2">
                    {realGrowthData.map((d, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end max-w-[80px]">
                        
                        {/* Interactive Tooltip */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-blue-600 text-white text-[10px] font-black py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 group-hover:-top-14 transition-all duration-300 whitespace-nowrap z-50 shadow-xl pointer-events-none">
                          {d.value}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900 dark:border-t-blue-600" />
                        </div>

                        {/* Bar */}
                        <div 
                          className={`w-full rounded-t-xl transition-all duration-500 ease-out animate-grow cursor-help group-hover:brightness-110 group-hover:scale-x-105 ${
                            d.isLastYear 
                              ? 'bg-gradient-to-t from-emerald-600 to-teal-400 shadow-lg shadow-emerald-500/20' 
                              : 'bg-gradient-to-t from-blue-700 via-blue-500 to-cyan-400 shadow-lg shadow-blue-500/10'
                          }`}
                          style={{ height: `${d.percentHeight}%`, minHeight: '4px' }}
                        />

                        {/* Year Label */}
                        <span className={`text-[10px] font-black mt-6 transition-colors ${
                          d.isLastYear ? 'text-emerald-500' : 'text-slate-400 group-hover:text-blue-500'
                        }`}>
                          {d.year}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Impact & Recovery Sections... (остаются без изменений для экономии места, но включены в логику) */}
      
      <section className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {impacts.map((impact, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all group">
              <div className="w-16 h-16 bg-blue-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <impact.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">{impact.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">{impact.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-12 text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
        Scientific Visualization — Group Project 2026
      </footer>
    </div>
  );
};

export default App;
