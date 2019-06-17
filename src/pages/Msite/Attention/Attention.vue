
<template>
  <div>
    <!--滑动区域-->
    <div ref="mescroll" class="mescroll" style="top: 85px;">
      <!--展示上拉加载的数据列表-->
      <ul id="dataList" class="data-list">

        <li v-for="(worl, index) in dataList" :key="index">
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
              <p class="forum_title" v-if="worl.tag"># {{worl.tag}}</p>
              <p class="forum_sub_title" >{{worl.content}}</p>
              <div class="sudoku" style="width: 349px">
                <div class="sudoku_wrap">

                  <viewer  class="img_item" >
                    <img  v-for="(pic, index) in worl.worldimages_set" :src="pic" :key="index" >
                  </viewer>

                </div>
              </div>
            </div>
            <div class="interaction" >
              <div class="wrap">
                <span class="left"><i class="iconfont icon-zan"></i></span>
                <span class="right"><i class="iconfont icon-comments"></i></span>
              </div>
              <!--<hr style="color: #eee">-->
            </div>
          </div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  import {mapState} from 'vuex'
  import MeScroll from 'mescroll.js'
  import 'mescroll.js/mescroll.min.css'
  import Vue from 'vue'


  // new BScroll('.msite_content_wrapper')
  export default {
    data () {
      return {
        mescroll: null, // mescroll实例对象
        dataList: [], // 列表数据
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
            size: 10 // 每页数据的数量
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
      // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10

      //上拉加载的回调 page = {num:1, size:10}; num:当前页 默认从1开始, size:每页数据条数,默认10
      upCallback(page) {
        var pageNum = page.num; // 页码, 默认从1开始 如何修改从0开始 ?
        var pageSize = page.size; // 页长, 默认每页10条
        this.$axios(api+'f/?page=' + pageNum + "&page_size=" + pageSize).then(data => {

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
            this.dataList = []

          }
          this.dataList = this.dataList.concat(curPageData)
        }).catch(e=> {

          //联网失败的回调,隐藏下拉刷新和上拉加载的状态
          this.mescroll.endErr();

        });
      },


      // upCallback (page) {
      //       // 模拟联网
      //       this.getListDataFromNet(this.pdType, page.num, page.size, (arr) => {
      //         // 如果是第一页需手动制空列表
      //         if (page.num === 1) this.dataList = []
      //         // 把请求到的数据添加到列表
      //         this.dataList = this.dataList.concat(arr)
      //         // 数据渲染成功后,隐藏下拉刷新的状态
      //         this.$nextTick(() => {
      //           this.mescroll.endSuccess(arr.length)
      //         })
      //       }, () => {
      //         this.mescroll.endErr()
      //       })
      //     },
      /* 联网加载列表数据
       * 在您的实际项目中,请参考官方写法: http://www.mescroll.com/api.html#tagUpCallback
       * 请忽略getListDataFromNet的逻辑,这里仅仅是在本地模拟分页数据,本地演示用
       * 实际项目以您服务器接口返回的数据为准,无需本地处理分页.
       */

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
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">


  /*以fixed的方式固定mescroll的高度*/
  .mescroll {
    position: fixed;
    top: 45px;
    bottom: 0;
    height: auto;
    width 102%

  }
  .mescroll-totop{
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
  .msite_content_wrapper {
    position fixed
    top: 45px
    bottom: 46px
    width: 100%
  }
  .forum_card {
    padding-top: 20px;
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
  .main_context .forum_sub_title {
    line-height: 20px;
    font-size: 16px;
    margin-left: 17px;
    margin-right: 17px;
    margin-top: 12px
    text-align: left;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
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
    margin-top: 9px;

  }
  .sudoku .img_item img {
    width: 108.333px;
    height: 108.333px;
    object-fit: cover;
    display inline-block
    margin-right  8px
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
  .mescroll-upwarp{
    min-height 60px
  }
</style>
