import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    UserInfo: {},
  },
  mutations: {
    /* 示例 */
    saveUserInfo(state, payload) {
      state.UserInfo = payload;
    },
  }
});
export default store;