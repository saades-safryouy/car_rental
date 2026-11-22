import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/js'),
      '@assets': path.resolve(__dirname, 'resources/image'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://carrental-production-6b89444d.up.railway.app/',
        changeOrigin: true,
        headers: {
          Accept: 'application/json',
          "Content-Type": "application/json"
        },
      },
    },
  },
  preview: {
    allowedHosts: true,
  },
});
