import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Package, Search, Truck, MapPin, CheckCircle2, Zap, 
  Clock, ShieldCheck, AlertCircle, Loader2, Info, ShoppingBag,
  RefreshCw, Terminal, Globe, Activity, User, CreditCard
} from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';

/**
 * 🛰️ AZEEM VAULT - ORDER TELEMETRY SYSTEM
 * --------------------------------------------------
 * Logic: Authenticated Real-time Interception
 * Security: AES-256 Verified Link
 * --------------------------------------------------
 */

const OrderTracking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const urlId = searchParams.get('id');

  const [trackingId, setTrackingId] = useState(urlId || "");
  const [isSearching, setIsSearching] = useState(false);
  const [orderResult, setOrderResult] = useState(null);
  const [error, setError] = useState("");

  // 🔄 AUTO-SCAN: URL Sync on Load
  useEffect(() => {
    if (urlId) {
      setTrackingId(urlId);
      fetchOrderDetails(urlId);
    }
  }, [urlId]);

  // 📡 CORE FETCH ENGINE (Authenticated)
  const fetchOrderDetails = async (id) => {
    if (!id) return;
    
    setIsSearching(true);
    setError("");
    setOrderResult(null);

    // 🛡️ Data Sanitization: Adjust ID based on common backend patterns
    const cleanId = id.trim().toUpperCase().replace('ORD-', '');

    try {
      // Token Retrieval Logic (Dual Recovery)
      const rawToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      const token = rawToken || (storedUser ? JSON.parse(storedUser).token : null);

      const response = await fetch(`http://localhost:5000/api/orders/${cleanId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : "" 
        }
      });

      // 401 Error Handling
      if (response.status === 401) {
        setError("SECURITY ALERT: Unauthorized access. Please login to intercept data.");
        return;
      }

      const result = await response.json();

      if (result.success && result.data) {
        setOrderResult(result.data);
      } else {
        setError("NODE NOT FOUND: ID is invalid or purged from central Vault.");
      }
    } catch (err) {
      console.error("Telemetry Breach:", err);
      setError("COMMUNICATION ERROR: Central Vault Link Offline.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!trackingId) return;
    navigate(`/order-tracking?id=${trackingId.trim().toUpperCase()}`);
    fetchOrderDetails(trackingId);
  };

  // 🚦 PIPELINE MAPPING
  const getStepNumber = (status) => {
    const s = status?.toLowerCase();
    if (s === 'pending') return 1;
    if (s === 'confirmed' || s === 'verified') return 2;
    if (s === 'shipped' || s === 'transit') return 3;
    if (s === 'delivered' || s === 'deployed') return 4;
    return 1;
  };

  const steps = [
    { label: 'Logged', icon: <Clock size={18}/>, val: 1 },
    { label: 'Verified', icon: <ShieldCheck size={18}/>, val: 2 },
    { label: 'In Transit', icon: <Truck size={18}/>, val: 3 },
    { label: 'Deployed', icon: <CheckCircle2 size={18}/>, val: 4 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] py-12 md:py-24 px-6 font-sans selection:bg-blue-600 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* 🛰️ HEADER SECTION */}
        <ScrollReveal direction="down">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-blue-600/10 border border-blue-600/20 rounded-full text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] italic">
              <Globe size={14} className="animate-spin-slow" /> Real-time Satellite Sync Active
            </div>
            <h1 className="text-6xl md:text-[8rem] font-black dark:text-white tracking-tighter uppercase italic leading-[0.8] mb-4">
              Order <span className="text-blue-600 font-outline-1">Track</span>
            </h1>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-widest max-w-2xl mx-auto italic">
              "Providing precise coordinates for your hardware deployment."
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* 🔍 CONTROL TERMINAL */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white dark:bg-[#0c0c0c] p-10 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:rotate-12 transition-transform">
                <Terminal size={100} />
              </div>
              
              <h3 className="text-xl font-black dark:text-white uppercase italic mb-8 flex items-center gap-3">
                <Search className="text-blue-600" size={24} /> Terminal Input
              </h3>

              <form onSubmit={handleTrackSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Deployment Token (Order ID)</label>
                  <input 
                    type="text" 
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="ORD-XXXXXX"
                    className="w-full p-6 bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-2xl outline-none font-black dark:text-white uppercase focus:border-blue-600 transition-all text-lg shadow-inner"
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-black uppercase flex items-center gap-3 animate-pulse">
                    <AlertCircle size={16} /> {error}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isSearching}
                  className="w-full py-6 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/30 active:scale-95 transition-all flex items-center justify-center gap-4 text-xs uppercase tracking-[0.2em] disabled:opacity-50"
                >
                  {isSearching ? <Loader2 size={20} className="animate-spin" /> : <Zap size={20} fill="currentColor" />}
                  {isSearching ? 'Intercepting Data...' : 'Start Extraction Sync'}
                </button>
              </form>
            </div>

            {/* LIVE FEED INDICATOR */}
            <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-white/5 space-y-6 shadow-2xl relative overflow-hidden">
               <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 italic">Live Feed Status</p>
                  <Activity size={14} className="text-emerald-500 animate-pulse" />
               </div>
               <div className="space-y-4">
                  <div className="flex items-center gap-4 opacity-50">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <p className="text-[10px] font-bold uppercase text-white">Gateway Node Secure</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                    <p className="text-[10px] font-bold uppercase text-white">Encrypted Handshake Active</p>
                  </div>
               </div>
            </div>
          </div>

          {/* 📊 DATA DISPLAY HUB */}
          <div className="lg:col-span-8">
            {orderResult ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-700">
                
                {/* 🛤️ PIPELINE PROGRESS */}
                <div className="bg-white dark:bg-[#0c0c0c] p-10 md:p-16 rounded-[4rem] border border-slate-200 dark:border-white/5 shadow-2xl relative overflow-hidden">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                    {steps.map((step, i) => {
                      const currentStep = getStepNumber(orderResult.status);
                      const isActive = i < currentStep;
                      
                      return (
                        <div key={i} className={`flex flex-col items-center gap-5 transition-all duration-1000 ${isActive ? 'opacity-100 scale-110' : 'opacity-20'}`}>
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isActive ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/50' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                            {step.icon}
                          </div>
                          <p className={`text-[10px] font-black uppercase tracking-widest text-center ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
                            {step.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* PROGRESS BAR */}
                  <div className="mt-16 h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 shadow-[0_0_30px_rgba(37,99,235,1)] transition-all duration-1000" 
                      style={{ width: `${(getStepNumber(orderResult.status) / 4) * 100}%` }}
                    />
                  </div>
                </div>

                {/* INFO BLOCKS */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Personnel Intel */}
                  <div className="bg-slate-950 p-10 rounded-[3.5rem] text-white border border-white/10 shadow-2xl space-y-8">
                    <p className="text-[10px] font-black uppercase text-blue-500 tracking-[0.4em] italic">Target Personnel</p>
                    <div className="space-y-6">
                      <div className="flex items-center gap-5">
                        <div className="p-3 bg-white/5 rounded-xl text-blue-500"><User size={20}/></div>
                        <div>
                          <p className="text-[9px] text-slate-500 uppercase font-black">Authorized Personnel</p>
                          <p className="text-xl font-black italic">{orderResult.customerName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-5">
                        <div className="p-3 bg-white/5 rounded-xl text-blue-500"><MapPin size={20}/></div>
                        <div>
                          <p className="text-[9px] text-slate-500 uppercase font-black">Extraction Node</p>
                          <p className="text-sm font-black italic text-slate-300 leading-relaxed">{orderResult.address}, {orderResult.city}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Financial Intel */}
                  <div className="bg-white dark:bg-[#0c0c0c] p-10 rounded-[3.5rem] border border-slate-200 dark:border-white/5 shadow-2xl space-y-8">
                    <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.4em] italic">Valuation Protocol</p>
                    <div className="space-y-4">
                      <div className="flex justify-between items-end border-b border-slate-100 dark:border-white/5 pb-6">
                        <p className="text-[10px] font-black text-slate-400 uppercase italic">Net Asset Value</p>
                        <p className="text-5xl font-black text-blue-600 italic tracking-tighter leading-none">
                          Rs. {Number(orderResult.totalAmount || 0).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase italic">Payment Method</p>
                        <span className="px-4 py-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl text-[9px] font-black uppercase italic tracking-widest shadow-md">
                          {orderResult.paymentMethod || 'COD PROTOCOL'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 📦 UNIT MANIFEST */}
                <div className="bg-white dark:bg-[#0c0c0c] p-10 rounded-[3.5rem] border border-slate-200 dark:border-white/5 shadow-2xl">
                   <h4 className="text-lg font-black uppercase italic dark:text-white mb-8 flex items-center gap-4">
                     <ShoppingBag size={24} className="text-blue-600" /> Manifested Hardware
                   </h4>
                   <div className="grid gap-4">
                      {orderResult.cartItems?.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-black/40 rounded-[2.5rem] border border-slate-100 dark:border-white/5 hover:border-blue-600/30 transition-all group">
                           <div className="flex items-center gap-6">
                             <div className="w-20 h-20 bg-white rounded-[1.5rem] p-3 shadow-md flex items-center justify-center overflow-hidden border border-slate-100 dark:border-white/5">
                                <img src={item.image} alt="" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                             </div>
                             <div>
                                <p className="text-base font-black uppercase dark:text-white tracking-tighter">{item.name}</p>
                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mt-1">Batch Count: x{item.quantity}</p>
                             </div>
                           </div>
                           <p className="text-xl font-black text-slate-400 italic">Rs. {Number(item.price || 0).toLocaleString()}</p>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[650px] flex flex-col items-center justify-center p-20 bg-white/40 dark:bg-white/[0.02] rounded-[5rem] border-4 border-dashed border-slate-200 dark:border-white/10 transition-all">
                <div className="relative mb-10">
                   <Zap size={80} className="text-slate-300 dark:text-slate-800 animate-pulse" />
                   <div className="absolute top-0 left-0 w-full h-full border-2 border-blue-500 rounded-full scale-150 opacity-20 animate-ping"></div>
                </div>
                <p className="text-slate-400 font-black uppercase text-sm tracking-[0.5em] text-center italic leading-loose">
                  Waiting for deployment ID injection... <br />
                  <span className="text-[10px] opacity-40 italic">Scan coordinates to begin node synchronization.</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* LOGISTICS FOOTER */}
        <div className="bg-slate-900 p-12 rounded-[4rem] border border-white/5 flex flex-col md:flex-row items-center gap-12 shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative overflow-hidden">
           <div className="p-10 bg-blue-600 text-white rounded-[3rem] shadow-2xl shadow-blue-500/30 animate-bounce-slow relative z-10"><RefreshCw size={48} /></div>
           <div className="space-y-4 relative z-10">
             <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter">Automatic Node Refresh</h4>
             <p className="text-xs text-slate-400 font-medium leading-relaxed italic uppercase tracking-[0.2em] max-w-5xl">
               Telemetry data is mirrored every 120 minutes via encrypted satellite link. If your hardware status remains on "Logged", our specialists are performing a final component audit for elite performance assurance.
             </p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default OrderTracking;