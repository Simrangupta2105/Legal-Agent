import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: "./", // or "/"
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias @ → ./src
    },
  },
  server: {
    port: 5175, // Dev server runs on port 5175
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Proxy API requests to backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
