import path from "path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import vueDevTools from "vite-plugin-vue-devtools";
const pathSrc = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
//mode 是vite的命令行参数
export default defineConfig(({ mode }) => {
  return {
    server: {
      port: 8081,
    },
    base: loadEnv(mode, process.cwd()).VITE_BASE_URL,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    plugins: [
      vueDevTools(),
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
  };
});
