
<template>
<div>
  <HeaderTop :title="$route.meta.title">
    <router-link class="header_login" slot="right" :to="{path:'/publish',query:{type:1}}">
      <i v-show="$route.meta.showClass" class="iconfont icon-roundadd" style="font-size: 22px"></i>
    </router-link>
  </HeaderTop>
  <div class="tab">
    <div class="tab-item">
      <router-link to="/msite/msitecontent" >首页</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/msite/attention" >关注</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/msite/confess" >表白</router-link>
    </div>
  </div>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>

</div>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
export default {

    components:{
        HeaderTop

    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    padding-top: 45px;
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 20.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774

</style>
