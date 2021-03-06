const { externals, cdn } = require("./build/utils");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
// gzip --start
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzip = true; // 是否使用gzip
const productionGzipExtensions = ["js", "css"]; // 需要gzip压缩的文件后缀

module.exports = {
  /*基础地址*/
  publicPath: "./",
  lintOnSave: process.env.NODE_ENV !== "production",
  productionSourceMap: false,
  filenameHashing: true,
  devServer: {
    port: 8081,
    overlay: {
      warnings: true,
      errors: true
    },
    // 反向代理
    proxy: {
      "/api": {
        target: "https://dev.xiaoyuanjijiehao.com:10010/",
        pathRewrite: {
          "^/api": "api"
        }
      },
      '/h5api': {
        target: 'https://dev.xiaoyuanjijiehao.com:10010/',
        pathRewrite: {
          '^/h5api': 'h5api',
        },
      },
      '/auth': {
        target: 'https://dev.xiaoyuanjijiehao.com:10010/',
        pathRewrite: {
          '^/auth': 'auth',
        },
      },
      '/antlinkerapp': {
        //target: 'http://192.168.175.125:999',
        //target:'https://ytvconline.xiaoyuanjijiehao.com:15085',
        //target: "https://h5apitest.xiaoyuanjijiehao.com:9999/",
        //target: 'https://dev.xiaoyuanjijiehao.com:10010',
        target: 'https://dev.xiaoyuanjijiehao.com:10010/',
        changeOrigin: true,
        //target: 'http://192.168.175.6:9085',
        // onProxyReq: (proxyReq) => {
        //   proxyReq.setHeader("AccessToken", token);
        //   // or log the req,
        // },
        //target: 'http://127.0.0.1:9085',
        pathRewrite: {
          '^/': '/',
        },
      },
      //代理到服务器 访问服务器APP应用
      /* '/': {
        //target: 'http://192.168.175.125:999',
        //target:'https://ytvconline.xiaoyuanjijiehao.com:15085',
        // target: "https://h5apitest.xiaoyuanjijiehao.com:9999/",
        // target: 'https://dev.xiaoyuanjijiehao.com:10010',
        target: 'https://dev.xiaoyuanjijiehao.com:10010/',
        changeOrigin: true,
        //target: 'http://192.168.175.6:9085',
        // onProxyReq: (proxyReq) => {
        //   proxyReq.setHeader("AccessToken", token);
        //   // or log the req,
        // },
        //target: 'http://127.0.0.1:9085',
        pathRewrite: {
          '^/': '/',
        },
      }, */
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
  /*   config.optimization = {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace("@", "")}`;
            }
          }
        }
      }
    }; */
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
    [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
      config.output // Modify output settings
        .filename("main.js");
    return config;
  },

  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          require("postcss-pxtorem")({
            // 把px单位换算成rem单位
            rootValue: 37.5, // vant官方使用的是37.5
            selectorBlackList: ["vant"], // 忽略转换正则匹配项
            propList: ["*"]
          })
        ]
      },
      less: {
        modifyVars: {
          "font-size-sm": "13px",
          "font-size-md": "15px",
          "font-size-lg": "17px",
          "button-primary-background-color": "#FC5006",
          "button-primary-border-color": "#FC5006",
          green: "#FBB200"
        }
      }
    }
  }
};
