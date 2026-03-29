import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, XCircle, Info, X, Zap } from 'lucide-react';

const Toast = ({ message, show, onClose, type = "success" }) => {
  
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // 4 seconds duration for readability
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  // 🎨 Real-time Theme Mapping
  const themes = {
    success: {
      bg: "bg-emerald-500",
      icon: <CheckCircle2 size={20} />,
      label: "System Confirmed",
      shadow: "shadow-emerald-500/20"
    },
    error: {
      bg: "bg-red-500",
      icon: <XCircle size={20} />,
      label: "Critical Alert",
      shadow: "shadow-red-500/20"
    },
    warning: {
      bg: "bg-amber-500",
      icon: <AlertCircle size={20} />,
      label: "Vault Warning",
      shadow: "shadow-amber-500/20"
    },
    info: {
      bg: "bg-blue-600",
      icon: <Zap size={20} />,
      label: "Core Intel",
      shadow: "shadow-blue-500/20"
    }
  };

  const active = themes[type] || themes.success;

  return (
    <div className={`fixed bottom-6 md:bottom-10 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-fit md:min-w-[400px] z-[999] animate-smooth-in`}>
      
      {/* 📦 Master Toast Card */}
      <div className={`relative overflow-hidden bg-slate-900 text-white p-5 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/5 flex items-center gap-5 ${active.shadow}`}>
        
        {/* Animated Progress Bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-white/20 w-full">
          <div 
            className={`h-full ${active.bg} transition-all duration-[4000ms] ease-linear w-0`}
            style={{ width: show ? '100%' : '0%' }}
          ></div>
        </div>

        {/* Icon Node */}
        <div className={`w-12 h-12 ${active.bg} rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0`}>
          {active.icon}
        </div>

        {/* Message Content */}
        <div className="flex-grow pr-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mb-0.5">
            {active.label}
          </p>
          <p className="text-sm font-bold tracking-tight leading-tight">
            {message}
          </p>
        </div>

        {/* Manual Close */}
        <button 
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-xl transition-colors opacity-50 hover:opacity-100"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default Toast;