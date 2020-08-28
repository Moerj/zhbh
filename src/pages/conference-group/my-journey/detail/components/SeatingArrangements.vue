<template>
  <div class="wrapper">
    <div class="title">座位安排</div>
    <img :src="data.meetRoom.seatPath" alt="">
  </div>
</template>

<script>
export default {
  name: 'SeatingArrangements',
  data () {
    return {
      data: {}
    }
  },
  watch: {
    ['$attrs.data'] (newVal) {
      this.data = newVal
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import "./index";

.wrapper {
  img {
    width: 100%;
    margin-top: 15px;
  }
}
</style>
