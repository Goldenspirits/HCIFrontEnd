import {
  questionAPI
} from '@/api/question'


const file = {
  state: {
    chatMessages: [
      {
        type: 1,
        key: 0,
        message: "能不能介绍一下奔驰E级？",
        from: 1,
        timestamp: new Date(),
        displayedTime: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
        name:"USER"
      },
      {
        type: 1,
        key: 1,
        message: "以下是您所查找的车型介绍： " +"<br>"+
          "=======================" +"<br>"+
          "车型：奔驰E级" +"<br>"+
          "品牌：奔驰" +"<br>"+
          "类型：中大型车" +"<br>"+
          "指导价格：43.08-64.28万" +"<br>"+
          "驱动类型：" +"<br>"+
          "能源类型：汽油" +"<br>"+
          "变速箱类型：9挡手自一体" +"<br>"+
          "(电动车)充电时间：-" +"<br>"+
          "(电动车)续航时间：-" +"<br>"+
          "(油车)排量：1.5T 2.0T" +"<br>"+
          "综合评分：4.773087071240106''" ,
        from: 2,
        timestamp: new Date(),
        displayedTime: '',
        name:""
      },
    ],
    hotquestions:[

    {
      id:1,
      question:"能不能推荐一下纯电动车？",
      time:"今天",
      like:"点赞: 84人",
    },
    {
      id:2,
      question:"推荐一些一百万左右保时捷的车？",
      time:"1天前",
      like:"点赞: 57人",
    },
    {
      id:3,
      question:"能不能介绍一下奔驰E级？",
      time:"1天前",
      like:"点赞: 35人",
    },
      {
        id:4,
        question:"想问一下奥迪A4L和宝马3系哪个好",
        time:"3天前",
        like:"点赞: 73人",
      },
      {
        id:5,
        question:"能不能推荐十万左右的大众车？",
        time:"4天前",
        like:"点赞: 109人",
      },
    ],
  },
  mutations: {
    set_message: (state, data) => {
      state.chatMessages = data
    },

  },
  actions: {
    question: async ({state, commit}, data) => {
      const res = await questionAPI(data);
      if (res) {
        console.log(res);
        return res;
      } else {
        console.log("获取失败")
      }
    }
  }
}
export default file
