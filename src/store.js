import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    UserInfo: {},
    FlowList:[]
  },
  mutations: {
    /* 保存用户信息 */
    saveUserInfo(state, payload) {
      state.UserInfo = payload;
    }
  }
});
export default store;