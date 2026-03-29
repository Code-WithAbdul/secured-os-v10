import { db } from '../firebase/config';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  getDocs, 
  orderBy,
  doc,
  runTransaction 
} from 'firebase/firestore';

/**
 * 🛰️ AZEEM GADGETS - MISSION CONTROL ORDER SYSTEM
 */

export const deployOrderToCloud = async (customerInfo, cart, totals) => {
  try {
    // 1. Generate a "Human Readable" Order ID
    const shortId = Math.random().toString(36).substr(2, 6).toUpperCase();
    const timestamp = new Date().getTime().toString().substr(-4);
    const customOrderId = `AZM-${timestamp}-${shortId}`;

    // 2. Transaction Logic: Order Place + Stock Management (Coming soon)
    // Abhi ke liye hum direct order add kar rahe hain professionally
    const orderRef = collection(db, "orders");

    const orderPayload = {
      // Identity Header
      orderId: customOrderId,
      status: "NEW_ORDER", // Pipeline: NEW_ORDER -> VERIFIED -> DISPATCHED -> DELIVERED
      
      // Customer Intelligence (Cleaned)
      customer: {
        fullName: customerInfo.name?.trim() || "Guest User",
        phone: customerInfo.phone?.trim() || "No Phone",
        email: customerInfo.email?.trim() || "N/A",
        address: customerInfo.address?.trim() || "No Address Provided",
        city: customerInfo.city || "Karachi",
      },

      // Inventory Payload (Deep Map for Security)
      items: cart.map(item => ({
        productId: item.id || 'N/A',
        name: item.name || 'Unknown Unit',
        price: Number(item.price) || 0,
        quantity: Number(item.quantity || 1),
        image: item.image || "",
        category: item.category || "General"
      })),

      // Financial Node
      pricing: {
        subtotal: Number(totals.subtotal) || 0,
        delivery: Number(totals.deliveryCharges || 250),
        total: Number(totals.total) || 0,
        currency: "PKR",
        paymentMethod: "Cash on Delivery"
      },

      // Logistics & System Metadata
      metadata: {
        platform: "Web-Official-v5",
        node: "Azeem-Vault-Primary",
        createdAt: serverTimestamp(), // Google Official Server Time
        localTime: new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' }),
        userAgent: navigator.userAgent.slice(0, 100) // Identifying browser/device
      }
    };

    const docRef = await addDoc(orderRef, orderPayload);

    return { 
      success: true, 
      id: docRef.id, 
      customOrderId: customOrderId 
    };

  } catch (error) {
    console.error("🔥 CLOUD EXTRACTION FAILURE:", error);
    return { 
      success: false, 
      error: error.message 
    };
  }
};

/**
 * 🕵️ ADMIN: Get All Orders (For Sohail & Sheeraz Dashboard)
 */
export const fetchAllOrders = async () => {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, orderBy("metadata.createdAt", "desc"));
    
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return [];

    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(),
      // Adding a friendly date for the UI
      displayDate: doc.data().metadata?.createdAt?.toDate().toLocaleDateString() || "Recent"
    }));
  } catch (error) {
    console.error("🕵️ Admin Retrieval Error:", error);
    return [];
  }
};