import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import Unfonts from "unplugin-fonts/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Unfonts({
      custom: {
        families: [
          {
            name: "Public Sans",
            src: "./src/assets/fonts/PublicSans/*.woff2",
          },
        ],
      },
    }),
  ],
  resolve: {},
  server: {
    cors: {
      origin: "https://localhost:7206",
    },
  },
});
