
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Library, 
  History, 
  Sparkles, 
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { AppTab, ProductData, GenerationResult } from './types';
import ProductForm from './components/ProductForm';
import CampaignDisplay from './components/CampaignDisplay';
import HooksLibrary from './components/HooksLibrary';
import { generateCampaign } from './services/geminiService';

const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="relative w-10 h-10">
      <div className="absolute top-0 left-0 w-8 h-8 bg-emerald-400/60 rounded-lg transform translate-x-1 translate-y-1"></div>
      <div className="absolute top-0 left-0 w-8 h-8 bg-emerald-500 rounded-lg"></div>
    </div>
    <span className="text-2xl tracking-tight text-slate-900">
      <span className="italic font-light">Ecom</span>
      <span className="font-bold">Group</span>
    </span>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [history, setHistory] = useState<{product: ProductData, result: GenerationResult, date: string}[]>([]);

  const handleGenerate = async (product: ProductData) => {
    setLoading(true);
    setError(null);
    try {
      const campaign = await generateCampaign(product);
      setResult(campaign);
      setHistory(prev => [{ product, result: campaign, date: new Date().toLocaleString('es-ES') }, ...prev]);
      setActiveTab(AppTab.BUILDER);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error al generar la campaña. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return (
          <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Arquitecta tu Próximo <span className="text-emerald-500 italic">Anuncio Ganador</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Herramienta exclusiva de <span className="font-bold">EcomGroup</span>. Crea 5 variaciones de anuncios de alto impacto con ganchos psicológicos probados.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 mb-6">
                  <PlusCircle size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Nueva Campaña</h3>
                <p className="text-slate-500 mb-6 italic">Para miembros de EcomGroup</p>
                <button 
                  onClick={() => setActiveTab(AppTab.BUILDER)}
                  className="mt-auto inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-all shadow-lg shadow-emerald-100"
                >
                  Empezar Ahora <ArrowRight size={18} />
                </button>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 mb-6">
                  <Library size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Biblioteca de Ganchos</h3>
                <p className="text-slate-500 mb-6">Aprende los frameworks que usamos en EcomGroup.</p>
                <button 
                  onClick={() => setActiveTab(AppTab.LIBRARY)}
                  className="mt-auto inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all shadow-lg"
                >
                  Ver Biblioteca <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        );

      case AppTab.BUILDER:
        return (
          <div className="max-w-6xl mx-auto py-8 px-4">
            {!result ? (
              <ProductForm onSubmit={handleGenerate} loading={loading} />
            ) : (
              <CampaignDisplay 
                result={result} 
                onReset={() => {
                  setResult(null);
                  setError(null);
                }} 
              />
            )}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700">
                <AlertCircle size={20} />
                <p>{error}</p>
              </div>
            )}
          </div>
        );

      case AppTab.LIBRARY:
        return <HooksLibrary />;

      case AppTab.HISTORY:
        return (
          <div className="max-w-4xl mx-auto py-12 px-4">
            <h2 className="text-2xl font-bold mb-8 text-slate-800">Historial EcomGroup</h2>
            {history.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                <History className="mx-auto mb-4 text-slate-300" size={48} />
                <p className="text-slate-500">No hay campañas registradas.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-slate-800">{item.product.name}</h3>
                      <p className="text-sm text-slate-500">{item.date}</p>
                    </div>
                    <button 
                      onClick={() => {
                        setResult(item.result);
                        setActiveTab(AppTab.BUILDER);
                      }}
                      className="px-4 py-2 text-emerald-600 font-semibold hover:bg-emerald-50 rounded-lg transition-colors"
                    >
                      Ver Resultados
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pb-24 md:pb-0 md:pl-64">
      {/* Sidebar - Desktop */}
      <nav className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-100 hidden md:flex flex-col p-6 z-40">
        <div className="mb-12">
          <Logo />
        </div>

        <div className="space-y-2 flex-grow">
          <NavItem 
            active={activeTab === AppTab.DASHBOARD} 
            icon={<LayoutDashboard size={20} />} 
            label="Panel General" 
            onClick={() => { setActiveTab(AppTab.DASHBOARD); setResult(null); }} 
          />
          <NavItem 
            active={activeTab === AppTab.BUILDER} 
            icon={<PlusCircle size={20} />} 
            label="Constructor" 
            onClick={() => setActiveTab(AppTab.BUILDER)} 
          />
          <NavItem 
            active={activeTab === AppTab.LIBRARY} 
            icon={<Library size={20} />} 
            label="Librería Pro" 
            onClick={() => setActiveTab(AppTab.LIBRARY)} 
          />
          <NavItem 
            active={activeTab === AppTab.HISTORY} 
            icon={<History size={20} />} 
            label="Historial" 
            onClick={() => setActiveTab(AppTab.HISTORY)} 
          />
        </div>

        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-2">Member Access</p>
          <p className="text-sm font-bold text-slate-700 italic">EcomGroup V1.0</p>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 flex justify-around p-3 md:hidden z-40 shadow-lg">
        <MobileNavItem active={activeTab === AppTab.DASHBOARD} icon={<LayoutDashboard size={24} />} onClick={() => setActiveTab(AppTab.DASHBOARD)} />
        <MobileNavItem active={activeTab === AppTab.BUILDER} icon={<PlusCircle size={24} />} onClick={() => setActiveTab(AppTab.BUILDER)} />
        <MobileNavItem active={activeTab === AppTab.LIBRARY} icon={<Library size={24} />} onClick={() => setActiveTab(AppTab.LIBRARY)} />
        <MobileNavItem active={activeTab === AppTab.HISTORY} icon={<History size={24} />} onClick={() => setActiveTab(AppTab.HISTORY)} />
      </nav>

      {/* Main Content Area */}
      <main className="min-h-screen">
        {renderContent()}
      </main>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center z-50 text-white p-6">
          <div className="bg-white p-8 rounded-3xl flex flex-col items-center shadow-2xl">
            <Loader2 className="animate-spin text-emerald-500 mb-6" size={64} />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">EcomGroup IA Activa</h3>
            <p className="text-slate-500 text-center max-w-xs">
              Diseñando anuncios con la metodología de EcomGroup...
            </p>
            <div className="mt-8 space-y-3 w-full">
              <div className="flex items-center gap-3 text-sm text-slate-600 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                <CheckCircle2 size={16} className="text-emerald-500" /> Analizando visuales...
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                <CheckCircle2 size={16} className="text-emerald-500" /> Estrategia de ganchos activa...
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                <Loader2 size={16} className="animate-spin text-emerald-500" /> Generando guiones...
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const NavItem = ({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
      active ? 'bg-emerald-500 text-white shadow-md shadow-emerald-100' : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const MobileNavItem = ({ active, icon, onClick }: { active: boolean, icon: React.ReactNode, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`p-3 rounded-xl transition-all ${active ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-emerald-600'}`}
  >
    {icon}
  </button>
);

export default App;
