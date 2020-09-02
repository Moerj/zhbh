<template>
  <ui-main>

    <div class="detail-container">
      <img style="width: 100%;" src="./huodong.png">
<!--      <van-swipe :autoplay="3000" :height="280" @change="swipeChange">-->
<!--        <van-swipe-item v-for="(image, index) in images" :key="index">-->
<!--          <img v-lazy="image" />-->
<!--        </van-swipe-item>-->
<!--        <template #indicator>-->
<!--          <div class="custom-indicator">-->
<!--            {{ current + 1 }}/{{ images.length }}-->
<!--          </div>-->
<!--        </template>-->
<!--      </van-swipe>-->

      <div class="main-card">
        <div class="card-content">
          <div class="time-wrapper flex">
            <div class="time-icon">
              <img src="../image/time.png" />
            </div>
            <div class="time-text">{{detailInfo.startTime }}到{{detailInfo.endTime }}</div>
          </div>

          <div class="title-wrapper">
            <p class="title">{{detailInfo.title }}</p>
            <p class="weather"><img src="../image/weather.png" />5℃～12℃</p>
          </div>

          <div class="info-wrapper">
            <div class="info-item flex row-between">
              <span>
                <span class="item-title">地点：</span>
                <span class="black-text">{{detailInfo.address}}</span>
              </span>
              <span><img src="../image/right.svg"/></span>
            </div>
            <!-- <div class="info-item flex row-between">
              <span>
                <span class="item-title">座位：</span>
                <span class="black-text">{{detailInfo.number}}</span>
              </span>
            </div> -->
            <div class="info-item flex row-between">
              <a class="tel" href="tel:0856-8221657"></a>
              <span>
                <span class="item-title">联系电话：</span>
                <span class="red-text">{{detailInfo.sitePhone}}</span>
              </span>
              <span><img src="../image/phone.svg"/></span>
            </div>
            <div class="info-item flex row-between">
              <a class="tel" href="tel:13678391637"></a>
              <span>
                <span class="item-title">志愿者电话：</span>
                <span class="red-text">{{detailInfo.phone }}</span>
              </span>
              <span><img src="../image/phone.svg"/></span>
            </div>
          </div>

          <!-- <div class="code-wrapper">
            <p>您的专属二维码</p>
            <div><img src="../image/big-code.png" /></div>
          </div> -->
        </div>

        <div class="fullwidth-content">
          <div class="fullwidth-title">温馨提示</div>
          <div class="fullwidth-main">
            <div class="main-text">
              六盘水市，是贵州省地级市。六盘水市地处贵州西部乌蒙山区，年平均气温15℃，夏季平均气温19.7℃，冬季平均气温3℃。
            </div>
          </div>
        </div>

        <div class="fullwidth-content">
          <div class="fullwidth-title">简介</div>
          <div class="fullwidth-main">
            <div class="main-text">
              观摩路线：参观野鸡坪花海-海坪彝族文化小镇-鞭陀文化博物馆-玉舍国家级森林公园-野鸡坪高原户外运动基地-野鸡坪高原户外运动基地（野玉海汽车体验中心）
            </div>
          </div>
        </div>
      </div>
    </div>
  </ui-main>
</template>

<script>
    import Qrcode from "@/components/Qrcode";
import journeyAPI from "@/api/journey.js";
export default {
    components:{Qrcode},
  name: "Detail",
  data() {
    return {
      // images: [
      //   require("./bolanhui.png"),
      //   "https://img.yzcdn.cn/vant/apple-1.jpg",
      //   "https://img.yzcdn.cn/vant/apple-2.jpg",
      // ],
      current: 0,
      currentData: "",

      detailInfo: "",
    };
  },
  mounted() {
    this.currentData = this.$route.query.currentData;
    console.log(this.currentData);
    this.getDetailData();
  },
  methods: {
    // swipeChange(index) {
    //   this.current = index;
    // },
    getDetailData() {
      const param = {
        id: this.$route.query.id,
      };
      journeyAPI.detailJourney(param).then((res) => {
        console.log(res);
        this.detailInfo = res.list;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .van-nav-bar {
  background-color: transparent;
}
::v-deep.van-hairline--bottom::after {
  display: none;
}

::v-deep .van-nav-bar .van-icon {
  color: #ffffff;
}

.van-swipe-item {
  img {
    width: 100%;
    height: 100%;
  }
}

.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 32px;
  padding: 2px 5px;
  font-size: 11px;
  width: 40px;
  height: 20px;
  line-height: 16px;
  text-align: center;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 11px;
  color: #ffffff;
}

.main-card {
  // height: 300px;
  background-color: #f6f6f9;
  padding: 0 1rem;
  .card-content {
    transform: translateY(-24px);
    // height: 300px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
    padding: 1rem;
  }
}

.time-wrapper {
  .time-icon {
    width: 2.125rem;
    height: 2.125rem;
    background-color: #dc3b43;
    padding: 0.4375rem;
    img {
      width: 100%;
    }
  }
  .time-text {
    height: 2.125rem;
    line-height: 2.125rem;
    padding-left: 0.5rem;
    margin-left: 0.25rem;
    background: linear-gradient(90deg, #fee5dd, rgba(255, 255, 255, 0));
  }
}

.title-wrapper {
  margin-top: 1rem;
  p {
    margin: 0;
  }
  .title {
    font-size: 1.25rem;
    font-weight: 600;
  }
  .weather {
    img {
      height: 1.125rem;
      vertical-align: -1px;
    }
  }
}

.info-wrapper {
  background-color: #f7f9fe;
  padding: 10px;
  margin-top: 20px;
  .info-item {
    height: 21px;
    font-size: 15px;
    padding: 5px 0;
    box-sizing: content-box;
    position: relative;
    .tel {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
    .item-title {
      color: #595b64;
    }
    .black-text {
      overflow: hidden;
      white-space:nowrap;
      color: #292a2c;
    }
    .red-text {
      color: #c7000b;
    }
  }
}

.code-wrapper {
  text-align: center;
  color: #353535;
  font-size: 0.875rem;
  padding: 0 28%;
  img {
    width: 100%;
  }
}

.fullwidth-content {
  margin: 0 -1rem;
  background-color: #fff;
  padding-top: 0.75rem;
  & + .fullwidth-content {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .fullwidth-title {
    font-size: 18px;
    font-weight: 600;
    color: #292a2c;
    line-height: 25px;
    position: relative;
    padding-left: 1rem;
    &::before {
      content: "";
      position: absolute;
      top: 15%;
      left: 0;
      width: 4px;
      height: 70%;
      background-color: #c7000b;
      border-radius: 2px;
    }
  }
  .fullwidth-main {
    .main-img,
    .main-text {
      padding: 0.75rem 1rem;
      color: #9094a8;
      position: relative;
    }
    .main-img {
      .title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #292a2c;
        margin-top: 2rem;
      }
      .subtitle {
        font-size: 1rem;
        color: #595b64;
        padding-bottom: 1rem;
      }
      .text {
        font-size: 1.25rem;
        color: #fff;
        border-radius: 50%;
        width: 3.875rem;
        height: 3.875rem;
        background-color: #c7000b;
        text-align: center;
        line-height: 3.875rem;
      }
      img {
        width: 8.125rem;
      }
    }
  }
}
</style>
