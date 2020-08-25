<template>
  <div class="wrapper">
    <div>您的专属二维码</div>
    <QR :value="data.qrcode" size="150"/>
  </div>
</template>

<script>
import { QR } from 'plain-kit'

export default {
  components: { QR },
  name: 'QRCode',
  data () {
    return {
      data: {}
    }
  },
  watch: {
    ['$attrs.data'] (newVal) {
      this.data = newVal
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: 15px;
  text-align: center;
  font-size: 14px;
  color: #353535;

  & > div:nth-child(2) {
    margin: 15px auto auto auto;
  }
}
</style>
