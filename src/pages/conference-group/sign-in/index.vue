<template>
  <ui-main>
    <div :style="{backgroundImage}">
      <div>健康状态：{{ status }}</div>
      <div>{{ data.realName }}</div>
      <div>{{ statusPostscript }}</div>
      <hr/>
      <div>{{ healthCode.codeDate }}</div>
      <hr :style="{
        background: themeColor
      }"/>
    </div>

    <div>
      <div>
        <div class="title">嘉宾信息</div>
        <div class="tr">
          <div class="th">嘉宾姓名：</div>
          <div class="td ellipsis-1">{{ data.realName }}</div>
        </div>
        <div class="tr">
          <div class="th">嘉宾身份：</div>
          <div class="td ellipsis-1">{{ data.duty }}</div>
        </div>
      </div>
      <div v-if="schType===0">
        <div class="title">酒店信息</div>
        <div class="tr">
          <div class="th">酒店名称：</div>
          <div class="td ellipsis-1">{{ schedule.restaurant&&schedule.restaurant.title }}</div>
        </div>
        <div class="tr">
          <div class="th">地址：</div>
          <div class="td ellipsis-1">{{ schedule.place }}</div>
        </div>
        <div class="tr">
          <div class="th">房间：</div>
          <div class="td ellipsis-1">{{ schedule }}</div>
        </div>
      </div>
      <div v-else-if="schType===1">
        <div class="title">会议信息</div>
        <div class="tr">
          <div class="th">会议地址：</div>
          <div class="td ellipsis-1">{{ schedule.place }}</div>
        </div>
        <div class="tr">
          <div class="th">座位：</div>
          <div class="td ellipsis-1">{{ schedule.meetRoom&&schedule.meetRoom.seatNo }}</div>
        </div>
      </div>
      <div v-else-if="schType===2">
        <div class="title">餐厅信息</div>
        <div class="tr">
          <div class="th">餐厅地址：</div>
          <div class="td ellipsis-1">{{ schedule.place }}</div>
        </div>
        <div class="tr">
          <div class="th">桌号/包间号：</div>
          <div class="td ellipsis-1">{{ schedule.restaurant&&schedule.restaurant.seatNo }}</div>
        </div>
      </div>
      <div v-else-if="schType===3">
        <div class="title">车辆接送信息</div>
        <div class="tr">
          <div class="th">乘车地点：</div>
          <div class="td ellipsis-1" @click.stop="locate">{{ schedule.place }}</div>
        </div>
        <div class="tr">
          <div class="th">车牌号：</div>
          <div class="td ellipsis-1">{{ data }}</div>
        </div>
        <div class="tr" v-if="data">
          <div class="th">座位号：</div>
          <div class="td ellipsis-1">{{ data }}</div>
        </div>
      </div>
      <div v-else-if="schType===4">
        <div class="title">活动信息</div>
        <div class="tr">
          <div class="th">活动地址：</div>
          <div class="td ellipsis-1">{{ schedule.place }}</div>
        </div>
        <div class="tr">
          <div class="th">乘车地点：</div>
          <div class="td ellipsis-1" @click.stop="locate">{{ data }}</div>
        </div>
      </div>
    </div>

    <template #footer v-if="$route.query.needSigningIn==='1'">
      <div class="safe-area-plus">
        <van-button round @click="signIn" :disabled="healthCode.color!=='green'||signedIn" :color="themeColor">
          {{ signedIn ? '已签到' : `${schTypeName}签到` }}
        </van-button>
      </div>
    </template>
  </ui-main>
</template>

<script>
import { Dialog } from 'vant'

