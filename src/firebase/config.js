import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 🚀 AZEEM VAULT - FINAL VERIFIED CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyArXpQXKzE83lgPoZGhXT3b7h-9dsXQ0Pw",
  authDomain: "azeems-gadgets-87210.firebaseapp.com",
  projectId: "azeems-gadgets-87210",
  storageBucket: "azeems-gadgets-87210.firebasestorage.app",
  messagingSenderId: "170257319595",
  appId: "1:170257319595:web:866c5d648c894208924720"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Force account selection taake login loop na banay
googleProvider.setCustomParameters({ prompt: 'select_account' });

export default app;