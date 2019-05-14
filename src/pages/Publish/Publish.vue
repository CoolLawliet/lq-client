<template>
  <section>
  <HeaderTop>
    <router-link class="header_search" slot="left" to="/msite">
      <i class="iconfont icon-sousuo"></i>
    </router-link>
  </HeaderTop>
    <Create/>
    <!--<Upload/>-->
  </section>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import Create from '../../components/Create/Create.vue'
  import Upload from '../../components/Upload/Upload.vue'
    export default {
    components:{
      HeaderTop,
      Create,
      Upload
    }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
