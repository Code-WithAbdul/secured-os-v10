import React from 'react';
import ScrollReveal from '../../components/common/ScrollReveal';
import { 
  Truck, Clock, Globe, ShieldCheck, MapPin, 
  AlertCircle, PackageCheck, Zap, Box, 
  Navigation, Plane, Anchor, ShieldAlert
} from 'lucide-react';

const ShippingPolicy = () => {
  const deliveryZones = [
    { city: "Karachi (Domestic Hub)", time: "24 - 48 Hours", method: "Azeem Hyper-Local" },
    { city: "Lahore / Islamabad", time: "2 - 3 Business Days", method: "Air Cargo Priority" },
    { city: "Faisalabad / Multan / Sialkot", time: "3 - 4 Business Days", method: "BlueEx / TCS Elite" },
    { city: "Quetta / Peshawar / Remote", time: "5 - 7 Business Days", method: "Standard Surface" },
  ];

  const protocols = [
    {
      icon: <Box size={32} />,
      title: "Anti-Static Armor",
      desc: "Every motherboard-based gadget is wrapped in ESD (Electrostatic Discharge) shielding to prevent circuit damage."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Full Transit Cover",
      desc: "Azeem's Gadgets assumes 100% liability. If a unit is damaged during transit, we provide a 1-to-1 swap."
    },
    {
      icon: <Clock size={32} />,
      title: "Real-Time Scan",
      desc: "From the moment your unit leaves the Karachi Hub, it is scanned at 5 major checkpoints for safety."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 space-y-24 animate-smooth-in overflow-x-hidden">
      
      {/* 🚀 Hero Header: Cinematic Logistics Entrance */}
      <ScrollReveal direction="down">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-full border border-blue-100 dark:border-slate-800 shadow-sm">
            <Globe size={16} className="animate-spin-slow" /> 
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Precision Logistics Framework 2026</span>
          </div>
          <h1 className="text-5xl md:text-9xl font-black dark:text-white tracking-tighter uppercase italic leading-[0.85]">
            SHIPPING <br /> <span className="text-blue-600">PROTOCOL</span>
          </h1>
          <p className="text-slate-400 font-bold text-xs md:text-sm uppercase tracking-[0.4em] max-w-2xl mx-auto leading-relaxed italic">
            Ensuring zero-latency delivery from our high-tech vaults to your coordinates.
          </p>
        </div>
      </ScrollReveal>

      {/* 🛡️ Protocol Grid: Staggered Appearance */}
      <div className="grid md:grid-cols-3 gap-8">
        {protocols.map((item, i) => (
          <ScrollReveal key={i} delay={i * 150} direction="up">
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-xl space-y-6 group hover:border-blue-600 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                {item.icon}
              </div>
              <h3 className="font-black dark:text-white uppercase text-xl tracking-tighter italic">{item.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* 🗺️ Delivery Timeline: Regional Roadmap */}
      <div className="space-y-12">
        <ScrollReveal>
          <div className="flex items-center gap-6">
            <h2 className="text-3xl md:text-5xl font-black dark:text-white uppercase tracking-tighter italic whitespace-nowrap">Regional <span className="text-blue-600">Map</span></h2>
            <div className="h-px flex-grow bg-gradient-to-r from-blue-600 to-transparent"></div>
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={200}>
          <div className="overflow-x-auto rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]">
            <table className="w-full text-left bg-white dark:bg-slate-950">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50">
                  <th className="p-8 text-xs font-black uppercase tracking-widest text-blue-600">Distribution Node</th>
                  <th className="p-8 text-xs font-black uppercase tracking-widest dark:text-white">ETA Workflow</th>
                  <th className="p-8 text-xs font-black uppercase tracking-widest dark:text-white text-right">Carrier Class</th>
                </tr>
              </thead>
              <tbody className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">
                {deliveryZones.map((zone, i) => (
                  <tr key={i} className="border-b border-slate-50 dark:border-slate-900 hover:bg-blue-50/10 transition-colors">
                    <td className="p-8 flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                      {zone.city}
                    </td>
                    <td className="p-8 font-black text-slate-900 dark:text-slate-200">{zone.time}</td>
                    <td className="p-8 text-right italic text-blue-600 font-black">{zone.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>

      {/* ⚡ Live Tracker Visual Simulation */}
      <ScrollReveal direction="up">
        <div className="bg-slate-900 dark:bg-blue-600 rounded-[4rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <Navigation className="absolute -top-10 -right-10 text-white/5 w-80 h-80 -rotate-12" />
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] italic">Direct <br /> Tracking <br /> <span className="text-cyan-400">Access</span></h2>
              <p className="text-blue-100 font-medium leading-relaxed max-w-md text-sm md:text-base">
                Your gadget is monitored via encrypted satellite GPS. Once the unit leaves our technical bay, you can track its precise location through your Dashboard.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-2xl border border-white/20 text-[9px] font-black uppercase tracking-widest shadow-inner"><Plane size={14}/> Air-Prioritized</div>
                <div className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-2xl border border-white/20 text-[9px] font-black uppercase tracking-widest shadow-inner"><Anchor size={14}/> Secure Transit</div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[3.5rem] space-y-8 shadow-2xl">
               <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <div className="flex items-center gap-4">
                    <PackageCheck size={32} className="text-cyan-400" />
                    <div>
                      <p className="font-black uppercase tracking-widest text-[10px]">Active Shipment</p>
                      <p className="text-[8px] font-bold text-cyan-300 uppercase tracking-[0.2em]">Live from Karachi Hub</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-xs">AG-ID-2026</p>
                  </div>
               </div>
               <div className="space-y-6">
                  {[
                    { l: 'Verification Complete', s: 'done' },
                    { l: 'Custom Protective Seal Applied', s: 'done' },
                    { l: 'Assigned to Tech-Courier', s: 'active' },
                    { l: 'Final Destination Handover', s: 'pending' },
                  ].map((step, i) => (
                    <div key={i} className={`flex items-center gap-4 ${step.s === 'pending' ? 'opacity-30' : 'opacity-100'}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${step.s === 'done' ? 'bg-cyan-400 border-cyan-400' : 'border-white/30'}`}>
                        {step.s === 'done' && <CheckCircle size={10} className="text-slate-900" />}
                        {step.s === 'active' && <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>}
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${step.s === 'active' ? 'text-cyan-400' : ''}`}>{step.l}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ⚠️ Critical Restrictions Disclaimer */}
      <ScrollReveal>
        <div className="bg-slate-100 dark:bg-slate-900/50 p-10 md:p-16 rounded-[4rem] flex flex-col md:flex-row items-center gap-10 border-l-[12px] border-blue-600 shadow-inner">
          <div className="p-6 bg-blue-600 rounded-[2rem] text-white shadow-2xl rotate-3">
            <ShieldAlert size={40} />
          </div>
          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-2xl font-black uppercase dark:text-white tracking-tighter italic">Operational Constraints</h4>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-4xl">
              Verification calls are mandatory for orders exceeding Rs. 50,000. For **Cash on Delivery (COD)**, please ensure the recipient is available at the provided coordinates. If a unit is rejected at the doorstep without technical cause, the user's account will be flagged in our global inventory system. 
              <span className="block mt-4 text-blue-600 font-black uppercase tracking-[0.2em] text-[10px]">Transparency is our core currency.</span>
            </p>
          </div>
        </div>
      </ScrollReveal>

    </div>
  );
};

// Internal SVG Helper for clean code
const CheckCircle = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

export default ShippingPolicy;