import Vue from 'vue'
import router from '@/router'
import {getToken, setToken, removeToken, setSecretToken, getSecretToken, removeSecretToken} from '@/utils/auth'
import {resetRouter} from '@/router'
import {message} from 'ant-design-vue'

import {
  loginAPI,
  registerAPI,
  getUserInfoAPI,
  updateUserInfoAPI,
  getuserpicAPI,
  logoutAPI
} from '@/api/user'

const user = {
  state: {
    userId: -1,
    userInfo: {},
    token: "",
    adduserimgVisible: false,
    userpic: ""
  },
  mutations: {
    reset_state: function (state) {
      state.token = '';
      state.userId = '';
      state.userInfo = {};
    },

    set_token: function (state, token) {
      state.token = token
    },
    set_email: (state, data) => {
      state.email = data
    },
    set_userId: (state, data) => {
      state.userId = data
    },
    set_userInfo: (state, data) => {
      state.userInfo = data;
    },
    set_adduserimgVisible: (state, data) => {
      state.adduserimgVisible = data
    },
    set_userpic: (state, data) => {
      state.userpic = data
    },
  },

  actions: {
    login: async ({dispatch, commit}, userData) => {
      // console.log(userData)
      const res = await loginAPI(userData);
      console.log(res)
      if (res) {
        setToken(res.id);
        setSecretToken(res.token);
        localStorage.setItem("token", res.token);
        localStorage.setItem("userId", res.id);
        commit('set_userInfo', res)
        commit('set_userId', res.id)
        dispatch('getUserInfo')
        router.push('/')
      } else {
        message.error('用户名或密码错误！')
      }
    },
    logout: async({ commit }) => {
      removeToken()
      removeSecretToken()
      commit('reset_state')
      resetRouter()
      const res = await logoutAPI();
    },
    register: async ({commit}, data) => {
      const res = await registerAPI(data)
      if (res) {
        message.success('注册成功')
      }else {
        message.error("账号已存在");
        console.log("账号已存在");
      }
    },
    getUserInfo({state, commit}) {
      return new Promise((resolve, reject) => {
        getUserInfoAPI(localStorage.getItem("userId")).then(response => {
          const data = response;
          if (!data) {
            router.push('/login');
            // reject('登录已过期，请重新登录')
          }
          commit('set_userInfo', data)
          commit('set_userId', data.id)
          resolve(data)
        }).catch(error => {
          // message.error('登录已过期，请重新登录')
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          });
          reject(error)
        })
      })
    },
    updateUserInfo: async ({state, dispatch}, data) => {
      const params = {
        id: state.userId,
        ...data,
      }
      const res = await updateUserInfoAPI(params)
      if (res) {
        message.success('修改成功')
        dispatch('getUserInfo')
      }
    },
    getuserpic: async ({state, commit}, data) => {

      const res = await getuserpicAPI(data)
      if (res) {
        commit('set_userpic', res)
      } else {
        var pic = {
          pic: null
        }
        commit('set_userpic', pic)
      }

    },

    // remove token
    resetToken({commit}) {
      return new Promise(resolve => {
        removeToken() // must remove  token  first
        commit('reset_state')
        resolve()
      })
    },
  }
}

export default user
