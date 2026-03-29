import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Package, ShieldCheck, MapPin, User, ArrowLeft, Zap, LogOut, 
  Edit3, CheckCircle2, Box, Truck, Plus, Trash2, ShoppingBag, 
  Clock, Hash, Loader2, AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Warranty from '../Support/Warranty';
import ScrollReveal from '../../components/common/ScrollReveal';

/**
 * 🛰️ AZEEM GADGETS - MEMBER VAULT DASHBOARD
 * --------------------------------------------------------
 * Version: 7.0 (Security & Real-time Fixed)
 * Status: Production Stable
 * --------------------------------------------------------
 */

const Dashboard = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const { logout, user, isAuthenticated, loading: authLoading } = useAuth();
  const activeTab = tab || 'orders';

  // --- DATA STATES ---
  const [orders, setOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  // Profile data initialization with safety
  const [profileData] = useState({
    name: user?.name || "Member",
    email: user?.email || "",
    phone: user?.phone || "+92 3XX XXXXXXX"
  });

  // 🛰️ BACKEND SYNC ENGINE (Optimized Security Headers)
  const fetchUserOrders = useCallback(async () => {
    const identifier = user?.email || user?.userId;
    if (!identifier) return;
    
    setIsFetching(true);
    setError(null);
    
    try {
      // 🔥 Security Check: Recovery of Token from multiple possible keys
      const rawToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      const token = rawToken || (storedUser ? JSON.parse(storedUser).token : null);

      const response = await fetch(`http://localhost:5000/api/orders/user/${identifier}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : "" 
        }
      });

      // Handle Unauthorized Access (401)
      if (response.status === 401) {
        setError("SECURITY EXPIRED: Please re-login to access Vault.");
        setTimeout(() => logout(), 3000);
        return;
      }

      const result = await response.json();

      if (result.success) {
        setOrders(result.data || []);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Vault Link Failure:", err);
      setError("COMMUNICATION OFFLINE: Failed to intercept data stream.");
      setOrders([]);
    } finally {
      setIsFetching(false);
    }
  }, [user, logout]);

  // Global Sync: Fetch on load and tab change
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserOrders();
    }
  }, [isAuthenticated, fetchUserOrders, activeTab]);

  // Auth Protection Logic
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const menuItems = [
    { id: 'orders', label: 'My Orders', icon: <Package size={20} /> },
    { id: 'warranty', label: 'Warranty', icon: <ShieldCheck size={20} /> },
    { id: 'profile', label: 'Identity', icon: <User size={20} /> },
  ];

  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#050505]">
       <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-12 animate-smooth-in font-sans">
      
      {/* 🚀 DYNAMIC HEADER */}
      <ScrollReveal direction="down">
        <div className="relative overflow-hidden bg-slate-900 dark:bg-blue-600 p-8 md:p-14 rounded-[3.5rem] md:rounded-[4.5rem] text-white shadow-2xl">
          <Zap className="absolute -bottom-10 -right-10 text-white/10 w-64 h-64 md:w-96 md:h-96 rotate-12" />
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="space-y-4 text-center lg:text-left">
              <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-blue-200 font-black text-[10px] uppercase tracking-widest hover:text-white transition-all">
                <ArrowLeft size={14} /> Return to Warehouse
              </button>
              <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
                Member <span className="text-blue-400 dark:text-white font-outline-1">Vault</span>
              </h1>
              <p className="text-blue-100/60 font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center lg:justify-start gap-2 italic">
                <Hash size={12} /> SECURE_ID: {user?.email || 'GUEST_NODE'}
              </p>
            </div>
            
            <div className="flex items-center gap-6 bg-white/10 p-5 md:p-8 rounded-[2.5rem] border border-white/20 backdrop-blur-2xl shadow-xl">
              <div className="w-16 h-16 bg-white text-blue-600 rounded-[1.5rem] flex items-center justify-center text-3xl font-black shadow-lg">
                {user?.name?.charAt(0).toUpperCase() || "A"}
              </div>
              <div className="text-left">
                <p className="font-black text-xl md:text-2xl tracking-tighter uppercase leading-none">{user?.name || "Member"}</p>
                <p className="text-[9px] font-black text-blue-200 uppercase tracking-widest mt-2 italic">Authorized Personnel</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* 🧭 NAVIGATION */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(`/dashboard/${item.id}`)}
                className={`flex items-center gap-5 p-6 rounded-[2rem] transition-all duration-500 whitespace-nowrap lg:w-full font-black text-[10px] uppercase tracking-widest ${
                  activeTab === item.id 
                  ? 'bg-blue-600 text-white shadow-2xl scale-105' 
                  : 'bg-white dark:bg-[#0c0c0c] text-slate-500 border border-slate-100 dark:border-white/5 shadow-sm'
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>
          <button onClick={logout} className="hidden lg:flex w-full items-center gap-5 p-6 rounded-[2rem] bg-red-500/5 text-red-500 border border-red-500/10 font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-sm">
            <LogOut size={20} /> Terminate Session
          </button>
        </aside>

        {/* 📦 CONTENT SECTOR */}
        <main className="lg:col-span-3 min-h-[600px]">
          
          {/* TAB: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex justify-between items-center px-4">
                <h2 className="text-3xl font-black dark:text-white uppercase italic tracking-tighter">Shipment <span className="text-blue-600 font-outline-1">Logs</span></h2>
                <span className="bg-blue-600/10 text-blue-600 px-5 py-2 rounded-full font-black text-[10px] uppercase border border-blue-600/20">{orders.length} Units Found</span>
              </div>
              
              {error && (
                <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center gap-4 text-red-500 animate-pulse">
                  <AlertCircle size={20} />
                  <p className="text-[10px] font-black uppercase tracking-widest">{error}</p>
                </div>
              )}

              {isFetching ? (
                <div className="py-32 text-center bg-white dark:bg-[#0c0c0c] rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-inner">
                   <Loader2 className="animate-spin mx-auto text-blue-600 mb-4" size={40} />
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic animate-pulse">Synchronizing with Central Archive...</p>
                </div>
              ) : orders.length > 0 ? (
                orders.map((order, idx) => (
                  <div key={order._id || idx} className="bg-white dark:bg-[#0c0c0c] p-8 rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-xl relative overflow-hidden group hover:border-blue-600/30 transition-all mb-6">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:rotate-12 transition-transform duration-700"><Package size={120} /></div>
                    
                    <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
                      <div className="space-y-5">
                        <div className="flex items-center gap-3">
                           <span className="px-3 py-1.5 bg-blue-600 text-white text-[9px] font-black rounded-lg uppercase italic tracking-widest">{order.orderId || 'ORD-ARCHIVING'}</span>
                           <span className="text-[10px] text-slate-400 font-bold uppercase">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'REAL-TIME'}</span>
                        </div>
                        <div className="flex flex-wrap gap-4">
                           {order.cartItems?.map((item, i) => (
                             <div key={i} className="w-16 h-16 bg-white dark:bg-black rounded-2xl p-2 border border-slate-100 dark:border-white/5 shadow-inner flex items-center justify-center overflow-hidden">
                                <img src={item.image} alt="" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                             </div>
                           ))}
                        </div>
                      </div>
                      <div className="text-right flex flex-col justify-between">
                         <div className="space-y-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Valuation</p>
                            <p className="text-3xl font-black text-blue-600 italic leading-none">Rs. {Number(order.totalAmount || 0).toLocaleString()}</p>
                         </div>
                         <button 
                            onClick={() => navigate(`/order-tracking?id=${order.orderId || order._id}`)}
                            className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 hover:text-blue-600 transition-all ml-auto border border-transparent hover:border-blue-500/20 px-3 py-2 rounded-lg"
                          >
                            Live Node Track <ArrowLeft className="rotate-180" size={14} />
                         </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-8 pt-6 border-t border-slate-50 dark:border-white/5 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${order.status === 'Delivered' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-blue-600 animate-pulse shadow-[0_0_10px_rgba(37,99,235,0.5)]'}`}></div>
                          <p className="text-[10px] font-black uppercase dark:text-white tracking-[0.2em] italic">{order.status || 'DEPLOYMENT_PENDING'}</p>
                       </div>
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic opacity-60">Extraction Hub: {order.city || 'Karachi'}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-32 text-center bg-white dark:bg-[#0c0c0c] rounded-[4rem] border-2 border-dashed border-slate-100 dark:border-white/5 shadow-inner animate-in zoom-in-95 duration-700">
                  <ShoppingBag size={64} className="mx-auto text-slate-100 dark:text-slate-800 mb-6" />
                  <p className="text-slate-400 font-black text-xs uppercase tracking-[0.4em] italic leading-loose">"Zero Deployment Activity Detected <br /> In This Sector"</p>
                  <button onClick={() => navigate('/')} className="mt-8 px-12 py-5 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all tracking-[0.2em]">Open Warehouse Archive</button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'warranty' && <Warranty isDashboard={true} />}

          {/* TAB: PROFILE */}
          {activeTab === 'profile' && (
            <div className="bg-white dark:bg-[#0c0c0c] p-10 md:p-16 rounded-[4rem] border border-slate-100 dark:border-white/5 space-y-12 animate-in fade-in duration-700 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 p-10 opacity-[0.02]"><User size={200} /></div>
              <h2 className="text-3xl font-black dark:text-white uppercase italic tracking-tighter relative z-10">Cyber <span className="text-blue-600">Identity</span></h2>
              <div className="grid md:grid-cols-2 gap-10 relative z-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4">Authorized Personnel</label>
                  <input type="text" value={profileData.name} readOnly className="w-full p-6 bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 rounded-3xl font-bold dark:text-white outline-none focus:border-blue-600 transition-all shadow-inner text-sm italic" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4">Secure Network Email</label>
                  <input type="email" value={user?.email} disabled className="w-full p-6 bg-slate-100 dark:bg-slate-800/50 text-slate-500 border border-slate-200 dark:border-white/5 rounded-3xl font-bold outline-none cursor-not-allowed text-sm" />
                </div>
              </div>
              <div className="pt-8 border-t border-slate-100 dark:border-white/5">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic flex items-center gap-2">
                    <ShieldCheck size={14} className="text-emerald-500" /> Identity Protected by Azeem OS Encryption Protocols
                 </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;