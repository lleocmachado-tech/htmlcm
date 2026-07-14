import { fileURLToPath } from 'url';
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
var __dirname = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
    root: __dirname,
    plugins: [react()],
    css: {
        postcss: {
            plugins: [tailwindcss(path.resolve(__dirname, 'tailwind.config.js')), autoprefixer],
        },
    },
});
