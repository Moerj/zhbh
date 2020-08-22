<template>
  <ui-main>
    <template v-slot:header>
      guest-service
    </template>

    <ConferenceGroupTabbar/>
  </ui-main>
</template>

<script>
import ConferenceGroupTabbar from '@/components/ConferenceGroupTabbar'

export default {
  name: 'App',
  components: {
    ConferenceGroupTabbar
  }
}
</script>
