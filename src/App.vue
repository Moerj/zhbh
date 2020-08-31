<template>
  <div id="app" class="h-100 flex-column">
    <!--<Topbar/>-->

    <div class="flex-1 relative">
      <router-view/>
    </div>

    <!--<guestTabbar />-->
    <!--<ConferenceGroupTabbar/>-->

  </div>
</template>

<script>
// 嘉宾一级页面底部栏
//import guestTabbar from '@/pages/guest-group/rootMenu'
import ConferenceGroupTabbar from '@/pages/conference-group/ConferenceGroupTabbar'

import Topbar from '@/components/Topbar'

export default {
  name: 'App',
  components: {
    ConferenceGroupTabbar, Topbar
  },
  created () {
    this.wxAuthorization()
  },
  methods: {
    // jsSDK授权
    wxAuthorization () {
      this.$http.post(process.env.VUE_APP_BASE_API + 'yyt/wechat/wechat/queryJsConfigInfo', {
        mchId: '-1',
        url: window.location.href
      }).then(({ data }) => {
        wx.config({
          debug: ['test', 'developer', 'localhost'].includes(window.location.hostname)
            || /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/.test(window.location.hostname),
          appId: data.appId,//appId通过微信服务号后台查看
          timestamp: data.timestamp,//生成签名的时间戳
          nonceStr: data.noncestr,//生成签名的随机字符串
          signature: data.signature,//签名
          jsApiList: ['scanQRCode', 'openLocation']
        })
        wx.error((res) => {
        })
      })
    }
  }
}
</script>
