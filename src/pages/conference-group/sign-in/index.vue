<template>
  <ui-main>
    <div>
      <div>{{data.status}}</div>
      <div>{{data.name}}</div>
      <div>{{data.statusPostscript}}</div>
      <hr/>
      <div>{{data.time}}</div>
      <hr/>
    </div>

    <div>
      <div>
        <div class="title">嘉宾信息</div>
        <div class="tr">
          <div class="th">嘉宾姓名：</div>
          <div class="td ellipsis-1">{{data.guestInfo.name}}</div>
        </div>
        <div class="tr">
          <div class="th">嘉宾身份：</div>
          <div class="td ellipsis-1">{{data.guestInfo.identity}}</div>
        </div>
      </div>
      <div>
        <div class="title">酒店信息</div>
        <div class="tr">
          <div class="th">酒店名称：</div>
          <div class="td ellipsis-1">{{data.hotelInfo.name}}</div>
        </div>
        <div class="tr">
          <div class="th">地址：</div>
          <div class="td ellipsis-1">{{data.hotelInfo.address}}</div>
        </div>
        <div class="tr">
          <div class="th">房间：</div>
          <div class="td ellipsis-1">{{data.hotelInfo.room}}</div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="bottom-button safe-area-plus">
        <van-button round @click="signIn">酒店签到</van-button>
      </div>
    </template>
  </ui-main>
</template>

<script>
import { Dialog } from 'vant'

export default {
  data () {
    return {
      data: {
        guestInfo: {},
        hotelInfo: {},
      }
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      /*this.$loading.open()
      this.$http.post('').then(({ data }) => {
        this.data = data || {}
      }).finally(e => {
        this.$loading.close()
      })*/
      setTimeout(() => {
        this.data = {
          time: '2020-12-12 13:50:24',
          status: '正常',
          name: '王易',
          statusPostscript: '防控疫情，人人有责，\n请您继续做好个人防护。',
          guestInfo: {
            name: '王易',
            identity: '联通旅游行业总监'
          },
          hotelInfo: {
            name: '天怡豪生大酒店',
            address: '六盘水旅游文化会议中心',
            room: 'B座8002'
          }
        }
      }, 500)
    },
    signIn () {
      Dialog.alert({
        title: '提示',
        message: '未到行程时间，不能进行签到！',
        theme: 'round-button',
      }).then(() => {
        // on close
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-main-scroll {
  & > div:first-child {
    height: 252px;
    background-image: url("./assets/bg.png");
    background-position: center;
    background-size: cover;
    text-align: center;
    color: white;

    & > div:first-child {
      padding-top: 24px;
      font-size: 30px;
      font-weight: 600;
    }

    & > div:nth-child(2) {
      margin-top: 19px;
      font-size: 16px;
    }

    & > div:nth-child(3) {
      margin-top: 4px;
      font-size: 16px;
      line-height: 24px;
      white-space: pre-line;
    }

    & > hr:nth-child(4) {
      width: 250px;
      height: 1px;
      margin: 15px auto;
      background-image: linear-gradient(to right, #ccc 0%, #ccc 50%, transparent 50%);
      background-size: 12px 1px;
      background-repeat: repeat-x;
    }

    & > div:nth-child(5) {
      font-size: 16px;
    }

    & > hr:nth-child(6) {
      margin-top: 11px;
      width: 359px;
      height: 10px;
      background: #00cf20;
      border-radius: 19px;
    }
  }

  & > div:nth-child(2) {
    margin: -30px 15px 0 15px;
    position: relative;
    width: calc(100% - 30px);
    height: 246px;
    background: #ffffff;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.1);
    padding: 15px;

    .title {
      font-size: 18px;
      font-weight: 500;
      color: #292a2c;
    }

    .tr {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;

      .th {
        font-size: 14px;
        color: #9b9eb1;
        flex-shrink: 0;
      }

      .td {
        font-size: 14px;
        color: #3c3e41;
      }
    }

    & > div:nth-child(2) {
      padding-top: 24px;
      position: relative;

      &:before {
        content: '';
        margin: 12px 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: #d8d8d8;
      }
    }
  }
}

.bottom-button {
  width: 100%;
  padding: 9px 15px;
  background-color: #fff;

  button {
    width: 100%;
    height: 45px;
    background: #349c1e;
    color: #fff !important;
  }
}
</style>
