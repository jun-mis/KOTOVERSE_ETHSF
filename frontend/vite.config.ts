/// <reference types="vitest" />
import { defineConfig } from 'vite';
import Pages from 'vite-plugin-pages';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Pages()],
  resolve: {
    alias: {
      '@/': path.join(__dirname, 'src/'),
      '~/': path.join(__dirname, '/'),
    },
  },
  server: {
    port: 3000,
  },
});
