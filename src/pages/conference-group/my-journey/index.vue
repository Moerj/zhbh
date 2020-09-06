<template>
  <ui-main>
    <template v-slot:header>
      <van-tabs v-model="activeTab" @click="onTabsClick" v-if="dates&&dates.length">
        <van-tab v-for="(v,i) of dates" :title="$dayjs(v).format('M月DD号')" :key="i"/>
      </van-tabs>
      <div class="notice">
        <div>
          <div>{{ user.realName ? '尊敬的' + user.realName : '' }}欢迎您！</div>
          <div @click="toNoticeList">
            <span>全部</span>
            <van-icon :name="require('./assets/right.svg')" size="8"/>
          </div>
        </div>
        <div v-if="notice&&notice.length">
          <van-icon :name="require('./assets/trumpet.svg')" style="margin-right:10px;"/>
          <van-swipe autoplay="3000" height="20" vertical :show-indicators="false">
            <van-swipe-item v-for="v of notice">
              <span class="ellipsis-1">{{ v.title }}</span>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div class="title">
        我的行程
      </div>
    </template>
    <ui-pull @load="getList"
             v-model="list"
             :num.sync="query.pageNo"
             :total="total"
             ref="pull"
    >
      <van-steps direction="vertical" :active="activeStep" active-color="#2B69E2">
        <van-step v-for="(v,i) of list" :class="v.__isPast&&'van-step--past'">
          <div>{{ v.startTime && `${v.startTime}${v.endTime && ('到' + v.endTime)}` }}</div>
          <div @click="()=>{toDetail(v)}">
            <div class="ellipsis-1">{{ v.title }}</div>
            <div>
              <span class="ellipsis-1">
                <span v-if='v.schType===3'>起点：</span>
                <span v-else>地点：</span>
                <span style="display: inline">{{ v.place }}</span>
              </span>
              <van-icon name="arrow" size="12" color="rgba(0,0,0,.4)"/>
            </div>
            <div v-if="v.schType===3">
              <span class="ellipsis-1">
                <span>目的地：</span>
                <span style="display: inline">{{ v.destination }}</span>
              </span>
              <van-icon name="arrow" size="12" color="rgba(0,0,0,.4)"/>
            </div>
            <img v-if="v.__isPast" src="./assets/done.png" alt="">
          </div>
          <!--<div v-if="v.qrcode">
            <QR :value="v.qrcode" size="36"/>
          </div>-->
        </van-step>
      </van-steps>
    </ui-pull>

    <template #footer>
      <ConferenceGroupTabbar/>
    </template>
  </ui-main>
</template>

<script>
import empty from '@/components/empty'
import { QR, timejs } from 'plain-kit'
import ConferenceGroupTabbar from '../ConferenceGroupTabbar/index'

const user = localStorage.user ? JSON.parse(localStorage.user) : {}

function getQuery () {
  return {
    date: null,
    userId: user.id,
  }
}

