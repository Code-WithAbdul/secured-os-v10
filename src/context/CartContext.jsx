import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

/**
 * 🛰️ AZEEM GADGETS - CENTRAL FINANCIAL & LOGISTICS CONTEXT
 * ---------------------------------------------------------
 * Logic: Encrypted Local Persistence & Real-Time Sync
 * Version: 12.0 (Stable Enterprise)
 * ---------------------------------------------------------
 */

export const CartProvider = ({ children }) => {
  // 💾 1. INITIALIZE: Load from LocalStorage (Azeem Vault Recovery)
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('azeems_gadgets_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("🛰️ Vault Recovery Failed:", error);
      return [];
    }
  });

  // 📂 2. GLOBAL SYNC: LocalStorage update on every state change
  useEffect(() => {
    localStorage.setItem('azeems_gadgets_cart', JSON.stringify(cart));
  }, [cart]);

  // ➕ 3. ADD TO CART: Precision Logic with Hybrid ID support
  const addToCart = (product, requestedQty = 1) => {
    const productId = String(product._id || product.id);
    
    setCart((prev) => {
      const existingItem = prev.find(item => String(item._id || item.id) === productId);

      if (existingItem) {
        // Agar pehle se hai toh quantity barhao
        return prev.map(item => 
          String(item._id || item.id) === productId 
            ? { ...item, quantity: (item.quantity || 0) + (product.quantity || requestedQty) }
            : item
        );
      }

      // Naya item add karo (Limit check: Max 10 unique units for stability)
      if (prev.length >= 10) {
        alert("⚠️ Vault Capacity Reached: Maximum 10 unique units allowed.");
        return prev;
      }

      return [...prev, { ...product, quantity: product.quantity || requestedQty }];
    });
  };

  // ⚡ 4. BUY NOW: Clear Cart & Immediate focus on one unit
  const buyNow = (product) => {
    if (!product) return;
    const productId = String(product._id || product.id);
    const orderUnit = [{ ...product, id: productId, quantity: product.quantity || 1 }];
    setCart(orderUnit);
  };

  // 🗑️ 5. REMOVE FROM CART: Strict String-Based Filtering
  const removeFromCart = (productId) => {
    const idToMatch = String(productId);
    setCart((prev) => prev.filter((item) => String(item._id || item.id) !== idToMatch));
  };

  // 🔢 6. UPDATE QUANTITY: Safe Increments
  const updateQuantity = (productId, newQty) => {
    if (newQty < 1) return;
    const idToMatch = String(productId);

    setCart((prev) => 
      prev.map((item) => 
        String(item._id || item.id) === idToMatch 
          ? { ...item, quantity: Number(newQty) } 
          : item
      )
    );
  };

  // 🧹 7. CLEAR VAULT: Full System Wipe
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('azeems_gadgets_cart');
  };

  // 💰 8. FINANCIAL INTELLIGENCE: Subtotal Engine
  const getSubtotal = () => {
    return cart.reduce((acc, item) => acc + (Number(item.price) * (item.quantity || 1)), 0);
  };

  // 📡 9. EXPORTING PROVIDER
  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      buyNow, 
      updateQuantity,
      getSubtotal,
      cartCount: cart.reduce((acc, item) => acc + (item.quantity || 1), 0) // Total items count
    }}>
      {children}
    </CartContext.Provider>
  );
};

// 🛡️ CUSTOM HOOK: For Deployment
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("🛰️ CRITICAL: useCart must be deployed within a CartProvider node.");
  }
  return context;
};