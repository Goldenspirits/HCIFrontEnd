<template>
  <div id="root-question">
    <div class="leftSide">
      <div class="scroll-wrapper" id="py">
        <chat-item
          v-for="item in chatMessages"
          :key="item.key"
          :type="item.type"
          :message="item.message"
          :timestamp="item.timestamp"
          :displayedTime="item.displayedTime"
          :from="item.from"
          :userName="item.name"
        ></chat-item>
        <a-spin :spinning="spinning">
        </a-spin>
      </div>
      <a-input-search id="sender"
                      placeholder="Ask anything..."
                      size="default"
                      @search="asking"
                      v-model="content"
                      style="margin: 1em;width: 92%;">
        <a-button style="border-top-right-radius: 15px; border-bottom-right-radius: 15px;"
                  slot="enterButton" type="primary">Send
        </a-button>
      </a-input-search>
    </div>
    <div class="rightSide">
      <car-card class="cardItem" v-for="item in carList" :car="item"
                :key="item.seriesId">
      </car-card>
    </div>
  </div>
</template>

<script>
  const ChatItem = ()=>import("./chatItem.vue");
  const carCard = ()=>import("./carcard");
  import {mapActions, mapGetters, mapMutations} from 'vuex'


  export default {
    name: "question",

    data() {
      return {
        name: "USER",
        spinning: false,
        carList: [],
        lastTime: {},
        content: '',

      };
    },
    components: {
      "chat-item": ChatItem, carCard
    },
    computed: {
      ...mapGetters([
        'userId',
        'userInfo',
        'chatMessages'
      ])
    },
    async mounted() {
      // if()
      let urlstr = window.location.href;
      let question = "";
      if (urlstr.indexOf('?') !== -1) {//有参数
        question = this.$route.query.question;
        console.log("question: " + question);
        this.asking(question)
      }

      if(this.userId === -1) await this.getUserInfo();

      this.name = this.userInfo.username;

      let box = document.getElementsByClassName('scroll-wrapper')[0];
      box.scrollTop = box.scrollHeight;
      this.lastTime = this.chatMessages[this.chatMessages.length - 1].timestamp;
    },

    updated() {
      let box = document.getElementsByClassName('scroll-wrapper')[0];
      box.scrollTop = box.scrollHeight;
    },

    methods: {
      ...mapActions([
        'question',
        'getUserInfo'
      ]),
      async asking(e) {
        this.carList = [];
        let time = (parseInt(new Date() - this.lastTime) / 1000 / 60) <= 3
          ? '' : new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
        if (e !== '') {
          // 消息间隔超过3分钟，则显示时间
          this.lastTime = new Date();
          this.chatMessages.push({
            type: 1,
            message: e,
            key: this.chatMessages.length,
            from: 1,
            timestamp: new Date(),
            displayedTime: time,
            name: this.name
          });
        }
        this.spinning = true;
        this.content = '';
        let answer = await this.question({
          question: e,
          userId: this.userId
        });
        if (answer.state === 'SUCCESS') {
          this.carList = answer.carList;
        }
        answer.answer = answer.answer.replaceAll('\n','<br/>');
        answer.answer = answer.answer.replaceAll('null','');
        this.chatMessages.push({
          type: 1,
          message: answer.answer,
          key: this.chatMessages.length,
          from: 2,
          timestamp: new Date(),
          displayedTime: time,
          name:""
        });
        this.spinning = false;
      },
    },
  };
</script>

<style lang="scss">
  #root-question {
    text-align: left;
    padding-top: 80px;
    padding-left: 30px;
    background-image: url('../assets/zyb2.jpg');
    background-repeat: no-repeat;
    //background-size: cover;
    width: 100%;
    height: 100%;
    position: fixed;
    background-position: 0 0;
    background-size: 100% 100%;

  }

  .ant-input-group-addon {
    background-color: transparent;
  }

  #sender.ant-input {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }

  .scroll-wrapper {
    border-radius: 20px;
    padding: 15px;
    overflow: auto; // 非常关键
    height: 75vh;
  }

  .leftSide {
    /*border-radius: 30px;*/
    background-color: rgba(245, 248, 252, 0.95);

    /*border: solid black 2px;*/
    height: 85vh;
    width: 32vw;
    float: left;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
  }

  .rightSide {
    background-color: rgba(245, 248, 252, 0.95);

    border-radius: 0px;
    overflow: scroll;
    width: 60vw;
    height: 85vh;
    margin-left: 3vw;
    display: inline-block;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);

  }
</style>
