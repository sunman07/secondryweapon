import Vue from 'vue'
import './vant'
import App from './App.vue'
import router from './router'
import "amfe-flexible";
import store from "./store";
Vue.config.productionTip = false
import request from './lib/request';
import moment from "moment";
import { Slider, } from 'element-ui';

Vue.use(Slider)
Vue.prototype.$moment = moment;

new Vue({
    router,
    request,
    store,
    
    render: h => h(App)
}).$mount('#app')