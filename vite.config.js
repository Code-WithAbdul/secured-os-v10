import { defineConfig } from 'vite' // ✨ Ye line miss hai aapki file mein
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})