export default {
  data () {
    return {
      schType: Number(this.$route.query.schType),
      signedIn: this.$route.query.signedIn === '1',
      data: {},
      schedule: {
        restaurant: {}
      },
      healthCode: {}
    }
  },
  computed: {
    schTypeName () {
      return ['酒店', '会议', '用餐', '车辆接送', '活动'][this.$route.query.schType] || ''
    },
    status () {
      return {
        'green': '正常',
        'orange': '居家隔离',
        'red': '集中隔离',
      }[this.healthCode.color]
    },
    themeColor () {
      return {
        'green': '#00cf20',
        'orange': 'rgba(202,100,28,1)',
        'red': '#ad0404',
      }[this.healthCode.color]
    },
    backgroundImage () {
      return `url('${{
        'green': require('./assets/bg.png'),
        'orange': require('./assets/bg-orange.png'),
        'red': require('./assets/bg-red.png'),
      }[this.healthCode.color]}')`
    },
    statusPostscript () {
      return {
        'green': '防控疫情，人人有责，\n请您继续做好个人防护。',
        'orange': '您好！为了您的健康安全和疫情防控需要，\n请您实行居家隔离医学观察。',
        'red': '您好！为了您的健康安全和疫情防控需要，\n请您到指定的集中隔离医学观察点，\n实行集中隔离。',
      }[this.healthCode.color]
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      if (localStorage.user) {
        this.$loading.open()
        const { id, phoneNo } = JSON.parse(localStorage.user)
        this.$http.get('h5api/meet/healthCode', {
          params: {
            phone: phoneNo,
            userId: id
          }
        }).then(({ data }) => {
          this.healthCode = data || {}
        }).finally(e => {
          this.$loading.close()
        })

        this.$loading.open()
        this.$http.get('h5api/meet/infoByOpenId2', {
          params: {
            openId: this.$route.query.openId,
            schId: this.$route.query.schId,
          }
        }).then(({ data }) => {
          this.data = data || {}
          if (this.$route.query.schType === '0') {
            this.schedule = data?.userHotelVo || {}
          }
        }).finally(e => {
          this.$loading.close()
        })

        if (this.$route.query.schType !== '0') {
          this.$loading.open()
          this.$http.get('h5api/meet/get/info', {
            params: {
              schId: this.$route.query.schId,
              userId: id
            }
          }).then(({ data }) => {
            this.schedule = data || {}
          }).finally(e => {
            this.$loading.close()
          })
        }
      }
    },
    signIn () {
      this.$loading.open()
      this.$http.get('h5api/meet/signSchedule', {
        params: {
          openId: this.$route.query.openId,
          schId: this.$route.query.schId,
          forceSign: '0'
        }
      }).then(({ data }) => {
        this.signedIn = true
      }).catch(res => {
        if (['00002', '00003'].includes(res.errorCode)) {
          Dialog.confirm({
            title: res.message,
          }).then(() => {
            this.$loading.open()
            this.$http.get('h5api/meet/signSchedule', {
              params: {
                openId: this.$route.query.openId,
                schId: this.$route.query.schId,
                forceSign: '1'
              }
            }).then(({ data }) => {
              this.signedIn = true
            }).finally(e => {
              this.$loading.close()
            })
          })
        } else if (res.errorCode === '00004') {
          this.signedIn = true
        }
      }).finally(e => {
        this.$loading.close()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-main-scroll {
  & > div:first-child {
    height: 252px;
    background-position: center;
    background-size: cover;
    text-align: center;
    color: white;
    position: relative;

    & > div:first-child {
      padding-top: 24px;
      font-size: 30px;
      font-weight: 600;
    }

    & > div:nth-child(2) {
      margin-top: 19px;
      font-size: 16px;
    }

    & > div:nth-child(3) {
      margin-top: 4px;
      font-size: 16px;
      line-height: 24px;
      white-space: pre-line;
    }

    & > hr:nth-child(4) {
      width: 250px;
      height: 1px;
      margin: 15px auto;
      background-image: linear-gradient(to right, #ccc 0%, #ccc 50%, transparent 50%);
      background-size: 12px 1px;
      background-repeat: repeat-x;
    }

    & > div:nth-child(5) {
      font-size: 16px;
    }

    & > hr:nth-child(6) {
      position: absolute;
      bottom: 25px;
      left: 0;
      right: 0;
      margin: auto;
      width: 359px;
      height: 10px;
      border-radius: 19px;
    }
  }

  & > div:nth-child(2) {
    margin: -30px 15px 0 15px;
    position: relative;
    width: calc(100% - 30px);
    background: #ffffff;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.1);
    padding: 15px;
    z-index: 2;

    .title {
      font-size: 18px;
      font-weight: 500;
      color: #292a2c;
    }

    .tr {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;

      .th {
        font-size: 14px;
        color: #9b9eb1;
        flex-shrink: 0;
      }

      .td {
        font-size: 14px;
        color: #3c3e41;
      }
    }

    & > div:nth-child(2) {
      padding-top: 24px;
      position: relative;

      &:before {
        content: '';
        margin: 12px 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: #d8d8d8;
      }
    }
  }
}

.safe-area-plus {
  width: 100%;
  padding: 10px 15px;
  background-color: #fff;

  button {
    width: 100%;
    height: 45px;
    background: #349c1e;
    color: #fff !important;
  }
}
</style>
