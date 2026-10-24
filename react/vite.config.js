import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { devQRPlugin} from "react-dev-qr";

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves the site from /<repo-name>/
  build: {
    outDir: "build"
  },
  base: "",
  plugins: [react(), tailwindcss(), devQRPlugin()],
})