import path from "path";
import { Configuration } from "webpack";
// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import * as webpack from 'webpack';
import * as webpackDevServer from 'webpack-dev-server';

const config: Configuration = {
  entry: "./src/reactIndex.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  devServer: {
    static: path.join(__dirname, "build"),
    compress: true,
    port: 4000,
  },
  // plugins: [
  //   new ForkTsCheckerWebpackPlugin({
  //     async: false,
  //     eslint: {
  //       files: "./src/**/*",
  //     },
  //   }),
  // ],
};

export default config;