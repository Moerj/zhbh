<template>
   <div class="container">
      <div v-if="activity" class="time-line-box">
        <div v-for="(item, index) in JSON.parse(activity)" :key="index" class="time-line-item">
          <div class="box">
            <div class="top">
              <img :src="require(`./part${index + 1}.png`)" alt="part1">
            </div>
            <div class="dot">{{ item['itemTitle'] }}</div>
            <div class="item">
              <img :src="item['itemCover']" alt="img">
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['activity']
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
            height: 25px;
            padding-left: 43px;
            font-size: 11px;
            color: #ffffff;
            line-height: 25px;
            background: url("part-title-bg.png") no-repeat;
            background-size: 299px 25px;
          }
          .item{
            flex:1;
            transform: translateX(9px);
            padding-left: 20px;
            padding-top: 10px;
            img {
              width: 270px;
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