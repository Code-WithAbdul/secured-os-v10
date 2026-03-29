import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// 🌐 Google OAuth Provider Import
import { GoogleOAuthProvider } from '@react-oauth/google'

// Saare Providers Import karein
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { CartProvider } from './context/CartContext'

// 🗝️ Aapki New Verified Client ID
const CLIENT_ID = "471222880477-mhh68c9ud7nhmufngvpfecvp35q7621v.apps.googleusercontent.com"; 

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
)