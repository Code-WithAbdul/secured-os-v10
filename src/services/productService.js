import { db } from "../firebase/config";
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  serverTimestamp,
  increment,
  limit,
  startAfter
} from "firebase/firestore";

/**
 * 🛰️ AZEEM GADGETS - GLOBAL PRODUCT INTELLIGENCE ENGINE
 * --------------------------------------------------------
 * Authority: Commander Azeem
 * Build: Stable Enterprise v10.0
 * Security: Firestore Rules Encrypted
 * --------------------------------------------------------
 */

const productCollectionRef = collection(db, "products");

// ==========================================
// 1. ASSET INJECTION (Add Product)
// ==========================================
/**
 * Logic: Data ko sanitize karta hai aur default vault metadata attach karta hai.
 */
export const addProduct = async (productData) => {
  try {
    console.log("📡 Initiating Asset Injection into Vault...".yellow);

    const docRef = await addDoc(productCollectionRef, {
      name: productData.name.trim(),
      price: Number(productData.price) || 0,
      oldPrice: Number(productData.oldPrice) || (Number(productData.price) * 1.15),
      category: productData.category || "General Sector",
      brand: productData.brand || "Master Tier",
      image: productData.image || "https://placeholder.com/tech",
      description: productData.description || "Official high-performance unit from Azeem Vault.",
      specs: productData.specs || { OS: "Azeem-OS", Architecture: "4nm" },
      stock: Number(productData.stock) || 0,
      inStock: Number(productData.stock) > 0,
      rating: 5.0,
      reviewsCount: 0,
      isFeatured: productData.isFeatured || false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      metadata: {
        node: "AZEEM-VAULT-PRIMARY",
        securityLevel: "Alpha",
        encryption: "AES-256"
      }
    });

    console.log(`✅ Asset Secured! Node ID: ${docRef.id}`.green.bold);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("❌ VAULT WRITE FAILURE:", error.message);
    return { success: false, error: error.message };
  }
};

// ==========================================
// 2. GLOBAL SCAN (Get All Products)
// ==========================================
/**
 * Logic: Sabhi products uthata hai aur real-time dates ko format karta hai.
 */
export const getAllProducts = async (maxUnits = 50) => {
  try {
    const q = query(
      productCollectionRef, 
      orderBy("createdAt", "desc"),
      limit(maxUnits)
    );

    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Error-free date handling
        formattedDate: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : 'Syncing...'
      };
    });
  } catch (error) {
    console.error("🕵️ Vault Scan Interrupted:", error.message);
    return [];
  }
};

// ==========================================
// 3. TARGETED EXTRACTION (Get Product By ID)
// ==========================================
export const getProductById = async (productId) => {
  if (!productId) return null;
  try {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { 
        id: docSnap.id, 
        ...docSnap.data(),
        nodeStatus: "ONLINE" 
      };
    }
    console.warn(`⚠️ Node [${productId}] not found in archive.`);
    return null;
  } catch (error) {
    console.error("❌ Unit Extraction Failed:", error.message);
    return null;
  }
};

// ==========================================
// 4. SECTOR FILTERING (Get By Category)
// ==========================================
export const getProductsByCategory = async (categoryName) => {
  try {
    // ⚠️ Note: Firebase composite index might be required for where + orderBy
    const q = query(
      productCollectionRef, 
      where("category", "==", categoryName),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("📡 Sector Filtering Error:", error.message);
    // Fallback: search without orderBy if index is missing
    const simpleQ = query(productCollectionRef, where("category", "==", categoryName));
    const simpleSnap = await getDocs(simpleQ);
    return simpleSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};

// ==========================================
// 5. SEARCH ENGINE (Basic Keyword Search)
// ==========================================
/**
 * Logic: Clientside filtering for high-speed response
 */
export const searchVault = async (keyword) => {
  try {
    const all = await getAllProducts(100);
    const lowKeyword = keyword.toLowerCase();
    
    return all.filter(p => 
      p.name.toLowerCase().includes(lowKeyword) || 
      p.category.toLowerCase().includes(lowKeyword) ||
      p.brand.toLowerCase().includes(lowKeyword)
    );
  } catch (error) {
    return [];
  }
};

// ==========================================
// 6. UPDATE PROTOCOL (Smart Update)
// ==========================================
export const updateProduct = async (productId, updateData) => {
  try {
    const docRef = doc(db, "products", productId);
    
    // Auto-calculate stock status if stock is being updated
    const finalUpdate = {
      ...updateData,
      updatedAt: serverTimestamp()
    };

    if (updateData.stock !== undefined) {
      finalUpdate.inStock = Number(updateData.stock) > 0;
    }

    await updateDoc(docRef, finalUpdate);
    return { success: true };
  } catch (error) {
    console.error("🛠️ Update Protocol Failure:", error.message);
    return { success: false, error: error.message };
  }
};

// ==========================================
// 7. STOCK DEPLETION LOGIC (On Order)
// ==========================================
/**
 * CRITICAL: Jab order place ho, stock automate kam hota hai.
 */
export const reduceStock = async (productId, quantity) => {
  try {
    const docRef = doc(db, "products", productId);
    
    // Fetch current stock to prevent negative inventory
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const currentStock = docSnap.data().stock;
      if (currentStock < quantity) throw new Error("Insufficient Units in Vault");
    }

    await updateDoc(docRef, {
      stock: increment(-quantity),
      updatedAt: serverTimestamp()
    });

    return { success: true };
  } catch (error) {
    console.error("📉 Inventory Sync Error:", error.message);
    return { success: false, error: error.message };
  }
};

// ==========================================
// 8. ASSET DECOMMISSION (Delete)
// ==========================================
export const deleteProduct = async (productId) => {
  try {
    const docRef = doc(db, "products", productId);
    await deleteDoc(docRef);
    console.log(`🗑️ Unit ${productId} purged from vault.`.red);
    return { success: true };
  } catch (error) {
    console.error("❌ Purge Error:", error.message);
    return { success: false };
  }
};

// ==========================================
// 9. FEATURED UNITS (Hero Section)
// ==========================================
export const getFeaturedProducts = async () => {
  try {
    const q = query(productCollectionRef, where("isFeatured", "==", true), limit(4));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    return [];
  }
};

/**
 * --------------------------------------------------------
 * SERVICE LOG:
 * - Added Automatic InStock Calculation
 * - Added Hybrid Date Formatting
 * - Added Search Simulation
 * - Added Featured Fetching
 * - Optimized limit for performance
 * --------------------------------------------------------
 */