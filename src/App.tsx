import React, { useState, useEffect } from 'react';
import { Users, Leaf, AlertCircle, Droplet, Fish, Trash2, Recycle, TrendingUp, Globe, ExternalLink, Sun, Moon, Loader2 } from 'lucide-react';

interface PlasticData {
  TIME_PERIOD: string;
  OBS_VALUE: string | number;
}

interface FormattedData {
  year: string;
  value: string;
  percentHeight: number;
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
        if (!response.ok) throw new Error('Failed to fetch environmental data');
        
        const data: PlasticData[] = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
          // 1. Сортируем по году
          const sorted = [...data].sort((a, b) => parseInt(a.TIME_PERIOD) - parseInt(b.TIME_PERIOD));

          // 2. Группируем по 5 лет (берём первый год пятилетки как метку)
          const grouped: { [key: string]: number } = {};
          sorted.forEach(item => {
            const year = parseInt(item.TIME_PERIOD);
            const periodStart = Math.floor(year / 5) * 5; // Округление до ближайшей пятилетки (напр. 2012 -> 2010)
            const val = parseFloat(item.OBS_VALUE.toString()) || 0;
            
            if (!grouped[periodStart]) {
              grouped[periodStart] = 0;
            }
            grouped[periodStart] += val;
          });

          // 3. Преобразуем в массив для рендера
          const years = Object.keys(grouped).sort();
          const rawValues = years.map(y => grouped[y]);
          const maxValue = Math.max(...rawValues);

          const formatted = years.map(year => {
            const val = grouped[year];
            return {
              year: `${year}s`, // Отображаем как "2010s"
              value: val > 1000000 ? `${(val / 1000000).toFixed(1)}M` : val.toLocaleString(),
              // Рассчитываем высоту: если max=0, ставим 1%, иначе пропорция (минимум 5% для видимости)
              percentHeight: maxValue > 0 ? Math.max((val / maxValue) * 100, 5) : 5
            };
          });
          
          setRealGrowthData(formatted);
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
    { icon: TrendingUp, value: "460M", label: "Tons Produced Annually", color: "text-red-600" },
    { icon: Droplet, value: "11M", label: "Tons Enter Oceans/Year", color: "text-blue-600" },
    { icon: Fish, value: "1M+", label: "Marine Animals Affected", color: "text-cyan-600" },
    { icon: Globe, value: "171T", label: "Plastic Particles in Ocean", color: "text-emerald-600" }
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

  const sources = [
    { name: "OECD: Global Plastics Outlook", url: "https://www.oecd.org/en/topics/sub-issues/plastics.html" },
    { name: "Geyer et al. (2017) 'Production of all plastics'", url: "https://www.science.org/doi/10.1126/sciadv.1700782" },
    { name: "UNEP: Visualizing Plastic Pollution", url: "https://www.unep.org/intergovernmental-negotiating-committee-plastic-pollution" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-200 transition-colors duration-500">
      
      <button onClick={toggleTheme} className="fixed top-6 right-6 z-50 p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-xl hover:scale-110 active:scale-95 transition-all">
        {isDark ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-blue-600" />}
      </button>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        .custom-scrollbar::-webkit-scrollbar { height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
      `}</style>

      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-900 dark:to-slate-900 text-white py-24 px-8">
        <div className="max-w-6xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30">
            <span className="text-xs font-bold uppercase tracking-widest flex items-center">
              <Droplet className="w-4 h-4 mr-2 animate-pulse" /> Live OECD Environmental Data
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Plastic Pollution</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto opacity-90 leading-relaxed">
            Analyzing the exponential rise of synthetic waste and its systemic threat to the global biosphere.
          </p>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-8 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 transform hover:-translate-y-2 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <stat.icon className={`w-10 h-10 mb-4 ${stat.color}`} />
              <div className="text-4xl font-black mb-1 dark:text-white">{stat.value}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ГРАФИК ПО 5 ЛЕТ */}
      <section className="max-w-6xl mx-auto px-8 py-16 animate-fade-in">
        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 dark:border-slate-700">
          <h2 className="text-3xl font-black mb-8 flex items-center dark:text-white">
            <TrendingUp className="w-8 h-8 mr-3 text-blue-600" /> 5-Year Leakage Trends
          </h2>
          
          <div className="relative pt-10">
            {isLoading ? (
              <div className="h-64 flex flex-col items-center justify-center text-slate-400">
                <Loader2 className="w-10 h-10 animate-spin mb-4" />
                <p className="uppercase tracking-widest text-xs font-bold">Processing OECD Periods...</p>
              </div>
            ) : error ? (
              <div className="h-64 flex items-center justify-center text-red-500 font-mono">{error}</div>
            ) : (
              <div className="overflow-x-auto custom-scrollbar pb-6">
                <div className="flex items-end justify-around gap-4 min-w-full h-72 border-b-2 border-slate-100 dark:border-slate-700 px-4">
                  {realGrowthData.map((d, i) => (
                    <div key={i} className="flex flex-col items-center group relative flex-1 max-w-[80px]">
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold py-1.5 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-xl">
                        {d.value}
                      </div>
                      
                      <div 
                        className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-lg shadow-md transition-all duration-700 ease-out group-hover:brightness-110"
                        style={{ height: `${d.percentHeight}%` }}
                      />
                      
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-4">
                        {d.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Остальные секции */}
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

      <section className="max-w-6xl mx-auto px-8 py-16">
        <div className="bg-slate-900 dark:bg-black text-white rounded-[3rem] p-10 md:p-16 shadow-2xl overflow-hidden relative border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-10">
              <Recycle className="w-10 h-10 mr-4 text-emerald-400" />
              <h2 className="text-4xl font-black">Path to Recovery</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {solutions.map((solution, index) => (
                <div key={index} className="flex items-start space-x-4 bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <span className="text-emerald-400 font-black text-xl">0{index + 1}</span>
                  <p className="text-slate-300 font-medium leading-relaxed">{solution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-16 border-t border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h3 className="text-xl font-black mb-6 flex items-center uppercase tracking-tighter dark:text-white">
              <Trash2 className="w-5 h-5 mr-2 text-blue-600" /> Evidence Base
            </h3>
            <div className="space-y-4">
              {sources.map((source, idx) => (
                <a key={idx} href={source.url} target="_blank" rel="noreferrer" className="flex items-center text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors group text-sm font-medium">
                  <span className="truncate">{source.name}</span>
                  <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center mb-8">
              <Users className="w-6 h-6 mr-3 text-blue-600" />
              <h2 className="text-2xl font-bold dark:text-white">Contributors</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {team.map((member, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                  <a href={`https://github.com/${member.github}`} target="_blank" rel="noreferrer" className="relative shrink-0">
                    <img src={`https://github.com/${member.github}.png`} alt={member.name} className="w-16 h-16 rounded-full border-2 border-blue-100 dark:border-slate-700 group-hover:border-blue-500 transition-all shadow-sm object-cover" />
                  </a>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{member.name}</h4>
                    <p className="text-[9px] text-blue-600 font-black uppercase tracking-widest">{member.role}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 italic leading-tight">{member.task}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center py-12 text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
        Scientific Visualization — Group Project 2026
      </footer>
    </div>
  );
};

export default App;
