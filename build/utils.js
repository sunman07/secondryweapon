//cdn地址
const cdnBaseHttp = "https://h5public.xiaoyuanjijiehao.com/";
//排除内容
exports.externals = {
  vue: "Vue",
  "vue-router": "VueRouter",
  "axios": "axios",
  "vuex": "Vuex",
  "moment": "moment",
//   'element-ui': 'element-ui',
};

exports.cdn = {
  css: [],
  js: [
    /*放插件的cdn地址(国内比较常用的bootcdn.com)*/
    `${cdnBaseHttp}vue/vue.min.js`,
    `${cdnBaseHttp}vue/vue-router.min.js`,
    `${cdnBaseHttp}vue/axios.min.js`,
    `${cdnBaseHttp}vue/vuex.min.js`,
    `${cdnBaseHttp}moment/moment.min.js`,
    // `https://unpkg.com/element-ui/lib/index.js`
  ]
};
//获取版本号
exports.getModulesVersion = () => {
    let mvs = {};
    let regexp = /^npm_package_.{0,3}dependencies_/gi;
    for (let m in process.env) { // 从node内置参数中读取，也可直接import 项目文件进来
        if (regexp.test(m)) { // 匹配模块
            // 获取到模块版本号
            mvs[m.replace(regexp, '').replace(/_/g, '-')] = process.env[m].replace(/(~|\^)/g, '');
        }
    }
    return mvs;
};
exports.getExternalModules = config => {
    let externals = {}; // 结果
    let dependencieModules = this.getModulesVersion(); // 获取全部的模块和版本号
    config = config || this.externalConfig; // 默认使用utils下的配置
    config.forEach(item => { // 遍历配置
        if (item.name in dependencieModules) {
            let version = dependencieModules[item.name];
            // 拼接css 和 js 完整链接
            item.css = item.css && [this.cdnBaseHttp, item.name, version, item.css].join('/');
            item.js = item.js && [this.cdnBaseHttp, item.name, version, item.js].join('/');
            externals[item.name] = item.scope; // 为打包时准备
        } else {
            throw new Error('相关依赖未安装，请先执行npm install ' + item.name);
        }
    });
    return externals;
};
