<template>
  <div  id="radarMain">
  </div>
</template>

<script>

export default {
  name: "radarEvaluate",
  props: {
    evaluates: {},
  },
  mounted() {
    this.echartsInit()
  },
  methods: {

  }
}
</script>

<style scoped>
#radarMain{
  margin-left: 100px;
    width: 200px;
    height: 200px;
  //background: white;
}
</style>
