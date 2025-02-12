import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote_Email",
      filename: "remoteEntry.js",
      exposes: {
        "./Email": "./src/App",
      },
      shared: ["react", "react-dom"],
    }),
    {
      name: "vite-plugin-notify-host-on-rebuild",
      apply(config, { command }) {
        return Boolean(command === "build" && config.build?.watch);
      },
      async buildEnd(error) {
        if (!error) {
          try {
            await fetch("http://localhost:5000/__fullReload");
          } catch (e) {
            console.log(e);
          }
        }
      },
    },
  ],
  define: {
    "import.meta.env.VITE_EMAILJS_SERVICE_ID": JSON.stringify(process.env.VITE_EMAILJS_SERVICE_ID),
    "import.meta.env.VITE_EMAILJS_TEMPLATE_ID": JSON.stringify(process.env.VITE_EMAILJS_TEMPLATE_ID),
    "import.meta.env.VITE_EMAILJS_USER_ID": JSON.stringify(process.env.VITE_EMAILJS_USER_ID),
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
