<template>
  <ui-main>


    <div class="detail-container">
      <img style="width: 100%;" src="./canting.png">
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
            <div class="time-text">{{detailInfo.startTime || '2020-08-27 12:00'}}到{{detailInfo.endTime || '13:00'}}</div>
          </div>

          <div class="title-wrapper">
            <p class="title">{{detailInfo.title || '盘江雅阁大酒店酒店大堂'}}</p>
            <p class="weather"><img src="../image/weather.png" />5℃～12℃</p>
          </div>

          <div class="info-wrapper">
            <div class="info-item flex row-between">
              <span>
                <span class="item-title">地点：</span>
                <span class="black-text">{{detailInfo.address || '钟山区钟山大道与凤池路交口 '}}</span>
              </span>
              <span><img src="../image/right.svg"/></span>
            </div>
            <div class="info-item flex row-between">
              <span>
                <span class="item-title">桌号：</span>
                <span class="black-text">{{detailInfo.number || '13号'}}</span>
              </span>
            </div>
            <div class="info-item flex row-between">
              <a class="tel" href="tel:0856-8221657"></a>
              <span>
                <span class="item-title">联系电话：</span>
                <span class="red-text">{{detailInfo.sitePhone || '18787669090'}}</span>
              </span>
              <span><img src="../image/phone.svg"/></span>
            </div>
            <div class="info-item flex row-between">
              <a class="tel" href="tel:13678391637"></a>
              <span>
                <span class="item-title">志愿者电话：</span>
                <span class="red-text">{{detailInfo.phone || '18685199875'}}</span>
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
              酒店交通便利，设施齐全，环境优雅，是您旅游休闲、洽谈商务、尊贵宴请的首选之地。
              <br/>
              酒店主楼26层，建筑面积40000平方米，集住宿、餐饮、娱乐和商务服务于一体，拥有各类房型249间（套），包括总统套房、大使套房、行政套房、行政商务房、绿色生态商务房、豪华套房、豪华房、高级房。酒店拥有各具特色的中、西餐厅、酒吧、宴会厅、多功能国际会议中心和餐饮包厢，有丰盛的中华传统美食、地方特色名菜及异国经典风味佳肴，让您驻足品尝，一饱口福。酒店设有24小时送餐、自动取款、外币兑换、网络预订、礼宾车队等综合服务功能，让您感受到家一般的便捷与温馨。酒店拥有一流的美容、美发以及露天游泳池等康乐设施，将为您的商务接待、休闲娱乐提供优质高效的超值服务，让您留连忘返。
              <br/>
              酒店装饰，精典高雅、宽敞舒适，既蕴含着浓郁的远古神农文化气息，又充分展现了现代酒店的豪华与别致，让您充分领略和感受到双重的酒店文化氛围。酒店一贯秉承“要做就做最优秀”、“满足客户需求，超越客户期待”的理念，把为您提供最完善、最完美的服务，始终作为酒店追求的一项重要目标，您的开心与快乐，就是酒店的满足与追求。
            </div>
          </div>
        </div>

      </div>
    </div>
    <Qrcode/>
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
      //   require("./canting.png"),
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
