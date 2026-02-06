
import React, { useState } from 'react';
import { 
  Lightbulb, 
  Monitor, 
  Type as TypeIcon, 
  Film, 
  ArrowLeft,
  Copy,
  Check,
  Zap
} from 'lucide-react';
import { GenerationResult } from './types';

interface CampaignDisplayProps {
  result: GenerationResult;
  onReset: () => void;
}

const CampaignDisplay: React.FC<CampaignDisplayProps> = ({ result, onReset }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 slide-in-from-bottom-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">Estrategia EcomGroup</h2>
          <p className="text-slate-500 italic">Ángulos y guiones listos para testear.</p>
        </div>
        <button 
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-all font-medium"
        >
          <ArrowLeft size={18} /> Otro Producto
        </button>
      </div>

      {/* Ángulos de Comunicación */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb className="text-emerald-500" />
          <h3 className="text-xl font-bold uppercase tracking-tight">Ángulos Estratégicos</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {result.angles.map((angle, idx) => (
            <div key={idx} className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap size={64} className="text-emerald-600" />
              </div>
              <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold mb-4 shadow-sm relative z-10">
                {idx + 1}
              </div>
              <h4 className="font-extrabold text-slate-900 mb-2 relative z-10">{angle.title}</h4>
              <p className="text-sm text-slate-700 mb-4 relative z-10 leading-relaxed">{angle.logic}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs font-bold text-emerald-600 border border-emerald-100 uppercase tracking-tight relative z-10">
                <Zap size={12} /> {angle.psychologicalTrigger}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Variaciones de Anuncios */}
      <section>
        <div className="flex items-center gap-2 mb-8">
          <Monitor className="text-emerald-500" />
          <h3 className="text-xl font-bold uppercase tracking-tight">Suite EcomGroup (Top 5)</h3>
        </div>
        <div className="space-y-8">
          {result.ads.map((ad, idx) => (
            <div key={ad.id} className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden group border-l-4 border-l-emerald-500">
              <div className="bg-slate-900 p-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center font-black">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-white font-bold leading-tight">Variation <span className="italic font-light">#{idx + 1}</span></h4>
                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">{ad.hookType}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => copyToClipboard(`${ad.headline}\n\n${ad.bodyCopy}\n\nVisual:\n${ad.visualScript}`, ad.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-emerald-600 text-slate-200 rounded-xl text-sm transition-all"
                  >
                    {copiedId === ad.id ? <Check size={16} /> : <Copy size={16} />}
                    {copiedId === ad.id ? 'Copiado' : 'Copiar Copy'}
                  </button>
                </div>
              </div>

              <div className="p-8 grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 block flex items-center gap-2">
                      <TypeIcon size={14} /> El Gancho (Hook)
                    </label>
                    <p className="text-2xl font-bold text-slate-900 italic tracking-tight">"{ad.headline}"</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 block flex items-center gap-2">
                      Texto Principal
                    </label>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{ad.bodyCopy}</p>
                  </div>
                  <div className="pt-4">
                    <div className="inline-block px-8 py-3 bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-100 uppercase tracking-widest text-sm">
                      {ad.callToAction}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 border-dashed border-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block flex items-center gap-2">
                    <Film size={14} className="text-emerald-500" /> Guion de Producción EcomGroup
                  </label>
                  <div className="space-y-4">
                    <p className="text-sm text-slate-700 font-medium leading-relaxed bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                      {ad.visualScript}
                    </p>
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                      <p className="text-xs font-black text-emerald-700 uppercase mb-2">Producir con:</p>
                      <p className="text-xs text-emerald-800 italic leading-relaxed">
                        Cortes rápidos (0.5s - 1s). Sonidos SFX impactantes. Asegúrate de que el hook visual coincida exactamente con el hook de texto.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center pt-8">
        <button 
          onClick={onReset}
          className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-2xl uppercase tracking-widest"
        >
          Generar Nuevas Variantes
        </button>
      </div>
    </div>
  );
};

export default CampaignDisplay;
