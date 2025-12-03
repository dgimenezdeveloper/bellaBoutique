import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimizaciones para producción
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Eliminar console.log en producción
        drop_debugger: true
      }
    },
    // Code splitting optimizado
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['styled-components', 'react-icons', 'react-toastify'],
          'vendor-utils': ['react-helmet-async']
        }
      }
    },
    // Chunks más grandes para mejor compresión
    chunkSizeWarningLimit: 1000,
    // Source maps solo para errores
    sourcemap: false
  },
  // Optimizar dependencias
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  // Configuración del servidor de desarrollo
  server: {
    port: 5173,
    open: true
  },
  // Configuración del preview
  preview: {
    port: 4173,
    open: true
  }
})
