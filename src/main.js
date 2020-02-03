import Vue from 'vue'
import './vant'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import "amfe-flexible";

Vue.config.productionTip = false
import request from './lib/request'

new Vue({
    router,
    request,
    render: h => h(App)
}).$mount('#app')