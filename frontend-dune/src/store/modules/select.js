import {
  changeSelectionAPI,
  getCarGraphAPI
} from '@/api/select'



const select = {
  state: {
  },
  mutations: {
  },
  actions: {
    changeSelection: async ({state, commit}, data) => {
      const res = await changeSelectionAPI(data);
      if (res) {
        console.log("筛选成功");
        return res;
      } else {
        console.log("获取失败")
      }
    },
    getCarGraph: async ({state, commit}, id) => {
      const res = await getCarGraphAPI(id);
      if (res) {
        return res.content;
      } else {
        console.log("获取汽车图谱失败")
      }
    },
  }
};
export default select
