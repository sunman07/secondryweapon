import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    UserInfo: {},
    Location:''
  },
  mutations: {
    /* 保存用户信息 */
    saveUserInfo(state, payload) {
      state.UserInfo = payload;
    },
    /* 保存用户位置 */
    saveLocation(state, payload) {
      state.Location = payload;
    }
  }
});
export default store;