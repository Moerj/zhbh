<template>
  <ui-main>

    <img :src="img" style="max-width:100%;"/>
  </ui-main>
</template>

<script>
export default {
  name: "moments",
  data(){
    return {
      img: require("./lfdh.png")
    }
  }
}
</script>

<style scoped>

</style>
