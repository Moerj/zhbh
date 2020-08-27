<template>
  <ui-main>
    <template v-slot:header>
      <van-nav-bar fixed left-arrow @click-left="$root.back()"></van-nav-bar>
    </template>

    <div class="detail-container">
      <img style="width: 100%;" src="./image/active@2x.png">
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
          <div class="list-group">
            <div class="list-item">
              <div class="item-left">
                <div class="mingci">第一名</div>
                <div class="baoming">报名</div>
              </div>
              <div class="item-right">
                <div class="renshu">
                  <span>已报名：8</span> |
                  <span>截止人数：198</span>
                </div>
                <div class="jindu">
                  <span style="width: 20%"></span>
                </div>
                <div class="time">
                  <img src="./image/time.png" height="12" />
                  报名截止时间 12月18号 12:00
                </div>
                <div class="time">
                  <img src="./image/downtime.png" height="12" />
                  报名截止时间 12月18号 12:00
                </div>
              </div>
            </div>
            <div class="list-item">
              <div class="item-left">
                <div class="mingci">第二名</div>
                <div class="baoming graybaoming">报名</div>
              </div>
              <div class="item-right">
                <div class="renshu">
                  <span>已报名：8</span> |
                  <span>截止人数：198</span>
                </div>
                <div class="jindu">
                  <span style="width: 20%"></span>
                </div>
                <div class="time">
                  <img src="./image/time.png" height="12" />
                  报名截止时间 12月18号 12:00
                </div>
                <div class="time">
                  <img src="./image/downtime.png" height="12" />
                  报名截止时间 12月18号 12:00
                </div>
              </div>
            </div>
            <div class="list-item">
              <div class="item-left">
                <div class="mingci">第三名</div>
                <div class="baoming greenbaoming">已报名</div>
              </div>
              <div class="item-right">
                <div class="renshu">
                  <span>已报名：8</span> |
                  <span>截止人数：198</span>
                </div>
                <div class="jindu">
                  <span style="width: 20%"></span>
                </div>
                <div class="time">
                  <img src="./image/time.png" height="12" />
                  报名截止时间 12月18号 12:00
                </div>
                <div class="time">
                  <img src="./image/downtime.png" height="12" />
                  报名截止时间 12月18号 12:00
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="fullwidth-content">
          <div class="fullwidth-title">活动详情</div>
          <div class="fullwidth-main">
            <div class="main-text">
              摄影是一门让广大学生既陌生又好奇的艺术。它能形象地记录发生在我们身边的点点滴滴。各项展示学院风采的活动不计其数，但这次的摄影比赛却能展示学生们最真实的、最丰富多彩的生活。再加上如今樱花盛开，科大美丽非凡。一张小小的图片内涵丰富、包罗万象。同学们所看到的、想到的、关心的、关注的关于生活、校园、社会等话题，一张图片就可以很自然优雅的展现我们当代大学生的青春风采和无限的活力。
            </div>
          </div>
        </div>

        <div class="fullwidth-content">
          <div class="fullwidth-title">活动须知</div>
          <div class="fullwidth-main">
            <div class="main-text">
              在五四青年节到来之际，开展摄影比赛，本次活动的主题，旨在发现校园生活之美，发现生命之美，发现青春之美，展现当代大学生的青春活力，以“聚焦飞扬的青春，感受别样的生命”为重点，着重展示我们身边的美和“五四精神”。
              <br/>
              活动形式为征集不同的数码摄影作品，作品样式分为单幅作品、组图、图配文等。数码摄影作品需原创，突出青年时代精神，视觉效果强烈，反映我们当代青年活力朝气的一面，积极向上，大胆创新，知行合一。
              <br/>
              大学生进行各种社会志愿和社会实践活动的照片，还有举行成人仪式的照片，科大的生活照，同学们上课自习的照片，进行科研竞赛的照片等等都是记录的我们活力的最真实最有效的记忆。所以请同学们踊跃报名参加比赛，活出自己，活出精彩，活出活力。
              <br/>
            </div>
          </div>
        </div>

      </div>
    </div>
  </ui-main>
</template>

<script>
import journeyAPI from "@/api/journey.js";
export default {
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
        // this.detailInfo = res.list;
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
    margin: 0 -1rem;
    transform: translateY(-15px);
    // height: 300px;
    border-radius: 15px 15px 0px 0px;
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
.list-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 103px;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
}

.list-item + .list-item {
  margin-top: 16px;
}

.item-left {
  width: 25%;
  padding: 12px 0;
  text-align: center;
  border-right: 1px solid #e5e6ea;
}

.mingci {
  height: 22px;
  font-size: 18px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 600;
  text-align: center;
  color: #2e3032;
  line-height: 22px;
}

.baoming {
  width: 50px;
  height: 25px;
  margin: 4px auto;
  background: #c7000b;
  border-radius: 4px;
  line-height: 25px;
  font-size: 15px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: center;
  color: #ffffff;
  letter-spacing: 0px;
}

.graybaoming {
  background: #f3f4f8;
  color: #c4c6cf;
}
.greenbaoming {
  background: #22b938;
}

.item-right {
  padding-left: 20px;
  box-sizing: border-box;
}

.renshu {
  display: inline-block;
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #292a2c;
  line-height: 17px;
  letter-spacing: 1px;
}

.time {
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #9094a8;
  line-height: 17px;
  letter-spacing: 1px;
}
.time img {
  vertical-align: -1px;
}

.jindu {
  height: 4px;
  background: #f3f4f8;
  border-radius: 2px;
  margin: 4px 0 8px;
  position: relative;
}
.jindu span {
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  background: #fd5542;
  border-radius: 2px;
}
</style>
