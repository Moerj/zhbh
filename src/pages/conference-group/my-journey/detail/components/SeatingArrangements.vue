<template>
  <div class="wrapper" v-if="seatPath">
    <div class="title">座位安排</div>
    <img :src="seatPath" alt="">
  </div>
</template>

<script>
export default {
  name: 'SeatingArrangements',
  computed: {
    seatPath () {
      return this.$attrs.data?.meetRoom?.seatPath
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
