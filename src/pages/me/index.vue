<template>
  <ui-main>
    <template v-slot:header>
      <van-nav-bar title="我的" fixed>
      </van-nav-bar>
    </template>
    <div class="user-container">
      <div class="use-info flex row-left col-center">
        <div class="head-item">
          <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" />
        </div>
        <div class="user-name">尊敬的环海先生</div>
      </div>

      <div class="card-cont">
        <div class="card-inner">
          <div class="inner-title">会务指南<img src="./right.png" /></div>
          <div class="inner-subtitle">参会者详细指南</div>
          <div class="inner-img">
            <img src="./card1.png" />
          </div>
        </div>
      </div>
      <div class="card-cont">
        <div class="card-inner card-inner2">
          <div class="inner-title">游记分享<img src="./right.png" /></div>
          <div class="inner-subtitle">游记分享</div>
          <div class="inner-img">
            <img src="./card2.png" />
          </div>
        </div>
      </div>
      <div class="card-cont">
        <div class="card-code">
          <div class="inner-title">您的专属二维码</div>
          <div class="big-code">
            <img src="./big-code.png" />
          </div>
        </div>
      </div>
    </div>
    <Tabbar />
  </ui-main>
</template>
<script>
import Tabbar from "@/components/Tabbar";
export default {
  data() {
    return {
      appVersion: process.env.APP_VERSION,
    };
  },
  components: {
    Tabbar,
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认退出吗?",
        })
        .then(() => {
          // on confirm
          sessionStorage.clear();
          localStorage.clear();
          this.$router.push("/login");
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-container {
  padding-top: 46px;
  // background-color: #fff;
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
</style>
