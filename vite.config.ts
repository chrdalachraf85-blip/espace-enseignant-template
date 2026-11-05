import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/espace-enseignant-template/',
  plugins: [
    tailwindcss(),
  ],
})
