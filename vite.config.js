import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import PrettyModuleClassnames from "vite-plugin-pretty-module-classnames";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), PrettyModuleClassnames()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./testSetup.js",
  },
});
