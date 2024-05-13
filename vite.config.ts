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
        name: 'Calculoqui',
        short_name: 'PWA',
        description: 'App para repartir gastos con el loqui',
        background_color: 'black',
        theme_color: 'black',
        icons: [
          {
            src: 'money.svg',
            sizes: '144x144',
            type: 'image/svg',
            purpose: 'any'
          }, 
          {
            src: 'money_small.svg',
            sizes: '52x52',
            type: 'image/svg',
            purpose: 'any'
          }
        ]
      }
    })],
})
