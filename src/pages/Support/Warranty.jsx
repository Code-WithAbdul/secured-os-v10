import React, { useState } from 'react';
import ScrollReveal from '../../components/common/ScrollReveal';
import { 
  ShieldCheck, Zap, FileText, Search, 
  CheckCircle2, AlertCircle, Clock, 
  Award, Cpu, Smartphone, ShieldAlert,
  History, Download, ExternalLink
} from 'lucide-react';

const Warranty = ({ isDashboard = false }) => {
  const [searchSerial, setSearchSerial] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const steps = [
    { id: '01', title: 'Verify Status', desc: 'Enter serial number to check coverage.', icon: <Search size={20}/> },
    { id: '02', title: 'File Claim', desc: 'Upload photos of the technical issue.', icon: <FileText size={20}/> },
    { id: '03', title: 'Unit Audit', desc: 'Remote diagnosis by our tech team.', icon: <Zap size={20}/> },
    { id: '04', title: 'Resolution', desc: 'Repair or swap within 7 business days.', icon: <CheckCircle2 size={20}/> },
  ];

  const handleVerify = () => {
    if(!searchSerial) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setShowResult(true);
    }, 1500);
  };

  return (
    <div className={`mx-auto pb-20 space-y-16 animate-smooth-in ${isDashboard ? 'pt-0' : 'max-w-7xl px-4 md:px-8 pt-10'}`}>
      
      {/* 🚀 Hero Section: Cinematic Entrance */}
      {!isDashboard && (
        <ScrollReveal direction="down">
          <section className="relative overflow-hidden rounded-[3.5rem] bg-slate-900 dark:bg-blue-600 px-8 py-20 text-center text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[120px] -mr-20 -mt-20 animate-pulse"></div>
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-black uppercase tracking-[0.4em]">
                <Award size={16} className="text-cyan-400" /> Premium Protection Plan 2026
              </div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-tight uppercase italic">
                Azeem's <span className="text-cyan-400">Care+</span>
              </h1>
              <p className="text-blue-100 max-w-2xl mx-auto text-lg font-medium italic opacity-90">
                "We don't just sell gadgets; we protect your digital investments with iron-clad security."
              </p>
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* 🔍 LIVE VERIFIER HUB */}
      <div className={`${!isDashboard ? '-mt-24 max-w-4xl mx-auto relative z-30 px-4' : ''}`}>
        <ScrollReveal delay={200}>
          <div className="bg-white dark:bg-slate-950 p-8 md:p-12 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 space-y-8 shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="space-y-1">
                <h3 className="text-2xl font-black dark:text-white uppercase tracking-tighter italic">Instant <span className="text-blue-600">Verifier</span></h3>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Cross-check your unit's protection status</p>
              </div>
              {showResult && (
                <button onClick={() => setShowResult(false)} className="text-[10px] font-black text-blue-600 uppercase border-b border-blue-600 pb-1">Reset Search</button>
              )}
            </div>

            {!showResult ? (
              <div className="relative group">
                <Search className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${isVerifying ? 'text-blue-600 animate-pulse' : 'text-slate-400'}`} size={22} />
                <input 
                  type="text" 
                  placeholder="Enter Serial: AZ-TECH-2026-XXXX"
                  className="w-full pl-16 pr-40 py-6 bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-blue-600 rounded-3xl outline-none transition-all font-black dark:text-white text-sm"
                  value={searchSerial}
                  onChange={(e) => setSearchSerial(e.target.value)}
                />
                <button 
                  onClick={handleVerify}
                  disabled={isVerifying}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isVerifying ? 'Processing...' : 'Verify Unit'}
                </button>
              </div>
            ) : (
              <div className="p-8 bg-blue-50 dark:bg-blue-900/20 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 animate-in zoom-in-95 duration-500">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                    <ShieldCheck size={40} />
                  </div>
                  <div className="flex-grow text-center md:text-left space-y-2">
                    <h4 className="text-xl font-black dark:text-white uppercase tracking-tighter">Protection Active</h4>
                    <p className="text-xs font-bold text-slate-500">Unit ID: <span className="text-blue-600">{searchSerial.toUpperCase()}</span></p>
                    <div className="flex gap-4 pt-2 justify-center md:justify-start">
                      <span className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full text-[9px] font-black text-blue-600 uppercase border border-blue-100 dark:border-slate-700">Valid till Mar 2027</span>
                      <span className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full text-[9px] font-black text-emerald-600 uppercase border border-blue-100 dark:border-slate-700 italic">Full Hardware Cover</span>
                    </div>
                  </div>
                  <button className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg text-slate-400 hover:text-blue-600 transition-all">
                    <Download size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>

      {/* 📊 COVERAGE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'Technical Failure', time: '1 Year', icon: <Cpu />, desc: 'Covers all internal motherboard and chipset malfunctions.' },
          { title: 'Display Integrity', time: '6 Months', icon: <Smartphone />, desc: 'Protection against dead pixels and touch responsiveness issues.' },
          { title: 'Power System', time: '2 Years', icon: <Zap />, desc: 'Ensures battery health stays above 85% for the first 24 months.' },
        ].map((item, idx) => (
          <ScrollReveal key={idx} delay={idx * 150} direction="up">
            <div className="bg-white dark:bg-slate-950 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 hover:border-blue-500 transition-all group shadow-xl">
              <div className="w-16 h-16 rounded-[1.5rem] bg-blue-600 text-white flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform shadow-2xl shadow-blue-500/30">
                {React.cloneElement(item.icon, { size: 28 })}
              </div>
              <h4 className="text-2xl font-black dark:text-white uppercase tracking-tighter italic mb-2">{item.title}</h4>
              <span className="inline-block mb-6 text-[10px] font-black text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">{item.time} Global Coverage</span>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* 📜 THE CLAIM PROTOCOL */}
      <div className="space-y-12">
        <ScrollReveal>
          <div className="text-center space-y-3">
            <h2 className="text-4xl md:text-6xl font-black dark:text-white tracking-tighter uppercase italic leading-none">The Claim <span className="text-blue-600">Protocol</span></h2>
            <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em]">Optimized for 2026 Logistics Standards</p>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <ScrollReveal key={step.id} delay={i * 100} direction="up">
              <div className="relative p-10 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group transition-all hover:bg-white dark:hover:bg-slate-800 overflow-hidden">
                <span className="absolute -top-4 -left-2 text-8xl font-black text-slate-100 dark:text-slate-800/30 group-hover:text-blue-600/10 transition-colors pointer-events-none">{step.id}</span>
                <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl text-blue-600 mb-8 mt-4 relative z-10 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h5 className="font-black dark:text-white uppercase text-sm tracking-widest mb-3 italic">{step.title}</h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold leading-relaxed">{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* ⚠️ EXCLUSIONS POLICY */}
      <ScrollReveal direction="up">
        <div className="bg-amber-500/10 border-2 border-dashed border-amber-500/30 p-10 md:p-14 rounded-[4rem] flex flex-col md:flex-row items-center gap-10">
          <div className="p-6 bg-amber-500 rounded-[2rem] text-white shadow-2xl shadow-amber-500/40 animate-pulse">
            <ShieldAlert size={40} />
          </div>
          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-2xl font-black uppercase dark:text-white tracking-tighter flex items-center justify-center md:justify-start gap-3">
              Technical Exclusions <span className="text-amber-500 text-xs italic font-black">Please Read</span>
            </h4>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-4xl">
              Standard Azeem Care+ does not cover physical accidental damage (drops), liquid ingress (water damage), or any attempt at unauthorized disassembly. Every unit has a hidden internal seal; if broken, the protection plan is automatically terminated. 
              <span className="block mt-2 text-amber-600 font-black uppercase tracking-widest text-[9px]">Check full policy at azeemgadgets.com/legal</span>
            </p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default Warranty;