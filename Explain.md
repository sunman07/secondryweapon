# 基础项目说明文档

## 项目目录
```shell
.
├── build  项目构建配置
├── config  开发相关配置
├── public  打包所需静态资源
├── vue.config.js  项目运行配置
└── src
    ├── service  AJAX请求
    └── assets  项目静态资源
        └── images  图片资源
    ├── components  业务组件
    ├── libs  封装工具函数
    ├── mock  mock模拟数据(暂时还没有)
    ├── router.js  路由配置
    ├── store.js  Vuex配置
    ├── vant.js  按需加载
    └── view  页面文件
```

## 说明
 1.配置项目的反向代理(vue.config.js)
``` shell
    // 反向代理
    proxy: {
      "/api": {
        target: "https://dev.xiaoyuanjijiehao.com:10010/",
        pathRewrite: {
          "^/api": "api"
        }
      }
    }
```
 1.更换Token(开发需要手动更换)（/lib/request.js）

 toekn获取地址：https://dev.xiaoyuanjijiehao.com:10443/

