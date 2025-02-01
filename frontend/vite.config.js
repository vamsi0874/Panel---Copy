// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'
// import path from "path"

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Ensure cross-platform compatibility
    },
  },
  build: {
    sourcemap: false, // Enable sourcemaps for better debugging (remove if not needed in production)
    outDir: 'dist', // Specify output directory for build files
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'), // Ensure entry point is correctly set
      },
    },
  },
  server: {
    port: 5174, // Specify development server port (optional)
    open: true, // Automatically open the app in the browser
  },
});
