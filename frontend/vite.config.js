import { defineConfig } from 'vite';
import path from "path";  // Add this import at the top

export default defineConfig({
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:8000',
        changeOrigin: true,
      },
      '/media': {
        target: process.env.VITE_API_URL || 'http://localhost:8000',
        changeOrigin: true,
      }
    },
  },
  // Add this resolve configuration
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});