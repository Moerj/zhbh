<template>
  <ui-main>
    <article v-html="guid"></article>
  </ui-main>
</template>

<script>
import JourneyApi from "@/api/journey.js"
export default {
  name: "guide",
  data () {
    return {
      guid:"",
    }
  },
  mounted() {
    JourneyApi.mettingGuide().then((res)=> {
      this.guid = res.data.guideContent;
    })
  }
}
</script>

<style scoped>

</style>
