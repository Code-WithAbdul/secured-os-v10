import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Package, ShoppingCart, Edit3, Trash2, CheckCircle, 
  XCircle, Truck, Eye, Search, LayoutDashboard, Database,
  TrendingUp, Users, DollarSign, Activity, Plus, Box, Phone, MapPin, Zap, AlertTriangle, RefreshCw, Loader2
} from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';
import InventoryEditor from './InventoryEditor'; 

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // 🛡️ AUTH TOKEN RETRIEVAL PROTOCOL (Universal)
  const getAuthToken = useCallback(() => {
    const storedUser = localStorage.getItem('user') || localStorage.getItem('azeems_active_user');
    const rawToken = localStorage.getItem('token');
    if (rawToken) return rawToken;
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      return parsed.token;
    }
    return "";
  }, []);

  // 🔄 1. MASTER DATA SYNC
  const syncVaultData = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = getAuthToken();
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : "" 
      };

      const [prodRes, orderRes] = await Promise.all([
        fetch('http://localhost:5000/api/products', { headers }),
        fetch('http://localhost:5000/api/orders', { headers })
      ]);

      const prodData = await prodRes.json();
      const orderData = await orderRes.json();

      if (prodData.success) {
        console.log(`📡 Vault Data Received: ${prodData.data?.length} Units`);
        setInventory(prodData.data || []);
      }
      
      if (orderData.success) setOrders(orderData.data || []);

    } catch (error) {
      console.error("🛰️ Vault Link Failure:", error);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [getAuthToken]);

  useEffect(() => {
    syncVaultData();
  }, [syncVaultData]);

  // 📊 2. ANALYTICS ENGINE
  const stats = useMemo(() => {
    const revenue = orders.reduce((acc, curr) => 
      (curr.status !== 'Cancelled' && curr.status !== 'Aborted') ? acc + (Number(curr.totalAmount) || 0) : acc, 0);
    const active = orders.filter(o => ['Pending', 'Confirmed', 'Shipped'].includes(o.status)).length;
    const stock = inventory.length;
    const aborted = orders.filter(o => o.status === 'Cancelled' || o.status === 'Aborted').length;
    return { revenue, active, stock, aborted };
  }, [orders, inventory]);

  // 🛠️ 3. STATUS UPDATE PROTOCOL
  const updateStatus = async (orderId, newStatus) => {
    try {
      const token = getAuthToken();
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      const data = await res.json();
      if (data.success) {
        setOrders(prev => prev.map(o => (o._id === orderId || o.id === orderId) ? { ...o, status: newStatus } : o));
      }
    } catch (err) {
      alert("❌ Protocol Error: Sync failed.");
    }
  };

  // 🗑️ 4. DELETE PRODUCT PROTOCOL
  const deleteProduct = async (id) => {
    if (!window.confirm("⚠️ MASTER AZEEM: Confirm unit termination?")) return;
    try {
      const token = getAuthToken();
      const res = await fetch(`http://localhost:5000/api/products/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setInventory(prev => prev.filter(p => p._id !== id && p.id !== id));
      }
    } catch (err) {
      alert("❌ Delete Protocol Failed.");
    }
  };

  // 🔍 5. SEARCH LOGIC
  const filteredInventory = useMemo(() => {
    return inventory.filter(p => {
      const name = p.name ? p.name.toLowerCase() : "";
      const cat = p.category ? p.category.toLowerCase() : "";
      const search = searchTerm.toLowerCase();
      return name.includes(search) || cat.includes(search);
    });
  }, [inventory, searchTerm]);

  return (
    <div className="w-full space-y-10 pb-24 animate-smooth-in bg-slate-50 dark:bg-[#050505] min-h-screen font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 🚀 ANALYTICS TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 pt-10 max-w-7xl mx-auto">
        <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
          <DollarSign className="absolute -right-4 -bottom-4 w-28 h-28 opacity-20" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1 italic">Vault Revenue</p>
          <h3 className="text-3xl font-black italic tracking-tighter">Rs. {stats.revenue.toLocaleString()}</h3>
        </div>
        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl border border-white/5 relative overflow-hidden">
          <Box className="absolute -right-4 -bottom-4 w-28 h-28 opacity-10" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1 italic">Stock Assets</p>
          <h3 className="text-3xl font-black italic tracking-tighter">{stats.stock} Units</h3>
        </div>
        <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
          <Activity className="absolute -right-4 -bottom-4 w-28 h-28 opacity-20" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1 italic">Active Extractions</p>
          <h3 className="text-3xl font-black italic tracking-tighter">{stats.active} Orders</h3>
        </div>
        <div className="bg-red-600 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
          <AlertTriangle className="absolute -right-4 -bottom-4 w-28 h-28 opacity-20" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1 italic">Aborted Units</p>
          <h3 className="text-3xl font-black italic tracking-tighter">{stats.aborted} Units</h3>
        </div>
      </div>

      {/* 🛠️ CONTROL HEADER */}
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal direction="down">
          <div className="bg-slate-950 rounded-[4rem] p-8 md:p-12 text-white border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="space-y-3 text-center md:text-left">
                <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-none">COMMAND <span className="text-blue-600">CENTER</span></h1>
                <div className="flex items-center gap-4 justify-center md:justify-start">
                   <button onClick={syncVaultData} className="p-2.5 bg-blue-600/20 rounded-xl hover:rotate-180 transition-all duration-700">
                      <RefreshCw size={18} className={isLoading ? 'animate-spin text-blue-400' : 'text-blue-400'} />
                   </button>
                   <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] italic">Vault Status: Secure ({inventory.length} Nodes)</p>
                </div>
              </div>
              
              <div className="flex bg-white/5 p-2 rounded-[2rem] border border-white/10 backdrop-blur-2xl relative z-[100]">
                <button 
                  onClick={() => setActiveTab('inventory')} 
                  className={`px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-500 ${activeTab === 'inventory' ? 'bg-blue-600 text-white shadow-xl scale-105' : 'text-slate-400 hover:text-white'}`}
                > 
                  Inventory 
                </button>
                <button 
                  onClick={() => setActiveTab('orders')} 
                  className={`px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-500 ${activeTab === 'orders' ? 'bg-blue-600 text-white shadow-xl scale-105' : 'text-slate-400 hover:text-white'}`}
                > 
                  Orders 
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* 📋 CONTENT STREAM */}
      <div className="max-w-7xl mx-auto px-6 min-h-[500px]">
        {isLoading ? (
          <div className="py-48 text-center flex flex-col items-center gap-6">
             <Loader2 className="animate-spin text-blue-600" size={60} />
             <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.6em] animate-pulse">Synchronizing Data Node...</p>
          </div>
        ) : (
          <>
            {/* TIER 1: INVENTORY MANAGER */}
            {activeTab === 'inventory' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <h2 className="text-3xl font-black dark:text-white uppercase italic tracking-tighter">Hardware <span className="text-blue-600">Archive</span></h2>
                  <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-grow md:w-80">
                      <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input 
                        type="text" 
                        placeholder="Search Serial..." 
                        className="w-full pl-14 pr-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition-all font-bold dark:text-white shadow-xl text-sm"
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <button onClick={() => {setEditingProduct(null); setIsEditorOpen(true);}} className="p-4 bg-blue-600 text-white rounded-2xl shadow-xl hover:scale-110 transition-all"><Plus size={24} /></button>
                  </div>
                </div>

                <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-100 dark:border-white/5 shadow-2xl">
                   <table className="w-full text-left border-collapse min-w-[800px]">
                     <thead className="bg-slate-50 dark:bg-black/50 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-white/5">
                       <tr>
                         <th className="p-10 italic">Unit Name</th>
                         <th className="p-10 italic text-center">Sector</th>
                         <th className="p-10 italic text-center">Price</th>
                         <th className="p-10 text-right italic">Action</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                        {filteredInventory.map((product) => (
                          <tr key={product._id || product.id} className="group hover:bg-blue-600/5 transition-all">
                             <td className="p-10">
                                <div className="flex items-center gap-6">
                                   <div className="w-16 h-16 bg-slate-100 dark:bg-black rounded-2xl p-2 border border-white/10 flex items-center justify-center overflow-hidden">
                                      <img src={product.image} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" alt="" />
                                   </div>
                                   <div>
                                      <p className="font-black dark:text-white uppercase text-lg tracking-tighter leading-none">{product.name}</p>
                                      <p className="text-[9px] font-black text-blue-600 mt-2 uppercase tracking-widest opacity-60 italic">Node_ID: #{String(product._id || product.id).substring(18)}</p>
                                   </div>
                                </div>
                             </td>
                             <td className="p-10 text-center">
                                <span className="px-5 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 text-[9px] font-black uppercase rounded-xl tracking-widest italic">{product.category}</span>
                             </td>
                             <td className="p-10 text-center">
                                <p className="font-black text-xl dark:text-white italic tracking-tighter text-blue-600">Rs. {Number(product.price).toLocaleString()}</p>
                             </td>
                             <td className="p-10 text-right">
                                <div className="flex justify-end gap-3">
                                   <button onClick={() => {setEditingProduct(product); setIsEditorOpen(true);}} className="p-4 bg-slate-50 dark:bg-black/40 text-slate-400 hover:text-blue-600 rounded-2xl border border-white/5 transition-all"><Edit3 size={18}/></button>
                                   <button onClick={() => deleteProduct(product._id || product.id)} className="p-4 bg-slate-50 dark:bg-black/40 text-slate-400 hover:text-red-500 rounded-2xl border border-white/5 transition-all"><Trash2 size={18}/></button>
                                </div>
                             </td>
                          </tr>
                        ))}
                     </tbody>
                   </table>
                </div>
              </div>
            )}

            {/* TIER 2: ORDER EXTRACTION LOGS */}
            {activeTab === 'orders' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between px-4">
                   <h2 className="text-3xl font-black dark:text-white uppercase italic tracking-tighter">Extraction <span className="text-blue-600">Logs</span></h2>
                   <div className="px-6 py-2 bg-white dark:bg-slate-900 rounded-full border border-white/5 font-black text-[9px] text-slate-500 uppercase tracking-widest">{orders.length} Records Active</div>
                </div>
                
                {orders.length > 0 ? [...orders].reverse().map((order) => (
                  <div key={order._id || order.id} className={`bg-white dark:bg-slate-900 p-8 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden group border-l-[12px] transition-all duration-500 ${['Cancelled', 'Aborted'].includes(order.status) ? 'border-l-red-600 opacity-60' : 'border-l-blue-600'}`}>
                    <div className="flex flex-col xl:flex-row justify-between gap-10 relative z-10">
                      
                      <div className="space-y-5 xl:w-1/3">
                        <div className="flex gap-4">
                           <span className="px-4 py-1.5 bg-blue-600 text-white font-black text-[9px] rounded-xl uppercase italic tracking-widest">ID: {order.orderId || 'SYNCING'}</span>
                           <span className={`px-4 py-1.5 rounded-xl font-black text-[9px] uppercase italic tracking-widest ${order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-600/10 text-blue-600'}`}>{order.status}</span>
                        </div>
                        {/* 🔥 Fixed Font: Smaller name for better fit */}
                        <h3 className="text-3xl font-black dark:text-white uppercase italic tracking-tighter leading-none group-hover:text-blue-600 transition-colors">{order.customerName}</h3>
                        <div className="space-y-2">
                           <p className="flex items-center gap-3 text-slate-500 font-bold text-xs"><Phone size={16} className="text-blue-600" /> {order.phone}</p>
                           <p className="flex items-start gap-3 text-slate-400 font-bold text-[10px] italic leading-tight"><MapPin size={16} className="text-blue-600 shrink-0" /> {order.address}, {order.city}</p>
                        </div>
                      </div>

                      <div className="xl:w-1/3 space-y-4">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Payload Manifest:</p>
                        <div className="grid grid-cols-4 gap-3">
                           {order.cartItems?.map((item, i) => (
                             <div key={i} className="relative group/item">
                                <div className="w-16 h-16 bg-slate-100 dark:bg-black rounded-2xl p-2 border border-white/5 flex items-center justify-center shadow-inner">
                                   <img src={item.image} className="w-full h-full object-contain group-hover/item:scale-110 transition-transform" alt="" />
                                </div>
                                <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black shadow-lg">x{item.quantity}</span>
                             </div>
                           ))}
                        </div>
                      </div>

                      <div className="xl:w-1/3 flex flex-col justify-between items-end gap-8">
                        <div className="text-right">
                           <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Total Extraction Value</p>
                           {/* 🔥 Fixed Font: Reduced from 5xl to 3xl for cleaner look */}
                           <p className="text-3xl font-black text-emerald-500 italic leading-none tracking-tighter">Rs. {Number(order.totalAmount).toLocaleString()}</p>
                        </div>
                        
                        {!['Cancelled', 'Aborted', 'Delivered'].includes(order.status) && (
                          <div className="flex gap-3">
                             <button onClick={() => updateStatus(order._id || order.id, 'Shipped')} className="p-5 bg-slate-950 text-white rounded-2xl hover:bg-blue-600 transition-all shadow-xl active:scale-90" title="Shipped"><Truck size={20}/></button>
                             <button onClick={() => updateStatus(order._id || order.id, 'Delivered')} className="p-5 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-500 transition-all shadow-xl active:scale-90" title="Delivered"><CheckCircle size={20}/></button>
                             <button onClick={() => updateStatus(order._id || order.id, 'Cancelled')} className="p-5 bg-red-600 text-white rounded-2xl hover:bg-red-500 transition-all shadow-xl active:scale-90" title="Abort"><XCircle size={20}/></button>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                )) : (
                  <div className="py-48 text-center bg-white dark:bg-slate-900 rounded-[5rem] border-4 border-dashed border-white/5">
                      <Database size={80} className="text-slate-100 dark:text-slate-800 mb-8 mx-auto" />
                      <p className="text-slate-400 font-black uppercase text-sm tracking-[0.5em] italic">Vault Logs Empty.</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {isEditorOpen && (
        <InventoryEditor 
          product={editingProduct} 
          isOpen={isEditorOpen} 
          onClose={() => setIsEditorOpen(false)} 
          onSave={syncVaultData} 
        />
      )}
    </div>
  );
};

export default AdminPanel;