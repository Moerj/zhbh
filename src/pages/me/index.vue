<template>
  <ui-main>
    <div class="user-container">
      <div class="use-info flex row-left col-center">
        <div class="head-item">
          <img :src="img" alt="" />
        </div>
        <div class="user-name">尊敬的{{user.realName}}欢迎您！</div>
      </div>

      <div class="card-cont" @click="toGuide()">
        <div class="card-inner">
          <div class="inner-title">会务指南<img src="./right.png" /></div>
          <div class="inner-subtitle">参会者详细指南</div>
          <div class="inner-img">
            <img src="./card1.png" />
          </div>
        </div>
      </div>
      <div class="card-cont">
        <div class="card-inner card-inner2" @click="toMoments">
          <div class="inner-title">精彩瞬间<img src="./right.png" /></div>
          <!--<div class="inner-subtitle">游记分享</div>-->
          <div class="inner-img">
            <img src="./card2.png" />
          </div>
        </div>
      </div>
      <div class="card-cont">
        <div class="card-code">
          <div class="inner-title">我的专属二维码</div>
          <div class="big-code">
            <img style="width: 10rem;height: 10rem;margin-top: 0.625rem;" :src="url" />
          </div>
        </div>
      </div>
      <div class="card-cont">
        <div class="feed" style="border-radius: 10px;overflow: hidden;" @click="toFeedback()">
          <van-cell value="" is-link>
            <template #title>
              <div class="flex col-center">
                <van-image
                        width="16px"
                        height="16px"
                        fit="contain"
                        :src="feedIcon"
                />
                <span class="custom-title title">意见反馈</span>
              </div>
            </template>
          </van-cell>
        </div>
      </div>
    </div>
    <template #footer>
      <Tabbar/>
    </template>
  </ui-main>
</template>
<script>
import Tabbar from "@/components/Tabbar";
import QRCode from "qrcode";
export default {
  data() {
    return {
      img: require("./head_default.png"),
      feedIcon: require("./icon_feedback.png"),
      url:"",
      user: JSON.parse(localStorage.user),
      appVersion: process.env.APP_VERSION,
    };
  },
  components: {
    Tabbar,
  },
  mounted() {
    let joinCode = this.user && this.user.joinCode?this.user.joinCode:'数据错误';
    QRCode.toDataURL(joinCode,{width:180,qzone:0,margin:1})
        .then(url => {
          this.url = url
        }).catch(err => {
      this.$toast("二维码错误");
    })
  },
  methods: {
    logout() {
    },
    toMoments() {
      this.$router.push({path: "/me/moments"})
    },
    toFeedback() {
      this.$router.push({path: "/me/feedback"})
    },
    toGuide() {
      this.$router.push({path: "/me/guide"})
    }
  },
};
</script>

<style lang="scss" scoped>
.user-container{
  min-height: 600px;
  padding-bottom: 50px;
}
.use-info {
  padding: 1rem;
}

.head-item {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 3px solid #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.18);
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
}

.user-name {
  height: 25px;
  font-size: 18px;
  font-weight: 500;
  text-align: left;
  color: #292a2c;
  line-height: 25px;
  margin-left: 20px;
}

.card-cont {
  padding: 1rem;
}

.card-inner {
  height: 120px;
  background: #fdb73f;
  border-radius: 10px;
  position: relative;
  &.card-inner2 {
    background: #fd5542;
  }
  .inner-title {
    font-size: 24px;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    line-height: 33px;
    letter-spacing: 0px;
    padding-top: 14px;
    padding-left: 22px;
    img {
      width: 21px;
      vertical-align: -1px;
      margin-left: 4px;
    }
  }
  .inner-subtitle {
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    color: #ffffff;
    line-height: 20px;
    letter-spacing: 0px;
    padding-left: 22px;
  }
  .inner-img {
    position: absolute;
    right: 0;
    bottom: 1px;
    width: 60%;
    height: 100%;
    img {
      height: 100%;
      vertical-align: -1px;
    }
  }
}

.card-code {
  position: relative;
  border-radius: 10px;
  padding: 1rem 28%;
  text-align: center;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  background: url("./codebg.png");
  background-size: cover;
  .big-code {
    position: relative;
    z-index: 5;
    margin-top: 1rem;
    img {
      width: 100%;
    }
  }
}
.feed{
  .title{
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: justify;
    color: #292a2c;
    line-height: 22px;
    margin-left:8px;
  }
}
</style>
