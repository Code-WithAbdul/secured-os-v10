import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, Package, Truck, ArrowRight, 
  Download, Share2, Zap, ShieldCheck, Home, Calendar, CreditCard, Activity
} from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * 🛰️ AZEEM GADGETS - DEPLOYMENT SUCCESS NODE
 * --------------------------------------------------
 * Logic: Persistent Database Linking & Celebration
 * Version: 5.0 (Stable)
 * --------------------------------------------------
 */

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 🛰️ State Management with Persistence
  const [orderData, setOrderData] = useState(() => {
    const saved = localStorage.getItem('last_order');
    return saved ? JSON.parse(saved) : {
      id: "PENDING_SYNC",
      productCost: 0,
      deliveryCharges: 300,
      total: 0,
      name: "Valued Customer",
      date: new Date().toLocaleDateString()
    };
  });

  useEffect(() => {
    // 1. Data Retrieval: Mapping Real Backend IDs (_id or orderId)
    if (location.state) {
      const data = location.state;
      
      // 🔥 FIX: Extracting the real database ID
      const realId = data.orderId || data._id || data.id;
      const totalVal = Number(data.totalAmount || data.total || 0);
      const delivery = 300;
      
      const newOrder = {
        id: realId,
        productCost: totalVal > delivery ? totalVal - delivery : totalVal,
        deliveryCharges: delivery,
        total: totalVal,
        name: data.customerName || data.name || "Authorized Personnel",
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      };
      
      setOrderData(newOrder);
      localStorage.setItem('last_order', JSON.stringify(newOrder));
    }

    // 🎊 Celebration Logic (Neural Pulse Confetti)
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#3b82f6', '#10b981'] });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#3b82f6', '#10b981'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, [location]);

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-10 animate-smooth-in bg-slate-50 dark:bg-[#050505] font-sans">
      <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative w-full max-w-6xl bg-white dark:bg-[#0c0c0c] rounded-[3.5rem] border border-slate-100 dark:border-white/5 shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-5">
          
          {/* 🟢 SECTION 1: STATUS & CORE ACTIONS */}
          <div className="md:col-span-2 p-8 md:p-14 space-y-10 bg-slate-50/50 dark:bg-white/[0.02] border-r border-slate-100 dark:border-white/5">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-emerald-500 text-white rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/20 animate-bounce">
                <CheckCircle2 size={40} />
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl md:text-6xl font-black dark:text-white uppercase italic tracking-tighter leading-none">
                  Mission <br /> <span className="text-blue-600 font-outline-1">Secured</span>
                </h1>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic">
                  Node extraction verified for {orderData.name.split(' ')[0]}.
                </p>
              </div>
            </div>

            <div className="space-y-4 bg-white dark:bg-black/40 p-6 rounded-[2rem] border border-slate-100 dark:border-white/5">
               <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><Calendar size={14} className="text-blue-500"/> Date</span>
                  <span className="text-xs font-bold dark:text-white">{orderData.date}</span>
               </div>
               <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><CreditCard size={14} className="text-blue-500"/> Asset Value</span>
                  <span className="text-xs font-bold dark:text-white">Rs. {orderData.productCost?.toLocaleString()}</span>
               </div>
               <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Net Final</span>
                  <span className="text-xl font-black dark:text-white italic">Rs. {orderData.total?.toLocaleString()}</span>
               </div>
            </div>

            <div className="space-y-4">
                <button 
                  onClick={() => navigate(`/order-tracking?id=${orderData.id}`)}
                  className="group flex items-center justify-center gap-4 w-full py-6 bg-blue-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
                >
                  <Activity size={18} /> Track Deployment <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className="flex items-center justify-center gap-4 w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:opacity-90 transition-all"
                >
                  <Home size={16} /> Return to Base
                </button>
            </div>
          </div>

          {/* 📜 SECTION 2: LOGISTICS MANIFEST */}
          <div className="md:col-span-3 p-8 md:p-14 bg-white dark:bg-[#0c0c0c] space-y-12">
            <div className="flex justify-between items-start">
               <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] italic">Vault Tracking Protocol</p>
                  <h2 className="text-3xl font-black text-blue-600 tracking-tighter uppercase italic">{orderData.id}</h2>
               </div>
               <div className="flex gap-3">
                  <button onClick={handlePrint} title="Download Manifest" className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl text-slate-400 hover:text-blue-600 transition-all border border-slate-100 dark:border-white/5">
                    <Download size={20} />
                  </button>
                  <button title="Share Link" className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl text-slate-400 hover:text-blue-600 transition-all border border-slate-100 dark:border-white/5">
                    <Share2 size={20} />
                  </button>
               </div>
            </div>

            {/* LIVE PIPELINE (Visual Update) */}
            <div className="space-y-8">
               <h3 className="text-[10px] font-black dark:text-white uppercase tracking-[0.3em] italic flex items-center gap-3">
                  <Zap size={14} className="text-blue-500" /> Current Deployment Pipeline
               </h3>
               <div className="grid grid-cols-3 gap-6">
                  {[
                    { label: 'Logged', icon: <Package size={24}/>, active: true },
                    { label: 'Auditing', icon: <ShieldCheck size={24} className="animate-pulse"/>, active: true },
                    { label: 'In Transit', icon: <Truck size={24}/>, active: false },
                  ].map((step, i) => (
                    <div key={i} className={`relative p-6 rounded-3xl border-2 transition-all duration-700 ${step.active ? 'border-blue-600/20 bg-blue-600/5 scale-105' : 'border-slate-100 dark:border-white/5 opacity-30'}`}>
                        {step.active && <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white"><CheckCircle2 size={12} /></div>}
                        <div className={step.active ? 'text-blue-600' : 'text-slate-400'}>{step.icon}</div>
                        <p className="mt-4 text-[10px] font-black uppercase tracking-widest dark:text-white">{step.label}</p>
                    </div>
                  ))}
               </div>
            </div>

            {/* TEAM NOTICE BOX */}
            <div className="p-8 bg-slate-900 dark:bg-black rounded-[2.5rem] text-white relative overflow-hidden group border border-white/5">
               <div className="absolute right-[-30px] bottom-[-30px] opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000">
                  <ShieldCheck size={200} />
               </div>
               <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                     <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                     <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Vault Command Notice</p>
                  </div>
                  <p className="text-sm italic leading-relaxed text-slate-300 font-medium">
                    "Your units have entered the 24-point technical audit phase. Azeem Gadgets' engineers are verifying component integrity before final dispatch. Expected node arrival: 48-96 hours."
                  </p>
                  <div className="pt-4 flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                     <ShieldCheck size={14} className="text-emerald-500" /> Authenticity Protocol: Verified
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;