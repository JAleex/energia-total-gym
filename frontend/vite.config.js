import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Las peticiones que empiezan por /api se envían a Django
    proxy: {
      "/api": process.env.API_URL || "http://localhost:8000",
    },
  },
});
