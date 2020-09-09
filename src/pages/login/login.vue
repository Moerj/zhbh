<style lang="scss" scoped>
    @import '~@/scss/variables.scss';
    $color:#26a2ff;
    .form{
        margin-top: 10px;
    }
    .form-item {

        display: flex;
        align-items: center;
        font-size: 1rem;
        margin-bottom: .7rem;
        margin-top: 10px;
        position: relative;
        /*border-bottom: 1px solid rgba(black, .05);*/
        background: linear-gradient(180deg,#eff4ff, #f0f5ff);
        padding: 6px 15px;
        border-radius: 6px;
        overflow: hidden;
        label {
            white-space: nowrap;
            color: rgba(black, .5);
            &::after {
                content: ':';
            }
        }
        input {
            outline: none;
            font-size: inherit;
            flex: 1;
            padding: 0.5rem;
            background-color: transparent;
            border: none;
            &:focus {
                & + .line {
                    transform: scale3d(1, 1, 1);
                }
            }
        }
        .line {
            height: 1px;
            width: 100%;
            background-color: rgba($color,.6);
            position: absolute;
            bottom: -1px;
            left:0;
            transition: 1s;
            transform: scale3d(0, 1, 1);
        }
    }

    .bg {
        z-index: 1;
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(180deg,#204ca9, rgba(32,76,169,0.93) 25%, rgba(32,76,169,0.37)100%);
        background-size: cover;
    }
    .bg-bottom{
        z-index: 0;
        width: 200%;
        height: 23rem;
        position: absolute;
        bottom: 0;
        /* background-size: cover; */
        background-position: -247px -56px;
        background-repeat: no-repeat;
        /*background-position: center center;*/
        background-image: url('../../static/images/ bg-bottom.jpg');
        opacity: 0.9;
    }
    .form {
        width: 80%;
        z-index: 2;
    }

    .login-btn{
        background: linear-gradient(180deg,#e6edfb, #f9fafd);
        border: 2px solid;
        border-image: linear-gradient(180deg, #dde5f3, #eceffb 2%, #f7f8fc 98%) 2 2;
        border-radius: 10px;
        overflow: hidden !important;
        /*box-shadow: 0px 0px 16px 0px rgba(254,254,255,0.3);*/
    }
    .header{
        z-index: 2;
        margin: 40px 0 30px;
        .logo{
            margin:10px;
            width: 100%;
            height: 49px;
            background-size: cover;
            background: url("../../static/images/ logo-partner.png") no-repeat;
            opacity: 1;
        }
    }
    .desc{
        z-index: 99;
        color: #ffffff;
        margin-bottom: 10px;
        .tips{
            font-size: 20px;
            color: #ffffff;
            font-weight: bold;
            margin: 0 10px;
        }
        .tip-lines{
            width: 20px;
            height: 1px;
            background: #fff;
        }
    }
    .footer{
        position: absolute;
        bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .unit{
            font-size: 12px;
            color: #fff;
            line-height: 20px;
        }
    }
    .block{
        width: 100%;
        height:120px;
    }
    .btn_box{
        background: linear-gradient(180deg,#e6edfb, #f9fafd);
        /*border: 2px solid;*/
        border-image: linear-gradient(180deg, #dde5f3, #eceffb 2%, #f7f8fc 98%) 2 2;
        border-radius: 10px;
        box-shadow: 0px 0px 16px 0px rgba(254,254,255,0.3);
        overflow: hidden;
        margin-top:40px;
    }
    .login-btn{
        flex:1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4px;

    }
</style>
<template>
    <ui-main>
        <div class="flex flex-column h-100">

            <div class="flex w-100 row-center flex-column h-100" style="z-index: 999;">
                <div class="header flex row-center w-100">
                    <!--<div class="logo"></div>-->
                    <van-image width="160" :src="logo" fit="cover"/>
                </div>
                <div class="desc">
                    <div class="flex col-center">
                        <div class="tip-lines"></div>
                        <div class="tips">旅游新使命  健康新生活</div>
                        <div class="tip-lines"></div>
                    </div>
                </div>
                <div class="meetting flex flex-column col-center">
                    <van-image width="120" :src="fifthZC" fit="cover"/>
                    <van-image width="300" :src="meeting" fit="cover"/>
                    <van-image width="270" :src="fifth" fit="cover"/>
                </div>
                <div class="form">
                    <div class="form-item">
                        <van-image width="14" :src="phoneIcon" fit="cover"/>
                        <input v-model="loginForm.phoneNo" type="text" placeholder="输入手机号">
                        <i class="line"></i>
                    </div>
                    <div class="form-item">
                        <van-image width="14" :src="pwdIcon" fit="cover"/>
                        <input v-model="loginForm.joinCode" type="password" placeholder="输入邀请码">
                        <i class="line"></i>
                    </div>
                    <div class="form-item btn_box">
                        <div @click="login(loginForm)" class="login-btn">登录</div>
                    </div>

                </div>
                <div class="block"></div>
                <div class="footer">
                    <div class="unit">主办单位:中共贵州省委、贵州省人民政府</div>
                    <div class="unit">承办单位:中共六盘水市委、六盘水市人民政府、贵州省文化旅游厅</div>
                </div>
            </div>
          <div class="bg" ref="bg" style="min-height:750px"></div>
          <!--<div class="bg-bottom"></div>-->
          <div style="width: 100%;">
            <img src="../../static/images/ bg-bottom.jpg" style="width: 150%;position: absolute; bottom: 0px; left: -30%;opacity: 0.7;">
          </div>

        </div>
    </ui-main>
</template>
<script>
import logo from '../../static/images/ logo-partner.png'
import newLife from '../../static/images/newLife.png'
import meeting from '../../static/images/commity.png'
import fifth from '../../static/images/Guizhou15th.png'
import fifthZC from '../../static/images/fifth.png'
import phoneIcon from '../../static/images/ icon-mm.png'
import pwdIcon from '../../static/images/ icon-gzzh.png'
  export default {
    data() {
      return {
        isDevelopment: process.env.NODE_ENV === "development", //开发模式
        loginForm: {
          joinCode: "",
          phoneNo: "",
        },
        logo,
        newLife,
        meeting,
        fifth,
        fifthZC,
        phoneIcon,
        pwdIcon
      };
    },
    methods: {
      async login(data) {
        let wxData = {}
        if (sessionStorage.wxData) {
          wxData = JSON.parse(sessionStorage.wxData)
        }
        const validatePhone = await this.checkPhone(data.phoneNo);
        const validateCode = await this.checkCode(data.joinCode);
        if (validatePhone && validateCode) {
          let param = {
            joinCode: data.joinCode.toUpperCase(),
            phoneNo: data.phoneNo,
            openId: wxData.openId,
            wxNickName: wxData.nick,
          };
          this.$store.dispatch("login", param).then((res) => {
              // userRole 1.参会嘉宾  2 服务志愿者 3 媒体工作者
              this.$router.replace({
                path: this.$store.getters.roleNav.get(res.user.userRole),
                query: {
                  openId: wxData.openId,
                },
              })
          })
        }
      },
      checkPhone(phoneNum) {
        let phone = phoneNum;
        if (!phone) {
          this.$toast("手机号码不能为空");
          return false;
        }
        if (!/^1[3456789]\d{9}$/.test(phone)) {
          this.$toast("手机号码格式错误");
          return false;
        }
        return true;
      },
      checkCode(codeVal) {
        let code = codeVal;
        if (!code) {
          this.$toast("邀请码不能为空");
          return false;
        }
        if (!/^[A-Za-z0-9]+$/.test(code)) {
          this.$toast("邀请码错误");
          return false;
        }
        return true;
      },
    },
  };
</script>
