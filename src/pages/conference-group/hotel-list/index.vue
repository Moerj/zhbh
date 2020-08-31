<template>
  <ui-main>
    <ui-pull @load="getList"
             v-model="list"
             :num.sync="query.pageNo"
             :total="total"
             ref="pull"
             v-if="list&&list.length>0"
    >
      <div class="list-item" v-for="v of list">
        <header>
          <div class="tr">
            <div class="th ellipsis-1">{{ v.title }}</div>
            <div class="td" @click="scan">
              <van-icon :name="require('./assets/scan.svg')" size="16"/>
              <span>扫码</span>
            </div>
          </div>
        </header>
        <main>
          <div class="tr">
            <div class="th ellipsis-1" @click="locate">
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
    <empty v-else :list="list"/>

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
  return {
    pageNo: 1,
    pageSize: 0,
  }
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
    async scan () {
      if (['wechat', 'mp'].includes(await getEnv())) {
        wx.ready(() => {
          console.log(wx.scanCode)
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
            success (res) {
              this.$router.push({
                path: 'guest-service',
                query: {
                  type: res.resultStr, // 当needResult 为 1 时，扫码返回的结果
                }
              })
            }
          })
        })
      } else {
        this.$router.push({
          path: '/conference-group/sign-in',
          query: {
            type: 'dining',
            id: 'id'
          }
        })
      }
    },
    getList () {
      this.list.length = 0
      this.$http.get('h5api/meet/hotellist', this.query).then(({ data }) => {
        this.list = data || []
      }).finally(e => {
        this.$refs.pull.endSuccess()
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
    margin-bottom: 0;
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
