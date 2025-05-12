import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import eslint from 'vite-plugin-eslint';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

const proxyOptions = {
  changeOrigin: true,
  timeout: 5000,
  proxyTimeout: 5000,
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const proxyHost = env.VITE_PROXY_HOST || 'localhost:8888';

  return {
    plugins: [react(), eslint({ failOnError: true }), tailwindcss(), svgr()],
    server: {
      allowedHosts: [
        '.ngrok-free.app', // Notice the leading dot for all subdomains
      ],
      proxy: {
        '/api': {
          target: `http://${proxyHost}`,
          ...proxyOptions,
        },
        '/websocket': {
          target: `ws://${proxyHost}`,
          ws: true,
          ...proxyOptions,
        },
        '/files': {
          target: `http://${proxyHost}`,
          ...proxyOptions,
        },
      },
    },
  };
});
