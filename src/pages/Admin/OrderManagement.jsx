import React, { useState, useEffect, useCallback } from 'react';
import { 
  Package, Truck, CheckCircle2, Clock, 
  Search, ShieldCheck, Phone, MapPin, 
  RefreshCw, AlertCircle, Trash2, Loader2, Zap
} from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // 🔄 1. MASTER CLOUD SYNC (Enhanced for Live Feed)
  const syncWithCloud = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (result.success) {
        // 🔥 DEBUG: Terminal/Console mein check karein ke data aa bhi raha hai ya nahi
        console.log("📦 Vault Sync Complete. Units Detected:", result.data.length);
        setOrders(result.data);
      } else {
        console.error("❌ Vault Access Denied:", result.message);
      }
    } catch (err) {
      console.error("🛰️ Cloud Sync Error:", err);
    } finally {
      if (showLoading) setTimeout(() => setLoading(false), 800);
    }
  }, []);

  // 📡 LIVE POLLING: Har 30 seconds baad naya data check karega
  useEffect(() => {
    syncWithCloud(true);
    
    const liveInterval = setInterval(() => {
      syncWithCloud(false); // Background sync without showing loader
    }, 30000); 

    return () => clearInterval(liveInterval);
  }, [syncWithCloud]);

  // 🛠️ 2. STATUS UPDATE ENGINE
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const result = await response.json();
      
      if (result.success) {
        setOrders(prev => prev.map(o => o._id === id ? { ...o, status: newStatus } : o));
      }
    } catch (err) {
      alert("Protocol Error: Status update failed.");
    }
  };

  // 🗑️ 3. DELETE ORDER
  const handleDelete = async (id) => {
    if (window.confirm("⚠️ Execute permanent purge of this extraction record?")) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await response.json();
        if (result.success) {
          setOrders(prev => prev.filter(o => o._id !== id));
        }
      } catch (err) {
        alert("Purge Fail: Vault connection error.");
      }
    }
  };

  // 🔍 4. ROBUST FILTER LOGIC (Fixed for Case Sensitivity)
  const filteredOrders = orders.filter(order => {
    const customerName = order.customerName?.toLowerCase() || "";
    const orderId = order.orderId?.toLowerCase() || "";
    const matchesSearch = customerName.includes(searchTerm.toLowerCase()) || orderId.includes(searchTerm.toLowerCase());
    
    // Normalize status strings for comparison
    const matchesFilter = filterStatus === 'ALL' || 
      order.status?.toString().toUpperCase() === filterStatus.toUpperCase();
      
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 md:p-10 space-y-10 animate-smooth-in bg-slate-50 dark:bg-[#050505] min-h-screen font-sans">
      
      {/* 🚀 HEADER COMMAND CENTER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 max-w-7xl mx-auto">
        <ScrollReveal direction="down">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-7xl font-black dark:text-white uppercase italic tracking-tighter leading-none">
              Order <span className="text-blue-600">Intelligence</span>
            </h1>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic">Vault Connection: Stable</p>
            </div>
          </div>
        </ScrollReveal>
        
        <div className="flex gap-4">
          <div className="bg-blue-600 p-6 rounded-[2rem] text-white shadow-2xl shadow-blue-600/20 border border-white/10">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-80 italic mb-1">Active Extractions</p>
            <p className="text-4xl font-black italic tracking-tighter leading-none">{orders.length}</p>
          </div>
          <button onClick={() => syncWithCloud(true)} className="p-6 bg-white dark:bg-slate-900 dark:text-white rounded-[2rem] border border-slate-200 dark:border-white/5 hover:rotate-180 transition-all duration-700 shadow-xl">
            <RefreshCw size={28} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* 🔍 SEARCH HUB */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-2xl">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search Serial ID or Commander Name..." 
            className="w-full pl-16 pr-6 py-5 bg-slate-50 dark:bg-black border-none rounded-[1.5rem] dark:text-white font-bold outline-none ring-2 ring-transparent focus:ring-blue-600/50 transition-all text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-8 py-5 bg-slate-50 dark:bg-black border-none rounded-[1.5rem] dark:text-white font-black text-[10px] uppercase tracking-widest outline-none cursor-pointer hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
        >
          <option value="ALL">All Sectors</option>
          <option value="PENDING">Pending Approval</option>
          <option value="CONFIRMED">Technical Audit</option>
          <option value="SHIPPED">In Transit</option>
          <option value="DELIVERED">Extraction Complete</option>
        </select>
      </div>

      {/* 📋 LIVE ORDERS FEED */}
      <div className="max-w-7xl mx-auto space-y-10">
        {loading ? (
          <div className="py-40 text-center flex flex-col items-center gap-6">
             <Loader2 className="animate-spin text-blue-600" size={60} />
             <p className="text-slate-400 font-black uppercase tracking-[0.5em] text-[10px] italic">Scanning Satellite Feed...</p>
          </div>
        ) : filteredOrders.length > 0 ? filteredOrders.map((order) => (
          <ScrollReveal key={order._id} direction="up">
            <div className="bg-white dark:bg-slate-900 rounded-[4rem] border border-slate-100 dark:border-white/5 shadow-2xl overflow-hidden hover:border-blue-600/40 transition-all group relative">
              
              {/* ID Bar */}
              <div className="px-12 py-10 border-b border-slate-50 dark:border-white/5 flex flex-wrap justify-between items-center gap-8 bg-slate-50/50 dark:bg-black/40">
                <div className="flex items-center gap-8">
                  <div className="bg-blue-600 text-white px-6 py-2.5 rounded-2xl font-black text-[11px] italic tracking-widest shadow-lg shadow-blue-600/20">
                    {order.orderId}
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <Clock size={16} className="text-blue-500" />
                    <p className="text-[10px] font-black uppercase tracking-widest">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white dark:bg-black p-2.5 rounded-[1.5rem] shadow-inner border border-slate-200 dark:border-white/5">
                  {['Pending', 'Confirmed', 'Shipped', 'Delivered'].map((s) => (
                    <button 
                      key={s}
                      onClick={() => handleStatusUpdate(order._id, s)}
                      className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-tighter transition-all ${order.status === s ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid lg:grid-cols-3 p-12 gap-16">
                <div className="space-y-8">
                   <div className="flex items-center gap-4">
                      <div className="w-1 h-8 bg-blue-600 rounded-full"></div>
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] italic">Customer Data</p>
                   </div>
                   <div className="space-y-6">
                      <h4 className="text-4xl font-black dark:text-white uppercase italic tracking-tighter leading-none">{order.customerName}</h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
                            <Phone size={18} className="text-blue-500" />
                            <span className="text-sm font-black tracking-tight">{order.phone}</span>
                        </div>
                        <div className="flex items-start gap-4 text-slate-500 dark:text-slate-400">
                            <MapPin size={18} className="text-red-500 mt-1 shrink-0" />
                            <span className="text-xs font-bold leading-relaxed">{order.address}, {order.city}</span>
                        </div>
                      </div>
                   </div>
                </div>

                <div className="lg:col-span-2 space-y-8">
                  <div className="flex items-center gap-4">
                      <div className="w-1 h-8 bg-emerald-500 rounded-full"></div>
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] italic">Hardware Manifest</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {order.cartItems?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-6 p-6 bg-slate-50 dark:bg-black/60 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center p-3 shadow-md">
                          <img src={item.image} className="w-full h-full object-contain" alt="" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-black dark:text-white uppercase italic truncate mb-1">{item.name}</p>
                          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Qty: {item.quantity} • Rs. {item.price?.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-12 py-10 bg-slate-900 dark:bg-black/80 text-white flex flex-wrap justify-between items-center gap-8 border-t border-white/5">
                  <div className="flex items-center gap-6 opacity-60">
                    <ShieldCheck size={24} className="text-emerald-500" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em]">Authorized Transaction: {order.paymentMethod}</p>
                  </div>
                  <div className="flex items-center gap-10">
                    <div className="text-right">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Valuation</p>
                      <p className="text-4xl font-black text-blue-400 italic tracking-tighter">Rs. {order.totalAmount?.toLocaleString()}</p>
                    </div>
                    <button onClick={() => handleDelete(order._id)} className="p-5 bg-red-600/10 text-red-600 rounded-[1.5rem] hover:bg-red-600 hover:text-white transition-all shadow-xl active:scale-95">
                      <Trash2 size={24} />
                    </button>
                  </div>
              </div>
            </div>
          </ScrollReveal>
        )) : (
          <div className="py-40 text-center bg-white dark:bg-slate-900 rounded-[5rem] border-4 border-dashed border-slate-100 dark:border-white/5">
              <AlertCircle size={64} className="mx-auto text-slate-200 dark:text-slate-800 mb-6" />
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.6em] italic">No Extractions Detected in Current Sector.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default OrderManagement;