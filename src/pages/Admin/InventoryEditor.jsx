import React, { useState, useEffect } from 'react';
import { 
  X, Save, Image as ImageIcon, Tag, Hash, Cpu, 
  Layers, Database, Boxes, Loader2, Zap, AlertCircle 
} from 'lucide-react';

const InventoryEditor = ({ product, isOpen, onClose, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // 📝 Master State Configuration
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Mobiles",
    image: "",
    brand: "",
    stock: 10,
    description: "High-performance tech unit from Azeem Vault."
  });

  // Sync state when editing an existing product
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        category: product.category || "Mobiles",
        image: product.image || "",
        brand: product.brand || "",
        stock: product.stock || 10,
        description: product.description || "High-performance tech unit from Azeem Vault."
      });
    } else {
      // Reset for new entry
      setFormData({
        name: "", price: "", category: "Mobiles", 
        image: "", brand: "", stock: 10, 
        description: "High-performance tech unit from Azeem Vault."
      });
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const categories = ["Mobiles", "Laptops", "Electronics", "Gadgets", "Accessories"];

  // 🔥 THE MASTER EXECUTION LOGIC
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Get Security Token from Vault
      const token = localStorage.getItem('token');
      
      // 2. Determine Action (POST for new, PUT for update)
      const url = product 
        ? `http://localhost:5000/api/products/${product._id}` 
        : 'http://localhost:5000/api/products';
      
      const method = product ? 'PUT' : 'POST';

      // 3. Execute Satellite Request
      const response = await fetch(url, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        console.log("✅ Vault Storage Successful");
        onSave(); // AdminPanel refresh trigger
        onClose(); // Modal exit
      } else {
        setError(result.message || "Protocol Failure: Asset rejected by Vault.");
      }
    } catch (err) {
      setError("🛰️ Connection Lost: Central Vault Unreachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* 🌑 Deep Blur Backdrop */}
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in duration-500" onClick={onClose}></div>

      {/* 📦 Master Command Palace */}
      <div className="relative bg-white dark:bg-[#0a0a0a] w-full max-w-3xl rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-slate-100 dark:border-white/5 overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header Protocol */}
        <div className="p-8 md:p-10 border-b border-slate-50 dark:border-white/5 flex justify-between items-center bg-slate-50/50 dark:bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/20">
              <Database size={24} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black dark:text-white uppercase italic tracking-tighter leading-none">
                Unit <span className="text-blue-600 italic">{product ? 'Reconfig' : 'Deployment'}</span>
              </h2>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mt-1 italic">
                {product ? `Active Node: ${product._id}` : 'Generating New Protocol'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 rounded-2xl transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto no-scrollbar">
          {error && (
             <div className="mx-10 mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-widest animate-shake">
                <AlertCircle size={16} /> {error}
             </div>
          )}

          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-10">
            
            {/* Sector 1: Core Identity */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 italic">Module Name</label>
                <div className="relative">
                  <Cpu className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-600" size={18} />
                  <input required type="text" value={formData.name}
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 rounded-2xl font-bold dark:text-white outline-none focus:border-blue-600 transition-all shadow-inner"
                    placeholder="e.g. iPhone 15 Pro Max"
                    onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 italic">Sector (Category)</label>
                <div className="relative">
                  <Layers className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-600" size={18} />
                  <select value={formData.category}
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 rounded-2xl font-bold dark:text-white outline-none focus:border-blue-600 appearance-none cursor-pointer"
                    onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    {categories.map(cat => <option key={cat} value={cat} className="bg-slate-900 text-white">{cat}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Sector 2: Financials & Stock */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 italic">Price (Rs)</label>
                <div className="relative">
                  <Hash className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500" size={18} />
                  <input required type="number" value={formData.price}
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 rounded-2xl font-black text-lg dark:text-white outline-none focus:border-emerald-500 transition-all"
                    onChange={(e) => setFormData({...formData, price: e.target.value})} />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 italic">Brand</label>
                <div className="relative">
                  <Tag className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-600" size={18} />
                  <input required type="text" value={formData.brand}
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 rounded-2xl font-bold dark:text-white outline-none focus:border-blue-600 transition-all"
                    placeholder="e.g. Apple"
                    onChange={(e) => setFormData({...formData, brand: e.target.value})} />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 italic">Stock Units</label>
                <div className="relative">
                  <Boxes className="absolute left-5 top-1/2 -translate-y-1/2 text-amber-500" size={18} />
                  <input required type="number" value={formData.stock}
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 rounded-2xl font-black dark:text-white outline-none focus:border-amber-500 transition-all"
                    onChange={(e) => setFormData({...formData, stock: e.target.value})} />
                </div>
              </div>
            </div>

            {/* Sector 3: Media Stream */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 italic">Optical URL (Image)</label>
              <div className="relative">
                <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-600" size={18} />
                <input required type="text" value={formData.image}
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 rounded-2xl font-bold dark:text-white outline-none focus:border-blue-600 transition-all shadow-inner text-xs"
                  placeholder="https://images.site.com/unit.png"
                  onChange={(e) => setFormData({...formData, image: e.target.value})} />
              </div>
            </div>

            {/* Visual Intelligence Preview */}
            <div className="p-8 bg-slate-50 dark:bg-white/[0.02] rounded-[3rem] border border-dashed border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center gap-10">
               <div className="relative group">
                  <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative w-36 h-36 bg-white dark:bg-black rounded-[2.5rem] p-4 flex items-center justify-center shadow-2xl border border-slate-100 dark:border-white/5">
                    <img src={formData.image} alt="LiveStream" className="max-h-full object-contain" 
                         onError={(e) => e.target.src='https://via.placeholder.com/300?text=Hardware+Failure'} />
                  </div>
               </div>
               <div className="space-y-4 text-center md:text-left flex-grow">
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
                    <p className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em] italic">Active Sync: Optical Stream</p>
                  </div>
                  <h4 className="text-2xl font-black dark:text-white uppercase tracking-tighter leading-none italic">
                    {formData.name || 'PENDING_DESIGNATION'}
                  </h4>
                  <p className="text-[10px] font-bold text-slate-500 italic max-w-sm leading-relaxed uppercase tracking-wider">
                    Optical mapping finalized. Unit valuation locked at Rs. {formData.price || '0'}. Ensure the asset stream is stable before deployment.
                  </p>
               </div>
            </div>

            {/* Save Protocol */}
            <div className="flex gap-4 pt-4">
              <button type="button" onClick={onClose} 
                className="px-10 py-6 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 rounded-[2.5rem] font-black uppercase text-[10px] tracking-widest hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                Abort
              </button>
              <button type="submit" disabled={loading}
                className="flex-grow py-6 bg-blue-600 text-white rounded-[2.5rem] font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl shadow-blue-600/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4">
                {loading ? <Loader2 className="animate-spin" /> : <>Deploy Protocol <Save size={20} /></>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InventoryEditor;