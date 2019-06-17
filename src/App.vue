<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath">

    </router-view>

    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
   import {mapActions} from 'vuex'

  export default {
    mounted(){
      this.getUserInfo()
    },

    methods:{
      ...mapActions([ 'getUserInfo'])
    },

    components:{
      FooterGuide
    },


  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app
    width: 100%
    height 100%
    background #f5f5f5
</style>
