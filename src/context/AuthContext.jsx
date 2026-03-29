import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 🔐 1. CORE AUTH STATES (Initialized from LocalStorage)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('azeems_active_user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    const savedUser = localStorage.getItem('azeems_active_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      // 🔥 MASTER SECURITY: Only this email can be Admin
      return parsed.email === "mehmoodalias12@gmail.com" || parsed.userId === "mehmoodalias12@gmail.com";
    }
    return false;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const [isLoading, setIsLoading] = useState(true);

  // 🛡️ MASTER COMMANDER DETAILS
  const MASTER_ADMIN_EMAIL = "mehmoodalias12@gmail.com";

  // 🚀 2. UNIVERSAL LOGIN ACTION
  const login = (userData) => {
    if (!userData) return;

    // 🔥 STRICT ADMIN PROTOCOL: 
    // Email must match and role must be authorized. 
    // (Note: Password "AZEEMK" validation happens in Login.jsx before calling this)
    const checkIsAdmin = 
      userData.email === MASTER_ADMIN_EMAIL || 
      userData.userId === MASTER_ADMIN_EMAIL;

    const profile = {
      ...userData,
      role: checkIsAdmin ? 'admin' : 'customer'
    };

    // Update States
    setUser(profile);
    setIsAdmin(checkIsAdmin);
    setIsAuthenticated(true);

    // Sync with LocalStorage
    localStorage.setItem('azeems_active_user', JSON.stringify(profile));
    localStorage.setItem('token', userData.token || '');
    
    if (checkIsAdmin) {
      console.log(`👑 MASTER AZEEM IDENTIFIED. Command Center Unlocked.`);
    } else {
      console.log(`📡 Identity Verified: ${profile.name} [Customer Node]`);
    }
  };

  // 🚪 3. GLOBAL LOGOUT SEQUENCE
  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    setIsAuthenticated(false);
    localStorage.removeItem('azeems_active_user');
    localStorage.removeItem('token');
    
    window.dispatchEvent(new Event('storage'));
    console.log("🔒 Vault Locked: Session Terminated.");
  };

  // 🛰️ 4. SESSION PERSISTENCE ENGINE
  const checkSession = useCallback(() => {
    const savedUser = localStorage.getItem('azeems_active_user');
    const token = localStorage.getItem('token');
    
    if (savedUser && token) {
      try {
        const parsedUser = JSON.parse(savedUser);
        const checkIsAdmin = 
          parsedUser.email === MASTER_ADMIN_EMAIL || 
          parsedUser.userId === MASTER_ADMIN_EMAIL;

        setUser(parsedUser);
        setIsAdmin(checkIsAdmin);
        setIsAuthenticated(true);
      } catch (err) {
        logout();
      }
    }
    setIsLoading(false); 
  }, [MASTER_ADMIN_EMAIL]);

  useEffect(() => {
    checkSession();
    const handleStorageChange = () => checkSession();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [checkSession]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAdmin, 
      isAuthenticated, 
      isLoading, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("CRITICAL FAILURE: useAuth must be within AuthProvider node.");
  }
  return context;
};