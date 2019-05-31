<template>
  <!-- 主页 -->
  <div>
  <div class="home" ref="home">
    <!-- better-scroll 必须把需要滑动的区域放在第一个 -->
    <div ref="mescroll" class="mescroll1"  :scroll="scroll" :directionDown="directionDown">
    <qkj-body :scroll="scroll" :directionDown="directionDown">
      <Message ></Message>
      <qkj-navbar ></qkj-navbar>
      <div id="upscrollWarp"  class="qkj-item" v-for="(worl,index) in dataList" :key="index">
        <div class="qkj-item__header">
          <img class="qkj-item__avatar" :src="user['avatar']"></img>
          <div class="qkj-item__desc">
            <p class="qkj-item__name">{{user.nickname}}</p>
            <p class="qkj-item__time">{{worl.create_time}}</p>
          </div>
        </div>
        <div class="qkj-item__content">{{worl.content}}</div>
        <div class="sudoku_wrap">

          <viewer  class="img_item" >
            <img  v-for="(pic, index) in worl.worldimages_set" :src="pic" :key="index" >
          </viewer>

        </div>
        <div class="qkj-item__footer">
          <ul>
            <li><img :src="icon.comment"></li>
            <li @touchstart="ratingActive" :class="{'active': active}"><img :src="icon.rating[active?0:1]"></li>
          </ul>
        </div>
      </div>
    </qkj-body>
    </div>
    <!-- 固定在顶部的标题 -->
    <qkj-title :scroll="scroll" :loading="loading"  title="全部动态" id="searchbar" class="searchbar">
      <!-- 作用域 slot 用来向slot中传值，接受img 和 span 标签 ，active表示状态的改变，以此使两种状态显示不同的效果-->
      <template   slot="left" >

        <i slot="left" @click="$router.go(-1)">&lt;</i>

      </template>

      <template slot="right">
        <span>会员</span>
      </template>
    </qkj-title>
    </div>
  </div>
</template>

