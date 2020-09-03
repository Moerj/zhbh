<template>
  <HumpTabbar :items="items"/>
</template>

<script>
import HumpTabbar from './HumpTabbar'
import { getEnv } from 'plain-kit'

export default {
  components: { HumpTabbar },
  data () {
    return {
      items: [
        {
          icon: require('./assets/my-journey-detail.svg'),
          iconActive: require('./assets/my-journey-detail-active.svg'),
          label: '行程详情',
          path: '/conference-group/my-journey/detail'
        },
        {
          icon: require('./assets/scan.svg'),
          onClick: this.scan
        },
        {
          icon: require('./assets/guest-service.svg'),
          iconActive: require('./assets/guest-service-active.svg'),
          label: '嘉宾列表',
          path: '/conference-group/my-journey/guest-service'
        },
      ]
    }
  },
  methods: {
    async scan () {
      if (['wechat', 'mp'].includes(await getEnv())) {
        wx.ready(() => {
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
            success (res) {
              this.$loading.open()
              this.$http.get('h5api/meet/hasJoinSchedule', {
                params: {
                  schId: this.$route.query.schId,
                  phoneNo: res.resultStr // 当needResult 为 1 时，扫码返回的结果
                }
              }).then(res => {

              }).finally(res => {
                this.$loading.close()
                if (res.errorCode !== '00001') {
                  this.$router.push({
                    path: 'guest-service',
                    query: {
                      signedIn: res.errorCode === '00004' ? '1' : '0',
                      needSigningIn: res.data,
                      phoneNo: res.resultStr,
                      schId: this.$route.query.schId,
                      schType: this.$route.query.schType
                    }
                  })
                }
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
            phoneNo: '18275317951',
            schId: this.$route.query.schId,
            schType: this.$route.query.schType
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
