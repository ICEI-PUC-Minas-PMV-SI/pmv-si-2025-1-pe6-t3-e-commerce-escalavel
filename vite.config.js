import { defineConfig } from 'vite';

export default defineConfig({
  root: 'frontend', // pasta onde está o index.html
  build: {
    outDir: 'dist', // saída dentro da raiz do projeto
    emptyOutDir: true,
  },
});
