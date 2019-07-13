const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");

module.exports = {
  devServer: {
    port: 3000,
    progress: true,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    hot: true,
    open: true
  },
  mode: "development", // development  production
  entry: {
    index: "./src/index.js",
    other: "./src/other.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    splitChunks: {
      // 分割代码块
      cacheGroups: {
        // 缓存组
        common: {
          chunks: "initial",
          minSize: 0,
          minChunks: 2
        },
        vendor: {
          priority: 1,
          test: /node_modules/,
          chunks: "initial",
          minSize: 0,
          minChunks: 2
        }
      }
    },
    minimizer: [
      new TerserJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      hash: true,
      minify: {
        collapseWhitespace: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: "main.css"
    })
  ],
  module: {
    rules: [
      {
        test: require.resolve("jquery"),
        use: "expose-loader?$"
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: "file-loader"
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                ["@babel/plugin-proposal-class-properties", { loose: true }],
                "@babel/plugin-transform-runtime"
              ]
            }
          }
        ],
        include: path.resolve(__dirname, "src"), // 只寻找这个目录下的js
        exclude: /node_modules/ // 排除这个目录下的js
      },
      {
        // css-loader 解析@import语法，style-loader 把css插入到head标签中
        // laoder特点，功能单一，loader顺序 自右向左，自下向上
        test: /\.css$/,
        use: [
          // {
          //   loader: "style-loader",
          //   options: {
          //     insertAt: "top" // 把编译后的样式插入到上style标签的最上面
          //   }
          // },
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          // {
          //   loader: "style-loader",
          //   options: {
          //     insertAt: "top"
          //   }
          // },
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader" // 安装less 和 less-loader
        ]
      },
      {
        test: /\.styl$/,
        use: [
          // {
          //   loader: "style-loader",
          //   options: {
          //     insertAt: "top"
          //   }
          // },
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "stylus-loader" // 安装stylus 和 stylus-loader
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // {
          //   loader: "style-loader",
          //   options: {
          //     insertAt: "top"
          //   }
          // },
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader" // 安装sass 和 sass-loader
        ]
      }
    ]
  }
};
