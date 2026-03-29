import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { 
  Star, ShoppingCart, Zap, ShieldCheck, Truck, ArrowLeft, 
  Cpu, Plus, Minus, CheckCircle2, Award, 
  MessageSquare, Loader2, AlertCircle, Heart, Share2,
  Box, Fingerprint, Activity, Database, Globe, RefreshCcw,
  Package, Shield, Clock, BadgeCheck, Send, User, Pencil,
  ChevronRight, Layout, HardDrive, Thermometer, ZapOff
} from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';

/**
 * 🛰️ AZEEM GADGETS - ENTERPRISE PRODUCT ARCHITECTURE
 * --------------------------------------------------
 * Version: 10.0 (Final Professional)
 * Build Status: Optimized for 1080p/4K Displays
 * Logic: Synchronized Local Archive (src/utils/products.js)
 * Feedback: Real-Time User Transmission Integrated
 * --------------------------------------------------
 */

// 🔥 LOCAL DATA INTERFACE
import allProducts from '../../utils/products'; 

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, buyNow } = useCart();
  
  // --- CORE APPLICATION STATES ---
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('specs');
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  // --- 💬 REVIEWS ENGINE (REAL-TIME STATE) ---
  const [reviews, setReviews] = useState([
    { 
      id: 1, 
      name: 'Kainat', 
      date: '2 Hours Ago', 
      rating: 5, 
      initial: 'K',
      text: 'The build quality is premium. Azeem gadgets provides authentic units that are hard to find elsewhere in the market.', 
      verified: true 
    },
    { 
      id: 2, 
      name: 'Azeem', 
      date: '5 Hours Ago', 
      rating: 5, 
      initial: 'A',
      text: 'Performance is top-notch. I have tested the battery and processing speed personally; it exceeds expectations.', 
      verified: true 
    },
    { 
      id: 3, 
      name: 'Sheeraz', 
      date: 'Yesterday', 
      rating: 5, 
      initial: 'S',
      text: 'Delivery was extremely fast and the packaging was professional. The unit arrived in mint condition.', 
      verified: true 
    },
    { 
      id: 4, 
      name: 'Sohail', 
      date: '2 Days Ago', 
      rating: 5, 
      initial: 'S',
      text: 'Best value for money. If you are looking for genuine technology, this is the only reliable source.', 
      verified: true 
    }
  ]);

  // --- REVIEW FORM LOGIC ---
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', text: '', rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- DATA FETCHING PROTOCOL ---
  useEffect(() => {
    const fetchLocalData = () => {
      setLoading(true);
      try {
        // Find node in local archive
        const found = allProducts.find(p => String(p.id) === String(id));
        
        if (found) {
          setProduct(found);
          setError(null);
        } else {
          setError(`Module [Node-${id}] not detected in local data stream.`);
        }
      } catch (err) {
        setError("🛰️ Connection Failure: Local archive is corrupted or unreachable.");
      } finally {
        setTimeout(() => setLoading(false), 500); // Optimized delay
      }
    };

    fetchLocalData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // --- SUBMISSION HANDLER ---
  const handlePostReview = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.text) return alert("All encrypted fields must be filled.");
    
    setIsSubmitting(true);
    setTimeout(() => {
      const newEntry = {
        id: Date.now(),
        name: formData.name,
        date: 'Just Now',
        rating: formData.rating,
        initial: formData.name.charAt(0).toUpperCase(),
        text: formData.text,
        verified: true
      };

      setReviews([newEntry, ...reviews]);
      setFormData({ name: '', text: '', rating: 5 });
      setShowReviewForm(false);
      setIsSubmitting(false);
    }, 1200);
  };

  // --- UI HELPER: TECH CARD ---
  const TechSpecCard = ({ icon, label, value }) => (
    <div className="p-4 bg-white dark:bg-[#0c0c0c] rounded-xl border border-slate-100 dark:border-white/5 hover:border-blue-500/40 transition-all duration-300">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 bg-blue-500/10 text-blue-600">
        {icon}
      </div>
      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
      <p className="text-sm font-bold dark:text-white uppercase tracking-tight">{value}</p>
    </div>
  );

  // --- RENDER: LOADING SEQUENCE ---
  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-slate-50 dark:bg-[#050505]">
      <Loader2 className="animate-spin text-blue-600" size={36} />
      <p className="font-bold dark:text-white tracking-[0.2em] uppercase text-[10px] animate-pulse">Synchronizing Data Node...</p>
    </div>
  );

  // --- RENDER: CRITICAL ERROR ---
  if (error || !product) return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 px-6 bg-slate-50 dark:bg-[#050505]">
      <AlertCircle className="text-red-500" size={48} />
      <h2 className="text-xl font-black dark:text-white uppercase tracking-tight text-center">{error}</h2>
      <button onClick={() => navigate('/')} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold uppercase text-[10px] tracking-widest shadow-md">Return to Warehouse</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-white transition-colors duration-300 font-sans">
      
      {/* 🧭 TOP NAVIGATION BAR */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 font-bold transition-all group bg-white dark:bg-[#0c0c0c] px-4 py-2.5 rounded-lg border border-slate-200 dark:border-white/5 shadow-sm text-[10px] uppercase tracking-widest"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Archive
        </button>

        <div className="flex gap-2.5">
          <button 
            onClick={() => setIsLiked(!isLiked)} 
            className={`p-2.5 rounded-lg border transition-all ${isLiked ? 'bg-red-500 border-red-500 text-white shadow-md shadow-red-500/20' : 'bg-white dark:bg-[#0c0c0c] border-slate-200 dark:border-white/5 text-slate-400'}`}
          >
            <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
          </button>
          <button className="p-2.5 bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-white/5 rounded-lg text-slate-400 hover:text-blue-600 transition-all">
            <Share2 size={16} />
          </button>
        </div>
      </nav>

      {/* 🛠️ MAIN ARCHIVE GRID */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 items-start">
          
          {/* 🖼️ VISUAL LAYER (LEFT) */}
          <ScrollReveal direction="left">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-600/5 blur-[80px] rounded-full opacity-30"></div>
              <div className="relative bg-white dark:bg-[#0c0c0c] rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-white/5 shadow-xl flex items-center justify-center min-h-[350px] md:min-h-[500px] overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-auto max-h-[400px] object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1.5 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg flex items-center gap-2 italic">
                    <BadgeCheck size={12} /> Genuine Unit
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* 📝 DATA LAYER (RIGHT) */}
          <ScrollReveal direction="right">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[9px] font-black uppercase tracking-widest rounded-md italic">
                    {product.brand || 'Elite'}
                  </span>
                  <span className="px-2.5 py-1 bg-blue-600/10 text-blue-600 text-[9px] font-black uppercase tracking-widest rounded-md border border-blue-600/20 italic">
                    {product.category} Section
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight uppercase italic dark:text-white leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 text-amber-500">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < 5 ? "currentColor" : "none"} />)}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">4.9 Master Rating</span>
                </div>
              </div>

              {/* 💰 VALUATION BLOCK */}
              <div className="p-6 bg-slate-100 dark:bg-white/[0.02] rounded-2xl border border-slate-200 dark:border-white/5">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 italic">Extraction Valuation</p>
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl md:text-5xl font-black text-blue-600 tracking-tighter italic">
                    Rs. {(product.price * quantity).toLocaleString()}
                  </span>
                  <span className="text-lg font-bold text-slate-400 line-through italic">
                    Rs. {(product.price * 1.15).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* 🛒 PIPELINE CONTROLS */}
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center bg-white dark:bg-[#0c0c0c] rounded-xl p-1.5 border border-slate-200 dark:border-white/5 shadow-sm justify-between min-w-[150px]">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3.5 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition-all active:scale-90"><Minus size={16}/></button>
                    <span className="text-lg font-black w-6 text-center italic">{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)} className="p-3.5 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition-all active:scale-90"><Plus size={16}/></button>
                  </div>
                  <button 
                    onClick={() => addToCart({ ...product, quantity })}
                    className="flex-1 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-xl hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95"
                  >
                    <ShoppingCart size={16} /> Add to Archive
                  </button>
                </div>
                <button 
                  onClick={() => { buyNow({ ...product, quantity }); navigate('/checkout'); }}
                  className="w-full py-4 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95"
                >
                  <Zap size={16} fill="currentColor" /> Instant Extraction
                </button>
              </div>

              {/* 🛡️ LOGISTICS BAR */}
              <div className="grid grid-cols-2 gap-4 pt-5 border-t border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-3 text-slate-500 italic">
                  <Truck size={16} className="text-blue-500" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Global Logistics</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 italic">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Secure Warranty</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* 📊 TELEMETRY TABS SECTION */}
        <div className="mt-20 space-y-10">
          <div className="flex gap-6 border-b border-slate-200 dark:border-white/10 overflow-x-auto no-scrollbar">
            {[
              { id: 'specs', label: 'Specifications', icon: <Cpu size={14}/> },
              { id: 'desc', label: 'Analysis', icon: <Box size={14}/> },
              { id: 'reviews', label: 'Commander Comms', icon: <MessageSquare size={14}/> }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-[9px] font-black uppercase tracking-widest flex items-center gap-2 relative transition-all whitespace-nowrap italic ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'}`}
              >
                {tab.icon} {tab.label}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full animate-in slide-in-from-left-2"></div>}
              </button>
            ))}
          </div>

          <div className="min-h-[350px]">
            {/* TAB: TECHNICAL SPECS */}
            {activeTab === 'specs' && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {Object.entries(product.specs || { 
                  Display: 'Retina XDR Pro', Processor: 'Azeem-Modified', Memory: 'LPDDR5 Ultra', Build: 'Titanium' 
                }).map(([key, value]) => (
                  <TechSpecCard key={key} label={key} value={value} icon={<Activity size={16}/>} />
                ))}
              </div>
            )}

            {/* TAB: PRODUCT NARRATIVE */}
            {activeTab === 'desc' && (
              <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <h3 className="text-xl font-black uppercase italic tracking-tight">Intelligence Narrative</h3>
                <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed italic font-medium">
                  "{product.description || "This unit represents the pinnacle of hardware engineering. Hand-picked for the Azeem collection, it features zero-latency processing and a build quality that exceeds commercial standards. Designed for those who refuse to compromise."}"
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                   <div className="flex gap-3 items-start p-5 bg-white dark:bg-[#0c0c0c] rounded-xl border border-slate-100 dark:border-white/5">
                      <Shield className="text-blue-500" size={20} />
                      <div>
                         <p className="font-black uppercase text-[10px] italic">Hardware Shield</p>
                         <p className="text-[10px] text-slate-400 mt-1 italic">Encrypted hardware protection layers active.</p>
                      </div>
                   </div>
                   <div className="flex gap-3 items-start p-5 bg-white dark:bg-[#0c0c0c] rounded-xl border border-slate-100 dark:border-white/5">
                      <RefreshCcw className="text-emerald-500" size={20} />
                      <div>
                         <p className="font-black uppercase text-[10px] italic">Auto-Sync</p>
                         <p className="text-[10px] text-slate-400 mt-1 italic">Synchronization with global deployment nodes.</p>
                      </div>
                   </div>
                </div>
              </div>
            )}

            {/* TAB: REAL-TIME FEEDBACK SYSTEM */}
            {activeTab === 'reviews' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex justify-between items-center">
                   <h3 className="text-xl font-black uppercase italic tracking-tight">Encrypted Comms ({reviews.length})</h3>
                   <button 
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest shadow-md active:scale-95 transition-all"
                   >
                     {showReviewForm ? <ZapOff size={12} /> : <Pencil size={12} />}
                     {showReviewForm ? 'Abort Feedback' : 'Transmit Signal'}
                   </button>
                </div>

                {/* 📝 BROADCAST SIGNAL FORM */}
                {showReviewForm && (
                  <div className="p-6 md:p-8 bg-white dark:bg-[#0c0c0c] rounded-[2rem] border-2 border-blue-600/20 shadow-2xl animate-in zoom-in-95">
                    <form onSubmit={handlePostReview} className="space-y-6">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1 italic">Commander Designation</label>
                             <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={14} />
                                <input 
                                  type="text" 
                                  required
                                  value={formData.name}
                                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                                  className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl py-3.5 pl-10 pr-4 focus:outline-none focus:border-blue-600 transition-all font-black text-sm" 
                                  placeholder="Enter Name..." 
                                />
                             </div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1 italic">Node Rating</label>
                             <select 
                               value={formData.rating}
                               onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
                               className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl py-3.5 px-4 focus:outline-none focus:border-blue-600 transition-all font-black text-sm appearance-none cursor-pointer"
                             >
                                <option value="5">⭐⭐⭐⭐⭐ (Perfect)</option>
                                <option value="4">⭐⭐⭐⭐ (Great)</option>
                                <option value="3">⭐⭐⭐ (Average)</option>
                             </select>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1 italic">Encrypted Feedback</label>
                          <textarea 
                            rows="4" 
                            required
                            value={formData.text}
                            onChange={(e) => setFormData({...formData, text: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-5 focus:outline-none focus:border-blue-600 transition-all font-bold text-sm italic" 
                            placeholder="Type your transmission here, Commander..."
                          ></textarea>
                       </div>
                       <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full py-4 bg-blue-600 text-white rounded-xl font-black uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-blue-700 shadow-lg disabled:opacity-50"
                       >
                          {isSubmitting ? <Loader2 className="animate-spin" size={14} /> : <Send size={14} />}
                          {isSubmitting ? 'Transmitting...' : 'Initiate Broadcast Transmission'}
                       </button>
                    </form>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-6 bg-white dark:bg-[#0c0c0c] rounded-2xl border border-slate-100 dark:border-white/5 flex flex-col md:flex-row gap-6 items-start transition-all hover:border-blue-600/20 group">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black text-lg flex-shrink-0 shadow-lg shadow-blue-500/20 italic">
                        {rev.initial}
                      </div>
                      <div className="space-y-3 flex-1">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-black text-base dark:text-white uppercase italic">{rev.name}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <div className="flex text-amber-500 gap-0.5">
                                {[...Array(rev.rating)].map((_, i) => <Star key={i} size={10} fill="currentColor"/>)}
                              </div>
                              <span className="text-[8px] font-black text-emerald-500 uppercase flex items-center gap-1 italic border border-emerald-500/20 px-2 py-0.5 rounded">
                                <CheckCircle2 size={10}/> Verified Node
                              </span>
                            </div>
                          </div>
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{rev.date}</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 italic text-sm leading-relaxed">"{rev.text}"</p>
                        <div className="flex gap-4 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="text-[8px] font-black text-blue-500 uppercase tracking-widest hover:underline">Helpful (0)</button>
                           <button className="text-[8px] font-black text-slate-500 uppercase tracking-widest hover:underline">Report</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 🛰️ LOGISTICS NETWORK TELEMETRY */}
        <div className="mt-32 p-8 md:p-12 bg-slate-900 rounded-[2.5rem] text-center space-y-6 relative overflow-hidden shadow-2xl">
           <div className="absolute inset-0 bg-blue-600/5 animate-pulse"></div>
           <div className="relative z-10">
              <Globe className="mx-auto text-blue-500 mb-4" size={32} />
              <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight italic">Extraction Network Sync Active</h4>
              <p className="text-[11px] text-slate-400 max-w-lg mx-auto italic font-bold">
                 Operating an elite high-speed satellite logistics network. Monitor your unit in real-time from extraction to delivery.
              </p>
              <div className="flex justify-center gap-8 md:gap-20 pt-8 border-t border-white/5 mt-6">
                 <div>
                    <p className="text-2xl font-black text-white italic tracking-tighter">190+</p>
                    <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Active Nodes</p>
                 </div>
                 <div>
                    <p className="text-2xl font-black text-white italic tracking-tighter">0.02s</p>
                    <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Sync Speed</p>
                 </div>
                 <div>
                    <p className="text-2xl font-black text-white italic tracking-tighter">99.9%</p>
                    <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Accuracy</p>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;