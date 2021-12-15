import {
  sendUserBehaviorInfoAPI,
  getRecommendCarListByUserIdAPI,
  getHotCarListImplAPI
} from '@/api/recommend'
import {message} from "ant-design-vue";


const recommend = {
  state: {
  },
  mutations: {

  },
  actions: {
    sendUserBehaviorInfo: async ({state, commit}, data) => {
      const res = await sendUserBehaviorInfoAPI(data);
      if (res) {
        // if(data.behaviorType === 1) message.success("点赞成功")
        // if(data.behaviorType === 2) message.success("已收藏")
        console.log("发送行为成功");
        return res;
      } else {
        console.log("发送行为失败")
      }
    },
    getRecommendCarListByUserId: async ({state, commit}, data) => {
      let res = await getRecommendCarListByUserIdAPI(data);
      if (res) {
        console.log("获得推荐内容res");
        return res;
      } else {
        console.log("获得推荐内容失败")
      }
    },
    getHotCarListImpl:async ({state, commit}, data) => {
      let res = await getHotCarListImplAPI(data);
      if (res) {
        console.log("获得热门车");
        return res;
      } else {
        console.log("获得热门车失败")
      }
    },
  }
};
export default recommend
