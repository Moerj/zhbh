<template>
  <van-tabbar v-model="active">
    <van-tabbar-item v-for="(v,i) of items" :key="v.label"
                     @click="clickItem(item)">
      {{ item.label }}
      <template #icon="props">
        <van-icon :name="arrow-down" :class="{
          active: active===i
        }" size="12"/>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  data () {
    return {
      active: 0,
      items: [
        {
          icon: require('./assets/my-journey.svg'),
          label: '我的行程',
          path: '/my-journey'
        },
        {
          icon: require('./assets/guest-service.svg'),
          label: '嘉宾服务',
          path: '/guest-service'
        },
      ],
    }
  },
  mounted () {
  },
  methods: {
    clickItem (item) {
      if (item.path && this.$route.path !== item.path) {
        this.$router.push(item.path)
      }
    },
    updateTabState () {
      this.items.forEach((item, index) => {
        if (location.hash.indexOf(item.path) >= 1) {
          this.active = index
        }
      })
    }
  },
}
</script>

<style lang='scss' scoped>
.active {

}
</style>
