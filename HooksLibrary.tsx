
import React from 'react';
import { Info, Zap } from 'lucide-react';
import { WINNING_HOOKS_LIBRARY } from '../constants';

const HooksLibrary: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Metodología <span className="text-emerald-500 italic">EcomGroup</span>
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl font-light">
          Estos son los patrones psicológicos que han generado millones en ventas. Nuestra IA los aplica de forma nativa en cada anuncio.
        </p>
      </div>

      <div className="space-y-16">
        {WINNING_HOOKS_LIBRARY.map((category, idx) => (
          <div key={idx}>
            <div className="flex items-center gap-3 mb-8 border-b border-emerald-100 pb-4">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-widest">{category.category}</h3>
              <div className="px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-bold">
                {category.hooks.length} Estrategias
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.hooks.map(hook => (
                <div key={hook.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Zap size={48} className="text-emerald-600" />
                  </div>
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-black text-lg mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
                    {hook.id}
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-slate-900">{hook.name}</h4>
                  <p className="text-slate-500 mb-6 text-sm leading-relaxed">{hook.desc}</p>
                  
                  <div className="space-y-3 relative z-10">
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Ejemplos EcomGroup:</p>
                    {hook.examples.map((ex, i) => (
                      <div key={i} className="bg-emerald-50/30 p-4 rounded-xl text-sm text-slate-700 border border-emerald-50 italic">
                        "{ex}"
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 p-10 bg-slate-900 text-white rounded-[3rem] text-center shadow-2xl border-t-8 border-emerald-500">
        <h3 className="text-3xl font-bold mb-4">Potencia tu Escalamiento</h3>
        <p className="text-slate-400 max-w-xl mx-auto mb-8 italic">
          No dispares a ciegas. Usa la ciencia del marketing de respuesta directa que aplicamos en EcomGroup para dominar tus creativos.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-full text-sm font-bold shadow-lg shadow-emerald-500/20">
            <Info size={16} /> Ganchos de Escalamiento
          </div>
          <div className="flex items-center gap-2 px-6 py-3 bg-white/10 text-emerald-400 rounded-full text-sm font-bold border border-white/10">
            <Zap size={16} /> Psicología de EcomGroup
          </div>
        </div>
      </div>
    </div>
  );
};

export default HooksLibrary;
