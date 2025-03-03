import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.escuelajs.co',  // Backend URL
        changeOrigin: true,
        secure: false,
       
        }
      }
    }
  }
);
