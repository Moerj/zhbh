<template>
  <ui-main>
    <div class="content" id="shareImg">
      <div class="title">
        <q-tabs-bar
          :bottomLineStyle="'background: transparent;'"
          :middleLineStyle="'background: transparent;'"
          :tabList="titleList"
          :tabIndex="activeIndex"
          @changeTab="onClick">
          <div slot="content">
            <div class="logo">
              <img :src="logo" alt="logo">
            </div>
            <div class="banner">
              <img :src="banner" alt="banner">
              <div class="sign-in">
                <img src="./sign-in.png" alt="signIn">
              </div>
            </div>
            <div class="wonderful-box">
              <TimeLine :activity="dataItem"></TimeLine>
            </div>
            <div class="qr-code-box">
              <img src="./tip.png" alt="tip">
              <img src="./qr-code.png" alt="QRCode">
            </div>
          </div>
        </q-tabs-bar>
      </div>
    </div>
    <van-popup style="padding: 20px 5px" v-model="dialogShow"
               closeable round close-icon-position="top-right" close-icon="close"
               :style="{ width: '85%',height: '80%' }" get-container="body" >
      <div style="height: 7%;text-align: center">图片预览</div>
      <div style="height: 93%;overflow-y: scroll;">
        <img style="width: 100%" :src="this.imgUrl" alt="">
      </div>
    </van-popup>
    <div class="fixed img-show-btn" @click="toImage()">
      阅览
    </div>
  </ui-main>
</template>

<script>
import TimeLine from './timeLine'
import html2canvas from "html2canvas"
export default {
  name: "moments",
  components: {
    TimeLine
  },
  data(){
    return {
      activeIndex: 0,
      logo: require("./logo.png"),
      banner: require("./banner.png"),
      dataList: [],
      titleList: [],
      width: 0,
        dataItem:[],
        dialogShow:false,
        imgUrl:''
    }
  },
  created() {
    this.getMomentList()

  },
  methods: {
      toImage() {
          html2canvas(document.getElementById('shareImg')).then(canvas => {     //imageWrapper转换图片的dom
              let dataURL = canvas.toDataURL("image/png");
              this.imgUrl = dataURL;
              if (this.imgUrl!=""){
                  this.dialogShow=true
              }
          });
      },
    getMomentList() {
      this.$loading.open()
      this.$http.get(`/guest/meet/momentlist`).then(res => {
        const data = res.data
        if (data) {
          this.dataList = res.data
          data.forEach((item,index) => {
            this.titleList.push({
                index: index,
                name: item.title,
            })
          });
          console.log(this.titleList)
          this.onClick({index: 0,})
        }
      });
      this.$loading.close()
    },
    onClick(name) {
      this.activeIndex = name.index
      let dataItem = JSON.parse( this.dataList[name]['itemObj'] )
      this.arrayKeySort(dataItem, 'itemSort')
      this.dataItem = dataItem
    },
    arrayKeySort (arr, key) {
      return arr.sort(function (a,b) {
        const x = a[key]
        const y = b[key]
        console.log(x)
        return x<y? -1: (x>y ? 1:0)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  min-height: 100%;
  padding: 1rem;
  background: url("./bj.png") no-repeat;
  background-size: 100% 100%;
  .title {
    margin-top: 40px;
    .item {
      width: 100%;
      text-align: center;
      &:first-child {
        margin-left: 0;
      }
    }
  }
  .logo {
    text-align: center;
    margin-top: 35px;
    img {
      width: 249px;
      height: 38px;
    }
  }
  .banner {
    display: flex;
    justify-content: center;
    margin-top: 14px;
    position: relative;
    & > img {
      width: 364px;
      height: 256px;
    }
    .sign-in {
      position: absolute;
      right: -20px;
      bottom: 0px;
      z-index: 99;
      img {
        width: 109px;
        height: 110px;
      }
    }
  }
  .wonderful-box {
    margin: 18px auto;
    /*width: 324px;*/
    height: 823px;
    background: url("./jchg-bg.png") no-repeat;
    background-size: 100% 100%;
    padding-top: 61px;
  }
  .qr-code-box {
    margin: 18px auto;
    width: 324px;
    height: 80px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    img {
      &:first-child {
        width: 128px;
        height: 27px;
        margin-right: 17px;
      }
      &:last-child {
        width: 79px;
        height: 79px;
      }
    }
  }
}
.img-show-btn{
  bottom: 10%;
  right: 2%;
  background: white;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  text-align: center;
  line-height: 45px;
  box-shadow: 0 1px 5px 0px gray;
  font-size: 12px
}

/deep/.van-tabs__nav {
  background: transparent;
}
/deep/.van-tab {
  background: url("./yjjx-white.png") no-repeat;
  background-size: 100% 100%;
  padding: 5px 14px;
  width: 90px;
  height: 24px;
}
/deep/.van-tab + .van-tab {
  margin-left: 30px;
}
/deep/.van-tab--active {
  color: #ffffff;
  font-weight: 500;
  background: url("./yjjx-red.png") no-repeat;
  background-size: 100% 100%;
}
/deep/ .van-tab__text {
  //@include text-clamp(5)
}
</style>
