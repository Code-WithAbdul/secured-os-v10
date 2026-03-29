import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PackagePlus, Image as ImageIcon, Tag, Hash, 
  ShieldCheck, Zap, Trash2, Save, LayoutGrid, 
  ChevronRight, Info, Boxes, Cpu, Battery, HardDrive, 
  Smartphone, ArrowLeft, Loader2
} from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';

const AddProduct = () => {
  const navigate = useNavigate();
  const [isDeploying, setIsDeploying] = useState(false);

  // 📝 CORE STATE (Synced with MongoDB Schema)
  const [product, setProduct] = useState({
    id: '', // 🔥 Added: For numeric Vault ID
    name: '',
    description: '',
    category: 'Mobiles', 
    brand: '',
    rating: 5.0,
    stock: 10,
    price: '',
    image: '',
    // Technical specs (Inside Map logic)
    processor: '',
    ram: '',
    storage: '',
    battery: ''
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
    if (name === 'image') setPreview(value);
  };

  // 🚀 CORE DEPLOYMENT LOGIC
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Core Validation
    if (!product.id || !product.image || !product.price || !product.name) {
      alert("CRITICAL ERROR: ID, Name, Price, and Image are mandatory.");
      return;
    }

    setIsDeploying(true);

    try {
      // 🔑 Get Token from LocalStorage
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token') || (storedUser ? JSON.parse(storedUser).token : '');

      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // 🔥 Added: Security Handshake
        },
        body: JSON.stringify({
          id: product.id,
          name: product.name,
          description: product.description,
          category: product.category,
          brand: product.brand,
          price: Number(product.price),
          stock: Number(product.stock),
          rating: Number(product.rating),
          image: product.image,
          // ⚙️ Wrap technical specs into a Map/Object for the model
          specs: {
            processor: product.processor,
            ram: product.ram,
            storage: product.storage,
            battery: product.battery
          }
        })
      });

      const result = await response.json();

      if (result.success) {
        alert(`✅ DEPLOYED: ${product.name} is now live.`);
        navigate('/admin/inventory'); // Admin panel wapas jao
      } else {
        alert("❌ FAILED: " + result.message);
      }
    } catch (err) {
      console.error("Vault Connection Error:", err);
      alert("CRITICAL FAIL: Backend offline or Authorization failure.");
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 md:px-8 space-y-10 animate-smooth-in bg-slate-50 dark:bg-[#050505] min-h-screen selection:bg-blue-600">
      
      {/* COMMAND HEADER */}
      <ScrollReveal direction="down">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-slate-100 dark:border-slate-800 pb-10">
          <div className="space-y-4 text-center md:text-left">
            <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest hover:translate-x-[-5px] transition-transform">
              <ArrowLeft size={14} /> Back to Records
            </button>
            <div className="flex items-center gap-4 justify-center md:justify-start">
               <div className="p-4 bg-blue-600 rounded-3xl text-white shadow-2xl shadow-blue-600/30">
                 <PackagePlus size={32} />
               </div>
               <h1 className="text-4xl md:text-6xl font-black dark:text-white tracking-tighter uppercase italic leading-none">
                 Inventory <span className="text-blue-600">Forge</span>
               </h1>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Master Authorization Protocol Active</p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <button type="button" onClick={() => navigate(-1)} className="flex-1 md:flex-none px-10 py-5 bg-slate-100 dark:bg-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:bg-red-500 hover:text-white transition-all">Abort</button>
            <button onClick={handleSubmit} disabled={isDeploying} className="flex-1 md:flex-none px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-blue-500/40 flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all disabled:opacity-50">
              {isDeploying ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {isDeploying ? 'Deploying...' : 'Execute Deployment'}
            </button>
          </div>
        </div>
      </ScrollReveal>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-12">
        
        {/* LEFT SECTOR */}
        <div className="space-y-10">
          <section className="space-y-4">
            <h3 className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em] flex items-center gap-2 ml-4 italic">Optical Data Feed</h3>
            <div className="aspect-square bg-white dark:bg-slate-950 rounded-[3.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center overflow-hidden relative shadow-2xl">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-contain p-10 transition-transform duration-700 hover:scale-110" 
                      onError={() => setPreview(null)} />
              ) : (
                <div className="text-center space-y-4 p-10">
                  <Smartphone size={60} className="mx-auto text-slate-200 dark:text-slate-800 animate-bounce" />
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] italic">"Awaiting optical link..."</p>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-400 ml-4">Image Stream URL</label>
              <input name="image" type="text" required value={product.image} onChange={handleChange} placeholder="/images/iphone.jpg" 
                className="w-full p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl text-xs font-bold outline-none focus:border-blue-600 transition-all dark:text-white" />
            </div>
          </section>

          <section className="bg-slate-900 p-8 rounded-[3rem] text-white space-y-6 border border-white/5 shadow-2xl">
            <h3 className="text-[10px] font-black uppercase text-blue-400 tracking-[0.3em] flex items-center gap-3 italic">Vault Security</h3>
            <div className="space-y-4">
               <div className="space-y-2">
                 <label className="text-[9px] font-black uppercase text-slate-500 ml-2 italic">Numeric Vault ID (Unique)</label>
                 <input name="id" type="text" required value={product.id} onChange={handleChange} className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold outline-none focus:border-blue-500 transition-all" placeholder="e.g. 204" />
               </div>
               <div className="space-y-2">
                 <label className="text-[9px] font-black uppercase text-slate-500 ml-2 italic">Brand Identity</label>
                 <input name="brand" required value={product.brand} onChange={handleChange} className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold outline-none focus:border-blue-500 transition-all" placeholder="Apple, Samsung..." />
               </div>
            </div>
          </section>
        </div>

        {/* RIGHT SECTOR */}
        <div className="lg:col-span-2 space-y-10">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">Master Unit Title</label>
              <input name="name" required value={product.name} onChange={handleChange} type="text" className="w-full p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 outline-none focus:border-blue-600 font-black text-lg dark:text-white shadow-xl" placeholder="iPhone 15 Pro Max" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">Target Sector</label>
              <select name="category" value={product.category} onChange={handleChange} className="w-full p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 outline-none focus:border-blue-600 font-black uppercase text-[10px] tracking-widest dark:text-white shadow-xl cursor-pointer">
                <option value="Mobiles">Mobiles</option>
                <option value="Laptops">Laptops</option>
                <option value="Electronics">Electronics</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">Value (PKR)</label>
              <input name="price" required value={product.price} onChange={handleChange} type="number" className="w-full p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 outline-none focus:border-emerald-500 font-black text-xl text-emerald-600 shadow-xl" placeholder="0" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">Vault Stock</label>
              <input name="stock" required value={product.stock} onChange={handleChange} type="number" className="w-full p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 outline-none focus:border-blue-600 font-black text-xl dark:text-white shadow-xl" placeholder="10" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">Unit Rating</label>
              <input name="rating" value={product.rating} onChange={handleChange} type="number" step="0.1" max="5" className="w-full p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 outline-none focus:border-amber-500 font-black text-xl text-amber-500 shadow-xl" placeholder="5.0" />
            </div>
          </div>

          <div className="p-10 bg-white dark:bg-slate-900 rounded-[4rem] border border-slate-100 dark:border-slate-800 shadow-2xl space-y-8 relative overflow-hidden group">
             <div className="absolute -right-10 -bottom-10 opacity-5 rotate-12 group-hover:rotate-45 transition-transform duration-1000"><Boxes size={250} /></div>
             <div className="flex items-center gap-4 border-b border-slate-50 dark:border-slate-800 pb-6">
                <div className="p-3 bg-blue-600/10 text-blue-600 rounded-2xl"><LayoutGrid size={24} /></div>
                <h3 className="text-xl font-black dark:text-white uppercase italic tracking-tighter">Hardware <span className="text-blue-600">Logic</span></h3>
             </div>
             <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <span className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 ml-2"><Cpu size={14} className="text-blue-600" /> Processor</span>
                  <input name="processor" value={product.processor} onChange={handleChange} placeholder="e.g. A17 Pro" className="w-full p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-600/20 dark:text-white" />
                </div>
                <div className="space-y-3">
                  <span className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 ml-2"><Zap size={14} className="text-blue-600" /> RAM</span>
                  <input name="ram" value={product.ram} onChange={handleChange} placeholder="e.g. 8GB" className="w-full p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-600/20 dark:text-white" />
                </div>
                <div className="space-y-3">
                  <span className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 ml-2"><HardDrive size={14} className="text-blue-600" /> Storage</span>
                  <input name="storage" value={product.storage} onChange={handleChange} placeholder="e.g. 256GB" className="w-full p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-600/20 dark:text-white" />
                </div>
                <div className="space-y-3">
                  <span className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 ml-2"><Battery size={14} className="text-blue-600" /> Battery</span>
                  <input name="battery" value={product.battery} onChange={handleChange} placeholder="e.g. 4422 mAh" className="w-full p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-600/20 dark:text-white" />
                </div>
             </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest italic">Product Narrative</label>
            <textarea name="description" rows="5" value={product.description} onChange={handleChange} className="w-full p-8 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 outline-none focus:border-blue-600 font-medium text-sm dark:text-white shadow-xl italic" placeholder="Describe the engineering masterpiece..."></textarea>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;