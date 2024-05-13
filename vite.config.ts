import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(
    {
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['money.svg', 'money_small.svg'],
      manifest: {
        name: 'Calculadora de gastos',
        short_name: 'Calculoqui',
        description: 'App para repartir gastos con el loquito',
        background_color: 'black',
        theme_color: 'black',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })],
})
