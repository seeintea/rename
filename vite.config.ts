import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import styleXPlugin from '@stylexjs/rollup-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), styleXPlugin({})],
})
