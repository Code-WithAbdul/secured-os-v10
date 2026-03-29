import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Zap, ArrowRight, History, Laptop, Smartphone, Monitor, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '../../utils/products';

const GlobalSearch = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // 🔄 Load Recent Searches from LocalStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('azeem_recent_searches') || "[]");
    setRecentSearches(saved);
  }, [isOpen]);

  // ⌨️ Keyboard Logic: CTRL + K to toggle, ESC to close, ARROWS to navigate
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : document.dispatchEvent(new Event('toggleSearch'));
      }
      if (e.key === 'Escape') onClose();
      
      if (isOpen && query) {
        if (e.key === 'ArrowDown') {
          setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
          handleSelect(results[selectedIndex]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, query, selectedIndex]);

  const results = products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 6); // Limit results for clean UI

  const handleSelect = (product) => {
    // Save to Recent Searches
    const updatedRecent = [product.name, ...recentSearches.filter(s => s !== product.name)].slice(0, 3);
    localStorage.setItem('azeem_recent_searches', JSON.stringify(updatedRecent));
    
    navigate(`/product/${product.id}`);
    onClose();
    setQuery("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-start justify-center p-4 md:p-10 lg:p-20">
      {/* 🌑 Hyper-Blurred Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-2xl animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>
      
      {/* 📦 Search Command Palace */}
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100 dark:border-slate-800">
        
        <div className="p-6 md:p-10 space-y-8">
          {/* Search Input Node */}
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-600 group-focus-within:scale-110 transition-transform" size={24} />
            <input 
              ref={inputRef}
              autoFocus
              type="text" 
              value={query}
              placeholder="Search units, gadgets, or nodes..." 
              className="w-full pl-16 pr-20 py-6 md:py-8 bg-slate-50 dark:bg-slate-950 border border-transparent focus:border-blue-600/30 rounded-[2rem] outline-none text-xl md:text-2xl font-black dark:text-white transition-all shadow-inner"
              onChange={(e) => { setQuery(e.target.value); setSelectedIndex(-1); }}
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 bg-slate-200 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700">
               <Command size={12} className="text-slate-500" />
               <span className="text-[10px] font-black text-slate-500 uppercase">K</span>
            </div>
          </div>

          {/* 📊 Results Section */}
          <div className="space-y-6 max-h-[60vh] overflow-y-auto no-scrollbar pb-4">
            
            {/* 🕒 Recent Searches (When query is empty) */}
            {!query && recentSearches.length > 0 && (
              <div className="space-y-4 animate-in slide-in-from-top-2">
                <p className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">
                  <History size={14} /> Recent Intel
                </p>
                <div className="flex flex-wrap gap-3 ml-2">
                  {recentSearches.map((s, i) => (
                    <button 
                      key={i} 
                      onClick={() => setQuery(s)}
                      className="px-5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full text-xs font-bold dark:text-slate-300 hover:border-blue-500 transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 📦 Live Filtered Units */}
            {query && (
              <div className="space-y-3">
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] ml-4 mb-4">
                  Matching Units ({results.length})
                </p>
                {results.map((p, index) => (
                  <div 
                    key={p.id} 
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => handleSelect(p)}
                    className={`flex items-center gap-6 p-5 rounded-[2rem] cursor-pointer transition-all border-2 ${
                      selectedIndex === index 
                      ? 'bg-blue-600 border-blue-500 shadow-xl shadow-blue-500/20 scale-[1.02]' 
                      : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="w-16 h-16 bg-white rounded-2xl p-2 shadow-sm shrink-0">
                      <img src={p.image} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3">
                        <p className={`font-black text-lg uppercase leading-none ${selectedIndex === index ? 'text-white' : 'dark:text-white'}`}>{p.name}</p>
                        <span className={`text-[8px] font-black px-2 py-1 rounded-md uppercase ${selectedIndex === index ? 'bg-white/20 text-white' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'}`}>
                          {p.category}
                        </span>
                      </div>
                      <p className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${selectedIndex === index ? 'text-blue-100' : 'text-slate-400'}`}>
                        Inventory Price: Rs. {p.price.toLocaleString()}
                      </p>
                    </div>
                    <ArrowRight className={`${selectedIndex === index ? 'text-white translate-x-2' : 'text-slate-300'} transition-all`} size={20} />
                  </div>
                ))}
              </div>
            )}

            {/* 😕 No Results State */}
            {query && results.length === 0 && (
              <div className="py-20 text-center space-y-4">
                <Zap size={48} className="mx-auto text-slate-200 dark:text-slate-800 animate-pulse" />
                <p className="text-slate-500 font-black uppercase text-xs tracking-widest italic">"Master, no matching tech found in this sector."</p>
              </div>
            )}
          </div>
        </div>

        {/* 🛠️ Footer Branding */}
        <div className="bg-slate-50 dark:bg-slate-950 p-6 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
           <div className="flex gap-4">
              <div className="flex items-center gap-2 text-[8px] font-black text-slate-400 uppercase">
                 <span className="bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded-md">ESC</span> Close
              </div>
              <div className="flex items-center gap-2 text-[8px] font-black text-slate-400 uppercase">
                 <span className="bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded-md">↑↓</span> Navigate
              </div>
           </div>
           <p className="text-[10px] font-black text-blue-600 italic tracking-tighter">Azeem's OS v2.0</p>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;