import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://neurex-documentation.vercel.app',
      exclude: ['/googlef9813abd757c1198.html']
    })
  ],
});