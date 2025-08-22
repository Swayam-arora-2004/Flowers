import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
// ...existing code...
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/Flowers/' : '/',
  server: {
    host: "::",
    port: 8080,
    allowedHosts: ["open-it.onrender.com"], // <-- Add this line
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
// ...existing code...
