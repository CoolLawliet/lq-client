<template>
  <div class="footer_guide">
    <router-link class="guide_item" active-class="guide_item on" :to="{path:'/msite'}">
      <span class="item_icon">
        <i class="iconfont icon-shouye"></i>
      </span>
      <span>首页</span>
    </router-link>
    <router-link class="guide_item" active-class="guide_item on"  :to="{path:'/dynamic'}">
      <span class="item_icon">
        <i class="iconfont icon-buxing"></i>
      </span>
      <span>动态</span>
    </router-link>
    <router-link class="guide_item" active-class="guide_item on"  :to="{path:'/publish'}">
      <span class="item_icon">
        <i class="iconfont icon-roundadd" style="font-size: 33px"></i>
      </span>
    </router-link>
    <router-link class="guide_item" active-class="guide_item on" :to="{path:'/circle'}">
      <span class="item_icon">
        <i class="iconfont icon-zhinengyouhua"></i>
      </span>
      <span>圈圈</span>
    </router-link>
    <router-link class="guide_item" active-class="guide_item on"  :to="{path:'/profile'}">
      <span class="item_icon">
        <i class="iconfont icon-geren"></i>
      </span>
      <span>我的</span>
    </router-link>
  </div>
</template>

<script>
    export default {
      // methods:{
      //   goTo(path){
      //     this.$router.replace(path)
      //   }
      // }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" >
  @import "../../common/stylus/mixins.styl"
  .footer_guide  //footer
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #02a774
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
</style>
