<template>
  <div class="container">
    <div class="selectedcarCard-container">
      <div class="cardWrapper">
        <img class="img" v-lazy='this.car.coverImg'>
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
                查看图谱
              </a-button>
              <a-drawer
                :title="drawerTitle"
                width="1000px"
                placement="left"
                :closable="true"
                :visible="graphVisible"
                @close="onCloseGraph"
              >
                  <KG_Q style="margin: auto;" :graphData="graphData"></KG_Q>
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
                      value="small">
              <a-icon type="heart" theme="twoTone" two-tone-color="#e23b45"/>
              <span style="color: #e23b45">喜欢</span>
            </a-button>
            <a-button class="mybutton" @click="sendUserBehavior(2)" type="link"
                      value="small">
              <a-icon type="star" theme="twoTone" two-tone-color="#f9cf60"/>
              <span style="color: #f9cf60">收藏</span>
            </a-button>

          </div>
        </div>

      </div>
      <div :id='this.car.seriesId' class="radarEchars">
      </div>
    </div>
    <a-divider style="margin: auto"></a-divider>

  </div>
</template>

<script>
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  // import KG_Q from './kgInQuestion'
  const KG_Q = () => import('./kgInQuestion')
  export default {
    name: "selectcarcard",
    components: {KG_Q},
    props: {
      car: {},
    },
    data() {
      return {
        graphData: {},
        g6Spinning: false,
        drawerTitle: '',
        graphVisible: false,
        selector: {}
      };
    },
    async mounted() {
      this.drawerTitle = "Graph View of " + this.car.name;
      if (this.userId === -1) await this.getUserInfo();
      this.echartsInit();
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
        let _this = this;
        let data = {
          userid: this.userId,
          carid: _this.car.seriesId,
          behaviorType: behaviortype,
        };
        this.sendUserBehaviorInfo(data);
      },

      async showG(id) {
        this.g6Spinning = true;
        this.graphData = await this.getCarGraph(id);
        this.graphVisible = true;
        this.g6Spinning = false;
        let _this = this;
        let data = {
          userid: this.userId,
          carid: _this.car.seriesId,
          behaviorType: 0,
        };
        this.sendUserBehaviorInfo(data);
      },
      onCloseGraph() {
        this.graphVisible = false
      },
      echartsInit: function () {
        console.log("开始渲染echarts")
        console.log(this.showed);
        let roseCharts = document.getElementById(this.car.seriesId + '');
        let myChart = this.$echarts.init(roseCharts);
        myChart.setOption({
          backgroundColor: 'white',
          radar: {
            // shape: 'circle',
            nameGap: 5,
            center: ['50%', '50%'],
            radius: '70%',
            indicator: [
              {name: '动力', max: 5, color: 'rgba(0, 0, 0, 0.55)'},
              {name: '内饰', max: 5, color: 'rgba(0, 0, 0, 0.55)'},
              {name: '配置', max: 5, color: 'rgba(0, 0, 0, 0.55)'},
              {name: '空间', max: 5, color: 'rgba(0, 0, 0, 0.55)'},
              {name: '舒适', max: 5, color: 'rgba(0, 0, 0, 0.55)'},
              {name: '外观', max: 5, color: 'rgba(0, 0, 0, 0.55)'}
            ],
          },
          grid: {
            position: 'center',
          },
          series: [{
            type: 'radar',
            data: [
              {
                value: [this.car.scorePower, this.car.scoreInnerLook, this.car.scoreCfg, this.car.scoreCfg, this.car.scoreCfg, this.car.scoreCfg],
                name: '各项评分',
                itemStyle: {
                  normal: {
                    color: 'rgb(230, 32, 33)',

                  },
                },
              },
            ]
          }],
        })
      },

    }
  }
</script>

<style scoped>
  .selectedcarCard-container {
    display: flex;
  }

  .radarEchars {
    height: 240px;
    width: 220px;
    background-color: white;
  }

  .ant-divider-horizontal {
    margin: 0;
  }

  .cardWrapper {
    display: flex;
    height: 240px;
    width: 90%;
    background-color: #ffffff;
    padding: 12px;
    order-radius: 3px;
  }

  .img {
    height: 84%;
    width: 35%;
    border-radius: 5px;
    margin: 1em;
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
    text-align: center;
    vertical-align: middle;
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
