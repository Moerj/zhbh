<template>
  <van-tabbar v-model="active" v-if="show" :fixed="false" active-color="#C7000B">
    <van-tabbar-item v-for="(v,i) in items" :key="v.label" @click="clickItem(v)">
      {{v.label}}
      <template #icon="props">
        <van-icon :name="active===i?v.iconActive:v.icon"/>
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
          iconActive: require('./assets/my-journey-active.svg'),
          label: '我的行程',
          path: '/conference-group/my-journey'
        },
        {
          icon: require('./assets/hotel-list.svg'),
          iconActive: require('./assets/hotel-list-active.svg'),
          label: '酒店列表',
          path: '/conference-group/hotel-list'
        },
        {
          icon: require('./assets/guest-service.svg'),
          iconActive: require('./assets/guest-service-active.svg'),
          label: '嘉宾服务',
          path: '/conference-group/guest-service'
        },
      ],
      show: false
    }
  },
  mounted () {
  },
  methods: {
    clickItem (item) {
      item.path && this.$router.push(item.path)
    },
    updateTabState () {
      this.items.forEach((item, index) => {
        if (location.hash.indexOf(item.path) >= 1) {
          this.active = index
        }
      })
    }
  },
  watch: {
    $route () {
      const rootPathArry = this.items.map((item) => {
        return item.path
      })
      if (rootPathArry.includes(this.$route.path)) {
        this.updateTabState()
        this.show = true
      } else {
        this.show = false
      }
    }
  },
}
</script>
