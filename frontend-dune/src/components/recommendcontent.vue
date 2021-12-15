<template>
  <div id="recommendroot">
    <div class="card-wrapper">
      <div class="headerbar">
        <a-button type="link" @click="refreshRecommend()">推荐</a-button>
        <a-button type="link" @click="showHotCars()">热门</a-button>
      </div>
      <a-divider class="mydivider"></a-divider>

      <a-skeleton class="loadStyle" active :loading="loading" v-if="loading"/>
      <a-skeleton class="loadStyle" active :loading="loading" v-if="loading"/>
      <a-skeleton class="loadStyle" active :loading="loading" v-if="loading"/>
      <a-skeleton class="loadStyle" active :loading="loading" v-if="loading"/>
      <a-skeleton class="loadStyle" active :loading="loading" v-if="loading"/>

      <RecycleScroller
        v-infinite-scroll="handleInfiniteOnLoad"
        style="height: 100%;"
        :items="carList"
        :item-size="240"
        key-field="seriesId"
        :infinite-scroll-disabled="busy"
        :infinite-scroll-distance="10"
      >
        <car-card class="carditem" slot-scope="{item}" :car="item"
                  :key="item.seriesId">
        </car-card>
      </RecycleScroller>

    </div>

    <div class="rightHalf">

      <div class="hotQuestion">
        <div class="headerRow">
          <div class="head">
            <a-icon type="fire"/>
            热门问题
          </div>
          <a-button @click="goQuestionPage('')" type="link" class="goQuestion">智能问答
            <a-icon type="right"/>
          </a-button>
        </div>


        <div class="questionBolck" v-for="item in hotQuestions" style="cursor:pointer"
             :key="item.id" @click="goQuestionPage(item.question)">
          <p class="questionInfo">{{item.question}}</p>
          <div class="questionFeet">
            <div class="feetInfo">{{item.time}}</div>
            <div class="feetInfo">{{item.like}}</div>
          </div>
          <a-divider class="mydivi"></a-divider>
        </div>

      </div>

    </div>

  </div>

</template>
<!--    {
        "id": 9405,
        "name": "奥迪A5",
        "electricType": "-",
        "batteryChargeTime": "-",
        "isNewEnergyType": "False",
        "engineDescription": "204-252马力",
        "environmentalStandards": "国VI",
        "maxHorsepower": "252",
        "brandName": "奥迪",
        "maxSpeed": "250km/h",
        "accelerationTime": "6.2-7.9s",
        "officialPrice": "37.18-55.18万",
        "seriesDisplacement": "2.0T",
        "carType": "中型车",
        "rechargeMileage": "-",
        "fuelForm": "汽油",
        "fuelLabel": "95#",
        "seatMaterial": "真皮",
        "electricDriveNumber": "-",
        "gearboxDescription": "7挡双离合",
        "fuelComprehensive": "-",
        "seriesId": 1455,
        "coverImg": "http://p9-dcd.byteimg.com/img/motor-img/59b5dc5beac30be00f59f916aa598dae~tplv-resize:960:0.jpg"
      },{
        "id": 9406,
        "name": "奥迪A5",
        "electricType": "-",
        "batteryChargeTime": "-",
        "isNewEnergyType": "False",
        "engineDescription": "204-252马力",
        "environmentalStandards": "国VI",
        "maxHorsepower": "252",
        "brandName": "奥迪",
        "maxSpeed": "250km/h",
        "accelerationTime": "6.2-7.9s",
        "officialPrice": "37.18-55.18万",
        "seriesDisplacement": "2.0T",
        "carType": "中型车",
        "rechargeMileage": "-",
        "fuelForm": "汽油",
        "fuelLabel": "95#",
        "seatMaterial": "真皮",
        "electricDriveNumber": "-",
        "gearboxDescription": "7挡双离合",
        "fuelComprehensive": "-",
        "seriesId": 1455,
        "coverImg": "http://p9-dcd.byteimg.com/img/motor-img/59b5dc5beac30be00f59f916aa598dae~tplv-resize:960:0.jpg"
      }-->
