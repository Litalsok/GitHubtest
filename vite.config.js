import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    server: {
        port: 4000,
        watch: {
            usePolling: true, // Use polling for file watching
        },
    }
    // Specify the root directory of your project
    // Optional: Define a base path if deploying to a sub-directory (e.g., GitHub Pages)
    // base: '/your-repo-name/',

    // Optional: Configure build output directory
    // build: {
    //   outDir: 'dist',
    // },

    // Optional: Alias for easier imports
    // resolve: {
    //   alias: {
    //     '@': path.resolve(__dirname, './src'),
    //   },
    // },
});