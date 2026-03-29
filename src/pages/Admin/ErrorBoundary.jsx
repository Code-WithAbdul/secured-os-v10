import React from 'react';
import { ShieldAlert, RefreshCcw, Home, Terminal } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // 🛡️ Error tracking states
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 🛰️ Log the breach to Azeem's Private Terminal
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("🚨 VAULT BREACH DETECTED:", error, errorInfo);
  }

  // 🔥 MASTER RESET: Allows the user to try again without full reload
  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-center font-sans">
          <div className="max-w-2xl space-y-10 animate-in zoom-in duration-500 relative">
            
            {/* 🔴 Visual Alarm System */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-red-600 blur-[100px] opacity-30 animate-pulse"></div>
              <div className="relative z-10 p-8 bg-red-600/10 border border-red-500/20 rounded-[3rem] shadow-2xl">
                 <ShieldAlert size={80} className="text-red-500 mx-auto" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
                System <span className="text-red-600">Instability</span>
              </h1>
              <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.5em] leading-relaxed italic">
                Critical error detected in the Vault's Core Logic. <br /> 
                Security protocol has isolated this sector to prevent data leakage.
              </p>
            </div>

            {/* 📜 Diagnostic Terminal (Only visible to Boss) */}
            <div className="p-6 bg-black/40 border border-white/5 rounded-3xl text-left overflow-hidden group">
               <div className="flex items-center gap-2 mb-3">
                  <Terminal size={14} className="text-red-500" />
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Diagnostic Logs</span>
               </div>
               <p className="text-red-400/80 font-mono text-[10px] break-words uppercase">
                  {this.state.error && this.state.error.toString()}
               </p>
            </div>

            {/* 🎮 Command Controls */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button 
                onClick={this.handleReset}
                className="w-full md:w-auto px-10 py-5 bg-white text-black rounded-[2rem] font-black uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-red-600 hover:text-white transition-all shadow-2xl active:scale-95"
              >
                <RefreshCcw size={18} /> Retry Protocol
              </button>
              
              <button 
                onClick={() => window.location.href = '/'}
                className="w-full md:w-auto px-10 py-5 bg-slate-900 text-slate-400 border border-white/5 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 hover:text-white transition-all hover:bg-slate-800"
              >
                <Home size={18} /> Return to Vault
              </button>
            </div>
            
            <p className="text-[8px] font-black text-slate-800 uppercase tracking-[0.6em] pt-12 italic">
              Azeem OS Diagnostic v5.1.0 - CORE_ID: 0x80042-AZ
            </p>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;