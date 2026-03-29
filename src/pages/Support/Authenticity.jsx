import React from 'react';
import ScrollReveal from '../../components/common/ScrollReveal';
import { 
    ShieldCheck, Cpu, Award, Search, 
    AlertTriangle, Fingerprint, Box, Zap, Lock, 
    Check, X, ShieldAlert, BadgeCheck, Smartphone, 
    Database, Verified
} from 'lucide-react';

const Authenticity = () => {
  const pillars = [
    {
      icon: <Fingerprint size={28} />,
      title: "Unique ID Sync",
      desc: "Every gadget's IMEI and Serial Number is recorded in our cloud database upon arrival. You can verify it any time in your dashboard."
    },
    {
      icon: <Box size={28} />,
      title: "Zero-Tamper Seal",
      desc: "We utilize advanced 3M tamper-evident seals on our high-end inventory. If the seal is broken, the unit is immediately flagged."
    },
    {
      icon: <Cpu size={28} />,
      title: "Direct Sourcing",
      desc: "We bypass middlemen. All units come directly from regional authorized distributors of Apple, Samsung, and ASUS."
    },
    {
      icon: <Lock size={28} />,
      title: "Software Integrity",
      desc: "Pre-installed software is verified to be untouched. We guarantee no bloatware, malware, or third-party modifications."
    }
  ];

  const comparison = [
    { f: "Hardware Components", m: "Grade B / Used", a: "Grade A+ Brand New", icon: <Cpu size={14}/> },
    { f: "Global Warranty", m: "Blocked/Invalid", a: "100% Traceable", icon: <ShieldCheck size={14}/> },
    { f: "Box Accessories", m: "High-Quality Copy", a: "Original Factory-In-Box", icon: <Box size={14}/> },
    { f: "Resale Value", m: "Depreciates Fast", a: "Premium Retention", icon: <Zap size={14}/> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 space-y-24 animate-smooth-in overflow-x-hidden font-sans">
      
      {/* 🚀 Hero Header: The Authority Entrance */}
      <ScrollReveal direction="down">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-full border border-blue-100 dark:border-white/5">
            <BadgeCheck size={16} /> <span className="text-[10px] font-black uppercase tracking-[0.3em]">Azeem's Gold Standard Framework</span>
          </div>
          <h1 className="text-5xl md:text-9xl font-black dark:text-white tracking-tighter uppercase italic leading-[0.85]">
            100% <span className="text-blue-600 text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-blue-700">GENUINE</span>
          </h1>
          <p className="text-slate-400 dark:text-slate-500 font-bold text-xs md:text-sm uppercase tracking-[0.4em] max-w-2xl mx-auto leading-relaxed italic">
            "In an era of clones and refurbishments, we provide absolute digital purity. Every unit is a masterpiece of original engineering."
          </p>
        </div>
      </ScrollReveal>

      {/* 🛡️ Pillar Section: Grid Reveal */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {pillars.map((item, i) => (
          <ScrollReveal key={i} delay={i * 150} direction="up">
            <div className="group p-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[3rem] hover:border-blue-600 transition-all duration-700 shadow-2xl hover:-translate-y-3 relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 text-slate-100 dark:text-white/5 group-hover:text-blue-600/10 transition-colors">
                {React.cloneElement(item.icon, { size: 120 })}
              </div>
              <div className="w-16 h-16 bg-blue-600 text-white rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform shadow-xl shadow-blue-500/30 relative z-10">
                {item.icon}
              </div>
              <h3 className="font-black dark:text-white uppercase text-lg tracking-tighter mb-4 relative z-10 italic">{item.title}</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold leading-relaxed relative z-10 uppercase tracking-wider">{item.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* 📊 Comparison Matrix: The Logic Table */}
      <div className="space-y-12">
        <ScrollReveal>
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-6xl font-black dark:text-white uppercase tracking-tighter italic leading-none">THE <span className="text-blue-600">DIFFERENCE</span></h2>
            <div className="flex items-center justify-center gap-3">
               <div className="h-[1px] w-12 bg-blue-600/30"></div>
               <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em] italic">Vault Audit Comparison Report</p>
               <div className="h-[1px] w-12 bg-blue-600/30"></div>
            </div>
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={200}>
          <div className="overflow-x-auto rounded-[3.5rem] border border-slate-100 dark:border-white/5 shadow-2xl">
            <table className="w-full text-left bg-white dark:bg-slate-950 border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-white/5">
                  <th className="p-10 text-xs font-black uppercase tracking-widest text-slate-400">Parameter</th>
                  <th className="p-10 text-xs font-black uppercase tracking-widest text-red-500 italic">Market Average</th>
                  <th className="p-10 text-xs font-black uppercase tracking-widest text-blue-600 italic">Azeem's Selection</th>
                </tr>
              </thead>
              <tbody className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">
                {comparison.map((row, i) => (
                  <tr key={i} className="border-b border-slate-50 dark:border-white/5 hover:bg-blue-50/10 dark:hover:bg-blue-600/5 transition-colors">
                    <td className="p-10 flex items-center gap-5">
                      <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-xl text-blue-600">{row.icon}</div>
                      {row.f}
                    </td>
                    <td className="p-10 text-red-500/60 font-medium italic"><span className="flex items-center gap-2"><X size={14}/> {row.m}</span></td>
                    <td className="p-10 text-blue-600 font-black italic"><span className="flex items-center gap-2"><Check size={16} strokeWidth={4}/> {row.a}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>

      {/* 📜 Verification Protocol Section */}
      <div className="grid md:grid-cols-2 gap-16 items-center bg-slate-50/50 dark:bg-white/[0.02] p-10 md:p-20 rounded-[4rem] border border-slate-100 dark:border-white/5">
        <ScrollReveal direction="left">
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-7xl font-black dark:text-white tracking-tighter uppercase leading-[0.85] italic">Verification <br /> <span className="text-blue-600">Protocol</span></h2>
              <p className="text-slate-500 dark:text-slate-400 font-bold leading-relaxed max-w-md italic text-sm">
                "Don't take our word for it. Every unit we sell comes with a physical and digital Authenticity Passport for global tracking."
              </p>
            </div>
            <div className="space-y-6">
              {[
                { s: "Scan the QR code on your Azeem Box", i: <Search size={18}/> },
                { s: "Cross-check IMEI on OEM Global DB", i: <Smartphone size={18}/> },
                { s: "Validate Azeem Care+ Certificate", i: <Verified size={18}/> }
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 text-blue-600 flex items-center justify-center shadow-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {step.i}
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest dark:text-white opacity-60 group-hover:opacity-100 transition-opacity italic">{step.s}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={300}>
          <div className="bg-blue-600 rounded-[3.5rem] p-12 md:p-16 text-white space-y-8 relative overflow-hidden shadow-2xl shadow-blue-600/30">
            <Zap className="absolute -bottom-10 -right-10 text-white/10 w-72 h-72 rotate-12" />
            <Award size={64} className="mb-4 text-cyan-300 animate-pulse" />
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] italic">Tier-1 <br /> Partner Status</h3>
            <p className="text-blue-100 text-sm md:text-lg font-bold leading-relaxed italic opacity-90">
              "Azeem's Gadgets is a verified distribution node for premium technology. We adhere to MIL-SPEC standards for inventory handling and satellite tracking logistics."
            </p>
            <div className="pt-8 border-t border-white/20 flex items-center gap-4">
               <Database size={20} className="text-cyan-300" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em]">Node Verified: March 2026</span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ⚠️ THE UNBREAKABLE PROMISE (Bounty Footer) */}
      <ScrollReveal direction="up">
        <div className="bg-amber-500/5 dark:bg-amber-500/10 border-4 border-dashed border-amber-500/30 p-10 md:p-24 rounded-[5rem] flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
            <ShieldAlert size={300} className="text-amber-600" />
          </div>
          <div className="p-12 bg-amber-500 rounded-[3rem] text-white shadow-2xl shadow-amber-500/40 relative z-10 animate-pulse shrink-0">
            <AlertTriangle size={80} />
          </div>
          <div className="space-y-8 text-center lg:text-left relative z-10">
            <h4 className="text-4xl md:text-7xl font-black uppercase dark:text-white tracking-tighter leading-none italic">Our Anti-Counterfeit <br /> <span className="text-amber-500">BOUNTY</span></h4>
            <p className="text-base md:text-2xl text-slate-500 dark:text-slate-400 font-bold leading-relaxed max-w-5xl italic">
              "If any gadget sold by us is proven to be a clone or refurbished (without disclosure), we will not only refund your full amount but also pay you <span className="text-amber-500 font-black underline decoration-4 underline-offset-8">2X THE PRICE</span> of the product as a penalty."
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-4">
               <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
               <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.6em] italic">This is an Unbreakable Legal Guarantee from Azeem Jan.</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

    </div>
  );
};

export default Authenticity;