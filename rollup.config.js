import babel from "rollup-plugin-babel";
import bundleSize from "rollup-plugin-bundle-size";

export default {
  input: "./lib/index.js",
  output: {
    file: "./dist/index.js",
    format: "esm"
  },
  plugins: [
    babel({
      exclude: "node_modules/**"
    }),
    bundleSize()
  ],
  external: ["react", "react-dom"]
};
