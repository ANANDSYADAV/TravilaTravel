import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 3000, // Change port if needed
    },
    build: {
        outDir: 'dist',
    },
});
