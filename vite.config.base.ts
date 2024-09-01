import path from "path";
import { defineConfig } from "vite";

const NODE_ENV = process.env.NODE_ENV || "development";

const isEnvProduction = NODE_ENV === "production";
const isEnvDevelopment = NODE_ENV === "development";

const workDir = process.cwd();
// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [],
  define: {
    __DEV__: process.env.NODE_ENV !== "production",
  },
  build: {
    ...(isEnvProduction && { target: "es2015", cssTarget: "chrome61" }),
    ...(isEnvDevelopment && { minify: false }),
    outDir: "dist",
    lib: {
      formats: ["cjs", "es"],
      entry: path.resolve(workDir, "./src/index.tsx"),
      // UMD 格式的包名
      name: "MyLib",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "classnames"],
      output: {
        // CSS、图片等资源的文件名
        assetFileNames: "[name].[ext]",
        chunkFileNames: "[name].js",
      },
    },
  },
});