<script>
  import Message from './Message/Message.vue'
  import QkjNavbar from './QkjNavbar/QkjNavbar.vue'
  import QkjHeader from './QkjHeader/QkjHeader.vue'
  import QkjBody from './QkjBody/QkjBody.vue'
  import QkjTitle from './QkjTitle/QkjTitle.vue'
  import MeScroll from 'mescroll.js'
  import 'mescroll.js/mescroll.min.css'

  import BScroll from 'better-scroll'


  export default {
    name: 'Home',
    data() {
      return {

        loading: false,// 是否在刷新
        scroll: 0,
        active: false,
        arrowTouched: false,
        directionDown: false,
        dataList:[],
        user:[],
        mescroll: null, // mescroll实例对象
        isEdit: false, // 是否获取编辑的列表数据

        icon: {
          lImg: [require('./search1.png'), require('./search2.png')],
          rImg: [require('./search1.png'), require('./search2.png')],
          rating: [require('./rating1.png'),require('./rating.png')],
          comment: require('./comment.png'),
        }
      }
    },
    components: {
      QkjHeader,
      QkjBody,
      QkjTitle,
      QkjNavbar,
      Message
    },
    created () {
      // this.requestData()
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll)
      // this.$nextTick(() => {
      //   this.initScroll()
      // })
      this.$nextTick(() => {
        this._initScroll()
      })
      // 创建MeScroll对象
      this.mescroll = new MeScroll(this.$refs.mescroll, { // 在vue的mounted生命周期初始化mescroll,确保此处配置的ref有值
       down : {use:false },

        up: {
          callback: this.upCallback,
          page: {
            num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
            size: 6 // 每页数据的数量
          },
          warpId: "upscrollWarp", //让上拉进度装到upscrollWarp里面
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
      upCallback(page) {
        var stuID = this.$route.query.id
        var pageNum = page.num; // 页码, 默认从1开始 如何修改从0开始 ?
        var pageSize = page.size; // 页长, 默认每页10条
        this.$axios('http://server.nsloop.com:17882/mydynamic/'+stuID+'/?page=' + pageNum + "&page_size=" + pageSize).then(data => {

          var curPageData = data.data.results.results; // 接口返回的当前页数据列表
          this.user=data.data.user;

          var totalPage = data['data']["results"]['count']/pageSize+1; // 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
          var totalSize = data['data']["results"]['count'] // 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
          var hasNext = data.data.results.next; // 接口返回的是否有下一页 (true/false)

          //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
          //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空,显示empty配置的内容;
          //列表如果无下一页数据,则提示无更多数据,(注意noMoreSize的配置)

          //方法一(推荐): 后台接口有返回列表的总页数 totalPage
          //必传参数(当前页的数据个数, 总页数)
          this.mescroll.endByPage(curPageData.length, totalPage);


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
      // initScroll () {
      //   this.myScroll = new BScroll('.home', this.options)
      //   // this.pullDownEvent()
      //   this.pullUpLoadEvent()
      // },
      // getData(page) {
      //   var stuID = this.$route.query.id
      //   var pageNum =this.num; // 页码, 默认从1开始 如何修改从0开始 ?
      //  var pageSize =this.size; // 页长, 默认每页3条
      //   this.$axios('http://server.nsloop.com:17882/mydynamic/'+stuID+'/?page=' + pageNum+"&page_size=" + pageSize ).then(data => {
      //     // console.log(7777777777777,data.data)
      //     var curPageData = data.data.results.results; // 接口返回的当前页数据列表
      //
      //     this.user=data.data.user;
      //     // console.log(787777777777777777,this.user)
      //
      //     this.totalPage = data['data']["results"]['count']/pageSize+1; // 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
      //     var totalSize = data['data']["results"]['count'] // 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
      //     var hasNext = data.data.results.next; // 接口返回的是否有下一页 (true/false)
      //     //设置列表数据
      //     //setListData(curPageData);//自行实现 TODO
      //     if (this.num === 1) {
      //       this.dataList = []
      //
      //     }
      //     this.dataList = this.dataList.concat(curPageData)
      //     // this.$nextTick(() => {
      //     //   this.finishPulling()
      //     // })
      //   })
      // },

      ratingActive() {
        this.active = !this.active
      },
      handleTouch(e) {
        this.arrowTouched = true
        this.$store.dispatch('show')
        this.$store.dispatch('setY', e.touches[0].clientY)
      },
      // handleScroll () {
      //   var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      //   var offsetTop = document.querySelector('#searchbar').offsetTop
      //   if (scrollTop > offsetTop) {
      //     this.searchBarFixed = true
      //   } else {
      //     this.searchBarFixed = false
      //   }
      // },
      // 初始化 better-scroll
        _initScroll() {
        // this.myScroll = new BScroll(this.$refs.home, this.options)
        // this.pullUpLoadEvent()

        this.homeScroll = new BScroll(this.$refs.home, {
          momentumLimitTime: 500,
          momentumLimitDistance: 15,
          deceleration: 0.005,
          swipeTime: 500,
          swipeBounceTime: 50,
          probeType: 2,
          pullDownRefresh: {
            threshold: 40,
          }
        },)


        // 判断下拉刷新事件
        this.homeScroll.on('pullingDown', () => {
          this.loading = true
          this.homeScroll.finishPullDown()
          setTimeout(() => {
            this.loading = false
          },2000)
        })
        // 获得当前滑动的坐标
        this.homeScroll.on('scroll', () => {
          this.scroll = this.homeScroll.y
        })
      },

      // finishPulling() {
      //   this.myScroll.finishPullDown() // 结束下拉刷新
      //   this.myScroll.finishPullUp()   // 结束上拉加载更多
      //   this.myScroll.refresh()        // dom节点变化，重新计算better-scroll
      // },
      // requestData () {
      //   var stuID = this.$route.query.id
      //   this.$axios('http://server.nsloop.com:17882/mydynamic/'+stuID+'/?page=' + this.pageNo+"&page_size=" + this.pageSize).then(res => {
      //     this.user=res.data.user;
      //     if (this.isPullDown) {
      //       this.dataList = [] // 清空数据，以防重复渲染
      //     }
      //     this.dataList = res.data.results.results
      //     // var curPageData = data.data.results; // 接口返回的当前页数据列表
      //
      //
      //     // this.pageNo = res.pageNo
      //     this.totalPage = res.data["results"]['count']/this.pageSize+1;
      //     this.$nextTick(() => {
      //       this.finishPulling()
      //     })
      //   })
      // },
      // finishPulling() {
      //   this.myScroll.finishPullDown() // 结束下拉刷新
      //   this.myScroll.finishPullUp()   // 结束上拉加载更多
      //   this.myScroll.refresh()        // dom节点变化，重新计算better-scroll
      // },
      // pullDownEvent () {
      //   this.myScroll.on('pullingDown', () => {
      //     this.isPullDown = true
      //     console.log('下拉刷新')
      //     this.pageNo = 1
      //     this.requestData()
      //   })
      // },
      // pullUpLoadEvent () {
      //   this.myScroll.on('pullingUp', () => {
      //     console.log('上拉加载')
      //     if (this.pageNo < this.totalPage) {
      //       this.pageNo++
      //       setTimeout(()=>{
      //       this.requestData().then((res)=>{
      //         this.dataList=this.dataList.concat(res.data.results.results)
      //         this.myScroll.finishPullUp()
      //         this.myScroll.refresh();
      //       },2000)
      //       })
      //     }
      //   })
      // }
    },



  }
</script>

<style  lang="stylus" rel="stylesheet/stylus">
  .mescroll1 {
    position: fixed;
    top: 0
    /*bottom: 0;*/
    height: auto
    width 102%
  }
  .home{
    background: url('bg.jpg') no-repeat;
    background-size: 100%;
    width: 100%;
    /*overflow: hidden;*/
    height auto
    position: fixed
  }
  .qkj-item{
    box-sizing: border-box;
    width: 100%;
    height: auto;
    padding: 10px 17px;
    border-top: 10px solid #ececec;
    background: white;
    font-weight: 100;
    position: relative;
  }
  .qkj-item__header {
    width: 100%;
    height: 45px;
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
    position: relative;
  }
  .arrow {
    position: absolute;
    width: 10px;
    height: 10px;
    right: 30px;
    top: 50px;
    z-index: 1000;
  }
  .qkj-item__avatar	{
    margin-top: -8px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .qkj-item__desc	{
    flex: 1;
    display: flex;
    padding-left: 20px;
    flex-direction: column;
    justify-content: center;
  }
  .qkj-item__name {
    line-height: 10px;
    font-size: 14px;
    letter-spacing: 0;
  }
  .qkj-item__time,.qkj-item__equipment {
    line-height: 50px;
    font-size: 14px;
    color: gray;
  }
  .qkj-item__content {
    margin-top: 10px;
    width: 100%;
    font-weight: 100;
    font-size: 14px;
    max-height: 500px;
    text-align: justify;
  }
  .qkj-item__equipment {
    padding: 10px 0;
    font-family: "Lucida Family";
    font-weight: 100;
  }
  .qkj-item__footer {
    height: 50px;
    padding: 10px 0;
    position: relative;
  }
  .qkj-item__footer span {
    color: gray;
    font-size: 14px;
    font-weight: 100;
    letter-spacing: 1px;
    height: 60px;
    line-height: 60px;
  }
  .qkj-item__footer ul {
    display: inline-block;
    float: right;
    height: 50px;
    line-height: 63px;
  }
  .qkj-item__footer ul li {
    margin-left: 30px;
    float: right;
    list-style: none;
  }
  .active	{
    animation: duang .4s linear alternate;
  }
  .qkj-item__footer img {
    height: 20px;
    width: 20px;
  }
  @keyframes duang {
    0%{
      transform: scale(1);
    }
    50%{
      transform: scale(2);
    }
    100%{
      transform: scale(1)
    }
  }
  .qkj-item__footer::after {
    content: "";
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    height: 1px;
    transform: scaleY(.5);
  }
  .qkj-item__rating {
    font-size: 14px;
    color: #4c77a7;
    height: 100px;
    letter-spacing: 2px;
    line-height: 100px;
  }
  .qkj-item__input {
    height: 30px;
    line-height: 100px;
  }
  .qkj-item__input div {
    display: flex;
    justify-content: space-between;
    border: 1px solid #777;
    border-radius: 5px;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    padding: 0 15px;
    color: #777;
  }
  .qkj-item__input img {
    margin-top: 8px;
    width: 20px;
    height: 20px;
  }
  .sudoku_wrap .img_item {
    display: block;
    background-size: cover;
    margin-top: 9px;
  }
  .sudoku_wrap .img_item img {
    width: 108.333px;
    height: 108.333px;
    object-fit: cover;
    display inline-block
    margin-right  8px
    margin-top 5px
  }
  .mescroll-upwarp {
    border-top: 10px solid #ececec;
    /*visibility visible*/
    overflow hidden
  }
</style>
