import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, CheckCircle2, ShieldCheck, Zap, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google'; // Pure OAuth 2.0
import { FcGoogle } from 'react-icons/fc'; 
import { useAuth } from '../../context/AuthContext';
import ScrollReveal from '../../components/common/ScrollReveal';

const Signup = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // 🌐 1. GOOGLE QUICK ESTABLISH (Direct Signup via OAuth 2.0)
  const googleSignup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setError("");
      try {
        // Google se User Info mangwana
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const userInfo = await res.json();

        if (!res.ok) throw new Error("Identity verification failed");

        console.log("✅ Google ID Established:", userInfo.email);

        // User Profile Object
        const newUserProfile = {
          name: userInfo.name,
          email: userInfo.email,
          image: userInfo.picture,
          role: 'USER', // Default role
          token: tokenResponse.access_token
        };

        // Global State Update
        loginUser(newUserProfile);
        
        // Success Redirect
        navigate('/');
      } catch (err) {
        setError("Satellite Link Error: Could not establish Google ID.");
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setError("Google Registration Interrupted.");
      setLoading(false);
    }
  });

  // 🛡️ 2. MANUAL REGISTRATION LOGIC
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Security Alert: Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // Yahan aapka backend call aayega
      const response = await fetch('http://localhost:5000/api/auth/register-master', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          userId: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (data.success) {
        navigate('/login', { state: { signupSuccess: true } });
      } else {
        setError(data.message || "Firewall Block: Transmission Interrupted.");
      }
    } catch (err) {
      setError("Critical Fail: Connection to Central Vault Lost.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-20 transition-colors duration-500 bg-slate-50 dark:bg-[#0a0a0a]">
      
      <div className="w-full max-w-xl relative">
        {/* Dynamic Glow Orbs */}
        <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-blue-600/5 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] bg-purple-600/5 blur-[120px] rounded-full -z-10"></div>

        <ScrollReveal direction="up">
          <div className="bg-white dark:bg-[#111] p-8 md:p-14 rounded-[3.5rem] shadow-xl dark:shadow-[0_0_80px_rgba(0,0,0,0.4)] border border-slate-100 dark:border-white/5 relative overflow-hidden">
            
            <div className="mb-10 space-y-3">
              <div className="flex items-center gap-3 text-blue-600 dark:text-blue-500">
                 <ShieldCheck size={32} />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em]">Establish Identity</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">
                Create <span className="text-blue-600 italic">ID</span>
              </h2>
              <p className="text-slate-400 dark:text-slate-500 font-bold uppercase text-[9px] tracking-[0.2em]">Join the digital warehouse ecosystem.</p>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-xs font-black uppercase animate-shake">
                <AlertCircle size={18} /> {error}
              </div>
            )}

            {/* 🌐 Google Signup Button */}
            <button 
              type="button"
              onClick={() => {
                setLoading(true);
                googleSignup();
              }}
              disabled={loading}
              className="w-full py-5 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center gap-4 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-white/[0.06] transition-all active:scale-[0.98] shadow-sm mb-10"
            >
              <FcGoogle size={24} />
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-700 dark:text-white">SignUp with Google account</span>
            </button>

            <div className="relative flex items-center gap-4 mb-10">
              <div className="flex-1 h-[1px] bg-slate-100 dark:bg-white/5"></div>
              <span className="text-[9px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest">Manual Protocol</span>
              <div className="flex-1 h-[1px] bg-slate-100 dark:bg-white/5"></div>
            </div>

            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Full Identity Name</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <input 
                    required type="text"
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-2xl outline-none focus:border-blue-600 dark:focus:border-blue-500 font-bold text-slate-900 dark:text-white transition-all shadow-inner text-sm"
                    placeholder="Master Name"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Verified Email Node</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <input 
                    required type="email"
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-2xl outline-none focus:border-blue-600 dark:focus:border-blue-500 font-bold text-slate-900 dark:text-white transition-all shadow-inner text-sm"
                    placeholder="email@vault.com"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Security Key</label>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input 
                      required type={showPass ? "text" : "password"}
                      className="w-full pl-14 pr-12 py-5 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-2xl outline-none focus:border-blue-600 dark:focus:border-blue-500 font-bold text-slate-900 dark:text-white transition-all shadow-inner text-sm"
                      placeholder="••••••••"
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600">
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Confirm Key</label>
                  <div className="relative group">
                    <CheckCircle2 className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input 
                      required type={showPass ? "text" : "password"}
                      className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-2xl outline-none focus:border-blue-600 dark:focus:border-blue-500 font-bold text-slate-900 dark:text-white transition-all shadow-inner text-sm"
                      placeholder="••••••••"
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <button 
                disabled={loading}
                className={`w-full py-6 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl transition-all flex items-center justify-center gap-4 ${
                  loading ? 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed text-slate-500' : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] shadow-blue-600/20'
                }`}
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <> Establish Account <CheckCircle2 size={20} /> </>}
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
               <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center md:text-left">
                 Already a Member? <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">Initiate Access</Link>
               </p>
               <Link to="/" className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Zap size={14} /> Bypass Warehouse
               </Link>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Signup;