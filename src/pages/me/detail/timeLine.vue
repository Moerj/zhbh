<template>
   <div class="container">
      <div v-if="activity" class="time-line-box">
        <div v-for="(item, index) in activity" :key="index" class="time-line-item">
          <div class="box">
            <div class="top">
              <img v-if="index<3" :src="require(`./part${index + 1}.png`)" alt="part1">
            </div>
            <div class="dot">{{ item['itemTitle'] }}</div>
            <div class="item">
              <img v-if="index==0" :src="src1" alt="img">
              <img v-if="index==1" :src="src2" alt="img">
              <img v-if="index==2" :src="src3" alt="img">
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
      props: {
          activity:Array
      },
    data(){
        return{
            activity1:[],
            src1:'',
            src2:'',
            src3:'',
        }
    },
    watch:{
        activity: {
            handler(newValue){
                newValue.forEach( (item,index)=>{
                     this.getBase64Image(item['itemCover'],'src'+(index+1))
                })
            },
            deep:true
        },
    },
    methods:{
         getBase64Image (url,ref) {
            let that = this;
            let image = new Image();
            image.src = url + '?v=' + Math.random();// 处理缓存
            image.crossOrigin = '*';// 支持跨域图片
            image.onload = () => {
                that[''+ref] = that.drawBase64Image(image)
            }
        },
         drawBase64Image (img) {
            let canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            let ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, img.width, img.height);
            let dataURL = canvas.toDataURL('image/png');
            return dataURL
        },
    }
}
</script>

<style lang="scss" scoped>
  .container{
    padding: 50px 7px 7px 7px;
    .time-line-box {
      display:flex;
      flex-direction: column;
      .time-line-item {
        flex:1;
        display:flex;
        flex-direction: column;
        padding-bottom: 10px;
        border-left: 2px dashed #F4B97A;
        .box {
          transform: translate(-11px, -50px);
          .top {
            flex:1;
            padding-left: 6px;
            img {
              width: 125px;
              height: 30px;
            }
          }
          .dot{
            height: 23px;
            padding-left: 43px;
            font-size: 11px;
            color: #ffffff;
            line-height: 23px;
            background: url("part-title-bg.png") no-repeat;
            background-size: 100% 23px;
          }
          .item{
            flex:1;
            transform: translateX(9px);
            padding-left: 13px;
            padding-top: 10px;
            img {
              width: 100%;
              height: 162px;
            }
          }
        }
        &:last-child {
          border: none;
        }
      }
    }
  }


</style>
