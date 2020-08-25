<template>
  <div>
    <van-icon name="arrow-left" v-if="!isRoot" size="22" color="white" @click="goBack"/>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    isPage () {
      return this.$parent.$vnode.componentOptions.tag === 'ui-page'
    },
    isRoot () {
      if (!this.isPage && this.$route.meta.root) {
        return true
      }
      return false
    }
  },
  methods: {
    goBack () {
      if (this.isPage) {
        this.$parent.close()
      } else {
        this.$router.go(-1)
      }
    },
    goHome () {
      if (this.isPage) {
        this.$parent.close()
      }
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .van-icon {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 9999;
}
</style>
