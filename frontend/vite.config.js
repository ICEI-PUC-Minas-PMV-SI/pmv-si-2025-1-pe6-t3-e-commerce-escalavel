import { defineConfig } from 'vite';

export default defineConfig({
  root: 'frontend',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
