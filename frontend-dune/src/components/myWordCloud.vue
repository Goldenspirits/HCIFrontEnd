<template>
  <div id="myWordCloud" style="height: 38vh">
    <cloud
      :data="JSON.parse(JSON.stringify(word_Cloud.content))"
      :key="word_Cloud.index"
      nameKey="name"
      valueKey="value"
      :color="myColors"
      :showTooltip="false"
      :wordClick="wordClickHandler"
      style="height: 80vh">
    </cloud>
    <h3 style="position: absolute;right: 5em;bottom: 5em;">我的热词</h3>
  </div>
</template>

<script>
import cloud from 'vue-wordcloud'
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'myWordCloud',
  data() {
    return {
      myColors: ['#1f77b4', '#629fc9', '#94bedb', '#c9e0ef'],
    }
  },
  components: {
    cloud
  },
  // props: {default: Array},
  computed: {
    ...mapGetters([
      'userId',
      'word_Cloud'
    ]),
  },
  mounted() {
    // alert(this.userId)
    this.getWordCloud(this.userId);
    // console.log(this.word_Cloud)
  },
  methods: {
    ...mapActions([
      'getWordCloud',
      'getUserInfo'
    ]),
    wordClickHandler(name, value, vm) {
      console.log('wordClickHandler', name, value, vm);
    },

  },

}
</script>
