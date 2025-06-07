import { defineConfig } from 'vite';

export default defineConfig({
    root: '.', // project root
    server: {
        port: 3000, // Change port if needed
    },
    build: {
        outDir: 'dist', // production build folder
        emptyOutDir: true,
    },
});
