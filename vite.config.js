/* eslint-disable import/no-extraneous-dependencies, import/no-anonymous-default-export, import/no-unused-modules */
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
      fileName: (format) => {
        return `geo-elements.${format}.js`;
      }
    }
  }
});
