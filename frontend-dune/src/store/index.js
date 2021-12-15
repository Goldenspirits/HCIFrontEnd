import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import question from "./modules/question";
// import home from "./modules/home";
import user from "./modules/user";
// const user =()=>import("./modules/user")
import select from "./modules/select";
// const select =()=>import("./modules/select")
import userPortrait from "./modules/userPortrait";
// const userPortrait =()=>import("./modules/userPortrait")
import recommend from "./modules/recommend"
// const recommend =()=>import("./modules/recommend")

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    question,
    // home,
    user,
    userPortrait,
    select,
    recommend
  },
  state: {
    isLogin: false,
  },
  mutations: {
    //保存登录状态
    userStatus(state, flag) {
      state.isLogin = flag
    },
  },
  actions: {
    //获取登录状态
    userLogin({commit}, flag) {
      commit("userStatus", flag)
    },
  },
  getters
})

