import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import autoExternal from "rollup-plugin-auto-external";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/es/index.js",
      format: "es",
    },
    {
      file: "dist/cjs/index.js",
      format: "cjs",
    },
  ],
  plugins: [
    autoExternal(), // 自动将 peerDependencies 和 dependencies 列为外部依赖
    resolve(), // 帮助 Rollup 查找外部模块
    commonjs(), // 将 CommonJS 模块转换为 ES6 模块
    typescript({
      tsconfig: "tsconfig.build.json",
    }), // 编译 TypeScript
  ],
};
