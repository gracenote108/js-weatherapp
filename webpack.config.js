const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        // { from: "src/city.list.json", to: "city.list.json" },
        { from: "src/gifs", to: "gifs" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(gif)$/,
        loader: "url-loader",
      },
      {
        test: /\.(ttf|otf)$/,
        loader: "file-loader",
      },
    ],
  },
};
