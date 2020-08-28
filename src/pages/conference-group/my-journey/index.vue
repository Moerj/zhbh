<template>
  <ui-main>
    <template v-slot:header>
      <van-tabs v-model="activeTab" @click="onTabsClick">
        <van-tab v-for="(v,i) of dates" :title="$dayjs(v).format('M月DD号')" :key="i"/>
      </van-tabs>
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
        <van-step v-for="(v,i) of list" :class="v.__isPast&&'van-step--finish'">
          <div>{{ v.startTime && `${v.startTime}${v.endTime && ('到' + v.endTime)}` }}</div>
          <div @click="()=>{toDetail(v)}">
            <div class="ellipsis-1">{{ v.title }}</div>
            <div>
              <span class="ellipsis-1">{{ v.place }}</span>
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
    <empty :list="list"/>

    <template #footer>
      <ConferenceGroupTabbar/>
    </template>
  </ui-main>
</template>

<script>
import empty from '@/components/empty'
import { QR, timejs } from 'plain-kit'
import ConferenceGroupTabbar from '../ConferenceGroupTabbar/index'

function getQuery () {
  return {
    date: null,
    userId: JSON.parse(localStorage.user).id
  }
}

export default {
  components: {
    empty, QR, ConferenceGroupTabbar
  },
  data () {
    return {
      activeTab: 0,
      activeStep: -1,
      dates: null,
      list: [],
      query: getQuery(),
      total: null
    }
  },
  watch: {
    query: {
      deep: true,
      handler (newVal) {
        this.getList()
      }
    }
  },
  methods: {
    getDates () {
      this.$loading.open()
      this.$http.get('h5api/meet/date/list').then(({ list }) => {
        this.dates = list || []
        this.query.date = list[0]
      }).finally(e => {
        this.$loading.close()
      })
    },
    onTabsClick (active) {
      this.query.date = this.dates[active]
      this.$refs.pull.reload()
    },
    getList () {
      if (!this.dates) {
        this.getDates()
        return
      }
      this.list.length = 0
      this.$http.get('h5api/meet/get/by/user', {
        params: this.query
      }).then(({ list }) => {
        this.list = list || []
        for (let [i, v] of this.list.entries()) {
          if (v.startTime && v.endTime) {
            const now = timejs()
            if (now.isAfter(v.endTime)) {
              v.__isPast = true
            }
            if (now.isBetween(v.startTime, v.endTime)) {
              this.activeStep = i
              break
            }
          }
        }
      }).finally(e => {
        this.$refs.pull.endSuccess()
      })
    },
    toDetail (v) {
      this.$router.push({
        path: 'my-journey/detail',
        query: {
          schTypeName: v.schTypeName,
          schId: v.schId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

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

.van-step--finish {
  .van-step__title {
    & > div:first-child {
      color: #9094a8;
    }

    & > div:nth-child(2) {
      border-right: 4px #B7BACC solid;

      & > div:first-child {
        color: rgba(41, 42, 44, .4);
      }

      & > div:nth-child(2) {
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
    height: 85px;
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
      height: 100%;
    }

    & > div:first-child {
      font-size: 15px;
      font-weight: 500;
      color: #292a2c;
    }

    & > div:nth-child(2) {
      font-size: 15px;
      font-weight: 400;
      color: #292a2c;
      line-height: 21px;
      display: flex;
      justify-content: space-between;
      align-content: center;

      & > span:first-child {
        &:before {
          content: '地点：';
          width: 45px;
          height: 21px;
          font-size: 15px;
          font-weight: 300;
          color: #595b64;
          line-height: 21px;
        }
      }

      & > .van-icon {
        line-height: unset;
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
  height: 110px;
}

::v-deep .van-step__circle {
  width: 9px;
  height: 9px;
  background: #2b69e2;
}

::v-deep .van-step__icon--active {
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
