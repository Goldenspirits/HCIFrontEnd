<template>
  <div class="carCard-container">
    <div class="cardWrapper">
      <img class="img"  v-lazy='this.car.coverImg'>
<!--      <van-image class="img" :src='this.car.coverImg'  lazy-load/>-->
      <div class="carInformation">
        <div class="mainInfo">
          <H1 class="name">{{this.car.name}}</H1>
          <div class="rolContainer">
            <div class="priceContainer">
              <span class="officialPrice">厂商指导价:</span>
              <div class="price">{{this.car.officialPrice}}</div>
            </div>
            <a-spin :spinning="g6Spinning">
            </a-spin>
            <a-button value="small" class="relevant" icon="share-alt" @click="showG(car.seriesId)">
              询底价
            </a-button>
            <a-drawer
              :title="drawerTitle"
              width="1000px"
              placement="left"
              :closable="true"
              :visible="graphVisible"
              @close="onCloseGraph"
            >
              <KG_Q style="margin: auto;" :imgAddress="this.car.coverImg" :carSeriesId="this.car.seriesId" :carSeries="this.car.name"></KG_Q>
            </a-drawer>
          </div>
      </div>
      <div class="configurationParameters">
        <p class="param">级别: <span class="paramInfo">{{ this.car.carType }}</span></p>
        <p class="param">排量: <span class="paramInfo">{{ this.car.seriesDisplacement }}</span></p>
        <p class="param">环保标准: <span class="paramInfo">{{ this.car.environmentalStandards }}</span></p>
        <p class="param">动力: <span class="paramInfo">{{ this.car.engineDescription }}</span></p>
        <p class="param">加速时间: <span class="paramInfo">{{ this.car.accelerationTime }}</span></p>
        <p class="param">变速箱: <span class="paramInfo">{{ this.car.gearboxDescription }}</span></p>
        <p class="param">燃油标号: <span class="paramInfo">{{ this.car.fuelLabel }}</span></p>
        <p class="param">能源类型: <span class="paramInfo">{{ this.car.fuelForm }}</span></p>
        <p class="param">座椅材质: <span class="paramInfo">{{ this.car.seatMaterial }}</span></p>
      </div>
      <div class="actionBar">
        <a-button class="mybutton" @click="sendUserBehavior(1)" type="link"
                  value="small" >
          <a-icon type="heart" theme="twoTone" two-tone-color="#e23b45"/><span style="color: #e23b45">喜欢</span>
        </a-button>
        <a-button class="mybutton" @click="sendUserBehavior(2)" type="link"
                  value="small">
          <a-icon type="star" theme="twoTone" two-tone-color="#f9cf60" /><span style="color: #f9cf60">收藏</span>
        </a-button>

      </div>
    </div>

  </div>
    <a-divider style="margin: auto"></a-divider>

  </div>
</template>

<script>
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  // import KG_Q from './kgInQuestion'
  const KG_Q=()=>import('./kgInQuestion')




  export default {
    name: "carcard",
    components: {KG_Q},
    props: {
      car: {},
    },
    data() {
      return {
        graphData:{},
        g6Spinning: false,
        drawerTitle: '',
        graphVisible: false,
        selector: {}
      };
    },
    async mounted() {
      this.drawerTitle = "询底价: " + this.car.name;
      if(this.userId === -1) await this.getUserInfo();
    },
    computed: {
      ...mapGetters([
        'userId'
      ])
    },
    methods: {
      ...mapActions([
        'getCarGraph',
        'sendUserBehaviorInfo',
        'getUserInfo'
      ]),
      async sendUserBehavior(behaviortype) {
        let _this=this;
        let data = {
          userid: this.userId,
          carid: _this.car.seriesId,
          behaviorType: behaviortype,
        };
        this.sendUserBehaviorInfo(data);
        if(behaviortype===1){
          this.$message.info(
            { content: "喜欢成功", duration: 2, icon: <a-icon type="heart" theme="twoTone" two-tone-color="#e23b45"/>}
          );
        }else if(behaviortype===2){
          this.$message.info(
            { content: "收藏成功", duration: 2, icon: <a-icon type="star" theme="twoTone" two-tone-color="#f9cf60" />}
          );
        }

      },

      async showG(id) {
        this.graphVisible = true;
        this.g6Spinning = false;
        let _this = this;
        let data = {
          userid: this.userId,
          carid: _this.car.seriesId,
          behaviorType: 0,
        };
        this.sendUserBehaviorInfo(data);

        // 构造需要的内容

        this.selectedCar={
          imgAddress:_this.car.coverImg,
          carSeries:_this.car.name,
          carSeriesId:_this.car.seriesId
        }
        console.log("车辆信息")
        console.log(this.selectedCar);


      },
      onCloseGraph() {
        this.graphVisible = false
      }

    }
  }
</script>

<style scoped>
  .ant-divider-horizontal {
    margin: 0;
  }

  .cardWrapper {
    display: flex;
    height: 240px;
    width: 100%;
    background-color: #ffffff;
    padding: 12px;
    order-radius: 3px;
  }

  .img {
    height: 84%;
    width: 30%;
    border-radius: 5px;
    margin: 1.5em;
  }

  .carInformation {
    margin-left: 15px;
    width: 65%
  }

  .mainInfo {
    padding-left: 15px;
    padding-right: 15px;

  }

  .name {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    line-height: normal;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 600;
    height: 20px;
    margin-top: .5em;
  }

  .priceContainer {
    display: flex;
    float: left;
    align-items: center;
  }

  .officialPrice {
    font-size: 10px;
    font-weight: 300;
    line-height: 20px;
    margin-right: 10px;
  / / margin-top: - 7 px;
    margin-top: 2px;
    color: rgb(151, 154, 168);
  }

  .price {
    font-size: 18px;
    font-weight: 400;
    vertical-align: top;
    color: rgb(230, 32, 33);
  }

  .rolContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 98%
  }

  .relevant {
    background-color: #a51f1f;
    color: white;
  }

  .configurationParameters {
    position: relative;
    width: 98%;
    height: 90px;
    margin-top: 16px;
    padding: 16px;
    border-radius: 2px;
    background-color: rgb(247, 248, 252);
  }

  .param {
    text-align:center;
    vertical-align:middle;
    font-size: 9px;
    line-height: 14px;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    width: 33.33%;
    height: 25%;
  }

  .paramInfo {
    color: rgb(31, 33, 41);
  }

  .actionBar {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    margin: 0 10px -10px;
    justify-content: space-around;
  }

  .mybutton {
    margin-left: 24px;
    font-size: 14px;
  }
</style>
