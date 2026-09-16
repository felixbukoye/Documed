import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// DocuMed dev server.
// Binds to 0.0.0.0 and allows the Arena preview host (*.e2b.app) so the live
// preview loads and HMR works through the proxy.
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    allowedHosts: ['localhost', '127.0.0.1', '.e2b.app'],
  },
  preview: {
    host: true,
    port: 5173,
    allowedHosts: ['localhost', '127.0.0.1', '.e2b.app'],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
