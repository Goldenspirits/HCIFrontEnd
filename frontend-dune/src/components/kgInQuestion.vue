<template>
  <div>
    <a-row>
      <a-col :span="12">
        <div class="inquiryContainer">
          <div class="quiryBar" style="width: 100%;height: 250px">
            <div class="carbar" style="width: 100%;height: 100px">

                <div class="carImgContainer" style="width: 35%;height: 80px">
                  <img class="carImg" :src="thisImgAddress" >
                </div>
                <div class="carType"  style="width: 60%;height: 80px">
                  <div class="carSeries" style="width: 90%;font-size: 24px;font-weight: 300;color: #1A1A1A" >
                    {{carSeriesName}}
                  </div>
                  <a-select :dropdownMatchSelectWidth="true"  :default-value="this.carTypes[0].name" style="width: 90%;margin-top: 10px" @change="handleChangeCar">
                    <a-select-option v-for="item in carTypes" :key="item.car_id" :value="item.car_id" >
                      {{ item.name+' '+item.year+"款" }}
                    </a-select-option>
                  </a-select>
                </div>

            </div>
            <div  style="width: 100%;height: 40px">
                <label style="width:35%;margin-left: 20%">选择城市</label>
                <a-select :dropdownMatchSelectWidth="true"  default-value="南京" style="width: 54%;float: right;margin-right: 6%" @change="handleChangeCity">
                  <a-select-option v-for="city in cityList" :key="city" :value="city">
                    {{ city }}
                  </a-select-option>
                </a-select>
            </div>
            <div  style="width: 100%;height: 40px">
              <label style="width:35%;margin-left: 20%">手机号码</label>

              <a-input style="width: 54%;float: right;margin-right: 6%" placeholder="输入11位手机号"  v-model="phoneNum"/>

            </div>
            <a-button  style="margin-top: 10px;width: 74%;height: 40px;background-color: #ffe100;border-color: #ffe100;color: #1a1a1a;border-radius: 5px;margin-left: 20%" type="primary"  @click="handleAskingPrice()">询底价</a-button>
          </div>
          <div class="ShopListHeader">
            <div style="display: flex;justify-content: space-around;width: 180px">
              <div style="width: 60px; font-size: 14px;color: #1A1A1A">经销商</div>
              <div style="width: 90px;font-size: 14px;color:#A2A4AB" >选择经销商</div>
            </div>
            <div style="display: flex;justify-content: space-between;width: 230px">
              <div style="width: 100px; font-size: 14px;color: #FA7973">{{ curSelectedShop.dealer_name }}</div>
              <div style="width: 80px;margin-right: 10px;font-size: 14px;color:#FCA91F">智能推荐</div>
            </div>
          </div>
          <a-divider class="mydivi" style="margin:12px 0;min-width: 95%;width: 95%"></a-divider>
          <div class="ShopList"  >
            <div class="shopCard" v-for="item in shopDetails"
                 :key="item.dealer_id" @click="selectShopHandler(item)" >
              <p class="shopName" style="font-size: 16px">{{item.dealer_name}}
                <span class="sale_region" style="font-size: 14px;rgb(153, 153, 153);margin-left: 8px;">{{item.sale_region}}</span></p>
              <p class="priceC" style="font-size: 14px;color: rgb(153, 153, 153);">经销商报价:
                <span class="price" style="color: rgb(255, 145, 0);font-size: 18px;font-weight: 500;">{{item.dealer_price+"万"}}</span></p>
              <p class="shopPlaceC" style="font-size: 14px;color: rgb(102, 102, 102);">{{item.address}}</p>
              <p class="shopPhoneC" style="color: rgb(153, 153, 153);font-size: 14px;">经销商电话:
                <span class="dealer_phone" style="color: rgb(255, 145, 0);font-weight: 500;font-size: 16px;">{{item.dealer_phone}}</span></p>
              <a-divider style="margin:12px 0;min-width: 90%;width: 90%"></a-divider>
            </div>
          </div>
        </div>
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
                v-for="(detail, index) in shopDetails"
                :key="'marker' + index"
                :position="[detail.longi, detail.lati]"
              >
              </el-amap-marker>
              <el-amap-text
                v-for="(detail, index) in shopDetails"
                :key="'text' + index"
                :text="detail.dealer_name"
                :offset="[0,30]"
                :position="[detail.longi, detail.lati]"
              ></el-amap-text>
            </el-amap>
          </div>
        </a-row>
        <a-row>
          <a-card :title="curSelectedShop.dealer_full_name" class="desc-card" :bodyStyle="bdstyle">
            <p>
              <a-icon type="environment" />
              {{ curSelectedShop.address }}
            </p>
            <p>
              <a-icon type="pay-circle" />
              <span class="dealer-price">
                {{ curSelectedShop.dealer_price }}
              </span>
              万元（{{ curSelectedShop.sale_region }}）
            </p>
            <p>
              <a-icon type="phone" />
              {{ curSelectedShop.dealer_phone }}
            </p>
          </a-card>
        </a-row>

      </a-col>
    </a-row>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "kgInQuestion",
  //todo 传递的应该是car 的基础信息，包含 seriesId，车系名字，以及汽车图片
  props: [
    'imgAddress','carSeries','carSeriesId'
  ],
  computed: {
    ...mapGetters([
      'userId',
    ])
  },
  data() {
    const self = this;

    return {
      phoneNum:'',
      thisImgAddress:this.imgAddress,
      carSeriesName:this.carSeries,
      //carSeriesId空的？？操
      thisCarSeriesId:this.carSeriesId,
      bdstyle:{"margin":"12px 24px","font-padding": "0","padding":"0"},
      center: [118.854, 31.931],
      lng: 118.854,
      lat: 31.931,
      loaded: false,
      zoom: 16,
      carTypes:[],
      curCity:"南京",
      curCarId:0,
      cityList:["南京","上海","北京","深圳","广州"],
      curSelectedShop:{dealer_name:"江宁宏图"},
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
      shopDetails: []
    }
  },
  async mounted() {
    console.log("挂载前 桩检查：")
    console.log("thisCarSeriesId: "+this.thisCarSeriesId);
    console.log("thisImgAddress: "+this.thisImgAddress);
    console.log("carSeriesName: "+this.carSeriesName);




    this.carTypes= await this.getSeriesCarListImpl(this.thisCarSeriesId);

    //获取默认的
    let _this=this;
    this.curCarId=this.carTypes[0].car_id;
    this.shopDetails= await this.getSellerListImpl({
      seriesId:_this.thisCarSeriesId,
      carId:_this.curCarId,
      city:_this.curCity
    })
    this.curSelectedShop=this.shopDetails[0];
    console.log(this.curSelectedShop)
    this.center = [this.shopDetails[0].longi, this.shopDetails[0].lati]
  },
  methods: {
    ...mapActions([
      'getSeriesCarListImpl',
      'getSellerListImpl',
      'sentAskingOrderImpl'
    ]),
    async handleAskingPrice(){
      let phonenum= this.phoneNum;
      console.log("得到电话号");
      console.log(phonenum);
      if(phonenum.length<11){
        this.$message.error(
          { content: "请正确输入手机号", duration: 1}
        );
        return;
      }

      let _this=this;
      //todo 这里后端好像有点问题，，不管了
      //TODO 修改推荐页的car

      await this.sentAskingOrderImpl({
        dealerId:_this.curSelectedShop.dealer_id,
        dealerName:_this.curSelectedShop.dealer_name,
        userId:_this.userId,
        seriesId:parseInt(_this.thisCarSeriesId),
        carId:_this.curCarId,
        phone:phonenum
      });

    },
    selectShopHandler(item){
      this.curSelectedShop=item;
      this.center = [item.longi,item.lati]
      console.log(this.center);
    },
    async handleChangeCar(value){
      console.log("改变了车辆 id：")
      console.log(value)
      this.curCarId=value;

      let _this=this;
      this.shopDetails= await this.getSellerListImpl({
        seriesId:_this.thisCarSeriesId,
        carId:_this.curCarId,
        city:_this.curCity
      })
      this.curSelectedShop=this.shopDetails[0];
      console.log(this.curSelectedShop)
      this.center = [this.shopDetails[0].longi, this.shopDetails[0].lati]
    },
    async handleChangeCity(value){
      console.log("改变了城市 ")
      console.log(value)
      this.curCity=value;

      let _this=this;
      this.shopDetails= await this.getSellerListImpl({
        seriesId:_this.thisCarSeriesId,
        carId:_this.curCarId,
        city:_this.curCity
      })
      this.curSelectedShop=this.shopDetails[0];
      console.log(this.curSelectedShop)
      this.center = [this.shopDetails[0].longi, this.shopDetails[0].lati]
    },
    async centPost(){
      let data={
        seriesId:1014,
        carId:52547,
        city:"南京"
      }
      // let res= await this.getSeriesCarListImpl(1014);
      let res= await this.getSellerListImpl(data);
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
