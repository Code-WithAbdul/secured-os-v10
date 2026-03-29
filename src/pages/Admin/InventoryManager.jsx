import React, { useState, useEffect, useCallback } from 'react';
import { products as initialProducts } from '../../utils/products';
import ScrollReveal from '../../components/common/ScrollReveal';
import { 
  Edit3, Trash2, Plus, Search, 
  Filter, LayoutGrid, Zap, 
  AlertCircle, Package, Database, 
  TrendingUp, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InventoryEditor from './InventoryEditor'; // 🛰️ Essential for editing

const InventoryManager = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // 🔄 REAL-TIME CORE SYNC (LocalStorage Persistence)
  const syncVault = useCallback(() => {
    try {
      const savedInventory = localStorage.getItem('azeems_inventory');
      if (savedInventory) {
        setInventory(JSON.parse(savedInventory));
      } else {
        // First time initialization
        localStorage.setItem('azeems_inventory', JSON.stringify(initialProducts));
        setInventory(initialProducts);
      }
    } catch (err) {
      console.error("Vault Access Error:", err);
      setInventory([]); // Fallback to empty to prevent blank page
    }
  }, []);

  useEffect(() => {
    syncVault();
    window.addEventListener('storage', syncVault);
    return () => window.removeEventListener('storage', syncVault);
  }, [syncVault]);

  // 🛠️ COMMAND PROTOCOLS
  const handleDelete = (id) => {
    if(window.confirm("MASTER: Execute permanent termination of this unit?")) {
      const updated = inventory.filter(p => p.id !== id);
      setInventory(updated);
      localStorage.setItem('azeems_inventory', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage')); // Notify other components
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsEditorOpen(true);
  };

  const saveProduct = (updatedUnit) => {
    const updatedInventory = inventory.map(p => p.id === updatedUnit.id ? updatedUnit : p);
    setInventory(updatedInventory);
    localStorage.setItem('azeems_inventory', JSON.stringify(updatedInventory));
    window.dispatchEvent(new Event('storage'));
  };

  // 📊 TELEMETRY CALCULATIONS
  const totalValue = inventory.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);
  const lowStockCount = inventory.filter(p => (p.stock || 0) < 5).length;

  return (
    <div className="w-full space-y-10 pb-24 animate-smooth-in overflow-x-hidden">
      
      {/* 🚀 ADMIN HERO HEADER */}
      <ScrollReveal direction="down">
        <div className="bg-slate-950 rounded-[3rem] md:rounded-[4.5rem] p-10 md:p-20 text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="space-y-6 text-center lg:text-left">
              <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] hover:text-white transition-all">
                <ArrowLeft size={14} /> Escape to Storefront
              </button>
              <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85]">
                Inventory <br /> <span className="text-blue-600">Commander</span>
              </h1>
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.5em] italic">Azeem's OS Architecture • Node v5.0.2</p>
            </div>
            
            <button 
              onClick={() => navigate('/admin/add')}
              className="group px-12 py-7 bg-blue-600 rounded-[2.5rem] font-black uppercase text-xs tracking-[0.2em] flex items-center gap-4 shadow-2xl shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all"
            >
              <Plus size={24} /> New Deployment
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* 📊 REAL-TIME ANALYTICS TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {[
          { label: "Vault Capacity", val: inventory.length, color: "text-blue-500", icon: <Database size={20}/> },
          { label: "Revenue Est.", val: `Rs. ${(totalValue/1000000).toFixed(1)}M`, color: "text-emerald-500", icon: <TrendingUp size={20}/> },
          { label: "Critical Stock", val: lowStockCount, color: "text-red-500", icon: <AlertCircle size={20}/> },
          { label: "Deployment Nodes", val: "Active", color: "text-purple-500", icon: <Zap size={20}/> },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl group hover:border-blue-600/30 transition-all">
             <div className={`${stat.color} mb-4 bg-slate-50 dark:bg-slate-800 w-fit p-3 rounded-2xl`}>{stat.icon}</div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
             <h4 className="text-3xl font-black dark:text-white tracking-tighter italic">{stat.val}</h4>
          </div>
        ))}
      </div>

      {/* 🔍 GLOBAL SEARCH TERMINAL */}
      <div className="px-4">
        <div className="relative group">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={24} />
          <input 
            type="text" 
            placeholder="Identify Serial or Unit Designation..." 
            className="w-full pl-20 pr-10 py-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] outline-none focus:ring-4 focus:ring-blue-600/10 font-black dark:text-white text-lg shadow-2xl transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 📜 UNIT DATABASE TABLE */}
      <div className="px-4 overflow-hidden">
        <div className="overflow-x-auto rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-950">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                <th className="p-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Module Design</th>
                <th className="p-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Sector</th>
                <th className="p-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Operational Value</th>
                <th className="p-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Availability</th>
                <th className="p-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic text-right">Command</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-900">
              {inventory.length > 0 ? inventory.filter(p => p.name?.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
                <tr key={product.id || Math.random()} className="group hover:bg-blue-600/[0.03] transition-colors">
                  <td className="p-10">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-[1.5rem] p-3 shrink-0 overflow-hidden border border-slate-100 dark:border-slate-800 shadow-inner">
                        <img src={product.image} alt="" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                             onError={(e) => e.target.src='https://via.placeholder.com/150?text=UNIT_NULL'}/>
                      </div>
                      <div className="space-y-1">
                        <p className="font-black text-lg dark:text-white uppercase tracking-tighter leading-none">{product.name}</p>
                        <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Serial_ID: #{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-10">
                    <span className="px-5 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-[9px] font-black uppercase rounded-full border border-blue-100 dark:border-blue-800 tracking-widest">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-10">
                    <p className="font-black text-xl dark:text-white italic tracking-tighter">Rs. {Number(product.price).toLocaleString()}</p>
                  </td>
                  <td className="p-10">
                    <div className="flex items-center gap-3">
                       <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${Number(product.stock) > 5 ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                       <span className="font-black text-[10px] dark:text-white uppercase tracking-widest">{product.stock || 0} Units In Vault</span>
                    </div>
                  </td>
                  <td className="p-10 text-right">
                    <div className="flex justify-end gap-4">
                      <button onClick={() => handleEdit(product)} className="p-5 bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-blue-600 hover:bg-white rounded-2xl transition-all shadow-sm border border-slate-100 dark:border-slate-800">
                        <Edit3 size={20} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-5 bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-red-500 hover:bg-white rounded-2xl transition-all shadow-sm border border-slate-100 dark:border-slate-800"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="p-20 text-center space-y-4">
                    <Database size={48} className="mx-auto text-slate-200" />
                    <p className="text-slate-400 font-black uppercase text-xs tracking-widest">No mapping detected in current coordinates.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🛰️ CONFIGURATION EDITOR MODAL */}
      <InventoryEditor 
        product={editingProduct} 
        isOpen={isEditorOpen} 
        onClose={() => setIsEditorOpen(false)} 
        onSave={saveProduct} 
      />

    </div>
  );
};

export default InventoryManager;