<script>

  import infiniteScroll from 'vue-infinite-scroll';
  import {RecycleScroller} from 'vue-virtual-scroller';
  import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

  const carCard = () => import("./carcard");


  import {mapActions, mapGetters, mapMutations} from 'vuex'

  export default {
    name: "recommendcontent",
    components: {carCard, RecycleScroller},
    data() {
      return {
        hotQuestions: [],
        busy: false,
        loading: true,
        carList: [],

        hotPage: 1,
        pageSize: 20,
        isHot: false,
      }
    },
    async mounted() {
      // if(this.userId === -1) await this.getUserInfo();

      await this.getRecommendCarList();
      this.loading = false;
      this.hotQuestions = this.hotquestions;
    },
    computed: {
      ...mapGetters([
        'userId',
        'hotquestions'
      ]),
    },
    methods: {
      ...mapActions([
        'getRecommendCarListByUserId',
        'getUserInfo',
        'getHotCarListImpl'
      ]),
      goQuestionPage(question) {
        document.getElementById('q').click();
        if (question === '') this.$router.push("/question");
        else this.$router.push("?question=" + question)

      },
      async handleInfiniteOnLoad() {
        if (this.isHot === false) {
          await this.getRecommendCarList();
        } else {
          await this.getHotCarList();
        }

      },
      async refreshRecommend() {
        console.log("刷新推荐信息");
        this.isHot = false;
        this.carList = [];
        this.loading = true;
        await this.getRecommendCarList();
        this.loading = false;
      },
      async showHotCars() {
        console.log("请求热门车型");
        this.carList = [];
        this.isHot = true;
        this.hotPage = 1;
        this.loading = true;
        await this.getHotCarList();
        this.loading = false;
      },
      async getHotCarList() {
        let _this = this;
        let data = {
          page: _this.hotPage,
          pagesize: _this.pageSize
        }
        let hotListRes = await this.getHotCarListImpl(data);
        this.carList = this.carList.concat(hotListRes);
        this.hotPage = this.hotPage + 1;
        console.log("得到了热门车" + hotListRes.length + " 条");
      },
      async getRecommendCarList() {
        if (this.userId == -1) {
          await this.getUserInfo();
        }
        let recommendListRes = await this.getRecommendCarListByUserId(this.userId);
        this.carList = this.carList.concat(recommendListRes);
        console.log("得到了推荐车" + recommendListRes.length + " 条");
      }
    }
  }
</script>

<style scoped>
  #recommendroot {
    display: flex;
    width: 100vw;
    height: 100vh;
    text-align: center;
    overflow: hidden;
    padding-top: 70px;
    background-image: url('../assets/zyb2.jpg');
    background-repeat: no-repeat;
    position: fixed;
    background-position: 0 0;
    background-size: 100% 100%;
  }

  .mydivider {
    margin: 0;
  }

  .loadStyle {
    background: white;
    padding: 20px;
    width: 100%;
  }

  .card-wrapper {
    background-color: rgba(255, 255, 255, 0.9);
    width: 64%;
    height: 80vh;
    margin-left: 5vw;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4)
  }

  .headerbar {
    background: white;
    display: flex;
    width: 100%;
    height: 70px;
    justify-content: left;
    align-items: center;
  }

  .rightHalf {
    margin-left: 40px;
    width: 25vw;
  }

  .userProfileConainer {
    height: 320px;
    width: 100%;
    margin-top: 15px;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4)
  }


  .hotQuestion {
    height: 620px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4)
  }

  .headerRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .head {
    font-size: 18px;
    font-weight: 40;
    color: black;
  }

  .goQuestion {
    font-size: 14px;
    font-weight: 20;
    color: rgb(151, 154, 168);
    padding: 0;
  }

  .questionBolck {
    width: 100%;
    height: 10vh;
    margin-bottom: 15px;
  }

  .mydivi {
    margin-top: 8px;
  }

  .questionInfo {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-align: left;
    margin-bottom: 5px;
  }

  .questionFeet {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

</style>
