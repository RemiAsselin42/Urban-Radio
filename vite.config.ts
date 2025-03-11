import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Urban-Radio/", // Ajoutez cette ligne avec le nom de votre dépôt
});
