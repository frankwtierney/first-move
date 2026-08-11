import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Static build, Netlify-ready. Relative base so it works from any path.
export default defineConfig({
  base: './',
  plugins: [react()],
})
