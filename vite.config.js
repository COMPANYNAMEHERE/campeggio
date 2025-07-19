import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  publicDir: resolve(__dirname, 'src/assets'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        enIndex: resolve(__dirname, 'src/pages/en/index.html'),
        enAbout: resolve(__dirname, 'src/pages/en/about.html'),
        enContact: resolve(__dirname, 'src/pages/en/contact.html'),
        enEvents: resolve(__dirname, 'src/pages/en/events.html'),
        itIndex: resolve(__dirname, 'src/pages/it/index.html'),
        itAbout: resolve(__dirname, 'src/pages/it/about.html'),
        itContact: resolve(__dirname, 'src/pages/it/contact.html'),
        itEvents: resolve(__dirname, 'src/pages/it/events.html'),
        nlIndex: resolve(__dirname, 'src/pages/nl/index.html'),
        nlAbout: resolve(__dirname, 'src/pages/nl/about.html'),
        nlContact: resolve(__dirname, 'src/pages/nl/contact.html'),
        nlEvents: resolve(__dirname, 'src/pages/nl/events.html'),
      }
    }
  }
})
