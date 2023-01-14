import path from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  publicDir: 'assets',
  resolve: {
    alias: {
      '@': path.resolve(path.resolve(), 'src'),
    },
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
    },
  },
  server: {
    port: 3030,
  },
  test: {
    exclude: [...configDefaults.exclude, './tests/**'],
    environment: 'jsdom',
  },
})
