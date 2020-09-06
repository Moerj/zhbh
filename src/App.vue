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

  },
  methods: {

  }
}
</script>
