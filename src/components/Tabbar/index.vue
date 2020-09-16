<template>
  <van-tabbar v-model="active">
    <van-tabbar-item
      v-for="(item, index) of tabbarGroup"
      :key="item.label"
      @click="clickItem(index)"
      replace
      :to="item.path"
    >
      {{ item.label }}
      <template #icon>
        <van-icon size="24" :name="item.iconChecked" v-if="active == index" />
        <van-icon size="24" :name="item.iconCheck" v-else />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      tabbarGroup: [
        {
          iconCheck: require("./assets/home_check.svg"),
          iconChecked: require("./assets/home_checked.svg"),
          label: "首页",
          path: "/guest-home",
        },
      /*  {
          iconCheck: require("./assets/active_check.svg"),
          iconChecked: require("./assets/active_checked.svg"),
          label: "活动报名",
          path: "/active",
        },*/
        {
          iconCheck: require("./assets/user_check.svg"),
          iconChecked: require("./assets/user_checked.svg"),
          label: "我的",
          path: "/me",
        },
      ],
    };
  },
  mounted() {
    this.updateTabState()
  },
  methods: {
    clickItem(item) {
      if (item.path && this.$route.path !== item.path) {
        this.$router.push(item.path);
      }
      this.active = item
    },
    updateTabState() {
      this.tabbarGroup.forEach((item, index) => {
        if (location.hash.indexOf(item.path) >= 1) {
          this.active = index;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.van-tabbar-item--active {
  color: #c7000b;
}
.van-tabbar {
  z-index: 100;
}
/deep/.van-tabbar-item__icon img {
   height: 31px;
   width: 33px;
}
/deep/.van-tabbar-item__icon {
   margin-bottom:0;
}
/deep/.van-tabbar-item {
  font-size: 12px;
}
</style>
