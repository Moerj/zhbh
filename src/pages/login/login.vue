<style lang="scss" scoped>
  @import "~@/scss/variables.scss";
  $color: #26a2ff;

  // WangQ
  // 2020-08-22 11:00
  .login-wrapper {
    background-color: #fff;
    position: relative;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
  }

  .login-bg {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .login-logo {
    padding-top: 16%;
    width: 100%;
    background: linear-gradient(180deg, #e7ffff, #ffffff);
    .logo-icon {
      text-align: center;
      img {
        width: 30vw;
        vertical-align: middle;
      }
    }
    .logo-title {
      text-align: center;
      img {
        display: block;
        margin: auto;
      }
      .title-img {
        width: 74vw;
      }
      .subtitle-img {
        width: 22vw;
        margin-top: 0.5rem;
      }
    }
  }

  .bottom-img {
    flex: 0 1 auto;
    img {
      width: 100%;
      vertical-align: middle;
    }
  }

  .login-form {
    width: 100%;
    padding: 4vh 10vw;
    .van-cell {
      background-color: transparent;
      &::after {
        border-bottom-color: #d8d8d8;
      }
      .left-icon {
        margin-right: 10px;
        img {
          vertical-align: middle;
        }
      }
    }
    .submit-btn {
      .van-button--danger {
        background-color: #c7000b;
        border-color: #c7000b;
        border-radius: 10px;
      }
    }
  }
</style>
<template>
  <ui-main>
    <div class=" h-100 login-wrapper">
      <div class="login-bg">
        <div class="login-logo">
          <div class="logo-icon">
            <img src="./image/icons_logo.svg" alt="LOGO" />
          </div>

          <div class="logo-title">
            <div style="font-weight: 800;font-size: 20px;margin-top: 15px">
              第十五届贵州旅游产业发展大会
            </div>
            <img
                    class="subtitle-img"
                    src="./image/subtitle.png"
                    alt="参会入口"
            />
          </div>
        </div>

        <van-form @submit="login" class="login-form">
          <van-field
                  v-model="loginForm.phoneNo"
                  type="tel"
                  maxlength="11"
                  name="phoneNo"
                  placeholder="请输入您的电话号码"
          >
            <div slot="left-icon" class="left-icon">
              <img src="./image/icon_mm.svg" alt="" />
            </div>
          </van-field>
          <van-field
                  v-model="loginForm.joinCode"
                  name="joinCode"
                  maxlength="6"
                  placeholder="请输入参会邀请码"
          >
            <div slot="left-icon" class="left-icon">
              <img src="./image/icon_gzzh.svg" alt="" />
            </div>
          </van-field>
          <div class="submit-btn">
            <van-button block type="danger" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>

        <div class="bottom-img">
          <img src="./image/bottom-img.png" />
        </div>
      </div>
    </div>
  </ui-main>
</template>
<script>
  export default {
    data() {
      return {
        isDevelopment: process.env.NODE_ENV === "development", //开发模式
        loginForm: {
          joinCode: "",
          phoneNo: "",
        },
      };
    },
    methods: {
      async login(data) {
        if (sessionStorage.wxData) {
          Object.assign(data,JSON.parse(sessionStorage.wxData))
        }
        const validatePhone = await this.checkPhone(data.phoneNo);
        const validateCode = await this.checkCode(data.joinCode);
        if (validatePhone && validateCode) {
          let param = {
            joinCode: data.joinCode.toUpperCase(),
            phoneNo: data.phoneNo,
            openId: data.openid,
            wxNickName: data.nickName,
          };
          this.$store.dispatch("login", param).then((res) => {
            console.log(res.user.userRole)
              // userRole 1.参会嘉宾  2 服务志愿者 3 媒体工作者
              this.$router.push({
                path: this.$store.getters.roleNav.get(res.user.userRole),
                query: {
                  openId: data.openid,
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
