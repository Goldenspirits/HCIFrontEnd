import {getUserPortraitAPI, getUserBookAPI, cancelBookAPI, wordCloudAPI} from '@/api/userPortrait'

import {message} from 'ant-design-vue'


const userPortrait = {
  state: {
    portrait: {nodes: null, edges: null},
    word_Cloud: {
      index: 0,
      content:
        [ ]
    }
  },
  mutations: {
    set_userPortrait: function (state, data) {
      state.portrait = data.content;
      state.portrait.nodes.forEach((node) => {
        node.id = node.id.toString();
      });
      state.portrait.edges.forEach((edge) => {
        edge.source = edge.source.toString();
        edge.target = edge.target.toString();
      });

    },
    set_wordCloud: function (state, data) {
      data.forEach((node)=>{
        node.value = Math.sqrt(node.value)
      });
      state.word_Cloud.index = Math.random();
      state.word_Cloud.content = data;
      console.log(state.word_Cloud.content)
      // alert(Object.keys(state.word_Cloud.content[0]).length)
    },

  },
  actions: {
    getUserPortrait: async ({state, commit}, userId) => {
      const res = await getUserPortraitAPI(userId);
      if (res) {
        commit('set_userPortrait', res);
        // return res;
      } else {
        console.log("获取用户画像失败")
      }
    },
    getUserBook: async ({state, commit}, userId) => {
      const res = await getUserBookAPI(userId);
      if (res) {

        return res;
      } else {
        console.log("获取用户收藏失败")
      }
    },
    cancelUserBook: async ({state, commit}, data) => {
      const res = await cancelBookAPI(data);
      if (res) {
        message.success('取消收藏成功')
      } else {
        console.log("获取用户收藏失败")
      }
    },
    getWordCloud: async ({state, commit}, data) => {
      const res = await wordCloudAPI(data);
      if (res) {
        commit('set_wordCloud', res)
        return res;
      } else {
        console.log("获取词云失败")
      }
    },

  }
};
export default userPortrait
