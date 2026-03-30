import React from 'react';
import { Users, Leaf, AlertCircle, Droplet, Fish, Trash2, Recycle, TrendingUp, Globe, ExternalLink, Info } from 'lucide-react';

const App = () => {
  const team = [
    { name: "Artem Peresada", role: "Backend / Logic / Design", task: "Integration of API data, pollution statistics and design" },
    { name: "Mihailo Petrović", role: "DevOps / Deploy / Design", task: "Site deployment, maintenance and design" },
    { name: "Gemini", role: "Content", task: "Copywriting" }
  ];

  const statistics = [
    { icon: TrendingUp, value: "460M", label: "Tons Produced Annually", color: "text-red-600" },
    { icon: Droplet, value: "11M", label: "Tons Enter Oceans/Year", color: "text-blue-600" },
    { icon: Fish, value: "1M+", label: "Marine Animals Affected", color: "text-cyan-600" },
    { icon: Globe, value: "171T", label: "Plastic Particles in Ocean", color: "text-emerald-600" }
  ];

  const growthData = [
    { year: '1950', value: '2M', height: 'h-4' },
    { year: '1970', value: '35M', height: 'h-12' },
    { year: '1990', value: '120M', height: 'h-24' },
    { year: '2010', value: '313M', height: 'h-48' },
    { year: '2020', value: '460M', height: 'h-64' },
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 text-slate-900 font-sans selection:bg-blue-200">
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
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-24 px-8">
        <div className="max-w-6xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30">
            <Droplet className="w-4 h-4 mr-2 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest">Global Environmental Report</span>
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
                 className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 transform hover:-translate-y-2 transition-all duration-300 animate-fade-in"
                 style={{ animationDelay: `${index * 150}ms` }}>
              <stat.icon className={`w-10 h-10 mb-4 ${stat.color}`} />
              <div className="text-4xl font-black mb-1 tracking-tight">{stat.value}</div>
              <div className="text-sm text-slate-500 font-semibold uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Growth Chart & Intro Text */}
      <section className="max-w-6xl mx-auto px-8 py-16 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100">
          
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black mb-6 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-600" />
              The Plastic Legacy
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Since its large-scale introduction in the 1950s, plastic has transformed modern life. However, its durability—the very quality that made it revolutionary—is now its most dangerous trait.
              </p>
              <p>
                Of the <strong>9.2 billion tons</strong> of plastic produced to date, an estimated <strong>6.3 billion tons</strong> have become waste. Shockingly, only <strong>9%</strong> of this has ever been recycled, while 12% was incinerated. 
              </p>
              <p>
                The remaining 79% has accumulated in landfills or the natural environment, where it will persist for centuries.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex justify-between items-end mb-8">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Production (Million Tons/Year)</span>
            </div>
            <div className="flex items-end justify-between gap-3 h-64 border-b-2 border-slate-100 pb-2">
              {growthData.map((d, i) => (
                <div key={i} className="flex flex-col items-center w-full group">
                  <div className={`w-full max-w-[60px] bg-gradient-to-t from-blue-700 to-cyan-400 rounded-t-xl shadow-lg ${d.height} transition-all duration-500 group-hover:brightness-110 relative`}>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {d.value}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-500 mt-6">{d.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-black mb-6 tracking-tight">Systemic Impact</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Plastic pollution is not just a litter problem; it is a complex threat that disrupts biological processes and alters entire ecosystems.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {impacts.map((impact, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-2xl transition-all animate-fade-in group">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <impact.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">{impact.title}</h3>
              <p className="text-slate-600 leading-relaxed">{impact.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Crisis Deep Dive Text */}
      <section className="max-w-4xl mx-auto px-8 py-16 text-center animate-fade-in">
        <div className="inline-block p-2 bg-red-50 text-red-600 rounded-lg mb-4 text-sm font-bold uppercase tracking-wider">
          Critical Insight
        </div>
        <h2 className="text-3xl font-black mb-8 italic">"By 2050, there could be more plastic than fish in the ocean by weight."</h2>
        <div className="prose prose-lg mx-auto text-slate-600 space-y-6">
          <p>
            The crisis is fueled by <strong>microplastics</strong>—particles smaller than 5mm. They have been found in the deepest ocean trenches and on the highest mountain peaks. Because they never truly "disappear," they become permanent fixtures in our water and air.
          </p>
          <p>
            Every minute, the equivalent of <strong>one garbage truck</strong> of plastic is dumped into our oceans. This is not just an aesthetic issue; it affects the planet's ability to regulate climate, as plastic reduces the efficiency of carbon-sequestering plankton.
          </p>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <div className="bg-slate-900 text-white rounded-[3rem] p-10 md:p-16 shadow-2xl overflow-hidden relative">
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
      <section className="max-w-6xl mx-auto px-8 py-16 border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sources */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-black mb-6 flex items-center uppercase tracking-tighter">
              <Trash2 className="w-5 h-5 mr-2 text-blue-600" />
              Evidence Base
            </h3>
            <div className="space-y-4">
              {sources.map((source, idx) => (
                <a key={idx} href={source.url} target="_blank" rel="noreferrer" 
                   className="flex items-center text-slate-500 hover:text-blue-600 transition-colors group text-sm font-medium">
                  <span className="truncate">{source.name}</span>
                  <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-center mb-8">
              <Users className="w-6 h-6 mr-3 text-blue-600" />
              <h2 className="text-2xl font-bold tracking-tight">Project Contributors</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index}>
                  <h4 className="font-bold text-slate-900">{member.name}</h4>
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mt-1 mb-2">{member.role}</p>
                  <p className="text-xs text-slate-500 italic leading-relaxed">{member.task}</p>
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
