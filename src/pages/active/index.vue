<template>
  <ui-main>
    <template v-slot:header>
      <van-nav-bar title="活动报名" fixed>
        <div slot="left" @click="$root.back()">
          <van-icon name="cross" size="1rem"></van-icon>
        </div>
      </van-nav-bar>
    </template>
    <div class="user-container">
      当前暂时没有活动
    </div>
    <Tabbar />
  </ui-main>
</template>
<script>
import Tabbar from "@/components/Tabbar";
export default {
  data() {
    return {
      appVersion: process.env.APP_VERSION,
    };
  },
  components: {
    Tabbar,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.user-container {
  padding-top: 46px;
  // background-color: #fff;
}
</style>
