import React, { useState, useEffect } from 'react';
import { TrendingUp, Droplet, Fish, Globe, Sun, Moon, Loader2, Recycle, ExternalLink, Users } from 'lucide-react';

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
        if (!response.ok) throw new Error('Ошибка загрузки данных');
        
        const data: PlasticData[] = await response.json();
        console.log("Raw Data from API:", data); // ПРОВЕРЬТЕ КОНСОЛЬ (F12)

        if (Array.isArray(data) && data.length > 0) {
          const sorted = [...data].sort((a, b) => parseInt(a.TIME_PERIOD) - parseInt(b.TIME_PERIOD));

          // 1. Группировка
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

          // ФУНКЦИЯ РАСЧЕТА С ЗАЩИТОЙ
          const getPercentHeight = (current: number) => {
            if (maxVal === 0) return 5; // Если везде нули, покажем маленькие "пни"
            if (diff === 0) return 80;  // Если все равны, покажем высокие столбики
            // Растягиваем: минимум 20%, максимум 100%
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
        } else {
          setError("Нет данных для отображения");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans transition-colors duration-500">
      
      <button onClick={toggleTheme} className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700">
        {isDark ? <Sun className="text-yellow-400" /> : <Moon className="text-blue-600" />}
      </button>

      <header className="bg-gradient-to-r from-blue-700 to-cyan-500 py-20 px-8 text-center text-white">
        <h1 className="text-5xl font-black mb-4">Plastic Pollution Report</h1>
        <p className="opacity-80">Анализ глобальных отходов (OECD Data)</p>
      </header>

      <section className="max-w-6xl mx-auto px-8 py-12">
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-10 shadow-2xl border border-slate-100 dark:border-slate-800">
          <h2 className="text-2xl font-bold mb-12 flex items-center">
            <TrendingUp className="mr-3 text-blue-500" /> Динамика роста отходов (млн тонн)
          </h2>

          {/* КОНТЕЙНЕР ГРАФИКА */}
          <div className="h-[400px] flex items-end justify-between gap-4 border-b-4 border-slate-200 dark:border-slate-700 pb-2 overflow-hidden">
            {isLoading ? (
              <div className="w-full flex flex-col items-center justify-center text-slate-400">
                <Loader2 className="animate-spin mb-2" />
                <span>Загрузка...</span>
              </div>
            ) : error ? (
              <div className="w-full text-center text-red-500">{error}</div>
            ) : (
              realGrowthData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                  {/* Тултип */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[11px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    {d.value}
                  </div>
                  
                  {/* СТОЛБИК */}
                  <div 
                    className={`w-full max-w-[70px] rounded-t-lg transition-all duration-1000 ease-out hover:scale-x-105 hover:brightness-110 ${
                      d.isLastYear 
                        ? 'bg-gradient-to-t from-emerald-600 to-teal-400' 
                        : 'bg-gradient-to-t from-blue-600 to-cyan-400'
                    }`}
                    style={{ 
                      height: `${d.percentHeight}%`,
                      minHeight: '4px' // Чтобы даже 0 был виден полоской
                    }}
                  />
                  
                  {/* Подпись года */}
                  <span className={`text-[10px] md:text-xs font-bold mt-4 ${d.isLastYear ? 'text-emerald-500' : 'text-slate-500'}`}>
                    {d.year}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <footer className="text-center py-10 text-slate-500 text-xs font-bold tracking-widest uppercase">
        © 2026 Environmental Visualization Project
      </footer>
    </div>
  );
};

export default App;
