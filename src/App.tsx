import React from 'react';
import { Clock, Users, Leaf, AlertCircle, Droplet, Fish, Trash2, Recycle, TrendingUp, Globe, ExternalLink } from 'lucide-react';

const App = () => {
  const team = [
    { name: "Иван Иванов", role: "Backend / Logic", task: "Интеграция API данных о загрязнении воздуха" },
    { name: "Анна Смирнова", role: "Design / Content", task: "Копирайт, подбор визуала и структура лендинга" },
    { name: "Дмитрий Петров", role: "AI Operator", task: "Промпт-инжиниринг фронтенда и сборка на Tailwind" }
  ];

  const statistics = [
    { icon: TrendingUp, value: "460M", label: "Tons Produced Annually", color: "text-red-600" },
    { icon: Droplet, value: "11M", label: "Tons Enter Oceans/Year", color: "text-blue-600" },
    { icon: Fish, value: "1M+", label: "Seabirds & Mammals Die/Year", color: "text-cyan-600" },
    { icon: Globe, value: "171T", label: "Plastic Particles in Ocean", color: "text-emerald-600" }
  ];

  const impacts = [
    {
      title: "Marine Life Threat",
      description: "Sea turtles, whales, and seabirds mistake plastic for food. Over 800 marine species are affected. Ingestion causes starvation as stomachs fill with indigestible debris.",
      icon: Fish
    },
    {
      title: "Ecosystem Disruption",
      description: "Microplastics absorb persistent organic pollutants (POPs). These toxins bioaccumulate up the food chain, affecting everything from zooplankton to apex predators.",
      icon: Leaf
    },
    {
      title: "Human Health Risk",
      description: "Microplastics have been detected in human blood and lung tissue. Chemicals like BPA and phthalates in plastic are linked to endocrine disruption and other health issues.",
      icon: AlertCircle
    }
  ];

  const solutions = [
    "Reduce single-use plastics: Choose reusable bags, bottles, and containers",
    "Support plastic-free alternatives: Opt for bamboo, glass, or metal products",
    "Proper waste disposal: Recycle correctly and participate in beach cleanups",
    "Advocate for change: Support global treaties on plastic pollution reduction",
    "Educate others: Share knowledge about the lifecycle of synthetic polymers",
    "Circular Economy: Support brands that use post-consumer recycled (PCR) materials"
  ];

  const sources = [
    { name: "OECD Global Plastics Outlook", url: "https://www.oecd.org/en/topics/sub-issues/plastics.html" },
    { name: "UN Environment Programme (UNEP)", url: "https://www.unep.org/intergovernmental-negotiating-committee-plastic-pollution" },
    { name: "The World Bank: Marine Pollution", url: "https://www.worldbank.org/en/topic/oceans-fisheries-and-coastal-economies" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <Droplet className="w-4 h-4 mr-2" />
            <span className="text-sm font-bold uppercase tracking-wider">Environmental Crisis</span>
          </div>
          <h1 className="text-6xl font-extrabold mb-4 tracking-tight">Plastic Pollution</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            An urgent global challenge threatening our oceans, wildlife, and human health
          </p>
        </div>
      </header>

      {/* Key Statistics */}
      <section className="max-w-6xl mx-auto px-8 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 transform hover:scale-105 transition-transform">
              <stat.icon className={`w-10 h-10 mb-3 ${stat.color}`} />
              <div className="text-4xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <div className="bg-white rounded-3xl p-10 shadow-xl mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Trash2 className="w-8 h-8 mr-3 text-red-500" />
            Understanding the Crisis
          </h2>
          <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-4">
            <p>
              Plastic pollution is no longer just a litter problem; it's a systemic environmental threat. Since 1950, plastic production has outpaced almost any other manufactured material. According to the <strong>OECD</strong>, only <strong>9% of plastic waste</strong> is successfully recycled globally.
            </p>
            <p>
              Each year, an estimated <strong>11 million metric tons</strong> of plastic enter the ocean. Without immediate action, this flow is projected to triple by 2040. In the marine environment, plastic doesn't disappear—it fragments into <strong>microplastics</strong> (less than 5mm), which are now found even in the deepest parts of the Mariana Trench.
            </p>
          </div>
        </div>

        {/* Environmental Impacts */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Environmental & Health Impacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {impacts.map((impact, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mb-4">
                  <impact.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">{impact.title}</h3>
                <p className="text-slate-600 leading-relaxed">{impact.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Solutions */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-3xl p-10 shadow-xl mb-12">
          <div className="flex items-center mb-6">
            <Recycle className="w-8 h-8 mr-3" />
            <h2 className="text-3xl font-bold">What Can We Do?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {solutions.map((solution, index) => (
              <div key={index} className="flex items-start space-x-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-bold">{index + 1}</span>
                </div>
                <p className="leading-relaxed">{solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Info & Credits */}
      <section className="max-w-6xl mx-auto px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 flex items-start space-x-4">
            <Clock className="text-orange-500 w-8 h-8 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-1">Deadline: March 31st</h3>
              <p className="text-slate-500">Осталось совсем немного времени на финальные правки.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 flex items-start space-x-4">
            <AlertCircle className="text-blue-500 w-8 h-8 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-1">Data Sources</h3>
              <div className="flex flex-col space-y-1 mt-2">
                {sources.map((source, idx) => (
                  <a key={idx} href={source.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm flex items-center">
                    {source.name} <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-10 shadow-xl">
          <div className="flex items-center mb-8">
            <Users className="w-6 h-6 mr-3 text-blue-600" />
            <h2 className="text-2xl font-bold">Project Team</h2>
          </div>
          <div className="space-y-6">
            {team.map((member, index) => (
              <div key={index} className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-slate-100 pb-4 last:border-0 space-y-2 md:space-y-0">
                <div>
                  <h4 className="font-bold text-slate-800">{member.name}</h4>
                  <p className="text-sm text-blue-600 font-medium uppercase">{member.role}</p>
                </div>
                <p className="text-slate-600 italic md:text-right md:max-w-xs">{member.task}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="text-center py-8 text-slate-400 text-sm">
        Built with AI for School Project — 2026
      </footer>
    </div>
  );
};

export default App;
