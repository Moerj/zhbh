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
import Axios from 'axios'

function wxAuthorization () {
  const hrefBefore = window.location.href.split('#')[0]
  Axios.post(process.env.VUE_APP_BASE_API + 'yyt/wechat/wechat/queryJsConfigInfo', {
    mchId: '-1',
    url: hrefBefore
  }).then(res => {
    const data = res?.data?.data
    wx.config({
      debug: process.env.NODE_ENV === 'development',
      appId: data.appId,//appId通过微信服务号后台查看
      timestamp: data.timestamp,//生成签名的时间戳
      nonceStr: data.noncestr,//生成签名的随机字符串
      signature: data.signature,//签名
      jsApiList: ['scanQRCode', 'openLocation']
    })
    wx.error(res => {
      console.error(res)
      console.log('href before: ' + hrefBefore)
      const hrefAfter = window.location.href.split('#')[0]
      console.log('href after: ' + hrefAfter)
      console.log('是否一致：' + (hrefBefore === hrefAfter))
    })
  })
}

export default {
  name: 'App',
  components: {
    ConferenceGroupTabbar, Topbar
  },
  mounted () {
    wxAuthorization()
  },
}
</script>
