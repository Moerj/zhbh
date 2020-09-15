<template>
  <ui-main>
    <article class="content" v-html="guid"></article>
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

<style>
.content img{
  width:100%;
}
.content {
  margin: 0 10px 0 10px;
}
</style>
<style scoped>

</style>
