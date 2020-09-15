<template>
  <ui-main>
    <article id="guide" class="content" v-html="guid"></article>
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
  updated() {
    for (const dom of document.querySelectorAll('#guide img')) {
      dom.setAttribute('preview', '1')
    }
    this.initPreview("#guide img");
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
