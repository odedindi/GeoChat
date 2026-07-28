import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'node:path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const serverUrl = env.VITE_SERVER_URL || 'http://localhost:4000';

  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: 'GeoChat',
          short_name: 'GeoChat',
          description: 'Location-aware chat. Talk to people around you.',
          theme_color: '#0a0a0a',
          background_color: '#0a0a0a',
          display: 'standalone',
          start_url: '/',
          icons: [
            { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
            { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
          runtimeCaching: [
            {
              urlPattern: ({ url }) => url.origin === 'https://tile.openstreetmap.org',
              handler: 'CacheFirst',
              options: {
                cacheName: 'osm-tiles',
                expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 }
              }
            }
          ]
        }
      })
    ],
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') }
    },
    server: {
      port: Number(env.VITE_PORT) || 5180,
      strictPort: false,
      host: true,
      proxy: {
        '/api': { target: serverUrl, changeOrigin: true, rewrite: p => p.replace(/^\/api/, '/v2') },
        '/socket.io': { target: serverUrl, ws: true, changeOrigin: true }
      }
    },
    build: {
      target: 'es2022',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom') || id.includes('node_modules/react/')) return 'react';
            if (id.includes('node_modules/leaflet') || id.includes('node_modules/react-leaflet')) return 'leaflet';
            if (id.includes('node_modules/socket.io-client')) return 'socket';
          }
        }
      }
    }
  };
});
