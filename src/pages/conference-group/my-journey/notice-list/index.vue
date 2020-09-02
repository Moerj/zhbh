<template>
  <ui-main>
    <van-collapse v-model="activeNames" accordion>
      <van-collapse-item :title="v.title" :name="i" v-for="(v,i) of notice">{{ v.content }}</van-collapse-item>
    </van-collapse>
  </ui-main>
</template>

<script>
export default {
  data () {
    return {
      activeNames: 0,
      notice: []
    }
  },
  created () {
    this.$loading.open()
    this.$http.get('h5api/meet/noticelist', {
      params: {
        todayDate: this.$route.query.todayDate
      }
    }).then(({ data }) => {
      this.notice = data || []
    }).finally(e => {
      this.$loading.close()
    })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
::v-deep .van-collapse-item__title {
  height: 64px;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: #292a2c;
}

::v-deep .van-collapse-item__content {
  font-size: 16px;
  font-weight: 300;
  color: #292a2c;
  line-height: 28px;
}
</style>
