<template>
  <ui-main>
    <van-swipe @change="i=>current=i" autoplay="3000" height="233">
      <van-swipe-item v-for="v of data.imgs">
        <van-image :src="v" fit="cover" height="100%"/>
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }}/{{data.imgs && data.imgs.length}}
        </div>
      </template>
    </van-swipe>

    <header>
      <div>
        <div>
          <van-icon :name="require('./assets/time.svg')"/>
        </div>
        <div>{{`${data.date} ${data.startTime}${data.endTime && ('到' + data.endTime)}`}}</div>
      </div>
      <div>{{data.name}}</div>
      <div>
        <van-icon :name="data.weatherIcon"/>
        <span>{{data.weather}}</span>
      </div>
      <div>
        <div @click="locate">
          <span>
            <span class="title">地点：</span>
            {{data.location}}
          </span>
          <van-icon name="arrow" size="12"/>
        </div>
        <div v-if="type==='dining'">
          <div>
            <span class="title">桌号/包间号：</span>
            {{data.roomNum}}
          </div>
        </div>
        <div v-if="type==='conference'">
          <div>
            <span class="title">座位：</span>
            {{data.seat}}
          </div>
        </div>
        <template v-if="type==='transportation'">
          <div>
            <div>
              <span class="title">车牌号：</span>
              {{data.licensePlateNumber}}
            </div>
          </div>
          <div>
            <div>
              <span class="title">司机姓名：</span>
              {{data.driverName}}
            </div>
          </div>
          <div @click="call(data.driverTel)">
            <div>
              <span class="title">司机电话：</span>
              {{data.driverTel}}
            </div>
          </div>
        </template>
        <div v-else class="phone" @click="call(data.tel)">
          <span>
            <span class="title">联系电话：</span>
            {{data.tel}}
          </span>
          <van-icon :name="require('@/imgs/tel.svg')" size="12"/>
        </div>
      </div>
      <QRCode :data="data" v-if="type==='transportation'"/>
    </header>

    <WarmPrompt :data="data"/>
    <SeatingArrangements :data="data" v-if="type==='conference'"/>

    <template #footer>
      <div class="bottom-button safe-area-plus">
        <van-button icon="scan" round @click="scan">扫一扫</van-button>
      </div>
    </template>
  </ui-main>
</template>

<script>
function requireAll (requireContext) {
  return requireContext.keys().map(requireContext)
}

let components = {}
requireAll(require.context('./components', true, /^\.\/.*\.vue$/)).map(v => {
  components[v.default.name] = v.default
})

export default {
  components,
  data () {
    return {
      current: 0,
      data: {},
      type: this.$route.query.type
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      /*this.$loading.open()
      this.$http.post('', this.$route.query).then(({ data }) => {
        this.data = data || {}
      }).finally(e => {
        this.$loading.close()
      })*/
      setTimeout(() => {
        this.data = {
          date: '2020-12-12',
          startTime: '12:00',
          endTime: '14:00',
          name: '天怡豪生大酒店餐厅',
          location: '六盘水旅游文化会议中心',
          weatherIcon: require('./assets/weather.svg'),
          weather: '5℃~12℃',
          roomNum: '5包间13号',
          seat: '3排27号',
          tel: '0851-8221657',
          warmPrompt: '六盘水市，是贵州省地级市。六盘水市地处贵州西部乌蒙山区，年平均气温15℃，夏季平均气温19.7℃，冬季平均气温3℃。',
          licensePlateNumber: '京A·88888',
          driverName: '王洋',
          driverTel: '0856-8221657',
          qrcode: 'qrcode',
          imgs: [
            require('./assets/swipe-1.png'),
            require('./assets/swipe-2.png'),
          ],
        }
      }, 500)
    },
    call (phone) {
      window.location.href = `tel:${phone}`
    },
    locate () {
      wx.miniProgram.navigateTo({
        url: `/pages/indexPKG/travelMapGo/main?${this.$qs.stringify({
          latitude: parseFloat(this.data.latitude),
          longitude: parseFloat(this.data.longitude),
          name: this.data.name,
          address: this.data.address,
          scale: 18
        }, {
          encode: false
        })}`
      })
    },
    scan () {
      /*wx.scanCode({
        onlyFromCamera: true,
        success: res => {
          this.$router.push({
            path: 'guest-service',
            query: {
              type: res.result,
            }
          })
        }
      })*/
      this.$router.push({
        path: '/conference-group/sign-in',
        query: {
          type: 'dining',
          id: 'id'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  width: calc(100% - 30px);
  position: relative;
  margin: -15px 15px 15px 15px;
  padding: 15px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);

  & > div:first-child {
    display: flex;

    & > div:first-child {
      width: 34px;
      height: 34px;
      background: #dc3b43;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    & > div:nth-child(2) {
      flex: 1;
      height: 34px;
      background: linear-gradient(90deg, #fee5dd, rgba(255, 255, 255, 0));
      display: flex;
      align-items: center;
      padding: 0 10px;
    }
  }

  & > div:nth-child(2) {
    font-size: 20px;
    font-weight: 600;
    color: #292a2c;
    margin-top: 15px;
  }

  & > div:nth-child(3) {
    margin-top: 15px;
    font-size: 12px;
    color: #292a2c;

    & img {
      vertical-align: middle;
    }

    & > span {
      margin-left: 5px;
      vertical-align: middle;
    }
  }

  & > div:nth-child(4) {
    margin-top: 15px;
    background: #f7f9fe;
    font-size: 15px;
    font-weight: 400;
    color: #292a2c;
    padding: 5px 15px;

    span.title {
      font-size: 15px;
      font-weight: 300;
      color: #595b64;
    }

    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      line-height: 30px;
    }

    .phone a {
      color: #C7000B;
    }
  }
}

.bottom-button {
  width: 100%;
  padding: 9px 15px;
  background-color: #fff;

  button {
    width: 100%;
    height: 45px;
    background: #c7000b;
    color: #fff !important;
  }
}

.custom-indicator {
  position: absolute;
  right: 12px;
  bottom: 28px;
  padding: 2px 5px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 11px;
  font-size: 10px;
  color: #ffffff;
  line-height: 14px;
  letter-spacing: 2px;
}
</style>
