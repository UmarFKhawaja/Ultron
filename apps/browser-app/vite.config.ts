/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/browser-app',
  server: {
    port: 3080,
    host: 'localhost'
  },
  preview: {
    port: 3080,
    host: 'localhost'
  },
  plugins: [
    react(),
    nxViteTsPaths()
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //   plugins: [
  //     nxViteTsPaths()
  //   ],
  // },
  build: {
    outDir: '../../dist/apps/browser-app',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  define: {
    'import.meta.vitest': undefined
  }
});
