import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, Search, User, Menu, X, 
  Smartphone, Laptop, Cpu, Sun, Moon, LayoutDashboard, LogOut,
  ChevronDown, ShieldCheck, Zap, ShoppingBag, SearchCode, Database
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext'; 
import { useAuth } from '../../context/AuthContext';    

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useCart();
  const { darkMode, toggleDarkMode } = useTheme(); 
  const { user, logout } = useAuth(); 
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // 🛡️ MASTER ADMIN CONFIG
  const ADMIN_EMAIL = "mehmoodalias12@gmail.com";
  // 🔥 FIXED: Robust Admin check that works with both userId and email formats
  const isAdmin = user && (
    user.email === ADMIN_EMAIL || 
    user.userId === ADMIN_EMAIL || 
    user.role === 'admin'
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setProfileOpen(false);
  }, [location]);

  const handleLogout = () => {
    if(window.confirm("CRITICAL: Terminate secure vault session?")) {
      logout();
      navigate('/login');
    }
  };

  const totalItems = cart?.reduce((acc, item) => acc + (item.quantity || 1), 0) || 0;

  return (
    <nav className={`fixed top-0 w-full z-[500] transition-all duration-500 ${
      scrolled 
      ? 'py-3 bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl border-b border-slate-200 dark:border-white/5 shadow-xl' 
      : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          
          {/* 1. 🚀 BRAND IDENTITY */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative bg-blue-600 p-2 md:p-2.5 rounded-xl md:rounded-2xl group-hover:rotate-[10deg] transition-all duration-500 shadow-lg shadow-blue-500/30">
              <Zap className="text-white fill-white w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tighter uppercase italic leading-none dark:text-white text-slate-900">
                Azeem <span className="text-blue-600 font-black">Gadgets</span>
              </span>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em] mt-1 italic">Secured OS v10.0</span>
            </div>
          </Link>

          {/* 2. 🏛️ SECTOR NAVIGATION */}
          <div className="hidden lg:flex items-center bg-slate-100/50 dark:bg-white/[0.03] backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/50 dark:border-white/5 space-x-1">
            {[
              { name: 'Mobiles', path: '/?cat=Mobiles', icon: <Smartphone size={13} /> },
              { name: 'Laptops', path: '/?cat=Laptops', icon: <Laptop size={13} /> },
              { name: 'Electronics', path: '/?cat=Electronics', icon: <Cpu size={13} /> },
              { name: 'Tracking', path: '/order-tracking', icon: <SearchCode size={13} /> }
            ].map((item) => (
              <Link 
                key={item.name}
                to={item.path} 
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all duration-300 ${
                  location.pathname + location.search === item.path 
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-white/10'
                }`}
              >
                {item.icon} {item.name}
              </Link>
            ))}
          </div>

          {/* 3. ⚡ COMMAND HUB ACTIONS */}
          <div className="flex items-center gap-2 md:gap-4">
            
            <button onClick={() => document.dispatchEvent(new Event('toggleSearch'))} className="p-2.5 md:p-3 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl transition-all group">
              <Search size={20} className="text-slate-500 group-hover:text-blue-600 transition-colors" />
            </button>

            <button onClick={toggleDarkMode} className="p-2.5 md:p-3 rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-blue-400 border border-slate-100 dark:border-white/5 transition-all">
              {darkMode ? <Sun size={20} className="animate-spin-slow" /> : <Moon size={20} />}
            </button>

            <Link to="/cart" className="relative group p-3 bg-blue-600 rounded-2xl hover:scale-110 active:scale-95 transition-all shadow-xl shadow-blue-600/30">
              <ShoppingCart size={20} className="text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-slate-900 text-white text-[9px] font-black h-6 w-6 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-950">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="relative" ref={profileRef}>
              {user ? (
                <>
                  <button onClick={() => setProfileOpen(!profileOpen)} className={`group relative w-11 h-11 rounded-2xl overflow-hidden flex items-center justify-center transition-all border-2 ${profileOpen ? 'border-blue-600 shadow-lg' : 'border-transparent bg-slate-100 dark:bg-white/5'}`}>
                    {user.image ? <img src={user.image} alt={user.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center font-black text-blue-600 text-lg uppercase">{user.name ? user.name[0] : 'U'}</div>}
                  </button>

                  {/* 🛡️ PROFILE DROPDOWN */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-4 w-72 bg-white dark:bg-[#0c0c0c] border border-slate-100 dark:border-white/5 rounded-[2.5rem] shadow-2xl p-4 animate-in fade-in slide-in-from-top-4 duration-300">
                      <div className="flex items-center gap-4 px-3 py-4 border-b border-slate-50 dark:border-white/5 mb-3">
                         <div className="w-12 h-12 rounded-xl bg-blue-600 overflow-hidden shadow-lg flex items-center justify-center text-white font-black">
                           {user.image ? <img src={user.image} className="w-full h-full object-cover" /> : (user.name ? user.name[0] : 'U')}
                         </div>
                         <div className="min-w-0">
                           <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest leading-none mb-1">Authenticated</p>
                           <p className="text-sm font-black dark:text-white truncate uppercase italic">{user.name}</p>
                         </div>
                      </div>
                      
                      <div className="space-y-1">
                        {/* 👤 Common Link: My Orders */}
                        <Link to="/dashboard/orders" className="flex items-center gap-3 w-full p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group">
                          <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all"><ShoppingBag size={16} /></div>
                          <span className="text-[11px] font-black dark:text-white uppercase tracking-wider">My Extraction Logs</span>
                        </Link>
                        
                        {/* 👑 ADMIN FULL ACCESS LINKS */}
                        {isAdmin && (
                          <>
                            {/* 🔥 FIXED: Direct path to Command Center */}
                            <Link to="/admin/inventory" className="flex items-center gap-3 w-full p-4 rounded-2xl hover:bg-blue-600/5 dark:hover:bg-blue-600/10 transition-all group border border-dashed border-blue-500/20">
                              <div className="p-2 bg-blue-600 text-white rounded-lg"><LayoutDashboard size={16} /></div>
                              <span className="text-[11px] font-black text-blue-600 uppercase tracking-wider">Command Center</span>
                            </Link>

                            {/* 🔥 FIXED: Vault Extractions Path */}
                            <Link to="/admin/orders" className="flex items-center gap-3 w-full p-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all group">
                              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all"><Database size={16} /></div>
                              <span className="text-[11px] font-black dark:text-white uppercase tracking-wider italic">Vault Extractions</span>
                            </Link>
                          </>
                        )}

                        <button onClick={handleLogout} className="flex items-center gap-3 w-full p-4 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-all group text-red-500">
                          <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg group-hover:bg-red-600 group-hover:text-white transition-all"><LogOut size={16} /></div>
                          <span className="text-[11px] font-black uppercase tracking-wider">Terminate Session</span>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/login" className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 text-slate-500 hover:text-blue-600 transition-all">
                  <User size={20} />
                </Link>
              )}
            </div>

            <button className="lg:hidden p-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl active:scale-90 transition-all shadow-lg" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* 📱 MOBILE MENU */}
        {isOpen && (
          <div className="lg:hidden mt-4 p-6 space-y-6 rounded-[2.5rem] bg-white dark:bg-[#0c0c0c] border border-slate-100 dark:border-white/5 shadow-2xl animate-in slide-in-from-top-4 duration-300">
            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4 italic">Authorized Sectors</p>
              <div className="grid grid-cols-1 gap-2">
                {['Mobiles', 'Laptops', 'Electronics', 'Tracking'].map((item) => (
                  <Link key={item} to={item === 'Tracking' ? '/order-tracking' : `/?cat=${item}`} className="flex items-center justify-between p-5 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-transparent hover:border-blue-600/30 transition-all group">
                    <span className="font-black text-sm uppercase dark:text-white group-hover:text-blue-600 italic">{item}</span>
                    <ChevronDown size={16} className="text-slate-400 -rotate-90" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 space-y-3 border-t border-slate-100 dark:border-white/5">
              {isAdmin && (
                <>
                  <Link to="/admin/inventory" className="flex items-center justify-center gap-3 p-5 rounded-3xl bg-blue-600 text-white font-black uppercase text-[10px] tracking-widest shadow-xl">
                    <ShieldCheck size={18} /> Command Center
                  </Link>
                  <Link to="/admin/orders" className="flex items-center justify-center gap-3 p-5 rounded-3xl bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest">
                    <Database size={18} /> Vault Extractions
                  </Link>
                </>
              )}
              
              {user && (
                <Link to="/dashboard/orders" className="flex items-center justify-center gap-3 p-5 rounded-3xl border-2 border-slate-100 dark:border-white/5 text-slate-900 dark:text-white font-black uppercase text-[10px] tracking-widest">
                  <ShoppingBag size={18} /> My Extraction Logs
                </Link>
              )}

              {!user && (
                <Link to="/login" className="flex items-center justify-center gap-3 p-5 rounded-3xl bg-blue-600 text-white font-black uppercase text-[10px] tracking-widest shadow-xl">
                  <User size={18} /> Authorize Access
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;