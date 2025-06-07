import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    root: '.', // project root
    plugins: [
        tailwindcss(),
    ],
    server: {
        port: 3000, // Change port if needed
    },
    build: {
        outDir: 'dist', // production build folder
        emptyOutDir: true,
    },
});