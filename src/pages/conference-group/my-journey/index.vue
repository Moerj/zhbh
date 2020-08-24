<template>
  <ui-main>
    <template v-slot:header>
      <van-tabs v-model="activeTab" @click="onTabsClick">
        <van-tab v-for="(v,i) of dates" :title="$dayjs(v).format('M月YY号')" :key="i"/>
      </van-tabs>
      <div class="title">
        您的行程
      </div>
    </template>
    <ui-pull @load="getList"
             v-model="list"
             :num.sync="query.pageNo"
             :total="total"
             ref="pull"
    >
      <van-steps direction="vertical" :active="activeStep" active-color="#2B69E2">
        <van-step v-for="(v,i) of list">
          <div>{{v.date && `${v.date} ${v.startTime}${v.endTime && ('到' + v.endTime)}`}}</div>
          <div @click="()=>{toDetail(v)}">
            <div class="ellipsis-1">{{v.name}}</div>
            <div>
              <span class="ellipsis-1">{{v.location}}</span>
              <van-icon name="arrow" size="12"/>
            </div>
          </div>
          <!--<div v-if="v.qrcode">
            <QR :value="v.qrcode" size="36"/>
          </div>-->
        </van-step>
      </van-steps>
    </ui-pull>
    <empty :list="list"/>
  </ui-main>
</template>

<script>
import empty from '@/components/empty'
import { QR } from 'plain-kit'

function getQuery () {
  return {
    date: null,
    pageNo: 1,
    pageSize: 0,
  }
}

export default {
  components: {
    empty, QR
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
      setTimeout(() => {
        this.dates = [
          '2020-08-20',
          '2020-08-21',
          '2020-08-22',
          '2020-08-23',
          '2020-12-24',
          '2020-12-24',
          '2020-12-24',
        ]
        this.getList()
      }, 500)
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
      /*this.$http.post('', this.query).then(({ data }) => {
        if (data) {
          this.list = data.records || []
          this.total = data.total
        } else {
          this.total = 0
        }
      }).finally(e => {
        this.$refs.pull.endSuccess()
      })*/
      setTimeout(() => {
        this.list = [
          {
            date: '2020-12-12',
            startTime: '12:00',
            endTime: '14:00',
            name: '会议名称',
            location: '六盘水旅游文化会议中心',
            type: 'conference'
          },
          {
            date: '2020-12-12',
            startTime: '12:00',
            endTime: '14:00',
            name: '会议名称',
            location: '六盘水旅游文化会议中心',
            type: 'conference'
          },
          {
            date: this.$dayjs().format('YYYY-MM-DD'),
            startTime: '12:00',
            endTime: '14:00',
            name: '车辆接送',
            location: '六盘水旅游文化会议中心',
            type: 'transportation'
          },
          {
            date: '2020-12-12',
            startTime: '12:00',
            endTime: '14:00',
            name: '餐厅名称',
            location: '喜来登酒店餐厅',
            qrcode: 'qrcode',
            type: 'dining'
          }
        ]
        for (let [i, v] of this.list.entries()) {
          if (this.$dayjs(v.date).isToday()) {
            this.activeStep = i
            break
          }
        }
        this.$refs.pull.endSuccess()
      }, 500)
    },
    toDetail (v) {
      this.$router.push({
        path: 'my-journey/detail',
        query: {
          type: v.type,
          id: v.id
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
      background: #f3f5fc;
      border-right: 4px #B7BACC solid;

      & > div:first-child {
        color: #a2a4a9;
      }

      & > div:nth-child(2) {
        color: #a2a4a9;

        & > span:first-child {
          &:before {
            color: #bfc2c9;
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

::v-deep .van-tab--active {
  font-size: 14px;
  color: #ffffff;
  line-height: 20px;
  letter-spacing: 0px;
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
