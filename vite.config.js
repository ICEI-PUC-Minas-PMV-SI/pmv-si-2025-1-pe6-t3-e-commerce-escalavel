import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './frontend',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'frontend/index.html'),
        login: resolve(__dirname, 'frontend/login.html'),
        register: resolve(__dirname, 'frontend/register.html'),
      }
    }
  }
});
