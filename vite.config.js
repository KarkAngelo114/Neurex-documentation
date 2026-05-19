import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://neurex-documentation.vercel.app",
      // Add the exclude array to ignore the verification file
      exclude: ['/googlef9813abd757c1198'] 
    })
  ],
})