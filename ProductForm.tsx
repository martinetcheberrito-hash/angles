
import React, { useState } from 'react';
import { Upload, X, Package, Tag, Users, Info, PlusCircle, Sparkles } from 'lucide-react';
import { ProductData } from '../types';

interface ProductFormProps {
  onSubmit: (data: ProductData) => void;
  loading: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<ProductData>({
    name: '',
    description: '',
    price: '',
    targetAudience: '',
    images: []
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, reader.result as string].slice(0, 3)
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description) return;
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
      <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-6">
        <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
          <Package size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">EcomGroup <span className="italic font-light">Builder</span></h2>
          <p className="text-slate-500 text-sm">Define tu producto para la IA estratégica.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2 uppercase tracking-wide">
              <Tag size={16} className="text-emerald-500" /> Nombre del Producto
            </label>
            <input 
              required
              type="text"
              placeholder="Ej: Sérum Facial Antiedad Ecom"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2 uppercase tracking-wide">
              Precio de Venta
            </label>
            <input 
              type="text"
              placeholder="Ej: $49.00"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2 uppercase tracking-wide">
            <Info size={16} className="text-emerald-500" /> Descripción de Valor
          </label>
          <textarea 
            required
            rows={4}
            placeholder="Describe qué lo hace único. ¿Cuál es el problema principal que resuelve?"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2 uppercase tracking-wide">
            <Users size={16} className="text-emerald-500" /> Avatar de Cliente
          </label>
          <input 
            type="text"
            placeholder="Ej: Mujeres 35+ preocupadas por el cuidado de la piel"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            value={formData.targetAudience}
            onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
          />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2 uppercase tracking-wide">
            <Upload size={16} className="text-emerald-500" /> Recursos Visuales
          </label>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.images.map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-emerald-100 group shadow-sm">
                <img src={img} alt="Vista previa" className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            
            {formData.images.length < 3 && (
              <label className="aspect-square border-2 border-dashed border-emerald-100 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50 hover:border-emerald-400 transition-all text-emerald-300 hover:text-emerald-600">
                <PlusCircle size={32} strokeWidth={1.5} />
                <span className="text-xs mt-2 font-bold uppercase">Subir</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} multiple />
              </label>
            )}
          </div>
        </div>

        <button 
          disabled={loading || !formData.name || !formData.description}
          className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
        >
          {loading ? 'Consultando EcomGroup IA...' : 'Crear Estrategia Ganadora'}
          {!loading && <Sparkles size={20} />}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
