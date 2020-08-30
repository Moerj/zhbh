<template>
  <div>
    <img src="./assets/hump.png" alt="" class="hump safe-area-margin">
    <van-tabbar v-model="active" v-if="show" :fixed="false" active-color="#C7000B" safe-area-inset-bottom>
      <van-tabbar-item v-for="(v,i) in items" :key="v.label" @click="clickItem(v,$event)">
        {{ v.label }}
        <template #icon="props">
          <van-icon :name="active===i?v.iconActive:v.icon"/>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { SvgIcon } from 'plain-kit'

export default {
  name: 'HumpTabbar',
  props: ['items'],
  components: { SvgIcon },
  data () {
    return {
      active: Array.from(this.items, ({ path }) => path).indexOf(this.$route.path),
      show: true
    }
  },
  methods: {
    clickItem (item, $event) {
      if (item.onClick) {
        $event.stopPropagation()
        item.onClick()
      } else if (item.path) {
        this.$router.push({
          path: item.path,
          query: this.$route.query
        })
      }
    },
    updateTabState () {
      this.items.forEach((item, index) => {
        if (location.hash.indexOf(item.path) >= 1) {
          this.active = index
        }
      })
    },
  },
  /*watch: {
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
  },*/
}
</script>

<style lang="scss" scoped>
@supports (bottom: constant(safe-area-inset-bottom)) or (bottom: env(safe-area-inset-bottom)) {
  .safe-area-margin {
    margin-bottom: constant(safe-area-inset-bottom) !important;
    margin-bottom: env(safe-area-inset-bottom) !important;
  }
}

.hump {
  position: fixed;
  bottom: 50px;
  margin: auto;
  width: 75px;
  height: 12.5px;
  left: 0;
  right: 0;
}

.van-tabbar:after {
  border: none !important;
}

.van-tabbar-item:nth-child(2) .van-tabbar-item__icon img {
  width: 48px;
  height: 48px;
  z-index: 1;
  margin-bottom: 8px;
}
</style>
