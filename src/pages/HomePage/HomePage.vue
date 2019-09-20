<template>
  <div>
    <HeaderTop>
      <router-link class="header_search" slot="left" to="/dynamic" style="top: 28%;left: 8px">
        <i class="iconfont icon-fanhui" style="font-size: 26px"></i>
      </router-link>
    </HeaderTop>

    <!--滑动区域-->
    <div id="mescroll" class="mescroll" ref="mescroll">
      <!--模拟的轮播-->
      <img class="swiper" src="./bg.jpg"/>
      <div class="first">
        <!--展示上拉加载的数据列表-->
        <ul v-for="(worl, index) in dataList" :key="index">
          <li class="fu">
            <div class="message">

              <div class="avatar-wrap">
                <a class="user-avatar">
                  <div class="user-avatar-content"
                       :style="{backgroundImage:'url(' + dataList1['userinfo']['avatar'] + ')'}">
                  </div>
                </a>
              </div>
              <div class="user">
                <div class="name">{{dataList1['userinfo']['nickname']}}</div>
                <div class="bio" v-if="dataList1.userinfo.sign">{{dataList1['userinfo']['sign']}}</div>
                <div class="bio" v-else>他妈的没签名他妈的没签名他妈的没签名他妈的没签名他妈的没签名他妈的没签名他妈的没签名他妈的没签名他妈的没签名他妈的没签名他妈的没签名</div>
              </div>
              <div class="lab">
                <div class="lab-content"><p>{{dataList1.days}}</p></div>
                <div class="lab-content" v-if="dataList1['userinfo']['gender']==='男'"><p>♂</p></div>
                <div class="lab-content" v-else><p>♀</p></div>
                <div class="lab-content"><p>{{dataList1['userinfo']['department']}}</p></div>
                <!--<div class="lab-content"  ><p>dataList['userinfo']</p></div>-->
              </div>
              <div class="center" v-if="dataList1.userinfo.id===id">
                <div class="lq-button lq-button-primary " v-if="dataList1.userinfo">编辑</div>
              </div>
              <div class="center" v-else>
                <div class="lq-button lq-button-primary " style="background-color:deepskyblue;"
                     v-if="dataList1.userinfo">
                  +私信
                </div>
                <div class="lq-button lq-button-primary " v-if="dataList1.userinfo">+关注</div>

              </div>
              <div class="stats-count">
                粉丝
                <span class="number">{{dataList1.fr_count}}</span>
                关注
                <span class="number">{{dataList1.fd_count}}</span>
              </div>
            </div>
            <div class="forum_card" >
              <!--用户信息-->
              <div class="user_line">
                <div class="user_line_wrap">
                  <span class="portrait"><img :src="user['avatar']" alt=""></span>
                  <!--<router-link class="portrait"><img :src="worl.Cuser['avatar']" alt=""></router-link>-->
                  <div class="content">
                    <h4 class="title">{{user['nickname']}}</h4>
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

                    <router-link :to="{path:'/viewerx',query:{id:worl.id}}" class="img_item">
                      <img v-for="(pic, index) in worl.worldimages_set" :src="pic" :key="index">
                    </router-link>

                  </div>
                </div>
              </div>
              <div class="interaction">
                <div class="wrap">
                  <span class="left"><i class="iconfont icon-zan"></i></span>
                  <span class="right"><i class="iconfont icon-comments"></i></span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  // import Viewer from './Viewer/Viewer.vue'
  import MeScroll from 'mescroll.js'
  import 'mescroll.js/mescroll.min.css'

  export default {
    data () {
      return {
        picId:[],
        isFirstEnter:false ,// 是否第一次进入，默认false
        dataList1: [],
        id: Number(localStorage.userID),
        dataList: [],
        user: [],
        mescroll: null, // mescroll实例对象
        isEdit: false, // 是否获取编辑的列表数据
      }
    },
    mounted () {
      this.getData()
      // 创建MeScroll对象
      this.mescroll = new MeScroll(this.$refs.mescroll, { // 在vue的mounted生命周期初始化mescroll,确保此处配置的ref有值
        down:{
         use: false
        },
        up: {
          callback: this.upCallback,
          page: {
            num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
            size: 6 // 每页数据的数量
          },
          noMoreSize: 2, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
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
        this.$axios(api + 'mysite/' + stuID).then((response) => {
          // console.log(response)
          // console.log(typeof (this.id))
          // console.log(response)
          // console.log(response.data.world.results)
          this.dataList1 = []


          this.dataList1 = response.data
        }).catch(function (error) {
          console.log(error)

        })
      },
      upCallback (page) {
        var stuID = this.$route.query.id
        var pageNum = page.num // 页码, 默认从1开始 如何修改从0开始 ?
        var pageSize = page.size // 页长, 默认每页10条
        this.$axios(api+'mydynamic/' + stuID + '/?page=' + pageNum + '&page_size=' + pageSize).then(data => {
          var curPageData = data.data.results.results // 接口返回的当前页数据列表
          this.user = data.data.user
          // this.picId=data.data.results.results
          // console.log(this.worl)
          var totalPage = data['data']['results']['count'] / pageSize + 1 // 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
          var totalSize = data['data']['results']['count'] // 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
          var hasNext = data.data.results.next // 接口返回的是否有下一页 (true/false)
          console.log(data)
          //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
          //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空,显示empty配置的内容;
          //列表如果无下一页数据,则提示无更多数据,(注意noMoreSize的配置)

          //方法一(推荐): 后台接口有返回列表的总页数 totalPage
          //必传参数(当前页的数据个数, 总页数)
          this.mescroll.endByPage(curPageData.length, totalPage)

          //设置列表数据
          //setListData(curPageData);//自行实现 TODO
          if (page.num === 1) {
            this.dataList = []

          }
          this.dataList = this.dataList.concat(curPageData)

        }).catch(e => {

          //联网失败的回调,隐藏下拉刷新和上拉加载的状态
          this.mescroll.endErr()

        })
      },
    },
    // 进入路由时,恢复列表状态
    beforeRouteEnter (to, from, next) {  // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
      next(vm => {
        if (vm.mescroll) {
          // 恢复到之前设置的isBounce状态
          if (vm.mescroll.lastBounce != null) vm.mescroll.setBounce(vm.mescroll.lastBounce)
          // 滚动到之前列表的位置 (注意:路由使用keep-alive才生效)
          if (vm.mescroll.lastScrollTop) {
            vm.mescroll.setScrollTop(vm.mescroll.lastScrollTop)
            setTimeout(() => { // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
              vm.mescroll.setTopBtnFadeDuration(0)// 设置回到顶部按钮显示时无渐显动画
            }, 16)
          }
        }
      })

    },
    // 离开路由时,记录列表状态
    beforeRouteLeave (to, from, next) {  // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
      if (this.mescroll) {
        this.mescroll.lastBounce = this.mescroll.optUp.isBounce// 记录当前是否禁止ios回弹
        this.mescroll.setBounce(true) // 允许bounce
        this.mescroll.lastScrollTop = this.mescroll.getScrollTop()// 记录当前滚动条的位置
        this.mescroll.hideTopBtn(0)// 隐藏回到顶部按钮,无渐隐动画
      }
      next()

    },
    components: {
      HeaderTop,
      // Viewer
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  * {
    margin: 0;
    padding: 0;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    background-color: white
  }

  ul {
    list-style-type: none
  }

  a {
    text-decoration: none;
    /*color: #18B4FE;*/
  }

  /*模拟的标题*/
  .header {
    z-index: 9990;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    border-bottom: 1px solid #eee;
    background-color: #02a774;
  }

  .header .btn-left {
    position: absolute;
    top: 0;
    left: 0;
    line-height: 22px;
    padding: 12px;
  }

  /*模拟的轮播*/
  .swiper {
    width: 100%;
    height: 300px
    vertical-align: bottom;
  }

  /*菜单*/
  .nav {
    text-align: center;
    border-bottom: 1px solid #ddd;
    background-color: white;
  }

  .nav p {
    display: inline-block;
    width: 30%;
    padding: 10px 0;
  }

  .nav .active {
    border-bottom: 1px solid #FF6990;
    color: #FF6990;
  }

  /*ios使用sticky样式实现*/
  .nav-sticky {
    z-index: 9999; /*需设置zIndex,避免在悬停时,可能会被列表数据遮住*/
    position: -webkit-sticky;
    position: sticky;
    top: 0; /*相对mescroll的div悬停的位置*/
  }

  /*android和pc端悬停*/
  .nav-fixed {
    z-index: 9999;
    position: fixed;
    top: 44px;
    left: 0;
    width: 100%;
  }

  .first ul:first-child .fu:first-child .message:first-child {
    display: block;
  }

  /*列表*/
  .mescroll {
    position: fixed;
    top: 44px;
    bottom: 0;
    width: 102%;
    height: auto;
  }

  /*展示上拉加载的数据列表*/
  .data-list li {
    position: relative;
    border-bottom: 1px solid #eee;
  }

  .data-list .pd-img {
    position: absolute;
    left: 18px;
    top: 18px;
    width: 80px;
    height: 80px;
  }

  .data-list .pd-name {
    font-size: 16px;
    line-height: 20px;
    height: 40px;
    overflow: hidden;
  }

  .data-list .pd-price {
    margin-top: 8px;
    color: red;
  }

  .data-list .pd-sold {
    font-size: 12px;
    margin-top: 8px;
    color: gray;
  }

  a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, html, i, iframe, img, ins, kbd, label, legend, li, mark, menu, nav, object, ol, output, p, pre, q, ruby, s, samp, section, small, span, strike, strong, sub, summary, sup, table, tbody, td, tfoot, th, thead, time, tr, tt, u, ul, var, video {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
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
    margin-top: 0px
  }

  .message {
    position: absolute;
    z-index 999
    margin-top: -355px
    display none
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
    margin-top: 45px
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
    padding 2px 5px
    margin-left: 20px
    margin-right: -18px;
    display inline-block
    /*position: relative*/
    /*margin-right  2px*/
    /*margin-top 5px*/
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
  .viewer-transition{
    z-index 99999
  }
</style>
