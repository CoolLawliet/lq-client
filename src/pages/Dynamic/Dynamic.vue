<template>
  <section>
    <HeaderTop/>
    <div class="msite_content_wrapper">
      <ul>
        <li v-for="(worl, index) in world" :key="index">
          <div class="forum_card">
            <!--用户信息-->
            <div class="user_line">
              <div class="user_line_wrap">
                <span class="portrait"><img :src="worl.Cuser['avatar']" alt=""></span>
                <div class="content">
                  <h4 class="title">{{worl.Cuser['nickname']}}</h4>
                  <div class="sub_title">
                    <span class="createtime">{{worl.create_time}}</span>
                  </div>
                </div>
              </div>
            </div>
            <!--内容-->
            <div class="main_context">
              <p class="forum_title"></p>
              <p class="forum_sub_title">{{worl.content}}</p>
              <div class="sudoku" style="width: 341px">
                <div class="sudoku_wrap">
                  <ul id="list">
                    <li v-for="(pic, index) in worl.worldimages_set" :key="index">
                  <span class="img_item" style="width: 108.333px;height: 108.333px;"><img
                    :src="pic"
                    alt="">
                  </span>
                    </li>
                  </ul>

                </div>
              </div>
            </div>

            <div class="interaction" >
              <div class="wrap">
                <span class="left">zan</span>
                <span class="right">liuyan</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import BScroll from 'better-scroll'
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import {mapState} from 'vuex'

  // new BScroll('.msite_content_wrapper')

  export default {
    mounted() {
      this.$store.dispatch('getWorld')
    },

    computed: {
      ...mapState(['world'])
    },

    watch:{
      world(value){
        this.$nextTick(()=>{//列表数据更新显示后执行
          //列表显示后创建
          new BScroll('.msite_content_wrapper')
        })
      }
    },
    components: {
      HeaderTop
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  body {
    font-size: 14px;
  }

  div {
    display: block;
  }

  h4, p {
    margin: 0;
    padding: 0;
  }

  img {
    border-style: none;
  }

  .msite_content_wrapper {
    position fixed
    top: 45px
    bottom: 46px
    width: 100%
  }

  .forum_card {
    padding-top: 17px;
    padding-bottom: 38px;
  }

  /*用户信息*/
  .user_line {
    margin: 0 17px;
  }

  .user_line_wrap {
    position: relative;
    text-decoration: none;
    width: 100%;
    display: flex;
  }

  .user_line_wrap > .portrait > img {
    position: relative;
    display: inline-block;
    width: 35px;
    height: 35px;
    margin-right: 8px;
    background-size: cover;
    border-radius: 50%;
  }

  .content {
    text-align: left;
  }

  .content > .title {
    margin-bottom: 4px;
    font-size: 14px;
    color: #333;
    font-weight: 400;
  }

  .sub_title {
    font-size: 12px;
    color: #999;
  }

  /*内容*/
  .main_context .forum_title {
    line-height: 24px;
    font-size: 16px;
    margin: 13px 17px 4px;
    text-align: left;
    color: #000;
  }

  .main_context .forum_sub_title {
    line-height: 20px;
    font-size: 16px;
    margin-left: 17px;
    margin-right: 17px;
    text-align: left;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .sudoku {
    position: relative;
    margin: 0 17px;
  }

  /*.sudoku_wrap {
    display: flex;
    flex-flow: row nowrap;
  }*/

  #list{
    text-align center
    width: 349px
  }
  #list>li{
    float: left;
    display: block;
    margin-right: 8px;
    width: 108.333px;
    height: 108.333px;
    margin-top: 10px;
  }

  .sudoku .img_item {
    display: block;
    background-size: cover;
    margin-right: 8px;
    margin-top: 9px;
    background-color: #eee;
  }

  .sudoku .img_item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /*底部*/
  .wrap {
    width: 100%;
    line-height: 44px;
    overflow: hidden
  }

  .left {
    margin-left: 20px;
    float: left;
  }

  .right {
    margin-right: 20px;
    float: right;
  }
</style>
