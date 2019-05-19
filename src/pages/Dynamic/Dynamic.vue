<template>
  <section>
    <HeaderTop/>
    <div class="msite_content_wrapper">
      <Scroll
        ref="pullrefresh"
        @pulldown="loadData"
        @pullup="loadMore">
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

              <div class="interaction">
                <div class="wrap">
                  <span class="left">zan</span>
                  <span class="right">liuyan</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </Scroll>
    </div>
  </section>
</template>

<script>
  import BScroll from 'better-scroll'
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import Scroll from '../../components/Scroll/Scroll.vue'
  import {mapState} from 'vuex'

  export default {

    data() {
      return {
        cricleList: [],
        page: 2, // 加载更多从page2开始
        page_size: 10, // 每次请求3条数据
        loading: false,
        world :[]
      };
    },
    created() {
      this.getLatestData();
    },
    methods: {
      getLatestData() {
        if (this.loading) return;
        this.loading = true;
        this.$axios.get("http://server.nsloop.com:17882/world/").then(res => {
          this.loading = false;
          // console.log(res)
          this.world = [...res.data.results];
          // console.log(this.cricleList);
          // console.log(this.world)
          this.$refs.pullrefresh.$emit("pullrefresh.finishLoad");
        });
      },
      loadData() {
        //下拉刷新重新初始化
        this.page = 2;
        this.getLatestData();
      },
      loadMore() {
        this.getMoreData();
      },
      getMoreData() {
        if (this.loading) return;
        // 发送axios请求
        this.loading = true;
        this.$axios(`http://server.nsloop.com:17882/world/?page=${this.page}&page_size=${this.page_size}`).then(res => {
          var total=res['data']['count']/this.page_size+1
          this.loading = false;
          console.log(res)
          const result = [...res.data.results];
          // console.log(result)
          if (this.page<=total) {
            // 拿到结果数据进行遍历 push到列表数组中，并且page+1
            this.$refs.pullrefresh.$emit("infinitescroll.reInit");
            result.forEach(worl => {
              this.world.push(worl);
            });
            this.page++;
          } else {
            // 数组为空，没有更多数据，page不再递增
            this.$refs.pullrefresh.$emit("infinitescroll.loadedDone");
          }
        }).catch(error=> {
          console.log(error.response)
          this.$refs.pullrefresh.$emit("infinitescroll.loadedDone");
        })
      }
    },

    mounted () {
      // this.$store.dispatch('getWorld')
    },

    computed: {
      // ...mapState(['world'])
    },
    watch: {
      world (value) {
        this.$nextTick(() => {//列表数据更新显示后执行
          //列表显示后创建
          new BScroll('.msite_content_wrapper')
        })
      }
    },
    components: {
      HeaderTop,
      Scroll
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
