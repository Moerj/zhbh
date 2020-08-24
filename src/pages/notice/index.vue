<template>
  <ui-main>
    <template v-slot:header>
      <van-nav-bar
        title="公告"
        left-arrow
        @click-left="$root.back()"
      ></van-nav-bar>
    </template>

    <div class="notice-container">
      <van-collapse v-model="activeName" accordion>
        <template v-for="item in noticeData">
          <van-collapse-item :title="item.title" :name="item.id" :key="item.id">
            <p v-html="item.text"></p>
          </van-collapse-item>
        </template>
      </van-collapse>
    </div>
  </ui-main>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      activeName: "1",
      noticeData: [
        {
          id: "0",
          title: "什么是一码通？如何开通一码通？",
          text: `<p>一码通</p>`,
        },
        {
          id: "1",
          title: "刷脸入园如何使用？",
          text: `<p>开通一码通用户购买景区门票即可体验刷脸入园，不需要再订单详情页面再次录入人脸照片。在使用过程中，如遇到问题欢迎随时拨打4008896301，我们将24小时竭诚为您服务，祝您拥有一个愉快的旅程。</p>
                <p></p>`,
        },
        {
          id: "2",
          title: "为什么门票只能购买一张？",
          text: `<p>一码通</p>`,
        },
        {
          id: "3",
          title: "在APP里买了景区门票能不能退？",
          text: `<p>一码通</p>`,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.notice-container {
  margin-top: 11px;
}
</style>
