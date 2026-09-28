import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Updates apply on the next visit rather than prompting mid-prayer —
      // matches the "no ongoing maintenance" goal; there's nothing for the
      // owner to manage after a deploy.
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'],
      workbox: {
        // Default globPatterns already covers every built JS/CSS/HTML file —
        // this precaches every language and every Montfort method chunk too,
        // even though they load on demand at runtime. That's the point: once
        // installed, switching language or method works fully offline.
        cleanupOutdatedCaches: true,
      },
      manifest: {
        name: 'Ave Maria Rosary',
        short_name: 'Rosary',
        description: 'Pray the Holy Rosary, with the mysteries, Scripture and meditations, in 12 languages.',
        theme_color: '#3b82f6',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
