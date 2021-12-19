import {
  sendUserBehaviorInfoAPI,
  getRecommendCarListByUserIdAPI,
  getHotCarListImplAPI
} from '@/api/recommend'
import {
  getSellerListAPI,
  getSeriesCarListAPI,
  sentAskingOrderAPI
} from '@/api/select'
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
    getSeriesCarListImpl:async ({state, commit}, data) => {
      let res = await getSeriesCarListAPI(data);
      if (res) {
        console.log("请求成功 getSeriesCarListImpl");
        console.log(res)
        return res;
      } else {
        console.log("获得失败 getSeriesCarListImpl")
      }
    },
    getSellerListImpl:async ({state, commit}, data) => {
      let res = await getSellerListAPI(data);
      if (res) {
        console.log("请求成功 getSellerListImpl");
        console.log(res)
        return res;
      } else {
        console.log("获得失败 getSellerListImpl")
      }
    },
    sentAskingOrderImpl:async ({state, commit}, data) => {
      console.log("发送询价请求")
      console.log(data);
      let res = await sentAskingOrderAPI(data);
      console.log(res)
      if (res) {
        message.success('已提醒4S店尽快联系您')
      }else {
        message.success('已提醒4S店尽快联系您')
        console.log("询价失败")
      }
    },
  }
};
export default recommend
