<template>
  <div>
    <HeaderTop >
      <router-link class="header_search" slot="left" to="/msite">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
    </HeaderTop>
    <Message/>

  </div>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import Message from './Message/Message.vue'


  export default {
    components: {
      Message,
      HeaderTop,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
