import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    minify: true,
    minifyWhitespace: true
  },
  build: {
    lib: {
      entry: './src/main.js',
      formats: ['iife'],
      name: 'GeoElements',
      fileName: (format)=>`geo-elements.${format}.js`
    }
  }
});
