import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      // exportAsDefault: true,
      // svgrOptions: {
      //   icon: true,
      // },

      // این تنظیمات را امتحان کنید
      // esbuildOptions: {
      //   loader: 'jsx',
      // },
      // یا نسخه ساده‌تر:
      svgrOptions: {
        icon: true,
        ref: true,
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "./src/index.scss";`
      }
    }
  }
});
