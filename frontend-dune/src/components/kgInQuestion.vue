<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-button type="primary" @click="changePos">
          按钮
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
          <a-card :title="details[currentPos].dealer_name" class="desc-card">
            <p>
              <a-icon type="home" />
              {{ details[currentPos].dealer_full_name }}
            </p>
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
    changePos() {
      this.currentPos = (this.currentPos + 1) % this.details.length;
      this.center = [this.details[this.currentPos].longi, this.details[this.currentPos].lati]
      console.log(this.center);
    }
  },
}
</script>

<style scoped>
.amap-demo {
  width: 100%;
  height: 350px;
}

.desc-card {
  width: 100%;
  /*height: 250px;*/
  margin-top: 10px;
}

.dealer-price {
  color: #ff5256;
  font-size: 18px;
  font-weight: 500;
}
</style>
