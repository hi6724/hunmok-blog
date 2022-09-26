import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    commonjsOptions: {
      strictRequires: true,
      ignoreGlobal: true,
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        globals: {
          react: "react",
        },
      },
    },
  },
});
