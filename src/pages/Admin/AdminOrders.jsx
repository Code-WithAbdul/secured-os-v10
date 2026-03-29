import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Package, Truck, CheckCircle, XCircle, 
  User, MapPin, Phone, Hash, Clock, 
  ShieldCheck, Zap, Database, ShoppingBag,
  Activity, DollarSign, Trash2, Loader2, RefreshCw
} from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(null); 
  const [filter, setFilter] = useState('All');

  // 🔄 1. MASTER CLOUD SYNC: Fetching with Security Protocol
  const fetchOrdersFromVault = useCallback(async () => {
    setIsLoading(true);
    try {
      // 🔥 CRITICAL FIX: Get Token from Vault
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`, // 👈 Token bhej na LAZMI hai
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (result.success) {
        setOrders(result.data);
        console.log(`📡 Vault Synced: ${result.data.length} Units Recovered.`);
      } else {
        console.error("❌ VAULT ACCESS DENIED:", result.message);
      }
    } catch (err) {
      console.error("🛰️ SATELLITE LINK FAILURE:", err);
    } finally {
      setTimeout(() => setIsLoading(false), 800);
    }
  }, []);

  useEffect(() => {
    fetchOrdersFromVault();
  }, [fetchOrdersFromVault]);

  // 📊 LIVE TELEMETRY: Real-time Stats
  const stats = useMemo(() => {
    const revenue = orders.reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);
    const active = orders.filter(o => ['Pending', 'Confirmed', 'Shipped'].includes(o.status)).length;
    const completed = orders.filter(o => o.status === 'Delivered').length;
    return { revenue, active, completed };
  }, [orders]);

  // 🛠️ COMMAND PROTOCOLS: Update Status (Protected)
  const executeStatusProtocol = async (orderId, newStatus) => {
    setIsActionLoading(orderId);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // 👈 Security Header
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      const result = await response.json();
      if (result.success) {
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      } else {
        alert(`❌ PROTOCOL ERROR: ${result.message}`);
      }
    } catch (err) {
      alert("⚠️ CONNECTION LOST: Backend is offline.");
    } finally {
      setIsActionLoading(null);
    }
  };

  // 🗑️ PURGE PROTOCOL: Permanent Deletion (Protected)
  const purgeOrder = async (orderId) => {
    if (!window.confirm("⚠️ SYSTEM WARNING: Permanent deletion from Central Vault. Proceed?")) return;
    
    setIsActionLoading(orderId);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` // 👈 Security Header
        }
      });
      const result = await response.json();
      if (result.success) {
        setOrders(prev => prev.filter(o => o._id !== orderId));
      }
    } catch (err) {
      alert("❌ PURGE FAIL: Error contacting database.");
    } finally {
      setIsActionLoading(null);
    }
  };

  const filteredOrders = useMemo(() => {
    if (filter === 'All') return orders;
    return orders.filter(o => o.status === filter);
  }, [filter, orders]);

  return (
    <div className="min-h-screen space-y-12 pb-24 bg-slate-50 dark:bg-[#050505] transition-colors duration-500 font-sans">
      
      {/* 📊 OPERATIONS METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto pt-10">
        <div className="bg-blue-600 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group border border-white/10">
          <DollarSign className="absolute -right-4 -bottom-4 w-32 h-32 opacity-20 group-hover:scale-110 transition-transform duration-700" />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-80 mb-2 italic">Total Revenue Flow</p>
          <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter leading-none">Rs. {stats.revenue.toLocaleString()}</h3>
        </div>
        <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl border border-white/5 relative overflow-hidden group">
          <Activity className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:rotate-12 transition-transform duration-700" />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 mb-2 italic">Live Extractions</p>
          <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter leading-none">{stats.active} <span className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-2">Units</span></h3>
        </div>
        <div className="bg-emerald-600 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group border border-white/10">
          <CheckCircle className="absolute -right-4 -bottom-4 w-32 h-32 opacity-20 group-hover:translate-x-4 transition-transform duration-700" />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-80 mb-2 italic">Successful Deliveries</p>
          <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter leading-none">{stats.completed} <span className="text-xs uppercase tracking-widest text-emerald-200 font-bold ml-2">Units</span></h3>
        </div>
      </div>

      {/* 📡 CONTROL HEADER */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-slate-950 rounded-[4rem] p-10 md:p-16 text-white border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full">
                <ShieldCheck size={16} className="text-blue-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 italic">Security clearance: Master Azeem</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-none">
                Order <span className="text-blue-600">Monitor</span>
              </h1>
              <div className="flex items-center justify-center lg:justify-start gap-6">
                <button onClick={fetchOrdersFromVault} className="p-3 bg-white/5 hover:bg-blue-600 rounded-2xl transition-all shadow-xl active:scale-95 group">
                    <RefreshCw size={24} className={`${isLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'}`} />
                </button>
                <div className="h-10 w-[1px] bg-white/10 hidden md:block"></div>
                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.6em] italic">V5.0.2 Protocol Active</p>
              </div>
            </div>
            
            <div className="flex bg-white/[0.02] p-3 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl flex-wrap justify-center gap-2">
               {['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'].map((s) => (
                 <button 
                    key={s} 
                    onClick={() => setFilter(s)} 
                    className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      filter === s ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/40' : 'text-slate-500 hover:text-white hover:bg-white/5'
                    }`}
                 >
                   {s}
                 </button>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* 📦 DATA STREAM */}
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        {isLoading ? (
          <div className="flex flex-col items-center py-48 space-y-8">
             <div className="relative">
                <Loader2 className="animate-spin text-blue-600" size={80} />
                <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-400 animate-pulse" size={24} />
             </div>
             <p className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-500 animate-pulse italic">Decrypting Satellite Feed...</p>
          </div>
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order._id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[4rem] p-10 md:p-14 shadow-2xl relative overflow-hidden group hover:border-blue-600/40 transition-all duration-500">
              
              {/* ID Bar */}
              <div className={`absolute top-0 right-0 px-12 py-4 rounded-bl-[3rem] font-black text-[11px] uppercase tracking-[0.4em] text-white italic shadow-xl ${
                order.status === 'Delivered' ? 'bg-emerald-500 shadow-emerald-500/20' : 
                order.status === 'Cancelled' ? 'bg-red-500 shadow-red-500/20' : 'bg-blue-600 shadow-blue-600/20'
              }`}>
                  TRACK-ID: {order.orderId || 'PENDING'}
              </div>

              <div className="grid lg:grid-cols-3 gap-16 pt-10">
                
                {/* 👤 CLIENT INFO */}
                <div className="space-y-10">
                  <div className="flex items-center gap-4 text-blue-600 font-black text-[11px] uppercase tracking-[0.5em] italic">
                    <User size={20} /> Extraction Node
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-5xl font-black dark:text-white uppercase tracking-tighter leading-none italic">{order.customerName}</h3>
                    <div className="space-y-4">
                       <div className="flex items-center gap-4 text-slate-500 font-black text-sm">
                          <div className="p-3 bg-blue-50 dark:bg-white/5 rounded-xl"><Phone size={16} className="text-blue-600"/></div>
                          {order.phone}
                       </div>
                       <div className="flex items-start gap-4 text-slate-400 font-bold text-xs italic leading-relaxed">
                          <div className="p-3 bg-red-50 dark:bg-white/5 rounded-xl shrink-0"><MapPin size={16} className="text-red-500"/></div>
                          {order.address}, {order.city}
                       </div>
                    </div>
                  </div>
                </div>

                {/* 📱 PAYLOAD INFO */}
                <div className="space-y-10">
                  <div className="flex items-center gap-4 text-blue-600 font-black text-[11px] uppercase tracking-[0.5em] italic">
                    <ShoppingBag size={20} /> Unit Manifest
                  </div>
                  <div className="space-y-4 max-h-[350px] overflow-y-auto pr-4 no-scrollbar">
                     {order.cartItems?.map((item, idx) => (
                       <div key={idx} className="flex items-center gap-6 bg-slate-50 dark:bg-white/[0.02] p-5 rounded-3xl border border-slate-100 dark:border-white/5 group/item hover:border-blue-600/30 transition-all">
                          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center p-3 shadow-lg group-hover/item:scale-110 transition-transform">
                             <img src={item.image} className="w-full h-full object-contain" alt="" />
                          </div>
                          <div className="flex-grow min-w-0">
                             <p className="font-black text-xs dark:text-white uppercase italic truncate">{item.name}</p>
                             <div className="flex justify-between items-center mt-1">
                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Qty: {item.quantity}</p>
                                <p className="text-[10px] font-black text-emerald-500">Rs. {item.price?.toLocaleString()}</p>
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
                </div>

                {/* ⚡ PROTOCOL ACTIONS */}
                <div className="space-y-10">
                  <div className="flex items-center gap-4 text-blue-600 font-black text-[11px] uppercase tracking-[0.5em] italic">
                    <Zap size={20} /> Command Hub
                  </div>
                  <div className="bg-slate-50 dark:bg-white/[0.02] p-10 rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-inner space-y-8">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Total Valuation</span>
                      <span className="text-3xl font-black text-blue-500 italic tracking-tighter">Rs. {order.totalAmount?.toLocaleString()}</span>
                    </div>

                    <div className="space-y-4">
                      {isActionLoading === order._id ? (
                        <div className="flex items-center justify-center py-10">
                          <Loader2 className="animate-spin text-blue-600" size={32} />
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                             <button 
                                onClick={() => executeStatusProtocol(order._id, "Shipped")}
                                disabled={order.status === "Shipped" || order.status === "Delivered"}
                                className="py-5 bg-slate-900 text-white hover:bg-blue-600 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 disabled:opacity-20"
                             >
                               Set Shipped
                             </button>
                             <button 
                                onClick={() => executeStatusProtocol(order._id, "Delivered")}
                                disabled={order.status === "Delivered"}
                                className="py-5 bg-emerald-600 text-white hover:bg-emerald-500 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 disabled:opacity-20 shadow-lg shadow-emerald-500/20"
                             >
                               Set Delivered
                             </button>
                          </div>
                          <button 
                            onClick={() => purgeOrder(order._id)}
                            className="w-full py-5 bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 border border-red-500/20"
                          >
                            Purge Record
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

              </div>
              
              {/* Timeline Info */}
              <div className="mt-12 pt-8 border-t border-slate-100 dark:border-white/5 flex flex-wrap justify-between items-center gap-6">
                 <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                       <Clock size={14} className="text-blue-500" /> Decrypt Date: {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                       <ShieldCheck size={14} className="text-emerald-500" /> Status: {order.status}
                    </div>
                 </div>
                 <p className="text-[10px] font-black text-slate-700 uppercase italic tracking-[0.4em]">Protocol Authorized by Azeem Vault v5.0</p>
              </div>
            </div>
          ))
        ) : (
          <div className="py-60 text-center space-y-8 bg-white dark:bg-white/[0.01] rounded-[5rem] border-4 border-dashed border-slate-200 dark:border-white/5">
              <Database size={64} className="text-slate-200 dark:text-white/5 mx-auto animate-pulse" />
              <p className="text-slate-400 font-black uppercase text-[12px] tracking-[0.8em] italic">"Zero Activity Detected in Current Sector: {filter}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;