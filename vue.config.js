const {externals, cdn} = require("./build/utils");
const autoprefixer = require("autoprefixer");
// gzip --start
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzip = true; // 是否使用gzip
const productionGzipExtensions = ['js', 'css']; // 需要gzip压缩的文件后缀
const token = "7YBQ0MOVN7CVTAWFR_L5VG";
// gzip --end
module.exports = {
  /*基础地址*/
  publicPath: "./",

  lintOnSave: process.env.NODE_ENV !== "production",
  productionSourceMap: false,
  filenameHashing: true,

  pwa: {
    themeColor: "#FFC000",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      navigateFallback: "/index.html",
      runtimeCaching: [
        {
          urlPattern: "/api",
          handler: "networkFirst",
          options: {
            networkTimeoutSeconds: 20,
            cacheName: "antlinker-api-cache",
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  },

  devServer: {
    port: 8081,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      "/api": {
        target: "https://dev.xiaoyuanjijiehao.com:10010/",
        //target: 'http://127.0.0.1:9085',
        pathRewrite: {
          "^/api": "api"
        },
        onProxyReq: proxyReq => {
          proxyReq.setHeader("AccessToken", token);
          // or log the req,
        }
      }
    }
    //disableHostCheck: true
  },

  configureWebpack: config => {
    const myConfig = {};
    //线上环境
    if (process.env.NODE_ENV === "production") {
      console.log("这是生产模式...");
      myConfig.externals = externals;
      // gzip
      //  构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      productionGzip &&
        config.plugins.push(
          new CompressionWebpackPlugin({
            test: new RegExp(
              "\\.(" + productionGzipExtensions.join("|") + ")$"
            ),
            threshold: 8192,
            minRatio: 0.8
          })
        );
    }
    if (process.env.NODE_ENV === "development") {
      console.log("开发模式");
    }
    return myConfig;
  },

  chainWebpack: config => {
    // 使用cdn
    config.plugin("html").tap(args => {
      if (process.env.NODE_ENV === "production") {
        args[0].cdn = cdn;
      }
      return args;
    });
    config.output // Modify output settings
      .filename("main.js");
    return config;
  },

  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer()
        ]
      }
    }
  }
};
