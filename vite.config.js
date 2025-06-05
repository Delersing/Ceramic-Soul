import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    base: '/Delersing.github.io/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                catalog: resolve(__dirname, './src/pages/catalog.html'),
                blog: resolve(__dirname, './src/pages/blog.html'),
                about: resolve(__dirname, './src/pages/about.html'),
            },
        },
    },
})
