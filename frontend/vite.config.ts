import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import Unocss from "unocss/vite";
import presetIcons from "@unocss/preset-icons";
import presetWind from "@unocss/preset-wind";
import transformerDirective from "@unocss/transformer-directives";
//TODO: upgrade
// import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    Unocss({
      transformers: [transformerDirective()],
      presets: [
        presetWind(),
        presetIcons({
          prefix: "i-",
          extraProperties: {
            display: "inline-block",
            "vertical-align": "middle",
          },
        }),
      ],
    }),
    react(),
    viteCompression(),
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      devOptions: {
        enabled: true,
      },
      includeAssets: ["dope.svg"],
      manifest: {
        name: "Hook",
        short_name: "Hook",
        icons: [
          {
            src: "pwa_192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "pwa_512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        start_url: "/",
        theme_color: "#FBF6F1",
        background_color: "#FBF6F1",
        display: "fullscreen",
      },
    }),
  ],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@modules": path.resolve(__dirname, "src/modules"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@router": path.resolve(__dirname, "src/router"),
      "@store": path.resolve(__dirname, "src/store"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@components": path.resolve(__dirname, "src/components"),
      "@service": path.resolve(__dirname, "src/service"),
      "@cusTypes": path.resolve(__dirname, "src/types"),
      // '@i18n': path.resolve(__dirname, 'src/i18n'),
    },
  },
  build: {
    // rollupOptions: {
    //   plugins: [visualizer()],
    // },
    target: ["esnext"],
  },
});
