<template>
  <div id="rootOfPortrait">
    <div class="MyContainer">
      <div style="background-color: rgba(245, 248, 252, 0.9); width: 33vw">
        <h3 style="padding: 10px 0 8px 15px;
          box-shadow: 0 2px 8px rgba(216, 212, 226, 0.6);
          background-color: white">我的收藏夹</h3>
        <div style="text-align: center;
          padding: 0 6px 6px 6px;
          overflow: scroll;
          height: 83.1vh">
          <a-list item-layout="horizontal" :data-source="bookList">
            <a-skeleton class="loadStyle" active :loading="fetchingBookList" v-if="fetchingBookList"/>
            <a-list-item slot="renderItem" slot-scope="item, index" id="bookItem">
              <a slot="actions"
                 style="color: #a51f1f;margin-right: 2em"
                 @click="cancelBooking(item.carSeriesEntity.seriesId)"
              >
                <a-icon type="star" style="color: #a51f1f;"/>
                取消收藏</a>

              <a-list-item-meta
                :description="item.carSeriesEntity.officialPrice"
              >
                <p slot="title">{{ item.carSeriesEntity.name }}</p>
                <a-avatar
                  style="width: 3.5em;height: 3.5em;margin: .5em .5em 0 1.5em"
                  slot="avatar"
                  :src="item.carSeriesEntity.coverImg"
                  @click="showG(item.carSeriesEntity)"
                />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </div>
      </div>
      <a-drawer
        :title="drawerTitle"
        width="1000px"
        placement="left"
        :closable="true"
        :visible="graphVisible"
        @close="onCloseGraph"
      >
        <KG_Q
          style="margin: auto;"
          :imgAddress="selectedCar.imgAddress"
          :carSeriesId="selectedCar.carSeriesId"
          :carSeries="selectedCar.carSeries"></KG_Q>
      </a-drawer>
      <MyWordCloud style="background-color: rgba(245, 248, 252, 0.9);margin-left: 4vw;width: 60vw;height:  83.1vh">
      </MyWordCloud>
    </div>

  </div>
</template>

<script>
// import KG from './knowledgeGraph'
const KG = () => import('./knowledgeGraph');
const KG_Q = () => import('./kgInQuestion')
import {mapGetters, mapMutations, mapActions} from 'vuex'

const MyWordCloud = () => import("./myWordCloud");

export default {
  name: "userPortrait",
  data() {
    return {
      // graph:{}
      bookList: [],
      fetchingBookList: false,
      drawerTitle: '',
      graphVisible: false,
      selectedCar: {
        imgAddress: '',
        carSeries: '',
        carSeriesId: ''
      }

    }
  },
  components: {
    KG,
    MyWordCloud, KG_Q
  },

  computed: {
    ...mapGetters([
      'portrait',
      'userId',
      'wordCloud'
    ]),
  },
  async mounted() {
    if (this.userId === -1) {
      await this.getUserInfo();
      await this.getWordCloud(this.userId);
    }
    this.fetchingBookList = true;
    this.bookList = await this.getUserBook(this.userId);
    this.fetchingBookList = false;

  },
  methods: {
    ...mapActions([
      'getWordCloud',
      'getUserInfo',
      'cancelUserBook',
      'getUserBook',
      'getWordCloud',
    ]),
    async cancelBooking(e) {
      // console.log(e)
      await this.cancelUserBook({userId: this.userId, carId: e})
      this.bookList = await this.getUserBook(this.userId)
    },
    async showG(item) {
      this.graphVisible = true;
      this.g6Spinning = false;

      // 构造需要的内容

      this.selectedCar = {
        imgAddress: item.coverImg,
        carSeries: item.name,
        carSeriesId: item.seriesId
      }
      console.log(this.selectedCar)


    },
    onCloseGraph() {
      this.graphVisible = false
    }

  }
}
</script>

<style scoped>
#rootOfPortrait {
  /*width: 100vw;*/
  /*height: 93.6vh;*/
  /*background: url('../assets/zyb2.jpg') no-repeat center;*/
  overflow: hidden;
  /*position: fixed;*/

  text-align: center;
  padding-top: 55px;
  background-image: url('../assets/zyb2.jpg');
  background-repeat: no-repeat;
/ / background-size: cover;
  width: 100%;
  height: 100%;
  position: fixed;
  background-position: 0 0;
  background-size: 100% 100%;
}

.MyContainer {
  display: flex;
  align-items: center;
}

.block1 {
  height: 52vh;
  /*box-shadow: 0 0px 4px rgba(0,0,0, 0.8);*/
}

.block2 {
  height: 83.1vh;
  /*box-shadow: 0 0px 4px rgba(0,0,0, 0.8);*/
}

.words {
  padding-top: 3vh;
  width: 100%;
  height: 10vh;
  text-align: center;
  color: white;
  font-weight: 800;
  font-size: 60px;
}

.loadStyle {
  background: white;
  padding: 20px;
  width: 100%;
}

#bookItem {
  margin: 4px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
  text-align: left;
}

</style>
