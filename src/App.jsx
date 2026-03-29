import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

// 1. Context Providers
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext'; 
import { ThemeProvider } from "./context/ThemeContext"; 

// 2. High-End UI Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar'; 
import ProtectedRoute from './components/common/ProtectedRoute'; 
import CheckoutModal from './components/common/CheckoutModal';
import GlobalSearch from './components/common/GlobalSearch'; 
import Toast from './components/common/Toast'; 

// 3. Operational Pages
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import ProductDetails from './pages/Product/ProductDetails';
import Login from './pages/Auth/Login'; 
import Signup from './pages/Auth/Signup';

// 4. Admin & Dashboard Intelligence
import Dashboard from './pages/Dashboard/Dashboard';
import AdminPanel from './pages/Admin/AdminPanel'; 
import AdminOrders from './pages/Admin/AdminOrders'; 

// 5. Support & Security Nodes
import OrderTracking from './pages/Support/OrderTracking';
import Warranty from './pages/Support/Warranty';
import Contact from './pages/Support/Contact';
import ShippingPolicy from './pages/Support/ShippingPolicy'; 
import Authenticity from './pages/Support/Authenticity'; 

// 6. Success Deployment
import OrderSuccess from './pages/Cart/OrderSuccess';

/**
 * ✨ UTILITY: VIEWPORT AUTO-RESET
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); 
  }, [pathname]);
  return null;
};

function AppContent() {
  const { cart, getSubtotal } = useCart(); 
  const { user } = useAuth();
  const location = useLocation();

  // 🎭 GLOBAL INTERFACE STATES
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // 💰 LIVE FINANCIAL CALCULATION
  const subtotal = typeof getSubtotal === 'function' ? getSubtotal() : 0;

  // 🕵️ LAYOUT ANALYTICS (Fixed to sync with all Admin Paths)
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isOrderSuccess = location.pathname === '/order-success';
  const isAdminZone = location.pathname.startsWith('/admin');

  // 🛰️ GLOBAL EVENT BUS
  useEffect(() => {
    const handleToggleSearch = () => setIsSearchOpen(prev => !prev);
    const handleShowToast = (e) => setToast({ show: true, message: e.detail.msg, type: e.detail.type });

    document.addEventListener('toggleSearch', handleToggleSearch);
    document.addEventListener('showToast', handleShowToast);
    
    return () => {
      document.removeEventListener('toggleSearch', handleToggleSearch);
      document.removeEventListener('showToast', handleShowToast);
    };
  }, []);

  // 🏷️ DYNAMIC META BRANDING
  useEffect(() => {
    const routeName = location.pathname.split('/')[1] || 'Warehouse';
    document.title = `Azeem Gadgets | ${routeName.toUpperCase().replace(/-/g, ' ')}`;
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-slate-100 transition-colors duration-500 overflow-x-hidden selection:bg-blue-600 selection:text-white">
      <ScrollToTop />
      
      {/* 🧭 NAVIGATION LAYER */}
      {!isOrderSuccess && (
        <Navbar 
          onSearchOpen={() => setIsSearchOpen(true)} 
          cartCount={cart?.length || 0}
        />
      )}
      
      {/* 🛠️ SIDEBAR INTERFACE (Auto-hide for Clean Admin View) */}
      {!isOrderSuccess && !isAuthPage && !isAdminZone && <Sidebar />}

      {/* 🎬 MAIN CONTENT ENGINE */}
      <main className={`flex-grow transition-all duration-700 
        ${!isOrderSuccess && !isAuthPage && !isAdminZone ? 'lg:pl-20' : 'pl-0'} 
        ${location.pathname === '/' || isOrderSuccess ? 'pt-0' : 'pt-20 md:pt-24'}`}>
        
        <div className={`w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-4 md:py-8 ${isAuthPage ? 'max-w-4xl' : ''}`}>
          <Routes>
            {/* 🏠 CORE ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart onOpenCheckout={() => setIsModalOpen(true)} />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            
            {/* 🔐 AUTHENTICATION NODES */}
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
            
            {/* 👤 USER DASHBOARD */}
            <Route path="/dashboard/:tab" element={
               <ProtectedRoute>
                  <Dashboard />
               </ProtectedRoute>
            } />
            
            {/* 👑 ADMIN COMMAND SECTOR (Path Sync Fixed) */}
            <Route path="/admin/inventory" element={
              <ProtectedRoute requireAdmin={true}>
                <AdminPanel />
              </ProtectedRoute>
            } />

            {/* 🔥 FIXED: Route matches Navbar's "Vault Extractions" link */}
            <Route path="/admin/orders" element={
              <ProtectedRoute requireAdmin={true}>
                <AdminOrders />
              </ProtectedRoute>
            } />

            {/* 🛰️ SUPPORT NODES */}
            <Route path="/order-tracking" element={<OrderTracking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/warranty" element={<Warranty />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/authenticity" element={<Authenticity />} />
            
            {/* 🔄 REDIRECT PROTOCOL */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      {/* 💳 GLOBAL OVERLAYS */}
      {isModalOpen && (
        <CheckoutModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          total={subtotal} 
        />
      )}
      
      <GlobalSearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      <Toast 
        {...toast} 
        onClose={() => setToast({ ...toast, show: false })} 
      />

      {!isOrderSuccess && !isAuthPage && <Footer />}
    </div>
  );
}

/**
 * 🌍 ROOT ARCHITECTURE
 */
function App() {
  return (
    <AuthProvider>
      <ThemeProvider> 
        <CartProvider>
          <AppContent />
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;