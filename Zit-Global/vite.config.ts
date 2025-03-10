import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist', // Ensure the build output is correct
  },
  server: {
    port: 4000, // Vite development server runs on port 5173
    host: true, // Make the server accessible from the network
    strictPort: true, // Fail if the port is not available
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Updated to match backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: [
      { find: '@', replacement: '/src' }
    ]
  }
});