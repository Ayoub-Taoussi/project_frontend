import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // Ajouter d'autres points d'entrée si nécessaire
        // auth: resolve(__dirname, 'public/auth/login.html'),
        // dashboard: resolve(__dirname, 'public/dashboard/index.html'),
      }
    }
  },
  // Servir les fichiers statiques depuis public
  publicDir: 'public',
  // Configuration pour le développement
  server: {
    port: 3000,
    open: true
  },
  // Configuration pour la prévisualisation
  preview: {
    port: 4173
  }
});
