import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'src',
  publicDir: resolve(__dirname, 'src/assets'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
        main: resolve(__dirname, 'src/pages/index.html'),
        about: resolve(__dirname, 'src/pages/about.html'),
        contact: resolve(__dirname, 'src/pages/contact.html'),
        booking: resolve(__dirname, 'src/pages/booking.html'),
        enIndex: resolve(__dirname, 'src/en/index.html'),
        enAbout: resolve(__dirname, 'src/en/about.html'),
        enContact: resolve(__dirname, 'src/en/contact.html'),
        enEvents: resolve(__dirname, 'src/en/events.html'),
        itIndex: resolve(__dirname, 'src/it/index.html'),
        itAbout: resolve(__dirname, 'src/it/about.html'),
        itContact: resolve(__dirname, 'src/it/contact.html'),
        itEvents: resolve(__dirname, 'src/it/events.html'),
        nlIndex: resolve(__dirname, 'src/nl/index.html'),
        nlAbout: resolve(__dirname, 'src/nl/about.html'),
        nlContact: resolve(__dirname, 'src/nl/contact.html'),
        nlEvents: resolve(__dirname, 'src/nl/events.html'),
      }
    }
  }
})