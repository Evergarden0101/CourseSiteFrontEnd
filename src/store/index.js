import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
      userInfo:null,//用户状态集合
      isLogin:false,//用户是否登录
      messageNum:0
  },
  mutations:{
    setUserInfo(state,userInfo){
      state.userInfo = userInfo,
      state.isLogin = true
    },
    setMessageNum(state,num){
        state.messageNum = num
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })]
})
