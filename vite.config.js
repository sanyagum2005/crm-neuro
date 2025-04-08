import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic', // Автоматическое подключение runtime
    jsxImportSource: 'react' // Указываем источник для JSX
  })],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react/jsx-dev-runtime'
    ]
  },
  server: {
    port: 3000,
  }
})