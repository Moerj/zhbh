<template>
  <ui-main>
    <ui-pull @load="getList"
             v-model="list"
             :num.sync="query.pageNo"
             :total="total"
             ref="pull"
    >
      <div class="list-item" v-for="v of list">
        <header>
          <div class="tr">
            <div class="th ellipsis-1">{{ v.title }}</div>
            <div class="td" @click="scan(v.id)">
              <van-icon :name="require('./assets/scan.svg')" size="16"/>
              <span>扫码</span>
            </div>
          </div>
        </header>
        <main>
          <div class="tr">
            <div class="th ellipsis-1" @click.stop="locate(v)">
              <span>地址：</span>
              <span>{{ v.address }}</span>
            </div>
            <van-icon class="td" name="arrow" size="12"/>
          </div>
          <div class="tr" @click="call(v.chargerPhone)">
            <div class="th ellipsis-1">
              <span>联系电话：</span>
              <span>{{ v.chargerPhone }}</span>
            </div>
            <van-icon class="td" :name="require('@/imgs/tel.svg')" size="12"/>
          </div>
        </main>
      </div>
    </ui-pull>

    <template #footer>
      <ConferenceGroupTabbar/>
    </template>
  </ui-main>
</template>

<script>
import empty from '@/components/empty'
import { getEnv } from 'plain-kit'
import ConferenceGroupTabbar from '../ConferenceGroupTabbar/index'

function getQuery () {
  return {}
}

export default {
  components: {
    empty, ConferenceGroupTabbar
  },
  data () {
    return {
      list: [],
      query: getQuery(),
      total: null
    }
  },
  watch: {
    query: {
      immediate: true,
      deep: true,
      handler (newVal) {
        this.getList()
      }
    }
  },
  methods: {
    call (phone) {
      window.location.href = `tel:${phone}`
    },
    locate (v) {
      wx.ready(() => {
        wx.openLocation({
          longitude: Number(v.longitude),
          latitude: Number(v.latitude),
          name: v.title, // 位置名
          address: v.place, // 地址详情说明
          fail: e => {
            console.error(e)
            console.log(v)
          }
        })
      })
    },
    async scan (id) {
      if (['wechat', 'mp'].includes(await getEnv())) {
        wx.ready(() => {
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
            success: res => {
              console.log(res)
              this.$loading.open()
              this.$http.get('h5api/meet/hasSignHotelSchedule', {
                params: {
                  houtelId: id,
                  phoneNo: res.resultStr // 当needResult 为 1 时，扫码返回的结果
                }
              }).then(res2 => {
                this.$router.push({
                  path: '/conference-group/sign-in',
                  query: {
                    signedIn: res2.errorCode === '00004' ? '1' : '0',
                    needSigningIn: '1',
                    phoneNo: res.resultStr,
                    schId: id,
                    schType: 0
                  }
                })
              }).catch(res => {
                //未入住该酒店无需跳转
                if (res.errorCode !== '00001') {
                  this.$router.push({
                    path: '/conference-group/sign-in',
                    query: {
                      signedIn: res.errorCode === '00004' ? '1' : '0',
                      needSigningIn: '1',
                      phoneNo: res.resultStr,
                      schId: id,
                      schType: 0
                    }
                  })
                }
              }).finally(res => {
                this.$loading.close()
              })
            }
          })
        })
      } else {
        this.$router.push({
          path: '/conference-group/sign-in',
          query: {
            signedIn: '0',
            needSigningIn: '1',
            phoneNo: '',
            schId: id,
            schType: 0
          }
        })
      }
    },
    getList () {
      this.list.length = 0
      this.$http.get('h5api/meet/hotellist', {
        params: this.query
      }).then(({ data }) => {
        this.list = data || []
      }).finally(e => {
        this.$refs.pull?.endSuccess()
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

.list-item {
  margin: 0 10px 10px 10px;

  &:first-child {
    margin-top: 10px;
  }

  &:last-child {
    margin-bottom: 20px;
  }

  height: 122px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.08);
  padding: 0 10px;

  & > header {
    & > .tr {
      height: 43px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      & > .th {
        font-size: 16px;
        font-weight: 500;
        color: #2e3032;
      }

      & > .td {
        flex-shrink: 0;
        width: 64px;
        height: 28px;
        background: #fff3f3;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;

        & > i:first-child {
          color: #c7000b;
          margin-right: 4px;
        }

        & > span:nth-child(2) {
          font-size: 15px;
          color: #c7000b;
        }
      }
    }
  }

  & > main {
    padding-top: 5px;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: #e5e6ea;
    }

    & > .tr {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 35px;

      &:nth-child(2) {
        & > .th > span:nth-child(2) {
          color: #c7000b;
        }
      }

      & > .th {
        font-size: 15px;
        color: #292a2c;

        & > span:first-child {
          font-size: 15px;
          font-weight: 300;
          color: #595b64;
        }
      }

      & > .td {
        font-size: 16px;
        color: #292a2c;
        flex-shrink: 0;
      }
    }
  }
}
</style>
