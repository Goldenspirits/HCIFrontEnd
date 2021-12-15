<template>
  <div id="root">
    <div class="maincontainer">

      <div class="words">
        One More Question.
      </div>
      <div class="searchContainer">
        <input class="searchStyle"  placeholder="Ask a question"  v-model="question"  @keyup.enter="onSearch" />
      </div>
    </div>
  </div>
</template>

<script>
// import Bg from '../assets/zyb2.jpg'
import {RecycleScroller} from "vue-virtual-scroller";
import {mapActions, mapGetters, mapMutations} from 'vuex'


const Bg=()=>import('../assets/zyb2.jpg')
const radarEvaluate=()=>import("./radarEvaluate");

  export default {
    name: "Home",
    components: {radarEvaluate},
    data() {
      return {bg: Bg,
        question:""
      }
    },
    computed: {
      ...mapGetters([
        'userId'
      ]),
    },
    // async mounted(){
    //   if(this.userId === -1) await this.getUserInfo();
    // },
    methods: {
      ...mapActions([
        'getUserInfo',
      ]),

      onSearch(question){
          console.log("跳转到智能问答; 问题是："+this.question);
          document.getElementById('q').click();
          this.$router.push("?question="+this.question)
        }
      }

  }
</script>

<style scoped>
  #root {
    text-align: center;
    padding-top: 10em;
    background-image: url('../assets/zyb2.jpg');
    background-repeat: no-repeat;
    overflow: hidden;
    //background-size: cover;
    width: 100%;
    height: 100%;
    position: fixed;
    background-position: 0px 0px;
    background-size: 100% 100%;
  }
  .maincontainer{
    width: 100%;
    height: 35vh;
  }
  .words{
    padding-top: 8vh;
    width: 100%;
    height: 22vh;
    text-align: center;
    /*padding-right: 10%;*/
    color: white;
    font-weight: 800;
    font-size: 40px;
  }
  .searchContainer{
    width: 100%;
    height: 80px;
    display: flex;
    justify-content:center;
  }
  .searchStyle{
    width: 40vw;
    border: 1px solid #dedede;
    height: 3.2rem;
    font-family: inherit;
    font-weight: 100;
    border-radius: 4px;
    letter-spacing: normal;
    color: #333;
    font-size: 1rem;

    padding: 4px 20px 0 50px;
    background-image: url(../assets/Search.svg);
    background-repeat: no-repeat;
    background-position: 10px 50%;

  }
  .searchStyle:focus{
    outline: none;
  }
  .searchStyle::-webkit-input-placeholder{
    color:#959492;
    font-weight:100;
    font-size: 25px;
  }
</style>
