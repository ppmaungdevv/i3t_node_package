import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './index.js',
      name: 'i3t',
      fileName: (format) => {
            // `i3t.${format}.js`
            switch (format) {
                case 'es':
                  return `i3t.es.js`;
                case 'cjs':
                  return `i3t.cjs`;
                default:
                  throw new Error(`Unsupported format: ${format}`);
            }
        },
      formats: ['es', 'cjs'],  // Specify both ES and CommonJS formats
    },
    rollupOptions: {
      external: [],  // List any external dependencies here
      output: {
        globals: {},  // Define global variables for external dependencies if needed
      },
    },
    sourcemap: true,  // Enable source maps for debugging
  },
});
