import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import autoExternal from "rollup-plugin-auto-external";

export default {
  input: "lib/grammar.js", // Nearley 生成的解析器文件
  output: {
    file: "lib/grammar.mjs", // 输出 ES 模块文件
    format: "es", // 指定输出格式为 ES 模块
  },
  plugins: [
    autoExternal(), // 自动将 peerDependencies 和 dependencies 列为外部依赖
    resolve(), // 帮助 Rollup 查找外部模块
    commonjs(), // 将 CommonJS 模块转换为 ES 模块
  ],
};
