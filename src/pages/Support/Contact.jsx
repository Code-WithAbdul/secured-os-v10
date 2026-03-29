import React, { useState } from 'react';
import { 
  Mail, Phone, Send, Instagram, Github, 
  MessageSquare, Globe, Loader2, CheckCircle2, AlertCircle 
} from 'lucide-react';

const Contact = () => {
  // --- FORM STATES ---
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  // --- HANDLERS ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // 🔥 REAL-TIME BACKEND INTEGRATION
      // Note: Make sure your backend has an '/api/contact' route
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Clear form
        setTimeout(() => setStatus('idle'), 5000); // Reset success message after 5s
      } else {
        throw new Error(result.message || "Transmission Failed");
      }
    } catch (err) {
      console.error("❌ VAULT LINK ERROR:", err.message);
      setStatus('error');
      setErrorMsg(err.message || "Connection Lost: Vault Unreachable.");
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 animate-smooth-in font-sans">
      
      {/* 1. Left Side: Contact Info & Vibe */}
      <div className="space-y-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest">
            <Globe size={14} className="animate-spin-slow" /> Available 24/7
          </div>
          <h1 className="text-7xl font-black dark:text-white tracking-tighter leading-none italic uppercase">
            Let's <span className="text-blue-600">Connect.</span>
          </h1>
          <p className="text-slate-500 text-xl font-medium max-w-md italic">
            Got questions about the latest gadgets? I'm here to help you choose the best tech, jani!
          </p>
        </div>

        <div className="space-y-6">
          {/* Phone Card */}
          <a href="tel:03453565226" className="flex items-center gap-6 p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-white/5 group hover:border-blue-500 transition-all duration-500">
            <div className="p-5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-3xl group-hover:scale-110 group-hover:rotate-12 transition-all">
              <Phone size={32} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 italic">Direct Link</p>
              <p className="text-2xl font-black dark:text-white tracking-tight">03453565226</p>
            </div>
          </a>
          
          {/* Email Card */}
          <a href="mailto:mehmoodalias12@gmail.com" className="flex items-center gap-6 p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-white/5 group hover:border-emerald-500 transition-all duration-500">
            <div className="p-5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 rounded-3xl group-hover:scale-110 group-hover:-rotate-12 transition-all">
              <Mail size={32} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 italic">Secure Mail</p>
              <p className="text-xl font-black dark:text-white tracking-tight break-all">mehmoodalias12@gmail.com</p>
            </div>
          </a>
        </div>

        {/* Social Badges */}
        <div className="flex gap-4 pt-4">
          <div className="p-5 bg-slate-100 dark:bg-white/5 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-500/10 transition-all cursor-pointer border border-transparent hover:border-blue-500/20">
            <Instagram size={24} />
          </div>
          <div className="p-5 bg-slate-100 dark:bg-white/5 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-500/10 transition-all cursor-pointer border border-transparent hover:border-blue-500/20">
            <Github size={24} />
          </div>
        </div>
      </div>

      {/* 2. Right Side: Premium Glass Form */}
      <div className="relative group">
        <div className="absolute inset-0 bg-blue-600/20 blur-[120px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity"></div>
        
        <div className="relative bg-white dark:bg-slate-950 p-10 md:p-14 rounded-[4rem] shadow-2xl border border-slate-100 dark:border-white/5 space-y-8 backdrop-blur-3xl transition-all">
          
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h3 className="text-3xl font-black dark:text-white italic flex items-center gap-3 uppercase tracking-tighter">
                <MessageSquare className="text-blue-500" /> Send Signal
              </h3>
              <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic">Azeem Vault Response: &lt; 2 Hours</p>
            </div>
            {status === 'success' && <CheckCircle2 className="text-emerald-500 animate-bounce" size={32} />}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
               <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name" 
                className="w-full p-6 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20 outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-white/10 transition-all font-bold" 
              />
            </div>

            <div className="space-y-2">
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Secure Email Address" 
                className="w-full p-6 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20 outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-white/10 transition-all font-bold" 
              />
            </div>

            <div className="space-y-2">
              <textarea 
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows="4" 
                placeholder="Describe your tech requirements..." 
                className="w-full p-6 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20 outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-white/10 transition-all font-bold resize-none"
              ></textarea>
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-500 text-xs font-black uppercase tracking-widest text-center animate-pulse">
                ✅ Transmission Received: Signal Secure!
              </div>
            )}
            {status === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-black uppercase tracking-widest text-center">
                <AlertCircle className="inline mr-2" size={14} /> {errorMsg}
              </div>
            )}

            <button 
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-6 bg-blue-600 text-white font-black rounded-[2rem] hover:bg-blue-500 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 text-lg shadow-2xl shadow-blue-500/30 border border-blue-400/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <> <Loader2 className="animate-spin" size={24} /> Initiating Transmission... </>
              ) : (
                <> <Send size={24} /> Launch Inquiry </>
              )}
            </button>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default Contact;