import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@shared': '/src/shared',
      '@domains': '/src/domains',
      '@redux': '/src/redux',
    }
  }
})
