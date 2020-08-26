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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.login-logo {
  padding-top: 2vh;
  width: 100%;
  height: 50vh;
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
  position: absolute;
  top: 36vh;
  z-index: 20;
  width: 100%;
  padding: 0 10vw;
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
    margin-top: 8vh;
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
      <div class="login-bg flex flex-column row-between flex-wrap">
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
        <div class="bottom-img">
          <img src="./image/bottom-img.png" />
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
    </div>
  </ui-main>
</template>
<script>
import axios from "axios";
import authApi from "@/api/auth.js";
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
  mounted() {},
  methods: {
    async login(data) {
      const appletsOpenId = this.$route.query.openId || "";
      const validatePhone = await this.checkPhone(data.phoneNo);
      const validateCode = await this.checkCode(data.joinCode);
      if (validatePhone && validateCode) {
        let param = {
          joinCode: data.joinCode,
          openId: appletsOpenId,
          phoneNo: data.phoneNo,
        };
        this.$store
          .dispatch("login", param)
          .then((res) => {
            try {
              // userRole
              // 1.参会嘉宾  2 服务志愿者 3 媒体工作者
              if (res.user.userRole == "1") {
                //	a. 嘉宾首页
                this.$router.push({
                  path: "/guest-home",
                  query: {
                    openId: appletsOpenId,
                  },
                });
              } else if (res.user.userRole == "2") {
                // b. 工作人员或志愿者首页
                this.$router.push({
                  path: "/conference-group/my-journey",
                  query: {
                    openId: appletsOpenId,
                  },
                });
              } else if (res.user.userRole == "3") {
                // 	c. 新闻工作者首页（暂定与嘉宾首页一致）
                this.$router.push({
                  path: "/guest-home",
                  query: {
                    openId: appletsOpenId,
                  },
                });
              }
              // else {
              //   this.$toast("非本会议受邀人员，请联系工作人处理");
              // }
            } catch (err) {
              this.$router.push({ path: "/" });
            }
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

    checkOpenId() {
      const appletsOpenId = this.$route.query.openId || "";
      authApi
        .checkOpenId({ openId: appletsOpenId })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally((e) => {});
    },
  },
};
</script>
