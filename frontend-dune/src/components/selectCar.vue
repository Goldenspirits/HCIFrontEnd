<template>
  <div id="rootOfSelector">
    <div style="background-color: rgba(0,0,0,0.5) ;width: 100vw;">
      <transition name="plus-icon">
        <a-list size="small" :data-source="selector" class="selector" v-if="!closed" >
          <a-list-item slot="renderItem" slot-scope="item, index" style="text-align: left">

            <span> {{item.typeName }}</span>
            <a-list size="small" :grid="{ gutter: 0, column: item.len }"
                    :data-source="item.subSelector.attr"
                    class="subSelector">
              <a-list-item slot="renderItem" slot-scope="item" style="max-height: 2em; padding-top: 2px;">
                <a-button v-if="selector[index].subSelector.selected === item"
                          style="background-color: #a51f1f;border: 0;color: white"
                          type="primary" size="small" :disabled="loading">
                  {{item}}
                </a-button>
                <a-button v-else type="link" size="small" class="attr" @click="onSelect(item, index)"
                          :disabled="loading" style="color: white">
                  {{item}}
                </a-button>
              </a-list-item>
            </a-list>
          </a-list-item>
        </a-list>
      </transition>

      <div type="link" class="collapse collapse2"
           @click="closed=false"
           v-if="closed">
        <a-icon type="down"/>
        展开
      </div>
      <div type="link" class="collapse" @click="closed=true" v-else>
        <a-icon type="up"/>
        收起
      </div>

    </div>

    <!--    <a-divider></a-divider>-->
    <a-skeleton class="loadItem" active :loading="loading" style="margin-top: 2em" v-if="loading"/>
    <a-skeleton class="loadItem" active :loading="loading" v-if="loading"/>
    <a-skeleton class="loadItem" active :loading="loading" v-if="loading"/>
    <br v-else />
    <RecycleScroller
      v-infinite-scroll="handleInfiniteOnLoad"
      style="width: 100vw;margin-top: .5em;height: 2500px"
      :items="showed"
      :item-size="250"
      key-field="id"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="10"
    >
      <div slot-scope="{item}">
        <selectcarcard class="cardItem"    :car="item"
                  :key="item.seriesId">
        </selectcarcard>

      </div>

    </RecycleScroller>
    <a-back-top/>

  </div>
</template>

<script>
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  // import carCard from "./carcard";
  const selectcarcard = ()=>import("./selectcarcard");
  import infiniteScroll from 'vue-infinite-scroll';
  import {RecycleScroller} from 'vue-virtual-scroller';
  import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';


  export default {
    name: "selectCar",
    components: {selectcarcard, RecycleScroller},
    data() {
      return {
        page: 0,
        closed: false,
        selectResult: [],
        resultLength: 1980,
        showed: [],
        loading: false,
        busy: false,
        selector: [
          {
            type: 'brand',
            typeName: '品牌',
            subSelector: {
              selected: '不限',
              attr: ['不限', '奥迪', '丰田', '奔驰', '本田', '凯迪拉克','大众', '保时捷']
            },
            len: 8
          },
          {
            type: 'carType',
            typeName: '种类',
            subSelector: {
              selected: '不限',
              attr: ['不限', '紧凑型车', '小型车', '中型车', '大型车', '豪华车', '跑车', '轻客']
            },
            len: 8
          },
          {
            type: 'pricePeriod',
            typeName: '价格区间',
            subSelector: {
              selected: '不限', attr: ['不限', '10万以下', '10-15万',
                '15-20万', '20~25万', '25-30万', '30-40万', '40-50万', '50-100万', '100万以上',]
            },
            len: 8
          },
          {
            type: 'fuelForm',
            typeName: '能源类型',
            subSelector: {selected: '不限', attr: ['不限', '汽油', '柴油', '油电混合', '纯电动', '增程式', '氢气', '压缩天然气(CNG)']},
            len: 8
          },
          {
            type: 'driverForm',
            typeName: '动力类型',
            subSelector: {selected: '不限', attr: ['不限', '四驱', '前驱', '后驱']},
            len: 8
          }
        ],
        data: {
          size: 10
        }
      };
    },
    async mounted() {
      this.loading = true;
      this.showed = await this.changeSelection({page: 1,size: 10});
      await this.handleInfiniteOnLoad();
      this.loading = false;
    },
    computed: {
      ...mapGetters([
        // 'allCarList'
      ])
    },

    methods: {
      ...mapActions([
        'changeSelection',
      ]),
      async handleInfiniteOnLoad() {
        this.page++;
        this.data.page = this.page;
        this.showed = this.showed.concat(await this.changeSelection(this.data));
      },

      async onSelect(item, type) {
        this.page = 1;
        this.loading = true;
        this.showed = [];
        this.selector[type].subSelector.selected = item;
        this.data = {
          carType: this.selector[1].subSelector.selected === '不限' ? null : [this.selector[1].subSelector.selected],
          pricePeriod: this.selector[2].subSelector.selected === '不限' ? null : [this.selector[2].subSelector.selected],
          brand: this.selector[0].subSelector.selected === '不限' ? null : [this.selector[0].subSelector.selected],
          driverForm: this.selector[4].subSelector.selected === '不限' ? null : [this.selector[4].subSelector.selected],
          fuelForm: this.selector[3].subSelector.selected === '不限' ? null : [this.selector[3].subSelector.selected],
          page: this.page,
          size: 10
        };
        this.showed = await this.changeSelection(this.data);
        this.handleInfiniteOnLoad();
        this.loading = false;
      },
    }
  }
</script>

<style scoped>
  #rootOfSelector {
    text-align: center;
    padding-top: 51px;
    background-image: url('../assets/zyb2.jpg');
    background-repeat: no-repeat;
  / / background-size: cover;
    width: 100%;
    height: 100%;
    position: fixed;
    background-position: 0 0;
    background-size: 100% 100%;

  }

  .selector {
    padding-top: 1em;
    width: 86vw;
    text-align: center;
    margin: auto;
    color: white;
  }

  .subSelector {
    width: 90%;
    float: left;
  }


  .attr:hover {
    background-color: #a51f1f;
    color: white;
  }

  .cardItem {
    width: 72vw;
    margin-left: 14vw;
  }
  .loadItem{
    width: 72vw;
    margin-left: 14vw;
    background: white;
    padding: 20px
  }

  .collapse {
    background-color: rgba(0,0,0,0.5);
    color: white;
    position: absolute;
    margin: auto;
    z-index: 1;
    width: 100vw;
    padding-top: 2px;
    height: 1.7em;
    box-shadow: 0 2px 2px rgba(0, 0, 0, .1);
  }
  .collapse2 {
    background-color: rgba(0,0,0,0.3);
  }

  .collapse:hover {
    background-color: rgba(0,0,0,0.2)
  }
</style>
