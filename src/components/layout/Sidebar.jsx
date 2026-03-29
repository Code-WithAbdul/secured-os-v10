import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Cpu, Smartphone, Laptop, 
  Settings, Zap, LayoutGrid,
  ChevronRight, X, User, ShieldCheck, 
  Package, LifeBuoy
} from 'lucide-react';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCat = searchParams.get('cat') || "Mobiles";

  // 🎯 Strictly synced with your products.js categories
  const navItems = [
    { id: 'Mobiles', icon: <Smartphone size={22} />, label: 'Mobiles', color: 'text-blue-500' },
    { id: 'Laptops', icon: <Laptop size={22} />, label: 'Laptops', color: 'text-purple-500' },
    { id: 'Electronics', icon: <Cpu size={22} />, label: 'Electronics', color: 'text-cyan-400' },
    { id: 'All', icon: <LayoutGrid size={22} />, label: 'All Vault', color: 'text-slate-400' },
  ];

  return (
    <>
      {/* 📱 MOBILE NAVIGATION (Bottom Dock) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[150] w-[90%] max-w-md lg:hidden">
        <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex justify-around items-center p-2.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSearchParams({ cat: item.id })}
              className={`p-4 rounded-full transition-all duration-500 ${
                currentCat === item.id 
                ? 'bg-blue-600 text-white scale-110 shadow-lg shadow-blue-500/40' 
                : 'text-slate-400 hover:text-blue-500'
              }`}
            >
              {React.cloneElement(item.icon, { size: 20 })}
            </button>
          ))}
          <button onClick={() => setShowAccount(true)} className="p-4 text-slate-400 bg-slate-100 dark:bg-slate-900 rounded-full hover:rotate-90 transition-all duration-500">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* 💻 DESKTOP SIDEBAR (Floating Vertical Dock) */}
      <div 
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={`fixed left-6 top-1/2 -translate-y-1/2 z-[100] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hidden lg:block ${
          isExpanded ? 'w-64' : 'w-20' 
        }`}
      >
        <div className="relative h-[75vh] bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[3.5rem] shadow-2xl flex flex-col items-center py-10 transition-all duration-500 overflow-hidden">
          
          {/* Brand Logo Icon */}
          <Link to="/" className="mb-12 p-4 bg-blue-600 rounded-[1.5rem] text-white shadow-xl shadow-blue-500/30 group">
            <Zap size={24} fill="currentColor" className="group-hover:scale-110 transition-transform" />
          </Link>

          {/* Navigation Items */}
          <nav className="flex-grow w-full px-3 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSearchParams({ cat: item.id })}
                className={`w-full flex items-center gap-5 p-4 rounded-[2rem] transition-all duration-500 group relative ${
                  currentCat === item.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'hover:bg-slate-50 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400'
                }`}
              >
                <div className={`shrink-0 transition-transform group-hover:scale-110 ${currentCat === item.id ? 'text-white' : item.color}`}>
                  {item.icon}
                </div>
                <span className={`font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-700 whitespace-nowrap ${
                  isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}>
                  {item.label}
                </span>
                
                {/* Active Indicator Dot */}
                {currentCat === item.id && !isExpanded && (
                  <div className="absolute -right-1 w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </nav>

          {/* Footer Settings Button */}
          <button 
            onClick={() => setShowAccount(true)}
            className="mt-auto group flex items-center gap-5 p-4 rounded-[2rem] text-slate-400 hover:text-blue-600 transition-all duration-500"
          >
            <Settings size={24} className="group-hover:rotate-180 transition-transform duration-1000" />
            <span className={`font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-700 ${
               isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>Account Hub</span>
          </button>
        </div>
      </div>

      {/* 👤 ACCOUNT HUB MODAL (Professional Style) */}
      {showAccount && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-500" onClick={() => setShowAccount(false)}></div>
          
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-950 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-[0_0_100px_rgba(37,99,235,0.2)] overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10 space-y-8">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">Control <span className="text-blue-600">Center</span></h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Azeem's OS v4.0.2</p>
                </div>
                <button onClick={() => setShowAccount(false)} className="p-3 bg-slate-100 dark:bg-slate-900 rounded-full hover:bg-red-500 hover:text-white transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Link to="/dashboard/orders" onClick={() => setShowAccount(false)} className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-transparent hover:border-blue-500/20 transition-all group">
                  <Package className="text-blue-500 mb-4 group-hover:scale-110 transition-transform" size={30} />
                  <p className="font-black text-xs uppercase dark:text-white tracking-widest">Orders</p>
                </Link>
                <Link to="/dashboard/warranty" onClick={() => setShowAccount(false)} className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-transparent hover:border-purple-500/20 transition-all group">
                  <ShieldCheck className="text-purple-500 mb-4 group-hover:scale-110 transition-transform" size={30} />
                  <p className="font-black text-xs uppercase dark:text-white tracking-widest">Warranty</p>
                </Link>
              </div>

              <div className="space-y-3">
                 <Link to="/contact" onClick={() => setShowAccount(false)} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-900/50 rounded-3xl group">
                    <div className="flex items-center gap-4">
                      <LifeBuoy className="text-amber-500" size={20} />
                      <span className="font-black text-[10px] uppercase tracking-widest dark:text-white">Live Support</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-all" />
                 </Link>
                 <Link to="/login" onClick={() => setShowAccount(false)} className="flex items-center justify-between p-5 bg-blue-600 text-white rounded-3xl group shadow-lg shadow-blue-500/20">
                    <div className="flex items-center gap-4">
                      <User size={20} />
                      <span className="font-black text-[10px] uppercase tracking-widest">Member Portal</span>
                    </div>
                    <ChevronRight size={16} />
                 </Link>
              </div>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-900 text-center border-t border-slate-100 dark:border-slate-800">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em]">Karachi Tech Operations</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;