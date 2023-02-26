import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 3000 },
  preview: { port: 3000 },
  plugins: [
    tsconfigPaths(),
    react(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'Cryptic on paper',
          description:
            'Encrypt messages with simple ciphers that you could replicate on a piece of paper',
        },
      },
    }),
  ],
});
