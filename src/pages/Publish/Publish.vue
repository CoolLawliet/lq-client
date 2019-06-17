<template>
  <section>
  <HeaderTop>
    <router-link class="header_search" slot="left" to="/dynamic">
      <i class="iconfont icon-fanhui" style="color: white"></i>
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
      name:"publish",
    data(){
      return{
        loading:false
      }

    },
    components:{
      HeaderTop,
      Create,
      Upload,
    }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
