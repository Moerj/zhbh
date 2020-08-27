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
        wx.scanCode({
          onlyFromCamera: true,
          success: res => {
            this.$router.push({
              path: 'guest-service',
              query: {
                type: res.result,
              }
            })
          }
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
