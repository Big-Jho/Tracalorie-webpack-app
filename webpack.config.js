const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const loader = require("css-loader");
const { options } = require("cli");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
              publicPath: "fonts/",
            },
          },
        ],
      },

      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },

      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },

      {
        test: /\.js$/,
        exclude: /node-modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      title: "Tracalorie-Webpack App",
      path: path.resolve(__dirname, "dist"),
    }),

    new MiniCssExtractPlugin(),
  ],

  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    open: true,
    hot: true,
    compress: true,
    port: 3000,
  },
};
