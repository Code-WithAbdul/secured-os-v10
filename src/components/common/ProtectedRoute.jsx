import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2, Zap, ShieldAlert } from 'lucide-react';

/**
 * 🛡️ ProtectedRoute: Professional Grade Security Node
 */
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAdmin, isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(true);

  // 🛰️ Simulation of Security Handshake (Prevents sudden jumps)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVerifying(false);
    }, 800); 
    return () => clearTimeout(timer);
  }, []);

  // 1. 🔍 LOADING/VERIFYING STATE
  // Agar AuthContext load ho raha hai ya internal timer chal raha hai
  if (loading || isVerifying) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-[#050505] flex flex-col items-center justify-center z-[1000]">
        <div className="relative">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
          <Zap className="absolute inset-0 m-auto w-6 h-6 text-blue-400 animate-pulse" />
        </div>
        <p className="mt-6 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 animate-pulse">
          Authenticating Vault Access...
        </p>
      </div>
    );
  }

  // 2. 🔐 AUTHENTICATION CHECK (Login hai ya nahi?)
  if (!isAuthenticated) {
    console.warn("🔐 Access Denied: User not authenticated.");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. 🛡️ AUTHORIZATION CHECK (Admin Requirement)
  // Agar Admin page hai aur user Admin nahi hai -> Home bhej do
  if (requireAdmin && !isAdmin) {
    console.error("🔐 Security Breach: Unauthorized Admin Access Attempted.");
    // Alert dikhane ke liye aap Toast use kar sakte hain
    return <Navigate to="/" replace />;
  }

  // 4. ✅ ACCESS GRANTED
  return (
    <div className="animate-in fade-in duration-1000">
      {children}
    </div>
  );
};

export default ProtectedRoute;