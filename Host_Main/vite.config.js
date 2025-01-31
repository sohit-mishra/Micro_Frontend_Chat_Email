import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';

const CHAT_URL = process.env.VITE_CHAT || import.meta.env.VITE_CHAT;
const EMAIL_URL = process.env.VITE_EMAIL || import.meta.env.VITE_EMAIL;

if (!CHAT_URL || !EMAIL_URL) {
  console.error("❌ Missing environment variables! Make sure VITE_CHAT and VITE_EMAIL are set.");
  process.exit(1);
}

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'app',
      remotes: {
        remoteChat: CHAT_URL,
        remoteEmail: EMAIL_URL,
      },
      shared: ['react', 'react-dom'],
    }),
    {
      name: 'vite-plugin-reload-endpoint',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/__fullReload') {
            server.hot.send({ type: 'full-reload' });
            res.end('Full reload triggered');
          } else {
            next();
          }
        });
      },
    },
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
