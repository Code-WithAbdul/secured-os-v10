import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google'; 
import { 
    ShieldCheck, Loader2, AlertCircle, Zap, Mail, Lock, 
    ArrowRight, UserPlus, Eye, EyeOff, Fingerprint 
} from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../../context/AuthContext';
import ScrollReveal from '../../components/common/ScrollReveal';

const Login = () => {
    const [formData, setFormData] = useState({ accessId: "", password: "" });
    const [showPassword, setShowPassword] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    // 🛡️ MASTER ADMIN CONFIG
    const ADMIN_EMAIL = "mehmoodalias12@gmail.com";

    // 🌐 1. GOOGLE LOGIN LOGIC
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setLoading(true);
            setError("");
            try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                const userInfo = await res.json();

                if (!res.ok) throw new Error("Google sync failed");

                const isAdmin = userInfo.email === ADMIN_EMAIL || userInfo.email === 'wesxmy@gmail.com';
                
                const userData = {
                    name: userInfo.name,
                    email: userInfo.email,
                    userId: userInfo.email,
                    image: userInfo.picture,
                    role: isAdmin ? 'admin' : 'customer',
                    token: tokenResponse.access_token
                };

                login(userData);
                
                // 🔥 FIXED: Correct Route Path (Not file path)
                if (isAdmin) {
                    navigate('/admin/inventory'); 
                } else {
                    navigate('/');
                }
            } catch (err) {
                setError("Google Identity Sync Failed. Use Manual Access.");
            } finally {
                setLoading(false);
            }
        },
        onError: () => {
            setError("Google Access Interrupted.");
            setLoading(false);
        }
    });

    // 📧 2. MANUAL ACCESS LOGIC
    const handleManualLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    // 🔥 FIXED: Sending 'email' instead of 'userId' to match backend
                    email: formData.accessId.trim().toLowerCase(), 
                    password: formData.password
                })
            });

            const result = await response.json();

            if (result.success) {
                login({
                    _id: result._id,
                    name: result.name,
                    userId: result.userId || result.email,
                    role: result.role,
                    token: result.token
                });

                // 🔥 FIXED: Check Admin role or master email for correct redirection
                if (result.role === 'admin' || formData.accessId.toLowerCase() === ADMIN_EMAIL) {
                    navigate('/admin/inventory'); // ✅ Sahi rasta
                } else {
                    navigate('/');
                }
            } else {
                setError(result.message || "Invalid Commander ID or Security Code");
            }
        } catch (err) {
            setError("CRITICAL: Connection to Central Vault Timed Out.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center px-4 py-12 bg-slate-50 dark:bg-[#0a0a0a] relative overflow-hidden font-sans">
            
            {/* 🎨 Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px] dark:bg-blue-600/10 -z-10"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/5 blur-[120px] dark:bg-purple-600/10 -z-10"></div>
            
            <div className="w-full max-w-[480px] relative">
                <ScrollReveal direction="up">
                    <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/5 p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative">
                        
                        <div className="text-center mb-10">
                            <div className="inline-flex p-4 rounded-3xl bg-blue-600/10 dark:bg-blue-500/20 mb-4 animate-pulse">
                                <Fingerprint className="text-blue-600 dark:text-blue-400" size={36} />
                            </div>
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                                Vault <span className="text-blue-600 dark:text-blue-500">Access</span>
                            </h2>
                            <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black tracking-[0.4em] mt-3 uppercase italic">Biometric & Key Verification</p>
                        </div>

                        {error && (
                            <div className="mb-8 p-4 bg-red-50 dark:bg-red-500/10 border-l-4 border-red-500 rounded-r-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-[11px] font-black uppercase animate-in fade-in zoom-in duration-300">
                                <AlertCircle size={18} className="shrink-0" /> {error}
                            </div>
                        )}

                        {/* 🌐 Google Auth */}
                        <button 
                            type="button"
                            onClick={() => googleLogin()}
                            disabled={loading}
                            className="group w-full py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-500/50 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 mb-8"
                        >
                            {loading ? <Loader2 className="animate-spin text-blue-600" size={20} /> : (
                                <>
                                    <FcGoogle size={24} className="group-hover:scale-110 transition-transform" />
                                    <span className="font-bold text-sm text-slate-700 dark:text-slate-200 uppercase tracking-tight">Sync Google Identity</span>
                                </>
                            )}
                        </button>

                        <div className="relative flex items-center gap-4 mb-10 opacity-50">
                            <div className="flex-1 h-[1px] bg-slate-200 dark:bg-white/10"></div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Manual Override</span>
                            <div className="flex-1 h-[1px] bg-slate-200 dark:bg-white/10"></div>
                        </div>

                        {/* 📧 Form */}
                        <form onSubmit={handleManualLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Access ID (Email)</label>
                                <div className="relative group">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 group-focus-within:text-blue-500 transition-colors" size={20} />
                                    <input 
                                        type="email" required
                                        className="w-full pl-14 pr-6 py-4.5 bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-700 dark:text-white text-sm"
                                        placeholder="mehmoodalias12@gmail.com"
                                        value={formData.accessId}
                                        onChange={(e) => setFormData({...formData, accessId: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Master Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 group-focus-within:text-blue-500 transition-colors" size={20} />
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        required
                                        className="w-full pl-14 pr-14 py-4.5 bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-700 dark:text-white text-sm"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button 
                                disabled={loading}
                                className="w-full py-5 bg-slate-900 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-blue-900/10 mt-4 group"
                            >
                                <span className="font-black uppercase tracking-widest text-xs">Authorize Entry</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>

                        <div className="mt-10 text-center space-y-4">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                New Member? 
                                <Link to="/signup" className="ml-2 text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 font-black">
                                    Establish ID <UserPlus size={14} />
                                </Link>
                            </p>
                            
                            <div className="pt-6 border-t border-slate-100 dark:border-white/5">
                                <button 
                                    onClick={() => navigate('/')} 
                                    className="flex items-center justify-center gap-2 w-full text-slate-400 hover:text-blue-500 text-[10px] font-black uppercase tracking-widest transition-colors"
                                >
                                    <Zap size={14} /> Back to Storefront
                                </button>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
};

export default Login;