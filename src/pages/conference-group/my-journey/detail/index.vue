<template>
  <ui-main>
    <van-swipe @change="i=>current=i" autoplay="3000" height="233">
      <van-swipe-item v-for="v of data.imgs">
        <van-image :src="v" fit="cover" height="100%"/>
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }}/{{ data.imgs && data.imgs.length }}
        </div>
      </template>
    </van-swipe>

    <header>
      <div>
        <div>
          <van-icon :name="require('./assets/time.svg')"/>
        </div>
        <div>{{ data.date && `${data.date} ${data.startTime}${data.endTime && ('到' + data.endTime)}` }}</div>
      </div>
      <div>{{ data.title }}</div>
      <div>
        <van-icon :name="weatherIcon"/>
        <span>{{ temperature }}</span>
      </div>
      <div>
        <div @click="locate">
          <span>
            <span class="title">地点：</span>
            <span class="ellipsis-1">{{ data.place }}</span>
          </span>
          <van-icon name="arrow" size="12"/>
        </div>
        <div v-if="type!=='车辆接送'" @click="call(data.chargerPhone)">
          <span>
            <span class="title">联系电话：</span>
            <span class="ellipsis-1 phone">{{ data.chargerPhone }}</span>
          </span>
          <van-icon :name="require('@/imgs/tel.svg')" size="12"/>
        </div>
      </div>
      <template v-if="data.schTypeName==='车辆接送事件'">
        <div v-for="v of cars">
          <div>
            <span>
              <span class="title">车牌号：</span>
              <span class="ellipsis-1">{{ data.licensePlateNumber }}</span>
            </span>
          </div>
          <div>
            <div>
              <span class="title">司机姓名：</span>
              <span class="ellipsis-1">{{ data.driverName }}</span>
            </div>
          </div>
          <div @click="call(data.driverTel)">
            <span>
              <span class="title">司机电话：</span>
              <span class="ellipsis-1 phone">{{ data.driverTel }}</span>
            </span>
            <van-icon :name="require('@/imgs/tel.svg')" size="12"/>
          </div>
        </div>
      </template>
    </header>

    <WarmPrompt :data="data"/>
    <SeatingArrangements :data="data" v-if="data.schTypeName==='会议'"/>

    <template #footer>
      <Tabbar/>
    </template>
  </ui-main>
</template>

<script>
import Tabbar from '../Tabbar'

function requireAll (requireContext) {
  return requireContext.keys().map(requireContext)
}

let components = {}
requireAll(require.context('./components', true, /^\.\/.*\.vue$/)).map(v => {
  components[v.default.name] = v.default
})

components.Tabbar = Tabbar

export default {
  components,
  data () {
    return {
      current: 0,
      data: {},
      type: this.$route.query.type,
      weather: {},
    }
  },
  computed: {
    weatherIcon () {
      if (this.weather.cond_code_n) {
        return 'https://yjtp.yjctrip.com/weather/' + this.weather.cond_code_n + '.png'
      }
    },
    temperature () {
      if (!this.$isEmpty(this.weather.tmp_min) && !this.$isEmpty(this.weather.tmp_max)) {
        return `${this.weather.tmp_min}℃~${this.weather.tmp_max}℃`
      }
    }
  },
  created () {
    this.getDetail()
    this.getWeather()
  },
  methods: {
    getWeather () {
      this.$loading.open()
      this.$http.get(`${process.env.VUE_APP_BASE_API}guizhou/one-travel-app/weather/queryWeatherByAreaCode/520200000000`).then(({ data }) => {
        this.weather = data?.dailyForecast[0]
      }).finally(e => {
        this.$loading.close()
      })
    },
    getDetail () {
      this.$loading.open()
      this.$http.get('h5api/meet/get/info', {
        params: {
          schId: this.$route.query.schId
        }
      }).then(({ data }) => {
        this.data = data || {}
      }).finally(e => {
        this.$loading.close()
      })
    },
    call (phone) {
      window.location.href = `tel:${phone}`
    },
    locate () {
      wx.ready(() => {
        wx.openLocation({
          longitude: Number(this.data.longitude),
          latitude: Number(this.data.latitude),
          name: this.data.title, // 位置名
          address: this.data.place, // 地址详情说明
          fail (e) {
            console.log(e)
          }
        })
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/variables.scss';

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

    .ellipsis-1 {
      display: inline;
    }

    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      line-height: 30px;

      & > i:nth-child(2) {
        flex-shrink: 0;
      }
    }

    .phone {
      color: $ui-color-primary;
    }
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
