import React, { useState } from 'react';
import { Send, Zap, ShieldCheck, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';

const Contact = () => {
  const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'success'

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // 🛰️ REAL-TIME TRANSMISSION SIMULATION
    setTimeout(() => {
      setStatus('success');
      
      // 4 seconds baad wapis normal form par le aao
      setTimeout(() => {
        setStatus('idle');
      }, 4000);
    }, 2500);
  };

  return (
    <div className="w-full space-y-12 pb-20 relative overflow-hidden animate-smooth-in">
      
      {/* 🚀 1. MESSAGE TRANSMITTED OVERLAY (The Magic) */}
      {status === 'success' && (
        <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-blue-600 text-white animate-in zoom-in duration-500">
          <div className="absolute inset-0 bg-slate-950 opacity-20 pointer-events-none"></div>
          <Zap size={100} className="animate-bounce-slow text-white fill-white shadow-2xl" />
          <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mt-10 text-center px-4 leading-none">
            Message <br /> <span className="text-blue-200">Transmitted</span>
          </h2>
          <div className="mt-8 flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full border border-white/20">
             <ShieldCheck size={16} className="text-emerald-400" />
             <p className="text-[10px] font-black uppercase tracking-[0.4em]">Security Protocol: Active</p>
          </div>
        </div>
      )}

      {/* 🚀 2. NORMAL CONTACT CONTENT */}
      <ScrollReveal direction="down">
        <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white border border-white/5 shadow-2xl relative overflow-hidden">
          <Zap className="absolute -bottom-10 -right-10 text-white/5 w-64 h-64 rotate-12" />
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-6">
            Contact <span className="text-blue-600">The Core</span>
          </h1>
          <p className="text-blue-100/60 font-medium italic max-w-xl">
            "Direct line to Azeem's Vault. Secure communication established. Send your intel."
          </p>
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-10 px-4 md:px-0">
        
        {/* Contact Form */}
        <ScrollReveal direction="left" delay={200}>
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900/50 p-8 md:p-12 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-xl space-y-6">
            <div className="space-y-4">
               <input required type="text" placeholder="Identity Name" className="w-full p-5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:border-blue-600 font-bold dark:text-white transition-all" />
               <input required type="email" placeholder="Verified Email Node" className="w-full p-5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:border-blue-600 font-bold dark:text-white transition-all" />
               <textarea required rows="4" placeholder="Your Encrypted Intel (Message)" className="w-full p-5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:border-blue-600 font-bold dark:text-white transition-all resize-none"></textarea>
            </div>
            
            <button 
              disabled={status === 'sending'}
              type="submit" 
              className={`w-full py-6 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-2xl transition-all flex items-center justify-center gap-4 ${
                status === 'sending' ? 'bg-slate-400' : 'bg-blue-600 text-white hover:scale-105 active:scale-95'
              }`}
            >
              {status === 'sending' ? (
                <> <Loader2 size={20} className="animate-spin" /> Transmitting Intel... </>
              ) : (
                <> Initiate Transmission <Send size={18} /> </>
              )}
            </button>
          </form>
        </ScrollReveal>

        {/* Info Sidebar */}
        <ScrollReveal direction="right" delay={400}>
           <div className="space-y-8">
              <div className="bg-blue-600/10 p-10 rounded-[3rem] border border-blue-600/20 space-y-6">
                 <h3 className="text-2xl font-black dark:text-white uppercase italic">Active Nodes</h3>
                 <div className="space-y-6">
                    <div className="flex items-center gap-5 group">
                       <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"><Mail size={20}/></div>
                       <p className="font-black text-sm dark:text-white tracking-tight italic">mehmoodalias12@gmail.com</p>
                    </div>
                    <div className="flex items-center gap-5 group">
                       <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"><Phone size={20}/></div>
                       <p className="font-black text-sm dark:text-white tracking-tight italic">+92 3453565226</p>
                    </div>
                    <div className="flex items-center gap-5 group">
                       <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"><MapPin size={20}/></div>
                       <p className="font-black text-sm dark:text-white tracking-tight italic leading-none uppercase tracking-tighter">Karachi Tech Hub, <br /> Block 13, PK</p>
                    </div>
                 </div>
              </div>
           </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Contact;