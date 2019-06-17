<template>
    <div>
      <HeaderTop>
        <router-link class="header_search" slot="left" to="/dynamic" style="top: 28%;left: 8px">
          <i class="iconfont icon-fanhui" style="font-size: 26px"></i>
        </router-link>
      </HeaderTop>
     <div class="main" style="margin-top: 45px">
        <div class="card">
          <div class="card-wrap">
            <header class="top">
              <div class="avatar">
                <a class="img" href="">
                  <img src="https://tvax3.sinaimg.cn/crop.0.0.960.960.180/72a49cdfly8fzqv8oaju2j20qo0qo75x.jpg" alt="">
                </a>
              </div>
              <div class="box">
                <div class="text">
                  <h3>呼呼哈嘿</h3>
                  <span class="time">2019-6-6</span>
                </div>
              </div>
            </header>
          </div>
            <article class="main">
              <div class="card-wrap" style="padding-top: 0px">
                <div class="og">
                  <div class="main-text">周鸿祎解高考数学题，认真BOY。</div>
                  <div>
                    <div class="media">
                      <ul class="auto-list">
                        <li>
                          <div class="img-box">
                            <img src="https://wx4.sinaimg.cn/orj360/72a49cdfly1g3v19ab6nvj20u00mwqas.jpg" alt="">
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </article>

        </div>
     </div>
    </div>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  export default {

    components:{
      HeaderTop
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  article{
    display block
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
 .card{
   border-top-width 0
   border-bottom .5px solid #e6e6e6
   margin 0 0 .375rem 0
 }
  .card-wrap{
    margin-left .75rem
    margin-right: .75rem
    padding-top: .9375rem;
    height: 100%
  }
  .top{
    padding: 0 0 0 .25rem;
    display flex
  }
  .img img{
    width: 2rem
    height: 2rem
    background-color: #e6e6e6;
    border-radius 50%
    position: relative
    display: inline-block
  }
  .box{
    min-width:0
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 100%;
  }
  .text{
    margin: .15rem 0 .15rem .5rem;
  }
  .text>h3{
    font-size: .875rem
    margin: 0
    color: #333;
    line-height: 1.4
  }
  .time{
    color: #939393;
    font-size .6875rem
    line-height: 1.5
  }
  .og{
    padding: .75rem 0 .75rem .25rem;
    font-size: 1rem;
    color #333
  }
  .media{
    margin: .625rem 0 -.375rem;
  }
  .auto-list{
    margin: 0 0 -.25rem;
    max-width: 100%;
    padding: 0 0;
    overflow: hidden;
    font-size: 0;
  }
 .auto-list>li{
   display: inline-block;
   vertical-align: top;
   -webkit-box-sizing: border-box;
   box-sizing: border-box;
   width: 34%;
   padding: 0 .3125rem .3125rem 0;
 }
  .img-box{
    padding-bottom: 100%;
    background-color: #e6e6e6;
    display: inline-block;
    width: 100%;
    height: 0;
    position: relative;
  }
 .img-box>img{
   background-size: cover;
   background-repeat: no-repeat;
   background-position: 50%;
   position: absolute;
   width: 100%;
   height: 100%;
   vertical-align: top;
   -o-object-fit: cover;
   object-fit: cover;
 }
</style>
