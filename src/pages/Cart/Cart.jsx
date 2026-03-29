import React, { useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import { 
  Trash2, ShoppingBag, ArrowLeft, ShieldCheck, 
  Truck, Plus, Minus, Zap, ReceiptText, LockKeyhole, ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../../components/common/ScrollReveal';

/**
 * 🛰️ AZEEM GADGETS - LOGISTICS & CART TERMINAL
 * --------------------------------------------------
 * Version: 11.5 (Logic Optimized)
 * --------------------------------------------------
 */

const Cart = ({ onOpenCheckout }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  // 💰 FINANCIAL INTELLIGENCE ENGINE
  const financials = useMemo(() => {
    const subtotal = cart.reduce((acc, item) => acc + (Number(item.price) * (item.quantity || 1)), 0);
    const shipping = subtotal > 0 ? (subtotal > 50000 ? 0 : 250) : 0; 
    const tax = Math.round(subtotal * 0.02); 
    const total = subtotal + shipping + tax;
    
    return { subtotal, shipping, tax, total };
  }, [cart]);

  // 🛠️ HANDLERS
  const handleIncrease = (id, currentQty) => {
    updateQuantity(id, currentQty + 1);
  };

  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      updateQuantity(id, currentQty - 1);
    } else {
      removeFromCart(id); 
    }
  };

  // 🛑 EMPTY VAULT VIEW
  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-slate-50 dark:bg-[#050505] transition-colors duration-500">
        <ScrollReveal direction="down">
          <div className="relative group mb-10">
            <div className="absolute inset-0 bg-blue-600/20 blur-[60px] rounded-full group-hover:bg-blue-600/40 transition-all"></div>
            <div className="relative bg-white dark:bg-[#0c0c0c] w-36 h-36 rounded-[2.5rem] flex items-center justify-center shadow-2xl border border-slate-100 dark:border-white/5">
              <ShoppingBag size={48} className="text-slate-300 dark:text-slate-700" />
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter uppercase italic">Vault Empty</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10 font-bold text-xs uppercase tracking-widest italic max-w-xs mx-auto">"Arsenal unequipped. Secure premium units to proceed."</p>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-4 bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-blue-700 transition-all active:scale-95"
          >
            <Zap size={16} fill="currentColor" /> Browse Warehouse
          </button>
        </ScrollReveal>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-10 md:py-16 space-y-12 animate-smooth-in">
        
        {/* 🚀 HEADER */}
        <ScrollReveal direction="down">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-white/5 pb-10">
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/')} 
                className="flex items-center gap-2 text-blue-600 font-black text-[9px] uppercase tracking-widest hover:translate-x-[-4px] transition-transform"
              >
                <ArrowLeft size={14} /> Return to Base
              </button>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">
                Cart <span className="text-blue-600">Logs</span>
              </h1>
            </div>
            <div className="flex items-center gap-4 bg-white dark:bg-[#0c0c0c] p-5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
               <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black">{cart.length}</div>
               <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Nodes</p>
                  <p className="text-xs font-black dark:text-white uppercase italic">Ready for Deployment</p>
               </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* 📦 LEFT: ITEMS STREAM */}
          <div className="lg:col-span-8 space-y-6">
            {cart.map((item, index) => (
              <ScrollReveal key={item.id} direction="right" delay={index * 100}>
                <div className="flex flex-col md:flex-row items-center gap-6 bg-white dark:bg-[#0c0c0c] p-6 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm group hover:border-blue-600/30 transition-all">
                  
                  <div className="w-32 h-32 bg-slate-50 dark:bg-black rounded-3xl flex-shrink-0 flex items-center justify-center p-4 border border-slate-100 dark:border-white/5 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>

                  <div className="flex-grow space-y-2 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <span className="px-2.5 py-1 bg-blue-600/10 text-blue-600 text-[8px] font-black uppercase rounded-md border border-blue-600/10">{item.brand}</span>
                      <span className="text-[8px] text-slate-400 font-black uppercase tracking-widest">Verified Hardware</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic">{item.name}</h3>
                    <p className="text-[14px] font-black text-blue-600 italic">Rs. {(item.price * (item.quantity || 1)).toLocaleString()}</p>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center bg-slate-50 dark:bg-black rounded-xl p-1 border border-slate-200 dark:border-white/5">
                      <button 
                        onClick={() => handleDecrease(item.id, item.quantity || 1)}
                        className="p-3 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all text-slate-500 hover:text-blue-600"
                      ><Minus size={14} /></button>
                      <span className="px-5 font-black text-lg dark:text-white italic">{item.quantity || 1}</span>
                      <button 
                        onClick={() => handleIncrease(item.id, item.quantity || 1)}
                        className="p-3 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all text-slate-500 hover:text-blue-600"
                      ><Plus size={14} /></button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="flex items-center gap-2 px-6 py-2.5 text-red-500 hover:bg-red-500/10 rounded-xl transition-all font-black text-[9px] uppercase tracking-widest"
                    >
                      <Trash2 size={12} /> Purge Unit
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* 💳 RIGHT: FINANCIAL HUB */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <ScrollReveal direction="up" delay={200}>
              <div className="bg-slate-900 dark:bg-[#0c0c0c] p-8 md:p-10 rounded-[3.5rem] text-white space-y-10 shadow-2xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 blur-[60px] pointer-events-none"></div>
                
                <div className="space-y-1">
                  <ReceiptText className="text-blue-500 mb-4" size={32} />
                  <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none">Valuation <br /> Summary</h2>
                </div>
                
                <div className="space-y-5 border-t border-white/5 pt-8">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Unit Subtotal</span>
                    <span className="text-white font-bold">Rs. {financials.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Tax Protocol (2%)</span>
                    <span className="text-white font-bold">Rs. {financials.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Logistics Fee</span>
                    <span className={financials.shipping === 0 ? "text-emerald-400" : "text-white font-bold"}>
                      {financials.shipping === 0 ? "FREE" : `Rs. ${financials.shipping}`}
                    </span>
                  </div>
                  
                  <div className="pt-8 border-t border-white/10">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 italic">Net Deployment Value</p>
                      <p className="text-5xl font-black tracking-tighter italic text-white">
                        Rs. {financials.total.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={onOpenCheckout}
                  className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20 hover:bg-blue-500 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group"
                >
                  <LockKeyhole size={18} className="group-hover:rotate-12 transition-transform" /> 
                  Execute Deployment <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex flex-col gap-3 pt-4">
                  <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-widest text-slate-500">
                    <ShieldCheck size={14} className="text-emerald-500" /> AES-256 Bit Encryption Active
                  </div>
                  <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-widest text-slate-500">
                    <Truck size={14} className="text-blue-500" /> Global Node Tracking Enabled
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;