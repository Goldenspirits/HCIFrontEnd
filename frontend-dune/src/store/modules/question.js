import {
  questionAPI
} from '@/api/question'


const file = {
  state: {
    chatMessages: [
      {
        type: 1,
        key: 0,
        message: "ask",
        from: 1,
        timestamp: new Date(),
        displayedTime: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
        name:"USER"
      },
      {
        type: 1,
        key: 1,
        message: "answer",
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
      question:"能不能介绍一下介绍一下奔驰E级？",
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
