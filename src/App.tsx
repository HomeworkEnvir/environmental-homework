import React, { useState, useEffect } from 'react';
import { Users, Leaf, AlertCircle, Droplet, Fish, Trash2, Recycle, TrendingUp, Globe, ExternalLink, Info, Sun, Moon } from 'lucide-react';

const App = () => {
  const [statsData, setStatsData] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cardsRes, plasticRes] = await Promise.all([
          fetch('https://plastic-pollution.onrender.com/stats/cards'),
          fetch('https://plastic-pollution.onrender.com/stats/plastic')
        ]);

        const cards = await cardsRes.json();
        const plastic = await plasticRes.json();

        setStatsData(cards);
        setHistoryData(plastic);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const team = [
    {
        name: "Artem Peresada",
        role: "Backend / Frontend / Logic / Design",
        task: "Integration of API data, pollution statistics and design",
        github: "REvDl"
    },
    {
        name: "Mihailo Petrović",
        role: "DevOps / Deploy / Design / Maintenance",
        github: "VargKernel",
        task: "Site deployment, maintenance and design"
    }
  ];

  const statistics = [
    { icon: TrendingUp, value: statsData ? `${statsData.tons_produced_annually_mton}M` : "---", label: "Tons Produced Annually", color: "text-red-600" },
    { icon: Droplet, value: statsData ? `${statsData.tons_enter_oceans_mton}M` : "---", label: "Tons Enter Oceans/Year", color: "text-blue-600" },
    { icon: Fish, value: statsData ? `${statsData.marine_animals_affected_millions}M+` : "---", label: "Marine Animals Affected", color: "text-cyan-600" },
    { icon: Globe, value: statsData ? `${statsData.ocean_plastic_particles_trillions}T` : "---", label: "Plastic Particles in Ocean", color: "text-emerald-600" }
  ];

  const getGrowthData = () => {
    if (!historyData || historyData.length === 0) return [];
    const maxVal = Math.max(...historyData.map(d => d.OBS_VALUE));
    const yearsToShow = [1990, 1995, 2000, 2005, 2010, 2015, 2019];

    return historyData
      .filter(d => yearsToShow.includes(d.TIME_PERIOD))
      .map(d => ({
        year: d.TIME_PERIOD.toString(),
        value: `${d.OBS_VALUE}M`,
        height: `${(d.OBS_VALUE / maxVal) * 100}%`
      }));
  };

  const growthData = getGrowthData();

  const impacts = [
    {
      title: "Marine Life Threat",
      description: "Sea turtles, whales, and seabirds mistake plastic for food. Ingestion causes physical blockages and starvation as stomachs fill with indigestible debris.",
      icon: Fish
    },
    {
      title: "Microplastic Cycle",
      description: "Microplastics absorb toxins and are eaten by plankton. These pollutants accumulate as they move up the food chain, eventually reaching humans.",
      icon: Leaf
    },
    {
      title: "Human Health",
      description: "Research has detected microplastics in human blood and lungs. Chemical additives like BPA are linked to serious endocrine and reproductive issues.",
      icon: AlertCircle
    }
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

      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-xl hover:scale-110 active:scale-95 transition-all"
        title="Toggle Theme"
      >
        {isDark ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-blue-600" />}
      </button>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-900 dark:to-slate-900 text-white py-24 px-8">
        <div className="max-w-6xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30">
            <span className="text-xs font-bold uppercase tracking-widest flex items-center">
              <Droplet className="w-4 h-4 mr-2 animate-pulse" />
              Global Environmental Report
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Plastic Pollution</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed opacity-90">
            Analyzing the exponential rise of synthetic waste and its systemic threat to the global biosphere.
          </p>
        </div>
      </header>

      {/* Key Statistics Cards */}
      <section className="max-w-6xl mx-auto px-8 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat, index) => (
            <div key={index}
                 className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 transform hover:-translate-y-2 transition-all duration-300 animate-fade-in"
                 style={{ animationDelay: `${index * 150}ms` }}>
              <stat.icon className={`w-10 h-10 mb-4 ${stat.color}`} />
              <div className="text-4xl font-black mb-1 tracking-tight dark:text-white">{loading ? '...' : stat.value}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Growth Chart Section */}
      <section className="max-w-6xl mx-auto px-8 py-16 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 dark:border-slate-700">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black mb-6 flex items-center dark:text-white">
              <Info className="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" />
              The Plastic Legacy
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>Since its large-scale introduction in the 1990s, plastic has transformed modern life. However, its durability is now its most dangerous trait.</p>
              <p>Of the <strong>9.2 billion tons</strong> produced to date, an estimated <strong>6.3 billion tons</strong> have become waste. Shockingly, only <strong>9%</strong> has ever been recycled.</p>
              <p>The remaining 79% has accumulated in landfills or the natural environment, where it will persist for centuries.</p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex justify-between items-end mb-8">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Production (Million Tons/Year)</span>
            </div>
            <div className="flex items-end justify-between gap-3 h-64 border-b-2 border-slate-100 dark:border-slate-700 pb-2 relative">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 animate-pulse">Loading data...</div>
              ) : (
                growthData.map((d, i) => (
                  <div key={i} className="flex flex-col items-center justify-end h-full w-full group">
                    <div
                      style={{ height: d.height, minHeight: '4px' }}
                      className="w-full max-w-[55px] bg-gradient-to-t from-blue-700 to-cyan-400 rounded-t-xl shadow-lg transition-all duration-700 group-hover:brightness-110 relative"
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                        {d.value}
                      </div>
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 mt-6 text-center">{d.year}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-black mb-6 tracking-tight dark:text-white">Systemic Impact</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Plastic pollution is not just a litter problem; it is a complex threat that disrupts biological processes and alters entire ecosystems.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {impacts.map((impact, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all animate-fade-in group">
              <div className="w-16 h-16 bg-blue-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <impact.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight dark:text-white">{impact.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{impact.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Solutions Section */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <div className="bg-slate-900 dark:bg-black text-white rounded-[3rem] p-10 md:p-16 shadow-2xl overflow-hidden relative border dark:border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-10">
              <Recycle className="w-10 h-10 mr-4 text-emerald-400" />
              <h2 className="text-4xl font-black tracking-tight">Path to Recovery</h2>
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

      {/* Data Sources & Team */}
      <section className="max-w-6xl mx-auto px-8 py-16 border-t border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sources */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-black mb-6 flex items-center uppercase tracking-tighter dark:text-white">
              <Trash2 className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
              Evidence Base
            </h3>
            <div className="space-y-4">
              {sources.map((source, idx) => (
                <a key={idx} href={source.url} target="_blank" rel="noreferrer"
                   className="flex items-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group text-sm font-medium">
                  <span className="truncate">{source.name}</span>
                  <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>

          {/* Team Section (Corrected Display) */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center mb-8">
              <Users className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold tracking-tight dark:text-white">Project Contributors</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {team.map((member, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                  <a
                    href={`https://github.com/${member.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="relative shrink-0"
                  >
                    <img
                      src={`https://github.com/${member.github}.png`}
                      alt={member.name}
                      className="w-16 h-16 rounded-full border-2 border-blue-100 dark:border-slate-700 group-hover:border-blue-500 transition-all shadow-sm object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-800 rounded-full p-1 shadow-md border border-slate-100 dark:border-slate-700">
                      <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
                    </div>
                  </a>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-[10px] text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest mt-0.5 mb-1">
                      {member.role}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 italic leading-snug max-w-[200px]">
                      {member.task}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center py-12 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
        Scientific Visualization — Group Project 2026
      </footer>
    </div>
  );
};

export default App;
