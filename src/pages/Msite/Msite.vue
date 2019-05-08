<template>
  <div class="forum_card">
    <!--用户信息-->
    <div class="user_line">
      <div class="user_line_wrap">
        <span class="portrait" style="background-image: url(//gss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/5c85e7b…?t=1501978093);"></span>
        <div class="content">
          <h4 class="title">Tom</h4>
          <div class="sub_title">
            <span class="forumname">XXOO吧</span>
            <span class="split"></span>
            <span class="createtime">2019-5-5 22:22:22</span>
          </div>
        </div>
      </div>
    </div>
    <!--内容-->
    <div class="main_context">
      <p class="forum_title">一旦爆发战争，中国必定手足无措？俄专家一句话说到重点</p>
      <p class="forum_sub_title">{{world}}</p>
      <div class="sudoku" style="width: 341px">
        <div class="sudoku_wrap">
          <span class="img_item" style="width: 108.333px;height: 108.333px;"><img src="http://imgsrc.baidu.com/forum/abpic/item/d1c8a786c9177f3ea74e26457ecf3bc79f3d5604.jpg" alt="" ></span>
          <span class="img_item" style="width: 108.333px;height: 108.333px;"><img src="http://imgsrc.baidu.com/forum/abpic/item/d1c8a786c9177f3ea74e26457ecf3bc79f3d5604.jpg" alt=""></span>
          <span class="img_item" style="width: 108.333px;height: 108.333px;"><img src="http://imgsrc.baidu.com/forum/abpic/item/d1c8a786c9177f3ea74e26457ecf3bc79f3d5604.jpg" alt=""></span>
        </div>
      </div>
    </div>
    <!--底部-->
    <div class="interaction">
      <div class="wrap">
        <span class="left">zan</span>
        <span class="right">liuyan</span>
      </div>
    </div>
  </div>

</template>

<script>
  import {mapState} from 'vuex'

  export default {
    mounted(){
      this.$store.dispatch('getWorld')
    },

    computed:{
      ...mapState(['world'])
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  body{
    font-size: 14px;
  }
  div{
    display: block;
  }
  h4,p{
    margin: 0;
    padding: 0;
  }
  img{
    border-style: none;
  }
  .forum_card{
    padding-top: 17px;
  }
  /*用户信息*/
  .user_line{
    margin: 0 17px;
  }
  .user_line_wrap{
    position: relative;
    text-decoration: none;
    width: 100%;
    display: flex;
  }
  .user_line_wrap>.portrait{
    position: relative;
    display: inline-block;
    width: 35px;
    height: 35px;
    margin-right: 8px;
    background-size: cover;
    border-radius: 50%;
  }
  .content{
    text-align: left;
  }
  .content>.title{
    margin-bottom: 4px;
    font-size: 14px;
    color: #333;
    font-weight: 400;
  }
  .sub_title{
    font-size: 12px;
    color: #999;
  }
  .sub_title>.split{
    position: relative;
    display: inline-block;
    top: 1px;
    margin: 0 7px;
    width: 1px;
    height: 10px;
    background: #999;
  }
  /*内容*/
  .main_context .forum_title{
    line-height: 24px;
    font-size: 16px;
    margin: 13px 17px 4px;
    text-align: left;
    color: #000;
  }
  .main_context .forum_sub_title{
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
  .sudoku{
    position: relative;
    margin: 0 17px;
  }
  .sudoku_wrap{
    display: flex;
    flex-flow: row nowrap;
  }
  .sudoku .img_item{
    display: block;
    background-size: cover;
    margin-right: 8px;
    margin-top: 9px;
    background-color: #eee;
  }
  .sudoku .img_item img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  /*底部*/
  .wrap{
    width: 100%;
    line-height: 44px;
  }
  .left{
    margin-left: 20px;
    float: left;
  }
  .right{
    margin-right: 20px;
    float: right;
  }
</style>