export default {
  components: {
    empty, QR, ConferenceGroupTabbar
  },
  data () {
    return {
      user,
      activeTab: 0,
      activeStep: -1,
      dates: null,
      list: [],
      notice: null,
      query: getQuery(),
      total: null
    }
  },
  watch: {
    query: {
      immediate: true,
      deep: true,
      handler (newVal) {
        console.log(newVal)
        this.getList()
      }
    }
  },
  methods: {
    locate (v) {
      wx.ready(() => {
        wx.openLocation({
          longitude: Number(v.longitude),
          latitude: Number(v.latitude),
          name: v.title, // 位置名
          address: v.place, // 地址详情说明
          fail (e) {
            console.error(e)
            console.log(v)
          }
        })
      })
    },
    getDates () {
      this.$loading.open()
      this.$http.get('h5api/meet/date/list', {
        params: {
          userId: user.id
        }
      }).then(({ list }) => {
        this.dates = list || []
        for (let [i, v] of this.dates.entries()) {
          if (this.$dayjs(v).isSameOrAfter(this.$dayjs(), 'day')) {
            this.activeTab = i
            break
          }
        }
        this.query.date = list[this.activeTab]
      }).finally(e => {
        this.$loading.close()
      })
    },
    getNotice () {
      this.$loading.open()
      this.$http.get('h5api/meet/noticelist', {
        params: {
          todayDate: this.query.date
        }
      }).then(({ data }) => {
        this.notice = data || []
      }).finally(e => {
        this.$loading.close()
      })
    },
    onTabsClick (active) {
      this.notice = null
      this.activeStep = -1
      this.query.date = this.dates[active]
      this.$refs.pull?.reload()
    },
    getList () {
      if (!this.dates) {
        this.getDates()
        return
      }
      if (!this.notice && this.query.date) {
        this.getNotice()
      }
      if (this.query.date) {
        this.list.length = 0
        this.$http.get('h5api/meet/get/by/user', {
          params: this.query
        }).then(({ list }) => {
          this.list = list || []
          for (let [i, v] of this.list.entries()) {
            if (v.activeState === '2') {
              v.__isPast = true
            } else if (v.activeState === '1') {
              this.activeStep = i
              break
            }
          }
        }).finally(e => {
          this.$refs.pull?.endSuccess()
        })
      }
    },
    toDetail (v) {
      this.$router.push({
        path: 'my-journey/detail',
        query: {
          schType: v.schType,
          schId: v.schId
        }
      })
    },
    toNoticeList () {
      this.$router.push({
        path: 'my-journey/notice-list',
        query: {
          todayDate: this.query.date,
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

.notice {
  border-top: 1px solid #e5e6ea;
  background: #fefffe;
  padding: 7.5px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > div:first-child {
      font-size: 18px;
      font-weight: 600;
      color: #292a2c;
    }

    & > div:nth-child(2) {
      width: 46px;
      height: 21px;
      background: #fff3f3;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
      font-size: 12px;
      font-weight: 500;
      color: #c7000b;

      & > i {
        display: flex;
      }
    }
  }

  & > div:nth-child(2) {
    margin-top: 5px;
    overflow: hidden;
    height: 20px;
    display: flex;
    align-items: center;

    & > .van-swipe {
      height: 20px;
      display: inline-block;

      .van-swipe-item > span {
        line-height: 22px;
      }
    }
  }
}

.title {
  background-image: url(./assets/title-bg.png);
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  height: 82px;
  padding: 0 15px;
  font-size: 20px;
  font-weight: 600;
  color: #292a2c;
}

.van-steps {
  background-color: unset;
}

.van-step__title--active > div:first-child {
  color: #2b69e2 !important;
  position: relative;

  &:after {
    position: absolute;
    right: 5px;
    content: '进行中';
    font-size: 17px;
    font-weight: 400;
  }
}

.van-step--vertical {
  padding: 8px 10px 12px 0;
}

.van-step--past {
  .van-step__title {
    & > div:first-child {
      color: #9094a8;
    }

    & > div:nth-child(2) {
      border-right: 4px #B7BACC solid;

      & > div:first-child {
        color: rgba(41, 42, 44, .4);
      }

      & > div:not(:first-child) {
        color: rgba(41, 42, 44, .4);

        & > span:first-child {
          &:before {
            color: rgba(89, 91, 100, .4);
          }
        }
      }
    }
  }

  ::v-deep .van-step__circle {
    background: #B7BACC !important;
  }

  ::v-deep .van-step__line {
    background-color: #B7BACC !important;
  }
}

.van-step__title {
  position: relative;

  & > div:first-child {
    height: 24px;
    font-size: 17px;
    font-weight: 400;
    color: #000000;
    line-height: 24px;
  }

  & > div:nth-child(2) {
    background: #ffffff;
    border-radius: 0 6px 6px 0;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.08);
    margin: 7px 5px 5px -15px;
    border-right: 4px #e02020 solid;
    padding: 15px 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    & > img {
      position: absolute;
      right: 59px;
      top: 0;
      height: 81px;
    }

    & > div:first-child {
      font-size: 15px;
      font-weight: 500;
      color: #292a2c;

      & ~ div {
        margin-top: 10px;
        font-size: 15px;
        font-weight: 400;
        color: #292a2c;
        line-height: 21px;
        display: flex;
        justify-content: space-between;
        align-content: center;

        & > span:first-child {
          & > span:first-child {
            font-size: 15px;
            font-weight: 300;
            color: #595b64;
          }
        }

        & > .van-icon {
          line-height: unset;
        }
      }
    }
  }

  & > div:nth-child(3) {
    border-radius: 31px;
    width: 62px;
    height: 62px;
    background: #ffffff;
    box-shadow: 0 2px 9px 0 rgba(199, 0, 11, 0.16);
    position: absolute;
    bottom: 2px;
    right: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

::v-deep .van-step__line {
  width: 1px;
  background-color: #2b69e2;
}

::v-deep .van-step:last-child .van-step__line {
  width: 1px;
  height: calc(100% - 32px);
}

::v-deep .van-step__circle {
  width: 9px;
  height: 9px;
  background: #2b69e2;
}

::v-deep .van-step__circle-container {
  .van-step__icon--active {
    width: 13px;
    height: 13px;
    border: 1px solid #2b69e2;
    border-radius: 6.5px;
    position: relative;

    &:before {
      position: absolute;
      top: 1px;
      left: 1px;
      content: '';
      width: 9px;
      height: 9px;
      border-radius: 4.5px;
      background: #2b69e2;
    }
  }
}

::v-deep .van-tabs__nav {
  padding: 0 7px;
}

::v-deep .van-tab--active {
  font-size: 14px;
  color: #ffffff;
  line-height: 20px;
  letter-spacing: 0;
  background-color: $ui-color-primary;
  margin: 7px 0;
  border-radius: 5px;
  position: relative;

  &:before {
    position: absolute;
    content: '';
    background: url("./assets/tab-bg.png");
    background-size: 100% 100%;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}

::v-deep .van-tabs__line {
  display: none;
}
</style>
