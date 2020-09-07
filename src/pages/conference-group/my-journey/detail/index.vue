<template>
  <ui-main>
    <van-swipe @change="i=>current=i" autoplay="3000" height="233">
      <van-swipe-item v-for="v of data.coverPaths">
        <van-image :src="v" fit="cover" height="100%"/>
      </van-swipe-item>

      <template #indicator v-if="data.coverPaths && data.coverPaths.length>1">
        <div class="custom-indicator">
          {{ current + 1 }}/{{ data.coverPaths && data.coverPaths.length }}
        </div>
      </template>
    </van-swipe>

    <header>
      <div>
        <div>
          <van-icon :name="require('./assets/time.svg')"/>
        </div>
        <div>{{
            data.scheduleDate && `${data.scheduleDate} ${data.startTime}${data.endTime && ('到' + data.endTime)}`
          }}
        </div>
      </div>
      <div class="ellipsis-2">{{ data.title }}</div>
      <div>
        <van-icon :name="weatherIcon"/>
        <span>{{ temperature }}</span>
      </div>
      <div>
        <div @click.stop="locate({
          longitude: data.longitude,
          latitude: data.latitude,
          address: data.place,
          name: ''
        })">
          <span class="ellipsis-1">
            <span class="title">{{ data.schType === 3 ? '起点' : '地点' }}：</span>
            <span>{{ data.place }}</span>
          </span>
          <van-icon name="arrow" size="12"/>
        </div>
        <div v-if="data.schType===3" @click.stop="locate({
          longitude: data.destinationLongitude,
          latitude: data.destinationLatitude,
          address: data.destination,
          name: ''
        })">
          <span class="ellipsis-1">
            <span class="title">目的地：</span>
            <span>{{ data.destination }}</span>
          </span>
          <van-icon name="arrow" size="12"/>
        </div>
        <div v-else-if="data.chargerPhone">
          <span class="title">联系电话：</span>
          <span class="ellipsis-1" @click="call(data.chargerPhone)">
            <van-icon :name="require('@/imgs/tel.svg')" size="12" v-if="data.chargerPhone"/>&nbsp;
            <span class="phone">{{ data.chargerPhone }}</span>
          </span>
        </div>
      </div>
      <template v-if="data.schType===3">
        <div v-for="v of data.carUsers">
          <div class="header">{{ v.carNoTitle }}</div>
          <!--专车才显示乘车人员-->
          <div v-if="v.carType===1" class="ellipsis-1">
            <span class="title">乘车人员：</span>
            <span>{{ v.seatPerson }}</span>
          </div>
          <div class="ellipsis-1" v-if="v.carNoTitle">
            <!--2020 9.5 创信 字段更改-->
            <span class="title">车号：</span>
            <span>{{ v.carNoTitle }}</span>
          </div>
          <div class="ellipsis-1" v-if="v.carNo">
            <span class="title">车牌号：</span>
            <span>{{ v.carNo }}</span>
          </div>
          <div class="ellipsis-1">
            <span class="title">司机姓名：</span>
            <span>{{ v.driver }}</span>
          </div>
          <div @click="call(v.driverPhone)" v-if="v.driverPhone">
            <span class="title">司机电话：</span>
            <span class="ellipsis-1">
              <van-icon :name="require('@/imgs/tel.svg')" size="12"/>&nbsp;
              <span class="phone">{{ v.driverPhone }}</span>
            </span>
          </div>
        </div>
      </template>
    </header>

    <WarmPrompt :data="data"/>
    <SeatingArrangements :data="data" v-if="data.schType===1"/>

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
          schId: this.$route.query.schId,
          userId: localStorage.user ? JSON.parse(localStorage.user).id : null,
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
    locate ({ longitude, latitude, name, address }) {
      wx.ready(() => {
        wx.openLocation({
          longitude: Number(longitude),
          latitude: Number(latitude),
          name, // 位置名
          address, // 地址详情说明
          fail (e) {
            console.error(e)
            console.log(v)
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

    & ~ div {
      margin-top: 15px;
      background: #f7f9fe;
      font-size: 15px;
      font-weight: 400;
      color: #292a2c;
      padding: 5px 15px;

      .header {
        font-size: 16px;
        font-weight: 600;
        color: #292a2c;
        position: relative;

        &:before {
          content: '';
          position: absolute;
          left: -14px;
          width: 4px;
          height: 15px;
          background: #c7000b;
          border-radius: 2px;
        }
      }

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

        & > i:nth-child(2) {
          flex-shrink: 0;
        }
      }

      .phone {
        color: $ui-color-primary;
      }
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
