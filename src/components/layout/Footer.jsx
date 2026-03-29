import { Facebook, Instagram, Twitter, Github, Mail, Phone, MapPin, Zap, Send, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  // 🎯 Direct Category Sync with products.js
  const handleCategoryClick = (catName) => {
    navigate(`/?cat=${catName}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { Icon: Facebook, url: "https://facebook.com/azeem.gadgets" },
    { Icon: Instagram, url: "https://instagram.com/azeem_gadgets" },
    { Icon: Twitter, url: "https://twitter.com/azeem_gadgets" },
    { Icon: Github, url: "https://github.com/azeemgadgets" }
  ];

  return (
    <footer className="relative mt-20 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors duration-500">
      
      {/* 🌟 Top Glowing Accent Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

      {/* 📩 Professional Newsletter */}
      <div className="container mx-auto px-6 pt-16 pb-8 border-b border-slate-50 dark:border-slate-900/50">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-slate-50 dark:bg-slate-900/50 p-8 md:p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-2xl font-black dark:text-white tracking-tighter uppercase italic">Stay <span className="text-blue-600">Updated</span></h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-tight">Get the latest 2026 tech drops directly in your inbox.</p>
          </div>
          <div className="relative w-full lg:w-96 group">
            <input 
              type="email" 
              placeholder="Your professional email..." 
              className="w-full px-6 py-4 bg-white dark:bg-slate-950 border-2 border-transparent focus:border-blue-600 rounded-2xl outline-none transition-all font-black dark:text-white shadow-inner"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-blue-600 text-white rounded-xl hover:scale-105 transition-all">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* 1. Brand Section */}
          <div className="space-y-6 text-center md:text-left">
            <Link to="/" className="flex items-center justify-center md:justify-start gap-2 group">
              <div className="bg-blue-600 p-2.5 rounded-2xl group-hover:rotate-12 transition-transform shadow-xl shadow-blue-500/30">
                <Zap className="text-white" size={24} fill="currentColor" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
                AZEEM'S <span className="text-blue-600">GADGETS</span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic text-sm">
              Your trusted partner for 100% authentic Mobiles, Workstation Laptops, and Next-Gen Electronics in Pakistan.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              {socialLinks.map((item, i) => (
                <a 
                  key={i} 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all border border-transparent shadow-sm"
                >
                  <item.Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Focused Shop Categories (Only the ones you have) */}
          <div className="space-y-6 text-center md:text-left">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 border-l-4 border-blue-600 pl-3 hidden md:block">Inventory</h4>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 md:hidden">Inventory</h4>
            <ul className="space-y-4">
              <li>
                <button onClick={() => handleCategoryClick('Mobiles')} className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white font-black transition-all uppercase text-[10px] tracking-[0.2em]">
                  Mobiles Collection
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Laptops')} className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white font-black transition-all uppercase text-[10px] tracking-[0.2em]">
                  Workstation Laptops
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Electronics')} className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white font-black transition-all uppercase text-[10px] tracking-[0.2em]">
                  Advanced Electronics
                </button>
              </li>
            </ul>
          </div>

          {/* 3. Member & Dashboard Links */}
          <div className="space-y-6 text-center md:text-left">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 border-l-4 border-blue-600 pl-3 hidden md:block">Member Services</h4>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 md:hidden">Member Services</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/dashboard/orders" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white font-black transition-all uppercase text-[10px] tracking-[0.2em]">
                  Track My Order
                </Link>
              </li>
              <li>
                <Link to="/dashboard/warranty" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white font-black transition-all uppercase text-[10px] tracking-[0.2em]">
                  Azeem Care+ Status
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white font-black transition-all uppercase text-[10px] tracking-[0.2em]">
                  Direct Support
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Contact Details */}
          <div className="space-y-6 text-center md:text-left">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 border-l-4 border-blue-600 pl-3 hidden md:block">Headquarters</h4>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 md:hidden">Headquarters</h4>
            <div className="space-y-5 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <div className="flex flex-col md:flex-row items-center gap-3">
                <MapPin className="text-blue-600 shrink-0" size={18} />
                <span>Main Tech Hub, Karachi, Pakistan.</span>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-3">
                <Phone className="text-blue-600 shrink-0" size={18} />
                <a href="tel:+923453565226" className="hover:text-blue-600 transition-colors">+92 345 3565226</a>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-3">
                <Mail className="text-blue-600 shrink-0" size={18} />
                <a href="mailto:info@azeemgadgets.com" className="hover:text-blue-600 transition-colors lowercase">info@azeemgadgets.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* 📜 Bottom Bar */}
        <div className="mt-16 pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">
              &copy; {new Date().getFullYear()} Azeem's Gadgets • Verified Professional Tech Store
            </p>
          </div>
          
          {/* Trust Badges */}
          <div className="flex items-center gap-8 px-8 py-3 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-inner grayscale opacity-60">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-3" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;