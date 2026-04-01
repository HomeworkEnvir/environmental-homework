import React, { useState, useEffect } from 'react';
import { Users, Leaf, AlertCircle, Droplet, Fish, Trash2, Recycle, TrendingUp, Globe, ExternalLink, Info, Sun, Moon } from 'lucide-react';

const App = () => {
  const [isDark, setIsDark] = useState(false);
  // Состояние для хранения реальных данных
  const [realGrowthData, setRealGrowthData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Получение данных из вашего API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Замените URL на ваш адрес Render (например, https://your-app.onrender.com/plastic)
        const response = await fetch('/plastic'); 
        const data = await response.json();
        
        // Преобразуем данные для графика
        if (Array.isArray(data)) {
          // Находим максимальное значение для пропорционального расчета высоты
          const maxValue = Math.max(...data.map(d => d.OBS_VALUE));
          
          const formattedData = data.map(item => ({
            year: item.TIME_PERIOD,
            value: `${Math.round(item.OBS_VALUE)}M`,
            // Динамический расчет высоты: максимум будет h-64 (16rem), минимум h-4
            percentHeight: (item.OBS_VALUE / maxValue) * 100
          }));
          
          setRealGrowthData(formattedData);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching plastic data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Остальные константы (team, statistics, impacts, и т.д.) остаются без изменений...
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
    { title: "Marine Life Threat", description: "Sea turtles, whales, and seabirds mistake plastic for food...", icon: Fish },
    { title: "Microplastic Cycle", description: "Microplastics absorb toxins and are eaten by plankton...", icon: Leaf },
    { title: "Human Health", description: "Research has detected microplastics in human blood and lungs...", icon: AlertCircle }
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500">
      
      <button onClick={toggleTheme} className="fixed top-6 right-6 z-50 p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-xl hover:scale-110 transition-all">
        {isDark ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-blue-600" />}
      </button>

      {/* Header (без изменений) */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-900 dark:to-slate-900 text-white py-24 px-8">
        <div className="max-w-6xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Plastic Pollution</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto opacity-90">
            Analyzing the exponential rise of synthetic waste based on OECD global statistics.
          </p>
        </div>
      </header>

      {/* Statistics Section (без изменений) */}
      <section className="max-w-6xl mx-auto px-8 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <stat.icon className={`w-10 h-10 mb-4 ${stat.color}`} />
              <div className="text-4xl font-black mb-1 dark:text-white">{stat.value}</div>
              <div className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Growth Chart Section - ТУТ ИЗМЕНЕНИЯ */}
      <section className="max-w-6xl mx-auto px-8 py-16 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 dark:border-slate-700">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black mb-6 flex items-center dark:text-white">
              <Info className="w-8 h-8 mr-3 text-blue-600" />
              The Plastic Legacy
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>This chart visualizes the real-time data fetched from OECD Global Plastics Outlook, showing the total plastic leakage and waste accumulation.</p>
              <p>The transition from 1990 to 2019 reveals a significant shift in environmental impact across all monitored dimensions.</p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex justify-between items-end mb-8">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Accumulation (Million Tons)</span>
            </div>
            
            {/* Контейнер графика */}
            <div className="flex items-end justify-between gap-1 h-64 border-b-2 border-slate-100 dark:border-slate-700 pb-2 overflow-x-auto scrollbar-hide">
              {loading ? (
                <div className="w-full text-center text-slate-400 animate-pulse">Loading real-time statistics...</div>
              ) : (
                realGrowthData.map((d, i) => (
                  <div key={i} className="flex flex-col items-center flex-1 group min-w-[20px]">
                    <div 
                      className="w-full max-w-[40px] bg-gradient-to-t from-blue-700 to-cyan-400 rounded-t-lg shadow-lg transition-all duration-500 group-hover:brightness-110 relative"
                      style={{ height: `${d.percentHeight}%` }} // Динамическая высота
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                        {d.value}
                      </div>
                    </div>
                    {/* Показываем года с шагом (например, каждый 5-й год), чтобы не частить */}
                    <span className="text-[9px] font-bold text-slate-500 mt-4 rotate-45 lg:rotate-0">
                      {parseInt(d.year) % 5 === 0 || i === realGrowthData.length - 1 ? d.year : ''}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Impact, Solutions и Footer остаются прежними... */}
      {/* ... (ваш оригинальный код концовка) */}
      <footer className="text-center py-12 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
        Scientific Visualization — Group Project 2026
      </footer>
    </div>
  );
};

export default App;
