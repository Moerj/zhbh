<template>
  <ui-main>
    <template v-slot:header>
      <van-nav-bar
        title="公告"
        left-arrow
      ></van-nav-bar>
    </template>

    <div class="notice-container">
      <van-collapse v-model="activeName" accordion v-if="noticeData">
        <template v-for="(item,index) in noticeData">
          <van-collapse-item :title="item.title"   :key="index">
            <p v-html="item.content"></p>
          </van-collapse-item>
        </template>
      </van-collapse>
      <p v-else>暂无公告数据</p>
    </div>
  </ui-main>
</template>

<script>
import journeyAPI from "@/api/journey";

export default {
  name: "App",
  components: {},
  data() {
    return {
      activeName: "1",
      noticeData:"",
    };
  },
  beforeMount() {
    this.get_notices();
  },
  methods: {
    get_notices() {
      const date = new Date();
      const day =  date.getFullYear()+"-" + (date.getMonth()+1) + "-" + date.getDate();
      journeyAPI.notices({todayDate : day}).then((res)=> {
        this.noticeData = res.data
        console.log(this.noticeData)
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.notice-container {
  margin-top: 11px;
}
</style>
