import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { nextui } from "@nextui-org/react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nextui()],
  server: {
    port: 5300,
  },
});
