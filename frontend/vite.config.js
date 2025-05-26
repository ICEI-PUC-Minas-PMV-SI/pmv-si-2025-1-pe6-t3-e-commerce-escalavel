import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: './frontend',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'frontend/index.html'),
      },
    },
  },
  publicDir: 'public'
})
