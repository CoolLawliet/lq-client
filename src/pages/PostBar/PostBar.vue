<template>
  <section>
  <HeaderTop >
    <router-link class="header_search" slot="left" to="/circle">
      <i class="iconfont icon-sousuo"></i>
    </router-link>
  </HeaderTop>
    <div class="swiper-container">
      <div class="swiper-wrapper" style="padding-top: 0;height: 100%;">
      <!--<ul id="bar">-->
        <!--<li><img src="./images/学习天地..png" alt=""></li>-->
        <!--<li><img src="./images/学习天地..png" alt=""></li>-->
        <!--<li><img src="./images/学习天地..png" alt=""></li>-->
        <!--<li><img src="./images/学习天地..png" alt=""></li>-->
        <!--<li><img src="./images/学习天地..png" alt=""></li>-->
        <!--<li><img src="./images/学习天地..png" alt=""></li>-->
        <!--<li><img src="./images/学习天地..png" alt=""></li>-->
        <!--<li><img src="./images/学习天地..png" alt=""></li>-->
      <!--</ul>-->
        <div class="swiper-slide"><a href=""><div class="container"><img style="width: 80px;height: 80px;" src="./images/1.png" alt=""></div><span>xuexi</span></a></div>
        <div class="swiper-slide" ><img style="width: 80px;height: 80px;" src="./images/2.png" alt=""></div>
        <div class="swiper-slide" ><img style="width: 80px;height: 80px;" src="./images/3.png" alt=""></div>
        <div class="swiper-slide" ><img style="width: 80px;height: 80px;" src="./images/6.png" alt=""></div>
        <div class="swiper-slide" ><img style="width: 80px;height: 80px;" src="./images/5.png" alt=""></div>
        <div class="swiper-slide" ><img style="width: 80px;height: 80px;" src="./images/4.png" alt=""></div>
        <div class="swiper-slide" ><img style="width: 80px;height: 80px;" src="./images/7.png" alt=""></div>
        <div class="swiper-slide" ><img style="width: 80px;height: 80px;" src="./images/8.png" alt=""></div>

      </div>
    </div>
  </section>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import Swiper from 'swiper'

  export default {
    name:"postbar",

    mounted(){
      new Swiper('.swiper-container',{
        freeMode : true,
        freeModeMomentum : false,
        paginationClickable:true,
        spaceBetween:5,
        slidesPerView:4,
        grabCursor:true  //开启抓手光标
      })
    },
    components:{
      HeaderTop
    },


  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  body{
    margin:0;
    padding:0;
  }
    a{
      text-decoration none
    }
  .swiper-container{
    top: 45px
    width:100%;
    margin:20px auto;
  }
  .swiper-slide{
    font-size:18px;
    background:#fff;
    display:flex;
    text-align:center;
    justify-content:center;
    align-items:center;
  }
    .swiper-slider>.container{
      display: block;
      width: 100%;
      text-align: center;
      padding-bottom: 10px;
      font-size: 0;
    }
  .swiper-slider>.container>img{
    display inline-block
    width 50px
    height 50px
  }

  .swiper-slider>span
    display inline-block
    width 100%
    text-align center
    font-size 13px
</style>
