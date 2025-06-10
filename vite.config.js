import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
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
    plugins: [
        ViteImageOptimizer({
            /* pass your config */
            jpg: {
                // https://sharp.pixelplumbing.com/api-output#jpeg
                quality: 80,
            },
            png: {
                // https://sharp.pixelplumbing.com/api-output#png
                quality: 80,
            },
        }),
    ],
})
