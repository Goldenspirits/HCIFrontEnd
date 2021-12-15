<template>
  <div id="layout">
    <Header class="outHeaderStyle"></Header>
    <!--        {{this.routerpath}}-->
    <!--        引入了一个全局父样式，通过router view进行局部内容切换-->
    <transition name="fade-transform" mode="out-in">
      <router-view/>
    </transition>
    <!--        <footerPage/>-->
  </div>
</template>
<script>
  import Header from './components/header.vue'

  export default {
    name: 'layout',
    components: {Header},
  }
</script>
<style>
  #layout {
    /*height: 95vh;*/
  }
.outHeaderStyle{
  position:fixed;
  top:0px;
  width: 100vw;
  z-index:999;
}
  .fade-transform-enter-active {
    transition: all .3s ease;
  }

  .fade-transform-enter, .fade-transform-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
</style>
