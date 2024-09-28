import path from "path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
const pathSrc = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8081,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ["vue", "vue-router"],
      dirs: [path.resolve(pathSrc, "composables")],

      resolvers: [
        ElementPlusResolver(),

        IconsResolver({
          prefix: "Icon",
        }),
      ],
      vueTemplate: true,
      dts: path.resolve(pathSrc, "typings", "auto-imports.d.ts"),
    }),
    Components({
      resolvers: [
        IconsResolver({
          enabledCollections: ["ep"],
        }),
        ElementPlusResolver(),
      ],

      dts: path.resolve(pathSrc, "typings", "components.d.ts"),
    }),

    Icons({
      autoInstall: true,
    }),
  ],
});
