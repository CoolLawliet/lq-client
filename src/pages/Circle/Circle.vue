<template>
  <section>
  <HeaderTop></HeaderTop>
    <div class="msite_content_wrapper">
      <button @click="$router.push('/postbar')">postbar</button>
      <a href=""></a>
    </div>
  </section>
</template>

<script>
 import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
    export default {
   name:"circle",
   components:{
     HeaderTop
   }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .msite_content_wrapper {
    position fixed
    top: 45px
    bottom: 46px
    width: 100%
  }
</style>
