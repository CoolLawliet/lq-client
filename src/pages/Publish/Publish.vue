<template>
  <section>
  <HeaderTop>
    <router-link class="header_search" slot="left" to="/msite">
      <i class="iconfont icon-sousuo"></i>
    </router-link>
  </HeaderTop>
    <Create/>
    <!--<Upload/>-->
    <Loading :loading="loading"/>
  </section>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import Create from '../../components/Create/Create.vue'
  import Upload from '../../components/Upload/Upload.vue'
  import Loading from './Loading/Loading.vue'
    export default {
    data(){
      return{
        loading:false
      }

    },
    components:{
      HeaderTop,
      Create,
      Upload,
      Loading
    }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
