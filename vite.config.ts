import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
    open: true, // Automatically opens the browser
    strictPort: false, // If port 3002 is taken, it will try the next available port
  },
});
