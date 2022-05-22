const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
    publicPath: "/",
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            //pollyfill required
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: "defaults",
                  debug: true,
                  useBuiltIns: "usage",
                  corejs: 3,
                },
              ],
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },

      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
          },
          "css-loader",
        ],
      },

      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },

      {
        test: /\.(png|jpe?g|gif|svg)$/i,

        type: "asset",
      },
    ],
  },

  devServer: {
    hot: true,
    port: 3000,
    open: true,
  },
};
