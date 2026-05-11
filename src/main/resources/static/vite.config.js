import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8080',
      '/image-generation': 'http://localhost:8080',
      '/productImage': 'http://localhost:8080',
      '/analyze-url': 'http://localhost:8080',
      '/analyze-upload': 'http://localhost:8080',
      '/compare-images': 'http://localhost:8080'
    }
  }
})
