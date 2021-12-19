<template>
  <div>
    <a-row>
      <a-col :span="12">
        <div class="inquiryContainer">
          <div class="quiryBar" style="width: 100%;height: 250px">
            <div class="carbar" style="width: 100%;height: 100px">

                <div class="carImgContainer" style="width: 35%;height: 80px">
                  <img class="carImg" :src="imgAddress" >
                </div>
                <div class="carType"  style="width: 60%;height: 80px">
                  <div class="carSeries" style="width: 90%;font-size: 24px;font-weight: 300;color: #1A1A1A" >
                    {{carSeries}}
                  </div>
                  <a-select dropdownMatchSelectWidth="true"  default-value="lucy" style="width: 90%;margin-top: 10px" @change="handleChange">
                    <a-select-option v-for="carid in carTypeIds" :key="carid" :value="carid">
                      {{ carid }}
                    </a-select-option>
                  </a-select>
                </div>

            </div>
            <div  style="width: 100%;height: 40px">
                <label style="width:35%;margin-left: 20%">选择城市</label>
                <a-select dropdownMatchSelectWidth="true"  default-value="lucy" style="width: 54%;float: right;margin-right: 6%" @change="handleChange">
                  <a-select-option v-for="carid in carTypeIds" :key="carid" :value="carid">
                    {{ carid }}
                  </a-select-option>
                </a-select>
            </div>
            <div  style="width: 100%;height: 40px">
              <label style="width:35%;margin-left: 20%">手机号码</label>
              <a-input style="width: 54%;float: right;margin-right: 6%" placeholder="输入11位手机号" />
            </div>
            <a-button  style="margin-top: 10px;width: 74%;height: 40px;background-color: #ffe100;border-color: #ffe100;color: #1a1a1a;border-radius: 5px;margin-left: 20%" type="primary">询底价</a-button>
          </div>
          <div class="ShopListHeader">
            <div style="display: flex;justify-content: space-around;width: 180px">
              <div style="width: 60px; font-size: 14px;color: #1A1A1A">经销商</div>
              <div style="width: 90px;font-size: 14px;color:#A2A4AB" >选择经销商</div>
            </div>
            <div style="width: 80px;margin-right: 20px;font-size: 14px;color:#FCA91F">智能推荐</div>
          </div>
          <a-divider class="mydivi" style="margin:12px 0;min-width: 95%;width: 95%"></a-divider>
          <div class="ShopList">
<!--            @click="goQuestionPage(item.question)"-->
            <div class="shopCard" v-for="item in shopList"
                 :key="item.id" >
              <p class="shopName">{{item.name}}<span class="salePlace">{{item.saleplace}}</span></p>
              <p class="priceC">经销商报价: <span class="price">{{item.price}}</span></p>
              <p class="shopPlaceC">{{item.place}}</p>
              <p class="shopPhoneC">经销商电话: <span class="shopPhone">{{item.phoneNum}}</span></p>
              <a-divider style="margin:12px 0;min-width: 90%;width: 90%"></a-divider>
            </div>
          </div>
        </div>
        <a-button type="primary" @click="changePos">
          按钮
        </a-button>
        <a-button type="primary" @click="centPost">
          测试函数
        </a-button>
      </a-col>
      <a-col :span="12">
        <a-row>
          <div class="amap-page-container">
            <el-amap vid="amap" class="amap-demo"
                     :center="center" :zoom="zoom" :resize-enable="true">
              <el-amap-marker
                v-for="(detail, index) in details"
                :key="'marker' + index"
                :position="[detail.longi, detail.lati]"
              >
              </el-amap-marker>
              <el-amap-text
                v-for="(detail, index) in details"
                :key="'text' + index"
                :text="detail.dealer_name"
                :offset="[0,30]"
                :position="[detail.longi, detail.lati]"
              ></el-amap-text>
            </el-amap>
          </div>
        </a-row>
        <a-row>
          <a-card :title="details[currentPos].dealer_full_name" class="desc-card" bodyStyle="margin:12px 24px;padding:0;">
            <p>
              <a-icon type="environment" />
              {{ details[currentPos].address }}
            </p>
            <p>
              <a-icon type="pay-circle" />
              <span class="dealer-price">
                {{ details[currentPos].dealer_price }}
              </span>
              万元（{{ details[currentPos].sale_region }}）
            </p>
            <p>
              <a-icon type="phone" />
              {{ details[currentPos].dealer_phone }}
            </p>
          </a-card>
        </a-row>

      </a-col>
    </a-row>

  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "kgInQuestion",
  props: {
    graphData: Object
  },
  data() {
    const self = this;
    return {
      center: [118.854, 31.931],
      lng: 118.854,
      lat: 31.931,
      loaded: false,
      zoom: 16,
      imgAddress:"http://p1-dcd.byteimg.com/img/motor-img/83746b2d09028177794c863d079fe229~tplv-resize:960:0.jpg",
      carTypeIds:["车型0001","车型0002","车型0003","车型0004"],
      shopList:[{}],
      carSeries:"奥迪A4L",
      markers: [
        {
          position: [118.854, 31.931],
          text: "区政府1",
          offset: [0, 30]
        },
        {
          position: [119.854, 31.931],
          text: "区政府2",
          offset: [0, 30]
        },
        {
          position: [120.854, 31.931],
          text: "区政府3",
          offset: [0, 30]
        }
      ],
      currentPos: 0,
      details: [
        {
          "dealer_id": "dcd_1463",
          "lati": 31.988229,
          "longi": 118.884544,
          "address": "南京市江宁东山汽车园临麒路19号",
          "dealer_name": "南京聚亚",
          "dealer_full_name": "南京聚亚汽车销售服务有限责任公司",
          "dealer_phone": "17186239533",
          "sale_region": "售本市",
          "dealer_price": 18.08,
          "official_price": 18.08
        },
        {
          "dealer_id": "dcd_19423",
          "lati": 31.931847,
          "longi": 118.854238,
          "address": "江宁区科苑路43号",
          "dealer_name": "南京通华（江宁店）",
          "dealer_full_name": "南京通华汽车销售有限公司",
          "dealer_phone": "17092502674",
          "sale_region": "售多地",
          "dealer_price": 18.08,
          "official_price": 18.08
        }
      ]
    }
  },
  mounted() {
    this.center = [this.details[this.currentPos].longi, this.details[this.currentPos].lati]
  },
  methods: {
    ...mapActions([
      'getSeriesCarListImpl',
      'getSellerListImpl',
    ]),
    changePos() {
      this.currentPos = (this.currentPos + 1) % this.details.length;
      this.center = [this.details[this.currentPos].longi, this.details[this.currentPos].lati]
      console.log(this.center);
    },
    async centPost(){
      let res= await this.getSeriesCarListImpl(1014);
      console.log(res);
    }
  },
}
</script>

<style scoped>
.amap-demo {
  width: 100%;
  height: 550px;
}
.amap-page-container{
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2)
}
.desc-card {
  width: 100%;
  /*height: 250px;*/
  margin-top: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2)
}

.dealer-price {
  color: #ff5256;
  font-size: 18px;
  font-weight: 500;
}
.carbar{
  display: flex;
  justify-content:space-between;
  align-items: center;
}

.ShopListHeader {
    width: 100%;
    display: flex;
    justify-content:space-between;
    align-items: center;
}
.carImg{
  height: 100%;
  width: 100%;
  border-radius: 5px;
}

</style>
