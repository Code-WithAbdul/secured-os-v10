import React from 'react';
import { 
  Lock, EyeOff, FileText, Database, ShieldCheck, 
  RefreshCw, UserCheck, Fingerprint, Globe, ServerLock 
} from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';

/**
 * 🛰️ AZEEM GADGETS - PRIVACY & DATA ENCRYPTION PROTOCOL
 * --------------------------------------------------------
 * Status: Vault Verified
 * Version: 4.0 (Enterprise Privacy Build)
 * --------------------------------------------------------
 */

const Privacy = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 md:py-24 px-6 space-y-16 animate-smooth-in font-sans">
      
      {/* 🛡️ HEADER SECTION */}
      <ScrollReveal direction="down">
        <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left border-b border-slate-100 dark:border-white/5 pb-12">
          <div className="p-8 bg-blue-600 rounded-[2.5rem] text-white shadow-[0_20px_50px_rgba(37,99,235,0.3)]">
            <Fingerprint size={48} />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest italic">
              <Lock size={12} /> AES-256 Encrypted Page
            </div>
            <h1 className="text-5xl md:text-7xl font-black dark:text-white tracking-tighter uppercase italic leading-none">
              Privacy <span className="text-blue-600">Protocol</span>
            </h1>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-widest italic">Effective Date: March 2026</p>
          </div>
        </div>
      </ScrollReveal>

      {/* 🏛️ MAIN DATA NODES */}
      <div className="grid grid-cols-1 gap-8">
        
        {/* Section 1: User Sovereignty */}
        <ScrollReveal direction="right">
          <div className="group bg-white dark:bg-[#0c0c0c] p-8 md:p-12 rounded-[3.5rem] border border-slate-100 dark:border-white/5 shadow-xl transition-all hover:border-blue-600/30">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="p-5 bg-blue-50 dark:bg-white/5 text-blue-600 rounded-3xl group-hover:scale-110 transition-transform">
                <EyeOff size={32} />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black dark:text-white uppercase italic tracking-tight">01. Data Sovereignty</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">
                  Azeem Gadgets operates under a zero-exploitation policy. Your browsing telemetry, purchase history, and personal identity nodes are never sold to third-party marketing syndicates. We believe in absolute digital anonymity.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <span className="px-4 py-2 bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase rounded-lg border border-emerald-500/20">No Ad Tracking</span>
                  <span className="px-4 py-2 bg-blue-500/10 text-blue-500 text-[9px] font-black uppercase rounded-lg border border-blue-500/20">Encrypted Profile</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Section 2: Financial Integrity */}
        <ScrollReveal direction="left" delay={200}>
          <div className="group bg-slate-900 dark:bg-slate-950 p-8 md:p-12 rounded-[3.5rem] border border-white/5 shadow-2xl text-white">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="p-5 bg-blue-600 text-white rounded-3xl group-hover:rotate-12 transition-transform">
                <Database size={32} />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black uppercase italic tracking-tight">02. Financial Secrecy</h3>
                <p className="text-slate-400 font-medium leading-relaxed italic">
                  All transaction vectors are secured via 256-bit SSL protocols. We utilize external secure gateways for payments; Azeem Vault does not store raw credit card credentials or sensitive financial tokens on local hardware.
                </p>
                <div className="flex items-center gap-3 text-[10px] font-black text-blue-400 uppercase tracking-widest border-t border-white/10 pt-4">
                  <ShieldCheck size={16} /> Certified PCI-DSS Compliant Infrastructure
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Section 3: Logistics & Transmission */}
        <ScrollReveal direction="right" delay={400}>
          <div className="group bg-white dark:bg-[#0c0c0c] p-8 md:p-12 rounded-[3.5rem] border border-slate-100 dark:border-white/5 shadow-xl transition-all hover:border-emerald-600/30">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="p-5 bg-emerald-50 dark:bg-white/5 text-emerald-500 rounded-3xl group-hover:scale-110 transition-transform">
                <Globe size={32} />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black dark:text-white uppercase italic tracking-tight">03. Logistics Transmission</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">
                  Address nodes and contact telemetry are exclusively used for unit deployment (delivery). Once extraction is confirmed and the warranty cycle expires, sensitive logistics data is archived into restricted access nodes.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>

      {/* 📜 DISCLOSURE CARD */}
      <ScrollReveal direction="up" delay={600}>
        <div className="bg-slate-50 dark:bg-white/[0.02] p-10 md:p-16 rounded-[4rem] border-2 border-dashed border-slate-200 dark:border-white/5 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-blue-600 rounded-full"></div>
          <div className="inline-flex p-5 bg-white dark:bg-black rounded-3xl shadow-xl">
             <ServerLock size={32} className="text-blue-600" />
          </div>
          <div className="space-y-4">
            <h4 className="text-3xl font-black dark:text-white uppercase italic tracking-tighter leading-none">Transparency Commitment</h4>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-bold italic leading-relaxed text-sm">
              "Technology should serve humanity, not monitor it." Our privacy engine is updated bi-annually to counter modern data-scraping threats. We remain committed to your digital safety.
            </p>
          </div>
          <button className="flex items-center gap-3 mx-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:scale-105 active:scale-95 transition-all">
             <RefreshCw size={14} /> Request Data Wipe
          </button>
        </div>
      </ScrollReveal>

    </div>
  );
};

export default Privacy;