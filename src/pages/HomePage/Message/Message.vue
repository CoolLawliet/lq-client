<template>
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
    <div class="stats-count">
      粉丝
      <span class="number">{{dataList.fr_count}}</span>
      关注
      <span class="number">{{dataList.fd_count}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dataList: [],
        id: Number(localStorage.userID),
      }
    },

    mounted(){
      this.getData()
    },


    methods: {
      getData () {
        var stuID = this.$route.query.id
        this.$axios('http://server.nsloop.com:17882/mysite/' + stuID).then((response) => {
          // console.log(response)
          // console.log(typeof (this.id))
          // console.log(response)
          // console.log(response.data.world.results)
          this.dataList = []


          this.dataList = response.data
        }).catch(function (error) {
          console.log(error)

        })
      },
    },

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
    top: -20px;
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
</style>

