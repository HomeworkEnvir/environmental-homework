import React, { useState, useEffect } from 'react';
import { 
  Users, Leaf, AlertCircle, Droplet, Fish, Trash2, Recycle, 
  TrendingUp, Globe, ExternalLink, Sun, Moon, Loader2, 
  Quote, ArrowRight, Info // <-- Info добавлен сюда
} from 'lucide-react';

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

  const solutions = [
    "Eliminate single-use items (straws, bags, cutlery)",
    "Support circular economy and refill systems",
    "Improve waste management and recycling technology",
    "Global policy changes to limit virgin plastic production",
    "Switch to sustainable materials like glass or bamboo",
    "Participate in local cleanups and community education"
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500">
      
      <button onClick={toggleTheme} className="fixed top-6 right-6 z-50 p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-xl hover:scale-110 active:scale-95 transition-all">
        {isDark ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-blue-600" />}
      </button>

      <style>{`
        @keyframes growUp { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        .animate-grow { transform-origin: bottom; animation: growUp 1.2s cubic-bezier(0.33, 1, 0.68, 1) forwards; }
      `}</style>

      {/* Hero Header */}
      <header className="relative bg-slate-900 text-white py-32 px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center bg-blue-500/20 backdrop-blur-xl px-4 py-2 rounded-full mb-8 border border-white/10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] flex items-center text-blue-400">
              <Droplet className="w-4 h-4 mr-2 animate-pulse" /> Environmental Intelligence
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
            Plastic <br/>Symphony
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Every minute, the equivalent of one garbage truck of plastic is dumped into our ocean. 
            Track the history of global waste production.
          </p>
        </div>
      </header>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {statistics.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 transition-all hover:-translate-y-2">
              <stat.icon className={`w-8 h-8 mb-6 ${stat.color}`} />
              <div className="text-4xl font-black mb-1 tracking-tight dark:text-white">{stat.value}</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content: Quote + Chart */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left: Content */}
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
                Data shows that production has increased by over 200% since the early 2000s.
              </p>
            </div>

            <button className="group flex items-center gap-3 bg-slate-900 dark:bg-white dark:text-black text-white px-8 py-4 rounded-2xl font-bold transition-all hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white">
              View Solutions <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right: The Chart Card */}
          <div className="lg:w-2/3 w-full bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-16 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-blue-500" /> Global Waste Volumetrics (Millions of Tons)
            </h3>
            
            <div className="h-80 flex items-end justify-between gap-3 border-b-2 border-slate-100 dark:border-slate-800 pb-2">
              {isLoading ? (
                <div className="w-full flex justify-center"><Loader2 className="animate-spin text-blue-600" /></div>
              ) : (
                realGrowthData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end max-w-[60px]">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold py-1.5 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 z-50">
                      {d.value}
                    </div>
                    <div 
                      className={`w-full rounded-t-xl transition-all duration-1000 ease-out animate-grow group-hover:brightness-125 ${
                        d.isLastYear 
                          ? 'bg-gradient-to-t from-emerald-600 to-teal-400' 
                          : 'bg-gradient-to-t from-blue-700 via-blue-500 to-cyan-400'
                      }`}
                      style={{ height: `${d.percentHeight}%`, minHeight: '4px' }}
                    />
                    <span className={`text-[10px] font-black mt-6 ${d.isLastYear ? 'text-emerald-500' : 'text-slate-400'}`}>
                      {d.year}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Path to Recovery Section */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="bg-slate-900 text-white rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="relative z-10 text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Path to Recovery</h2>
            <p className="text-slate-400">Steps we must take to preserve the biosphere.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {solutions.map((solution, index) => (
              <div key={index} className="flex items-start space-x-4 bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <span className="text-emerald-400 font-black text-xl">0{index + 1}</span>
                <p className="text-slate-300 font-medium">{solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-8 py-24 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center mb-12">
          <Users className="w-6 h-6 mr-3 text-blue-600" />
          <h2 className="text-2xl font-black dark:text-white">Core Contributors</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((member, index) => (
            <div key={index} className="flex items-center space-x-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group transition-all hover:shadow-xl">
              <a href={`https://github.com/${member.github}`} target="_blank" rel="noreferrer">
                <img src={`https://github.com/${member.github}.png`} className="w-20 h-20 rounded-2xl grayscale group-hover:grayscale-0 transition-all shadow-lg" alt={member.name} />
              </a>
              <div>
                <h4 className="font-black text-slate-900 dark:text-white">{member.name}</h4>
                <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.2em] mb-2">{member.role}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">{member.task}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-20 text-slate-400 text-[10px] font-black uppercase tracking-[0.5em]">
        Group Project — Scientific Visualization 2026
      </footer>
    </div>
  );
};

export default App;
