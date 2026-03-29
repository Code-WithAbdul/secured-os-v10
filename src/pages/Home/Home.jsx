import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

// 🔥 Inventory Source: Master file
import { products as localVault } from "../../utils/products";

import ProductCard from '../../components/common/ProductCard';
import ProductSkeleton from '../../components/common/ProductSkeleton';
import ScrollReveal from '../../components/common/ScrollReveal';
import { 
  Search, Sparkles, ChevronLeft, 
  ChevronRight, Trophy, ShieldCheck, Truck, 
  CheckCircle, SlidersHorizontal, AlertCircle, 
  ChevronRight as ChevronIcon, Globe, Box
} from 'lucide-react';

/**
 * 🛰️ AZEEM GADGETS - MASTER HUB
 * --------------------------------------------------
 * Logic: Dual-Link Synchronization (Local + Cloud)
 * Version: 10.0 (Stable)
 * --------------------------------------------------
 */

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // 💾 STATE CORE
  const [displayProducts, setDisplayProducts] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const urlCategory = searchParams.get('cat') || "All";
  const [category, setCategory] = useState(urlCategory);
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // ✍️ Hero Typing Engine
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const categoriesList = ["Premium Mobiles", "Elite Laptops", "Smart Electronics"];

  // 🔄 1. DUAL-SYNC ENGINE (Hybrid Data Fetching)
  const fetchInventory = useCallback(async () => {
    setIsLoading(true);
    try {
      // 🚀 Calling Backend Vault
      const response = await fetch('http://localhost:5000/api/products');
      const result = await response.json();
      
      if (result.success && result.data) {
        const dbItems = result.data;
        const merged = [...localVault];
        
        // Prevent Duplicates via String ID comparison
        dbItems.forEach(dbItem => {
          const exists = merged.some(localItem => 
            String(localItem._id || localItem.id) === String(dbItem._id || dbItem.id)
          );
          if (!exists) merged.push(dbItem);
        });
        setDisplayProducts(merged);
      } else {
        setDisplayProducts(localVault);
      }
    } catch (err) {
      console.warn("⚠️ Satellite Link Offline: Loading Local Archive");
      setDisplayProducts(localVault);
    } finally {
      setTimeout(() => setIsLoading(false), 600);
    }
  }, []);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  // ✍️ 2. HERO TYPING LOGIC
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % categoriesList.length;
      const fullText = categoriesList[i];
      setDisplayText(isDeleting ? fullText.substring(0, displayText.length - 1) : fullText.substring(0, displayText.length + 1));
      
      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };
    let timer = setTimeout(handleTyping, isDeleting ? 60 : 120);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum]);

  // 🔍 3. ADVANCED FILTER & SORT
  const filteredProducts = useMemo(() => {
    let result = [...displayProducts].filter(p => {
      const matchesCategory = (category === "All" || category === "Master Archive" || p.category === category);
      const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "lowToHigh") result.sort((a, b) => Number(a.price) - Number(b.price));
    if (sortBy === "highToLow") result.sort((a, b) => Number(b.price) - Number(a.price));

    return result;
  }, [searchTerm, category, sortBy, displayProducts]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => { 
    setCategory(urlCategory);
    setCurrentPage(1); 
  }, [urlCategory, searchTerm]);

  return (
    <div className="space-y-12 pb-24 overflow-x-hidden animate-smooth-in bg-slate-50 dark:bg-[#050505] transition-colors duration-300 font-sans">
      
      {/* 🚀 HERO SECTOR (Optimized Text Sizes) */}
      <section className="relative px-4 md:px-8 pt-4">
        <div className="relative max-w-[1600px] mx-auto min-h-[450px] md:min-h-[600px] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-white/5 group">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://www.vocso.com/blog/wp-content/uploads/2022/02/eCommerce-Website-Features-1920-x-1080.jpg" 
              className="w-full h-full object-cover opacity-50 dark:opacity-30 group-hover:scale-105 transition-transform duration-[8000ms]" 
              alt="Vault Background"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/80 to-blue-900/30"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[450px] md:min-h-[600px] text-center p-6 space-y-8">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-blue-600/20 backdrop-blur-xl border border-blue-500/20 rounded-full">
               <Globe size={12} className="text-blue-500 animate-spin-slow" />
               <span className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-400">Vault Link: Online</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl md:text-7xl font-black text-white leading-none tracking-tighter uppercase italic drop-shadow-lg">
                Azeem <span className="text-blue-500">Gadgets</span>
              </h1>
              <h2 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-400 tracking-tighter uppercase italic min-h-[1.2em]">
                {displayText}<span className="text-blue-600 animate-pulse">|</span>
              </h2>
            </div>

            <button 
              onClick={() => document.getElementById('inventory').scrollIntoView({ behavior: 'smooth' })}
              className="group px-10 py-5 bg-blue-600 text-white rounded-[2rem] font-black uppercase text-[9px] tracking-widest flex items-center gap-4 hover:bg-white hover:text-black transition-all shadow-xl active:scale-95"
            >
              Explore Warehouse <ChevronIcon size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 📊 TRUST NODES */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-6">
        {[
          { icon: <Trophy size={20}/>, label: "Master Tier Units", path: "/authenticity" },
          { icon: <ShieldCheck size={20}/>, label: "Vault Warranty", path: "/warranty" },
          { icon: <Truck size={20}/>, label: "Fast Deployment", path: "/shipping-policy" },
          { icon: <CheckCircle size={20}/>, label: "100% Authentic", path: "/authenticity" },
        ].map((stat, i) => (
          <button key={i} onClick={() => navigate(stat.path)} className="flex items-center gap-4 bg-white dark:bg-[#0c0c0c] p-5 md:p-6 rounded-[2rem] border border-slate-100 dark:border-white/5 hover:border-blue-600/40 transition-all group shadow-sm">
            <div className="text-blue-600 group-hover:scale-110 transition-transform">{stat.icon}</div>
            <p className="text-[9px] font-black uppercase tracking-widest dark:text-white text-left">{stat.label}</p>
          </button>
        ))}
      </div>

      {/* 🛠️ NAVIGATION & SEARCH TERMINAL */}
      <div className="max-w-[1600px] mx-auto px-6 space-y-10" id="inventory">
        <div className="flex flex-col xl:flex-row gap-6 items-center justify-between">
          <div className="flex gap-2.5 overflow-x-auto pb-4 lg:pb-0 no-scrollbar w-full xl:w-auto">
            {['All', 'Mobiles', 'Laptops', 'Electronics'].map((id) => (
              <button
                key={id}
                onClick={() => navigate(`?cat=${id}`)}
                className={`px-7 py-4 rounded-2xl font-black transition-all duration-300 whitespace-nowrap text-[9px] uppercase tracking-widest ${
                  category === id ? 'bg-blue-600 text-white shadow-lg' : 'bg-white dark:bg-[#0c0c0c] text-slate-500 border border-slate-100 dark:border-white/5 hover:border-blue-600/30'
                }`}
              >
                {id === 'All' ? 'Master Archive' : `${id} Sector`}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
            <div className="relative group w-full md:w-[350px]">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder={`Intercept ${category} data...`} 
                  className="w-full pl-14 pr-6 py-4 bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-white/5 rounded-2xl outline-none font-bold dark:text-white shadow-inner focus:border-blue-600 transition-all text-sm"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="relative group">
                <SlidersHorizontal className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-600" size={16} />
                <select 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full md:w-auto pl-14 pr-10 py-4 bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-white/5 rounded-2xl outline-none font-black text-[9px] uppercase tracking-widest dark:text-white cursor-pointer appearance-none shadow-sm focus:border-blue-600"
                >
                  <option value="default">Sort Protocol</option>
                  <option value="highToLow">Value: High-Low</option>
                  <option value="lowToHigh">Value: Low-High</option>
                </select>
            </div>
          </div>
        </div>
      </div>

      {/* 📦 PRODUCTION GRID */}
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex justify-between items-center mb-10 px-2">
            <div className="space-y-1">
              <h2 className="text-3xl md:text-4xl font-black dark:text-white uppercase italic tracking-tighter leading-none">
                {category} <span className="text-blue-600">Assets</span>
              </h2>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Live Inventory Synchronization</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3 bg-white dark:bg-[#0c0c0c] px-5 py-2.5 rounded-xl border border-slate-100 dark:border-white/5">
               <Box size={14} className="text-blue-500" />
               <span className="font-black text-[9px] text-slate-500 uppercase tracking-widest">{filteredProducts.length} Units Logged</span>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
          {isLoading ? (
            [...Array(8)].map((_, i) => <ProductSkeleton key={i} />)
          ) : (
            currentItems.map((product, index) => (
              <ScrollReveal key={String(product._id || product.id)} delay={index * 40} direction="up">
                 <ProductCard product={product} />
              </ScrollReveal>
            ))
          )}
        </div>
      </div>

      {/* 🧭 NAVIGATION NODES (Pagination) */}
      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-16">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-4 rounded-2xl bg-white dark:bg-[#0c0c0c] shadow-lg disabled:opacity-20 border border-slate-100 dark:border-white/5 hover:text-blue-600 transition-all"><ChevronLeft size={20}/></button>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`w-12 h-12 rounded-xl font-black transition-all text-[10px] ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-xl scale-105' : 'bg-white dark:bg-[#0c0c0c] text-slate-400 border border-slate-100 dark:border-white/5 hover:border-blue-600/30'}`}>{i + 1}</button>
            ))}
          </div>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-4 rounded-2xl bg-blue-600 text-white shadow-lg disabled:opacity-20 hover:scale-105 transition-all"><ChevronRight size={20}/></button>
        </div>
      )}

      {/* 🛸 NULL STATE */}
      {!isLoading && filteredProducts.length === 0 && (
        <div className="text-center py-32 animate-in zoom-in-95">
          <AlertCircle size={48} className="mx-auto text-slate-200 dark:text-slate-800 mb-6" />
          <h2 className="text-2xl font-black dark:text-white uppercase tracking-tighter mb-2">Zero Assets Discovered</h2>
          <p className="text-slate-500 font-bold uppercase text-[9px] tracking-[0.3em]">No hardware units found in the specified sector.</p>
          <button onClick={() => {navigate('?cat=All'); setSearchTerm(""); setSortBy("default");}} className="mt-8 px-8 py-4 bg-blue-600 text-white rounded-xl font-black uppercase text-[9px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">Reset Neural Link</button>
        </div>
      )}
    </div>
  );
};

export default Home;