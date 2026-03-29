import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext'; 
import { X, User, Phone, MapPin, Globe, Lock, Loader2, Zap, Mail } from 'lucide-react';

const CheckoutModal = ({ isOpen, onClose, total }) => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user } = useAuth(); 
  const [loading, setLoading] = useState(false);

  // 🚚 Delivery Config
  const DELIVERY_CHARGES = 300;
  const finalTotal = Number(total) + DELIVERY_CHARGES;

  // 📝 Form States
  const [formData, setFormData] = useState({
    customerName: "",
    email: "", 
    phone: "",
    address: "",
    city: ""
  });

  // Sync info if user state is loaded
  useEffect(() => {
    if (user && isOpen) {
      setFormData(prev => ({
        ...prev,
        customerName: user.name || prev.customerName,
        email: user.email || user.userId || prev.email // 🔥 Fix: Priority to real email
      }));
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  // 🎯 MASTER DEPLOYMENT LOGIC
  const handleFinalConfirm = async (e) => {
    e.preventDefault();

    // 🛡️ Basic Validation
    if (!formData.customerName || !formData.email || !formData.phone || !formData.address) {
      return alert("VAULT ALERT: All coordinates (fields) must be filled.");
    }

    setLoading(true);

    // 📦 Prepare Data for Backend (Sync with MongoDB Schema)
    const orderData = {
      userId: user?._id || user?.id || null, // 🔥 Links order to user dashboard
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city || "Not Specified",
      cartItems: cart.map(item => ({
        productId: String(item._id || item.id), 
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity || 1),
        image: item.image
      })),
      productCost: Number(total),
      deliveryCharges: DELIVERY_CHARGES,
      totalAmount: finalTotal,
      paymentMethod: "Cash on Delivery"
    };

    try {
      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json' };
      
      // 🔥 Security Fix: Don't send "Bearer null"
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      // 🚀 TRANSMITTING TO VAULT
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (result.success) {
        console.log("✅ VAULT SECURED: Order Transmitted");
        
        setTimeout(() => {
          navigate('/order-success', { 
            state: { 
              orderId: result.data.orderId || result.data._id,
              totalAmount: finalTotal,
              customerName: formData.customerName,
              address: `${formData.address}, ${formData.city}`,
              items: cart
            },
            replace: true
          });

          clearCart(); 
          onClose();   
          setLoading(false);
        }, 1500);
      } else {
        throw new Error(result.message || "Vault Write Error");
      }

    } catch (err) {
      console.error("❌ SYSTEM FAILURE:", err.message);
      alert(`⚠️ TRANSMISSION ERROR: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-6 overflow-hidden font-sans">
      {/* 🌑 Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/95 backdrop-blur-3xl animate-in fade-in duration-700" 
        onClick={!loading ? onClose : null}
      ></div>

      {/* 🏛️ The Command Center */}
      <div className="relative bg-white dark:bg-[#0a0a0a] w-full max-w-xl rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-500 border border-slate-100 dark:border-white/5">
        
        {loading && <div className="absolute top-0 left-0 h-1.5 bg-blue-600 animate-pulse w-full z-[1000]"></div>}

        {/* 🛰️ Header */}
        <div className="p-10 border-b border-slate-50 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] flex justify-between items-center relative">
          <div className="space-y-1">
            <h2 className="text-3xl font-black dark:text-white uppercase italic tracking-tighter leading-none">
              Deploy <span className="text-blue-600">Archive</span>
            </h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic leading-none mt-2">Secure Extraction Tunnel v4.0</p>
          </div>
          {!loading && (
            <button onClick={onClose} className="p-4 bg-slate-100 dark:bg-white/5 hover:bg-red-500 hover:text-white rounded-3xl transition-all shadow-xl">
              <X size={20} />
            </button>
          )}
        </div>

        <div className="p-10 overflow-y-auto max-h-[60vh] no-scrollbar">
          <form onSubmit={handleFinalConfirm} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">Full Identity</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <input required type="text" placeholder="Azeem Jan" value={formData.customerName}
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 rounded-2xl outline-none focus:border-blue-600 font-bold dark:text-white transition-all text-sm"
                    onChange={(e) => setFormData({...formData, customerName: e.target.value})} />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">Secure Email</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <input required type="email" placeholder="boss@azeem.com" value={formData.email}
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 rounded-2xl outline-none focus:border-blue-600 font-bold dark:text-white transition-all text-sm"
                    onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">Comm-Link (Phone)</label>
                    <div className="relative group">
                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                        <input required type="tel" placeholder="03XXXXXXXXX" value={formData.phone}
                        className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 rounded-2xl outline-none focus:border-blue-600 font-bold dark:text-white transition-all text-sm"
                        onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">City Node</label>
                    <div className="relative group">
                        <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                        <input required type="text" placeholder="e.g. Lahore" value={formData.city}
                        className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 rounded-2xl outline-none focus:border-blue-600 font-bold dark:text-white transition-all text-sm"
                        onChange={(e) => setFormData({...formData, city: e.target.value})} />
                    </div>
                </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">Extraction Point (Address)</label>
              <div className="relative group">
                <MapPin className="absolute left-5 top-6 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <textarea required rows="2" placeholder="Street, Sector, Landmark..." value={formData.address}
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 rounded-3xl outline-none focus:border-blue-600 font-bold dark:text-white transition-all resize-none text-sm"
                  onChange={(e) => setFormData({...formData, address: e.target.value})}></textarea>
              </div>
            </div>

            <div className="bg-slate-950 p-8 rounded-[2.5rem] text-white border border-white/5 relative overflow-hidden group">
              <Zap className="absolute -right-6 -bottom-6 text-blue-600/10 w-32 h-32 group-hover:scale-110 transition-transform" />
              <div className="flex justify-between items-center relative z-10">
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase text-blue-500 tracking-[0.3em]">Execution Total (inc. Delivery)</p>
                  <p className="text-4xl font-black italic tracking-tighter">Rs. {finalTotal.toLocaleString()}</p>
                </div>
                <div className="text-right">
                    <p className="text-[8px] font-black text-slate-500 uppercase italic">COD Extraction</p>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-7 md:py-9 rounded-[2.5rem] font-black uppercase tracking-[0.5em] text-[12px] shadow-2xl transition-all flex items-center justify-center gap-5 italic ${
                loading ? 'bg-slate-800 cursor-wait' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/40 active:scale-95'
              }`}
            >
              {loading ? (
                <><Loader2 className="animate-spin" size={20} /> Authorizing Vault Sync...</>
              ) : (
                <><Lock size={20} /> Authorize Order Protocol</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;