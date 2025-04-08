import { defineConfig } from 'vite'

export default defineConfig({
  root: '.', // ou remova completamente essa linha se estiver na raiz do frontend
  build: {
    outDir: 'dist',
  },
  publicDir: 'public'
})
