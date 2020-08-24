<template>
  <van-icon name="arrow-left" v-if="!$route.meta.root"/>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
::v-deep .van-icon {
  position: absolute;
  top: 1rem;
  left: 1rem;
}
</style>
