<template>

    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
            <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent="login">
            <div :class="{on:loginWay}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号">
                <button disabled="disabled" class="get_verification">获取验证码</button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码">
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:!loginWay}">
              <section>
                <section class="login_message">
                  <input type="text" placeholder="学号" v-model="name">
                </section>
                <section class="login_verification">
                  <input type="text"  placeholder="密码" v-if="showPwd" v-model="pwd">
                  <input type="password"  placeholder="密码" v-else v-model="pwd">
                  <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                    <div class="switch_circle" :class="{right:showPwd}"></div>
                    <span class="switch_text">{{showPwd?'abc':'...'}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <img class="get_verification" src='http://server.nsloop.com:17882/users/' alt="captcha"
                  @click="getCaptcha" ref="captcha">
                </section>
              </section>
            </div>
            <button class="login_submit">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>

      <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
    </section>

</template>

<script>
  import AlertTip from '../../components/AlterTip/AlterTip.vue'
  import {reqPwdLogin} from "../../api";

  export default {
    data() {
      return {
        loginWay: true,//true代表短信登录，false密码登录
        showPwd: false,//是否显示密码
        name:'',//用户名
        pwd: '',//密码
        captcha:'',//图形验证码
        alertText: '',//提示文本
        alertShow:false,//是否显示提示框
      }
    },

    methods:{
      showAlert(alertText){
        this.alertShow=true
        this.alertText=alertText
      },
      //异步登录
      async login(){
        let result
        //前台表单验证
        if (this.loginWay){//短信登录

        } else {//密码登录
          const {name,pwd,captcha}=this
          if (!this.name){
            //用户名必须指定
            this.showAlert('用户名必须指定')
            return
          } else if (!this.pwd){
            //密码必须指定
            this.showAlert('密码必须指定')
            return
          } else if (!this.captcha){
            //验证码必须指定
            this.showAlert('验证码必须指定')
            return
          }
          //发送ajax请求密码登录
          console.log(name,pwd,captcha)
          result = await reqPwdLogin({name,pwd,captcha})
        }
// console.log(result)
        //根据结果数据处理
        if (result.message==='ok'){
        const user=result.data
          console.log(user)
          //将user保存到vuex的state
          this.$store.dispatch('recordUser',user)
          //去个人中心界面
          this.$router.replace('/profile')
      } else {
          //显示新的图片验证码
          this.getCaptcha()
          //显示警告提示
        const msg = result.msg

          this.showAlert(msg)

      }
      },
      //关闭警告框
      closeTip(){
        this.alertShow=false
        this.alertText=''
      },
      //获取一个新的图片验证码
      getCaptcha(){
        //每次指定的src要不一样
        this.$refs.captcha.src='http://server.nsloop.com:17882/users?time='+Date.now()
      }
    },

    components:{
      AlertTip
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff

    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto

      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center

        .login_header_title
          padding-top 40px
          text-align center

          > a
            color #333
            font-size 14px
            padding-bottom 4px

            &:first-child
              margin-right 40px

            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774

      .login_content
        > form
          > div
            display none

            &.on
              display block

            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial

              &:focus
                border 1px solid #02a774

            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff

              .get_verification
                height 35px
                position absolute
                top 50%
                right 5px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent

            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff

              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s, border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)

                &.off
                  background #fff

                  .switch_text
                    float right
                    color #ddd

                &.on
                  background #02a774

                > .switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                  transition transform .3s

                  &.right
                    transform translateX(30px)

            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px

              > a
                color #02a774

          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0

        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999

      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px

        > .iconfont
          font-size 20px
          color #999
</style>
