<template>
  <div class="wrapper" v-if="warmPrompt">
    <div class="title">温馨提示</div>
    <div>{{ warmPrompt }}</div>
  </div>
</template>

<script>
export default {
  name: 'WarmPrompt',
  computed: {
    warmPrompt () {
      return this.$attrs.data?.warmPrompt
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import "./index";

.wrapper {
  & > div:nth-child(2) {
    margin-top: 15px;
    font-size: 16px;
    font-weight: 400;
    color: #9094a8;
    line-height: 25px;
  }
}
</style>
