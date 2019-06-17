<template>
  <div>
    <!--滑动区域-->
    <!--<div style="position: relative;">-->
    <!--<div class="background"-->
    <!--:style="{backgroundImage:'url(' + dataList['userinfo']['site_pic'] + ')'}">-->
    <!--</div>-->
    <!--</div>-->
    <div>
      <div class="home">
        <div class="message">
          <div class="avatar-wrap">
            <a href="" class="user-avatar">
              <div class="user-avatar-content"
                   :style="{backgroundImage:'url(' + dataList['userinfo']['avatar'] + ')'}">
              </div>
            </a>
          </div>
          <div class="user">
            <div class="name">{{dataList['userinfo']['nickname']}}</div>
            <div class="bio" v-if="dataList.userinfo.sign">{{dataList['userinfo']['sign']}}</div>
            <div class="bio" v-else>他妈的没签名他妈的没签名他妈的没签名他妈的没签名他妈的没签名他妈的没签名他妈的没签名他妈的没签名他妈的没签名他妈的没签名他妈的没签名</div>
          </div>
          <div class="lab">
            <div class="lab-content"><p>{{dataList.days}}</p></div>
            <div class="lab-content" v-if="dataList['userinfo']['gender']==='男'"><p>♂</p></div>
            <div class="lab-content" v-else><p>♀</p></div>
            <div class="lab-content"><p>{{dataList['userinfo']['department']}}</p></div>
            <!--<div class="lab-content"  ><p>dataList['userinfo']</p></div>-->

          </div>
          <div class="center" v-if="dataList.userinfo.id===id">
            <div class="lq-button lq-button-primary " v-if="dataList.userinfo">编辑</div>
          </div>
          <div class="center" v-else>
            <div class="lq-button lq-button-primary " style="background-color:deepskyblue;" v-if="dataList.userinfo">
              +私信
            </div>
            <div class="lq-button lq-button-primary " v-if="dataList.userinfo">+关注</div>

          </div>
        </div>
        <div class="stats-count">
          粉丝
          <span class="number">{{dataList.fr_count}}</span>
          关注
          <span class="number">{{dataList.fd_count}}</span>
        </div>
      </div>
    </div>
    <div ref="mescroll" class="mescroll">
      <!--展示上拉加载的数据列表-->

      <ul id="dataList" class="data-list">

        <li v-for="(worl, index) in dataList1" :key="index">

          <div class="forum_card">
            <!--用户信息-->
            <div class="user_line">
              <div class="user_line_wrap">
                <span class="portrait"><img :src="dataList['userinfo']['avatar']" alt=""></span>
                <!--<router-link class="portrait"><img :src="worl.Cuser['avatar']" alt=""></router-link>-->
                <div class="content">
                  <h4 class="title">{{dataList['userinfo']['nickname']}}</h4>
                  <div class="sub_title">
                    <span class="createtime">{{worl['create_time']}}</span>
                  </div>
                </div>
              </div>
            </div>
            <!--内容-->
            <div class="main_context">
              <p class="forum_title"></p>
              <p class="forum_sub_title1">{{worl.content}}</p>
              <div class="sudoku" style="width: 349px">
                <div class="sudoku_wrap">

                  <viewer class="img_item">
                    <img v-for="(pic, index) in worl.worldimages_set" :src="pic" :key="index">
                  </viewer>

                </div>
              </div>
            </div>
            <div class="interaction">
              <div class="wrap">
                <span class="left">zan</span>
                <span class="right">liuyan</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>


  import MeScroll from 'mescroll.js'
  import 'mescroll.js/mescroll.min.css'

  export default {

    data () {
      return {
        dataList: [],
        dataList1: [],
        id: Number(localStorage.userID),
        mescroll: null, // mescroll实例对象
        isEdit: false, // 是否获取编辑的列表数据
      }
    },
    mounted: function () {
      // 创建MeScroll对象
      this.mescroll = new MeScroll(this.$refs.mescroll, { // 在vue的mounted生命周期初始化mescroll,确保此处配置的ref有值
        up: {
          callback: this.upCallback,
          page: {
            num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
            size: 5 // 每页数据的数量
          },
          noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
          // toTop: { // 配置回到顶部按钮
          //   src: './static/images/mescroll-totop.png'
          //
          // },
          lazyLoad: {
            use: true // 是否开启懒加载,默认false
          }
        }
      })
    },

    methods: {
      getData () {
        var stuID = this.$route.query.id
        this.$axios('http://server.nsloop.com:17882/mysite/' + stuID).then((response) => {
          console.log(response)
          // console.log(typeof (this.id))
          // console.log(response)
          // console.log(response.data.world.results)
          this.dataList = []


          this.dataList = response.data
        }).catch(function (error) {
          console.log(error)

        })
      },


      upCallback(page) {
        var stuID = this.$route.query.id
        var pageNum = page.num; // 页码, 默认从1开始 如何修改从0开始 ?
        var pageSize = page.size; // 页长, 默认每页10条
        this.$axios('http://server.nsloop.com:17882/mydynamic/'+stuID+'/?page=' + pageNum + "&page_size=" + pageSize).then(data => {

          var curPageData = data.data.results; // 接口返回的当前页数据列表


          var totalPage = data['data']['count']/pageSize+1; // 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
          var totalSize = data['data']['count'] // 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
          var hasNext = data.data.next; // 接口返回的是否有下一页 (true/false)

          //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
          //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空,显示empty配置的内容;
          //列表如果无下一页数据,则提示无更多数据,(注意noMoreSize的配置)

          //方法一(推荐): 后台接口有返回列表的总页数 totalPage
          //必传参数(当前页的数据个数, 总页数)
          this.mescroll.endByPage(curPageData.length, totalPage);

          //方法二(推荐): 后台接口有返回列表的总数据量 totalSize
          //必传参数(当前页的数据个数, 总数据量)
          //mescroll.endBySize(curPageData.length, totalSize);

          //方法三(推荐): 您有其他方式知道是否有下一页 hasNext
          //必传参数(当前页的数据个数, 是否有下一页true/false)
          //mescroll.endSuccess(curPageData.length, hasNext);

          //方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.
          //如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
          //如果传了hasNext,则翻到第二页即可显示无更多数据.
          //mescroll.endSuccess(curPageData.length);

          //结束下拉刷新的 mescroll.endSuccess()无参.
          //结束上拉加载 curPageData.length必传的原因:
          // 1.使配置的noMoreSize 和 empty生效
          // 2.判断是否有下一页的首要依据: 当传的值小于page.size时,则一定会认为无更多数据.
          //   比传入的totalPage, totalSize, hasNext具有更高的判断优先级
          // 3.当传的值等于page.size时,才会取totalPage, totalSize, hasNext判断是否有下一页
          // 传totalPage, totalSize, hasNext主要目的是避免方法四描述的小问题

          //设置列表数据
          //setListData(curPageData);//自行实现 TODO
          if (page.num === 1) {
            this.dataList1 = []

          }
          this.dataList1 = this.dataList1.concat(curPageData)

        }).catch(e=> {

          //联网失败的回调,隐藏下拉刷新和上拉加载的状态
          this.mescroll.endErr();

        });
      },

    },





    created () {
      this.getData()
    },

    components: {


    },

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .mescroll {
    position: fixed;
    top: 0px;
    bottom: 0;
    height: auto;
    width 102%
  }

  .mescroll-totop {
    right: 5px;
    bottom: 55px;
  }

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
  ul li:first-child{
    height 350px
  }
  ul li:not(:first-child){
    background-color: white;
  }
  .msite_content_wrapper {
    position fixed
    top: 45px
    bottom: 46px
    width: 100%
  }

  .forum_card {
    padding-top: 30px;
    /*padding-bottom: 10px;*/
    border 1px solid #eeeeee
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

  .main_context .forum_sub_title1 {
    line-height: 20px;
    font-size: 16px;
    margin-left: 17px;
    margin-right: 17px;
    text-align: left;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
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
  #list {
    text-align center
    width: 349px
  }

  #list > li {
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
    margin-top: 9px;

  }

  .sudoku .img_item img {
    width: 108.333px;
    height: 108.333px;
    object-fit: cover;
    display inline-block
    margin-right 8px
    margin-top 5px
  }

  /*底部*/
  .wrap {
    width: 100%;
    line-height: 44px;
    overflow: hidden
    padding-bottom: 10px;
  }

  .left {
    margin-left: 20px;
    float: left;
  }

  .right {
    margin-right: 20px;
    float: right;
  }

  .mescroll-upwarp {
    min-height 60px
  }

  .all {
    position: relative
  }

  .background {
    display: block;
    height: 300px;
    width: 100%
    /*background-position: 50%;*/
    background-size: 100% 100%;
    position: absolute;
    clear: both;
    background-color: #d9d9d9;
    margin-top: 45px
    opacity: 0.8;
  }

  .home {
    position: absolute
    width: 100%
    height: 100%
    margin-top: 40px
  }

  .message {
    position: absolute;
    top: -35px;
  }

  .user {
    clear: both;
    /*text-align: center;*/
  }

  .user-avatar {
    display: block;
    position: absolute;
    border-radius: 50%;
    border: 3px solid #fff;
    width: 60px;
    height: 60px;
    left: 20px;
    margin: auto;
    top: 75px;
  }

  .user-avatar-content {
    border-radius: 50%;
  }

  .user-avatar-content {
    position: relative;
    width: 100%;
    padding-top: 100%;
    background: 50% no-repeat;
    background-size: cover;
  }


  .name {
    /*font-family: "Microsoft YaHei";*/
    /*text-align: center;*/
    font-size: 15px;
    font-weight: 600;
    line-height: 1.2;
    padding-top: 150px;
    color: white;
    margin-left: 20px;
  }

  .bio {
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 40px;
    font-size: 12px;
    line-height: 1.23;
    color: white;
    /*font-family: "Microsoft YaHei";*/
    font-weight bold
    width: 310px
    word-wrap: break-word;
    word-break: normal;
  }

  .center {
    /*text-align: center;*/
    /*padding: 45px 0;*/
    position: absolute;
    top: 85px;
    right: 20px;
  }

  .lq-button-primary {

  }

  .lq-button {
    background-color: #ffe411;
    border-color: #ffe411;
    display: inline-block;
    font-size: 12px;
    line-height: 1;
    color: #404040;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #dbdbdb;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: .6em 1.3em;
    border-radius: 1.6em;
  }

  .stats-count {
    /*border-top: 1px solid #f5f5f5;*/
    font-size: 15px;
    color: white;
    position: absolute
    text-align: center;
    /*padding-top: 90px;*/
    /*padding-bottom: 10px;*/
    margin-top: 280px
    height: 20px
    width: 349px
    padding-left: 15px;
  }

  .number:first-of-type {
    padding-right: 20px;
  }

  .number {
    font-size: 12px;
    font-weight: 600;
    vertical-align: center;
    color: white;
  }

  .lab {
    display: block;
    /*background-size: cover;*/
    margin-top: 30px;
    /*background-color: pink;*/
    height: 10px


    /*width 100%*/

  }

  .lab .lab-content {
    /*width: 5px;*/
    /*height: 3px;*/
    border-radius 10px
    background-color: rgba(255, 255, 255, 0.3);
    color white
    object-fit: cover;
    font-size 10px
    padding 3px 5px
    margin-left: 20px
    margin-right: -18px;
    display inline-block
    /*position: relative*/
    /*margin-right  2px*/
    /*margin-top 5px*/
  }

</style>

