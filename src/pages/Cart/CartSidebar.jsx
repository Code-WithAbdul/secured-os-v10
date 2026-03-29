import React, { useMemo } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

/**
 * 🛰️ AZEEM GADGETS - ELITE SLIDING ARCHIVE
 * --------------------------------------------------
 * Version: 5.1 (Routing & Logic Fixed)
 * --------------------------------------------------
 */

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  // 📈 REAL-TIME VALUATION ENGINE (Bullet-Proof Calculation)
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + (Number(item.price) * (item.quantity || 1)), 0);
  }, [cart]);

  // Handle Quantity with Safety Locks
  const handleQuantityChange = (id, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty >= 1) {
      updateQuantity(id, newQty);
    }
  };

  return (
    <>
      {/* 🌑 DYNAMIC OVERLAY (Glassmorphism) */}
      <div 
        className={`fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[600] transition-all duration-700 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      {/* 🚀 ELITE SLIDING ARCHIVE */}
      <aside className={`fixed top-0 right-0 h-full w-full max-w-[450px] bg-white dark:bg-slate-950 z-[700] shadow-[-30px_0_100px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        <div className="flex flex-col h-full relative overflow-hidden">
          {/* Subtle Cyber Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"></div>
          </div>

          {/* 1. ARCHIVE HEADER */}
          <div className="relative p-8 border-b border-slate-100 dark:border-slate-900 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-2xl font-black dark:text-white uppercase italic tracking-tighter">Vault <span className="text-blue-600">Archive</span></h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  {cart.length} Unit{cart.length !== 1 ? 's' : ''} Staged for Extraction
                </p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-3 bg-slate-50 dark:bg-slate-900 text-slate-500 hover:text-red-500 rounded-2xl transition-all active:scale-90 border border-slate-100 dark:border-slate-800"
            >
              <X size={20} />
            </button>
          </div>

          {/* 2. LIVE ITEM STREAM */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 no-scrollbar relative z-10">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div 
                  key={item.id} 
                  className="group relative flex gap-5 p-5 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 hover:border-blue-600/30 transition-all animate-in slide-in-from-right-4 duration-500"
                >
                  {/* Unit Preview */}
                  <div className="w-24 h-24 bg-white dark:bg-slate-950 rounded-3xl p-3 border border-slate-100 dark:border-white/5 shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-500 overflow-hidden flex items-center justify-center">
                    <img src={item.image} className="w-full h-full object-contain" alt={item.name} />
                  </div>
                  
                  {/* Unit Intelligence */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="space-y-1">
                      <h4 className="font-black text-xs md:text-sm dark:text-white uppercase tracking-tighter line-clamp-1 italic group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-blue-600 font-black text-xs italic tracking-tight">
                        Rs. {Number(item.price).toLocaleString()}
                      </p>
                    </div>
                    
                    {/* Operational Controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center bg-white dark:bg-slate-950 rounded-2xl p-1.5 border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity, -1)} 
                          className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"
                        >
                          <Minus size={14}/>
                        </button>
                        <span className="w-8 text-center font-black text-sm dark:text-white italic">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity, 1)} 
                          className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"
                        >
                          <Plus size={14}/>
                        </button>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all active:scale-75"
                        title="Purge from Vault"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center px-10 space-y-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full"></div>
                  <div className="relative w-32 h-32 bg-slate-50 dark:bg-slate-900 rounded-[3.5rem] flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 animate-pulse">
                    <ShoppingBag size={48} className="text-slate-200 dark:text-slate-800" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-black text-xl dark:text-white uppercase italic tracking-tighter">Archive Status: Empty</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">No hardware detected in the extraction buffer.</p>
                </div>
                <button 
                  onClick={onClose} 
                  className="px-10 py-5 bg-blue-600 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all"
                >
                  Scan Inventory
                </button>
              </div>
            )}
          </div>

          {/* 3. TOTAL VALUATION & DEPLOYMENT FOOTER */}
          {cart.length > 0 && (
            <div className="relative p-8 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 space-y-6 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Total Logistics Value</p>
                  <p className="text-4xl font-black text-blue-600 italic tracking-tighter">
                    Rs. {cartTotal.toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                   <ShieldCheck size={24} className="text-emerald-500 mb-1" />
                   <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Secure Node</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={() => { onClose(); navigate('/cart'); }}
                  className="w-full flex items-center justify-center gap-4 py-6 bg-blue-600 text-white rounded-[2.5rem] font-black uppercase text-[11px] tracking-[0.2em] shadow-2xl shadow-blue-600/30 hover:bg-blue-700 active:scale-95 transition-all group"
                >
                  Confirm Extraction <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
                <p className="text-center text-[8px] font-black text-slate-400 uppercase tracking-[0.4em] opacity-50 italic">
                  * Azeem OS Inventory Protocol v5.1 Active
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default CartSidebar;