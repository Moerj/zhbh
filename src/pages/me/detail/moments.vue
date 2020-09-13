<template>
  <ui-main>
    <div class="content">
      <div class="title">
        <van-tabs
            v-model="activeIndex"
            line-width="0"
            line-height="0"
            @click="onClick"
        >
          <van-tab v-for="(item, index) in titleList" :key="index">
            <template #title>
              <div class="item">{{ item }}</div>
            </template>
          </van-tab>
        </van-tabs>
        <!--<div
            v-for="(item, index) in titleList"
            :key="index"
            class="item"
            :style="[index === activeIndex ? 'background: url(' + require('./yjjx-red.png') + ') no-repeat;' : 'background: url(' + require('./yjjx-white.png') + ') no-repeat;']"
            @click="onClick(index)"
        >{{ item }}</div>-->
      </div>
      <div class="logo">
        <img :src="logo" alt="logo">
      </div>
      <div class="banner">
        <img :src="dataItem['coverPath']" alt="banner">
        <div class="sign-in">
          <img src="./sign-in.png" alt="signIn">
        </div>
      </div>
      <div class="wonderful-box">
        <TimeLine :activity="dataItem['itemObj']"></TimeLine>
      </div>
      <div class="qr-code-box">
        <img src="./tip.png" alt="tip">
        <img src="./qr-code.png" alt="QRCode">
      </div>
    </div>
  </ui-main>
</template>

<script>
import TimeLine from './timeLine'
export default {
  name: "moments",
  components: {
    TimeLine
  },
  data(){
    return {
      activeIndex: 0,
      logo: require("./logo.png"),
      banner: require("./banner.png"),
      dataList: [],
      titleList: [],
      dataItem: {}
    }
  },
  created() {
    this.getMomentList()
  },
  methods: {
    getMomentList() {
      this.$http.get(`/guest/meet/momentlist`).then(res => {
        console.log(res.data)
        const data = res.data
        if (data) {
          this.dataList = res.data
          data.forEach(item => {
            this.titleList.push(item.title)
          })
        }
      })
    },
    onClick(name, title) {
      this.activeIndex = name
      this.dataItem = this.dataList[name]
    }
  }
}
</script>

<style lang="scss">
.content {
  .van-tabs__nav {
    background: transparent;
  }
  .van-tab {
    background: url("./yjjx-white.png") no-repeat;
    background-size: 100% 100%;
    padding: 5px 14px;
    width: 90px;
    height: 24px;
  }
  .van-tab + .van-tab {
    margin-left: 30px;
  }
  .van-tab--active {
    color: #ffffff;
    font-weight: 500;
    background: url("./yjjx-red.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>

<style lang="scss" scoped>
.content {
  width: 100%;
  min-height: 100%;
  padding: 1rem;
  background: url("./bj.png") no-repeat;
  background-size: 100% 100%;
  .title {
    margin-top: 60px;
    .item {
      width: 100%;
      text-align: center;
      &:first-child {
        margin-left: 0;
      }
    }
  }
  .logo {
    text-align: center;
    margin-top: 35px;
    img {
      width: 249px;
      height: 38px;
    }
  }
  .banner {
    display: flex;
    justify-content: center;
    margin-top: 14px;
    position: relative;
    & > img {
      width: 364px;
      height: 256px;
    }
    .sign-in {
      position: absolute;
      right: -20px;
      bottom: 0px;
      z-index: 99;
      img {
        width: 109px;
        height: 110px;
      }
    }
  }
  .wonderful-box {
    margin: 18px auto;
    width: 324px;
    height: 823px;
    background: url("./jchg-bg.png") no-repeat;
    background-size: 100% 100%;
    padding-top: 61px;
  }
  .qr-code-box {
    margin: 18px auto;
    width: 324px;
    height: 80px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    img {
      &:first-child {
        width: 128px;
        height: 27px;
        margin-right: 17px;
      }
      &:last-child {
        width: 79px;
        height: 79px;
      }
    }
  }
}
</style>
