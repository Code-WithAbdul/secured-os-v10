import React from 'react';
import { Star, ShoppingCart, Zap, ShieldCheck, Cpu, ArrowUpRight, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // Toast notifications ke liye

const ProductCard = ({ product }) => {
  const { addToCart, buyNow } = useCart();
  const navigate = useNavigate();

  // 💰 Financial Logic
  const discount = 10; 
  const originalPrice = product.price + (product.price * (discount / 100));

  // ⚡ 1. INSTANT DEPLOY (BUY NOW)
  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    buyNow(product); 
    toast.success(`${product.name} Initialized for Checkout`, {
      icon: '🚀',
      style: { borderRadius: '15px', background: '#333', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
    });
    navigate('/checkout'); // Direct Checkout par bhejna professional hai
  };

  // 🛒 2. SECURE TO VAULT (ADD TO CART)
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} Secured in Vault`, {
      icon: '🛡️',
      style: { borderRadius: '15px', background: '#2563eb', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
    });
  };

  return (
    <div className="group relative bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-100 dark:border-white/5 p-4 rounded-[2.5rem] transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(37,99,235,0.2)] overflow-hidden">
      
      {/* 🔮 Background Intelligence Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-blue-600/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>

      <Link to={`/product/${product.id || product._id}`} className="block">
        {/* 🖼️ Hero Image Container */}
        <div className="relative aspect-[10/11] bg-slate-50 dark:bg-black/50 rounded-[2rem] overflow-hidden mb-5 flex items-center justify-center p-8 shadow-inner group/img border border-transparent dark:group-hover:border-blue-500/20 transition-all duration-700">
          
          <img 
            src={product.image} 
            alt={product.name} 
            className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-[1000ms] cubic-bezier(0.34, 1.56, 0.64, 1) z-10" 
            onError={(e) => e.target.src = 'https://via.placeholder.com/400x400?text=Premium+Unit'}
          />

          {/* 🏷️ Top Identity Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-30">
            <div className="flex flex-col gap-2">
              <span className="bg-blue-600 text-white text-[7px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full shadow-xl">Verified Node</span>
              {product.stock < 5 && (
                <span className="bg-red-600 text-white text-[7px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full animate-pulse shadow-lg">Low Stock</span>
              )}
            </div>
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1.5 text-amber-500 font-black text-[10px] shadow-xl border border-white/10">
              <Star size={12} fill="currentColor" /> {product.rating || '4.9'}
            </div>
          </div>

          {/* ⚡ Intelligence Overlay (Premium Hover) */}
          <div className="absolute inset-0 bg-blue-600/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center text-white p-8 z-40">
             <ShieldCheck size={40} className="mb-4 text-cyan-300" />
             <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 opacity-80 text-cyan-100">Quality Assured</p>
             <h4 className="text-xs font-black text-center uppercase tracking-tighter leading-tight mb-6 max-w-[150px]">{product.name}</h4>
             
             <div className="flex flex-col gap-2 w-full max-w-[120px]">
                <div className="flex justify-between text-[8px] font-black uppercase border-b border-white/10 pb-1"><span>Status</span><span className="text-cyan-300">Ready</span></div>
                <div className="flex justify-between text-[8px] font-black uppercase border-b border-white/10 pb-1"><span>Node</span><span className="text-cyan-300">A101</span></div>
             </div>
             
             <div className="mt-8 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors">
                View Intel <ArrowUpRight size={12} />
             </div>
          </div>
        </div>
      </Link>

      <div className="px-2 space-y-4">
        {/* Unit Data */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <p className="text-[8px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-[0.4em]">{product.category}</p>
            <div className="flex items-center gap-1 text-emerald-500 font-black text-[8px] uppercase">
                <Check size={10} strokeWidth={4} /> In Stock
            </div>
          </div>
          <h3 className="font-black text-slate-900 dark:text-white text-base tracking-tighter truncate group-hover:text-blue-600 transition-colors duration-300">
            {product.name}
          </h3>
        </div>

        {/* 💰 Financial Sector */}
        <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest line-through">Rs. {originalPrice.toLocaleString()}</span>
            <p className="text-xl font-black text-slate-900 dark:text-white tracking-tighter italic">
              Rs. {product.price.toLocaleString()}
            </p>
          </div>
          
          <div className="flex gap-2.5">
            {/* Instant Deploy */}
            <button 
              onClick={handleBuyNow}
              title="Instant Deployment"
              className="bg-amber-500 hover:bg-amber-400 text-white p-3.5 rounded-2xl transition-all shadow-lg shadow-amber-500/20 active:scale-90 group/btn"
            >
              <Zap size={20} fill="currentColor" className="group-hover/btn:scale-110 transition-transform" />
            </button>

            {/* Secure Unit */}
            <button 
              onClick={handleAddToCart}
              title="Secure to Vault"
              className="bg-slate-900 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white p-3.5 rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-90 group/btn"
            >
              <ShoppingCart size={20} className="group-hover/btn:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 🚀 Luxury Bottom Indicator */}
      <div className="absolute bottom-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
    </div>
  );
};

export default ProductCard;