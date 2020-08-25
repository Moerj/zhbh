<template>
<ui-main>
    <template v-slot:header>
      <van-nav-bar title="活动报名" fixed>
        <div>
          <van-icon name="cross" size="1rem"></van-icon>
        </div>
      </van-nav-bar>
    </template>
    <div class="user-container">
      <van-tabs v-model="active">
        <van-tab title="全部"></van-tab>
        <van-tab title="已报名"></van-tab>
      </van-tabs>
      <div style="overflow: scroll;height: 585px">
        <div style="background: #ffffff;border-radius: 5px;margin: 10px 10px;padding: 10px">
          <van-row>
            <van-col span="17">
              <div>
                <div class="item-title">园区健身跑步竞赛</div>
                <div style="margin-top: 10px">
                  <span class="ggg" style="position: relative;padding-right:10px;font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #292a2c;line-height: 17px;letter-spacing: 1px;">已报名：8</span>
                  <!--<span style="width: 1px;height: 9px;background: red;margin: 0 10px">1</span>-->
                  <span  style="margin-left:10px;font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #292a2c;line-height: 17px;letter-spacing: 1px;">截止人数：189</span>
                </div>
                <div style="margin-top: 10px;width: 80%">
                  <van-progress color="#FD5542" :percentage="25" />
                </div>
                <div style="margin-top: 8px">
                  <img src="./image/downtime@2x.png" style="width: 12px;position: relative;top: 2px;" alt="">
                  <span style="font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #9094a8;line-height: 17px;letter-spacing: 1px;">报名截止时间 12月18号 12:00</span>
                </div>
                <div style="margin-top: 5px">
                  <img src="./image/time@2x.png" style="width: 12px;position: relative;top: 3px;" alt="">
                  <span style="font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #9094a8;line-height: 17px;letter-spacing: 1px;">报名截止时间 12月18号 12:00</span>
                </div>
              </div>
            </van-col>
            <van-col span="7">
              <div>
                <img src="./image/11111.png" alt="">
              </div>
            </van-col>
          </van-row>
        </div>
        <div style="background: #ffffff;border-radius: 5px;margin: 10px 10px;padding: 10px">
          <van-row>
            <van-col span="17">
              <div>
                <div class="item-title">园区健身跑步竞赛</div>
                <div style="margin-top: 10px">
                  <span class="ggg" style="position: relative;padding-right:10px;font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #292a2c;line-height: 17px;letter-spacing: 1px;">已报名：8</span>
                  <!--<span style="width: 1px;height: 9px;background: red;margin: 0 10px">1</span>-->
                  <span  style="margin-left:10px;font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #292a2c;line-height: 17px;letter-spacing: 1px;">截止人数：189</span>
                </div>
                <div style="margin-top: 10px;width: 80%">
                  <van-progress color="#FD5542" :percentage="25" />
                </div>
                <div style="margin-top: 8px">
                  <img src="./image/downtime@2x.png" style="width: 12px;position: relative;top: 2px;" alt="">
                  <span style="font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #9094a8;line-height: 17px;letter-spacing: 1px;">报名截止时间 12月18号 12:00</span>
                </div>
                <div style="margin-top: 5px">
                  <img src="./image/time@2x.png" style="width: 12px;position: relative;top: 3px;" alt="">
                  <span style="font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #9094a8;line-height: 17px;letter-spacing: 1px;">报名截止时间 12月18号 12:00</span>
                </div>
              </div>
            </van-col>
            <van-col span="7">
              <div>
                <img src="./image/11111.png" alt="">
              </div>
            </van-col>
          </van-row>
        </div>
        <div style="background: #ffffff;border-radius: 5px;margin: 10px 10px;padding: 10px">
          <van-row>
            <van-col span="17">
              <div>
                <div class="item-title">园区健身跑步竞赛</div>
                <div style="margin-top: 10px">
                  <span class="ggg" style="position: relative;padding-right:10px;font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #292a2c;line-height: 17px;letter-spacing: 1px;">已报名：8</span>
                  <!--<span style="width: 1px;height: 9px;background: red;margin: 0 10px">1</span>-->
                  <span  style="margin-left:10px;font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #292a2c;line-height: 17px;letter-spacing: 1px;">截止人数：189</span>
                </div>
                <div style="margin-top: 10px;width: 80%">
                  <van-progress color="#FD5542" :percentage="25" />
                </div>
                <div style="margin-top: 8px">
                  <img src="./image/downtime@2x.png" style="width: 12px;position: relative;top: 2px;" alt="">
                  <span style="font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #9094a8;line-height: 17px;letter-spacing: 1px;">报名截止时间 12月18号 12:00</span>
                </div>
                <div style="margin-top: 5px">
                  <img src="./image/time@2x.png" style="width: 12px;position: relative;top: 3px;" alt="">
                  <span style="font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #9094a8;line-height: 17px;letter-spacing: 1px;">报名截止时间 12月18号 12:00</span>
                </div>
              </div>
            </van-col>
            <van-col span="7">
              <div>
                <img src="./image/11111.png" alt="">
              </div>
            </van-col>
          </van-row>
        </div>
        <div style="background: #ffffff;border-radius: 5px;margin: 10px 10px;padding: 10px">
          <van-row>
            <van-col span="17">
              <div>
                <div class="item-title">园区健身跑步竞赛</div>
                <div style="margin-top: 10px">
                  <span class="ggg" style="position: relative;padding-right:10px;font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #292a2c;line-height: 17px;letter-spacing: 1px;">已报名：8</span>
                  <!--<span style="width: 1px;height: 9px;background: red;margin: 0 10px">1</span>-->
                  <span  style="margin-left:10px;font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #292a2c;line-height: 17px;letter-spacing: 1px;">截止人数：189</span>
                </div>
                <div style="margin-top: 10px;width: 80%">
                  <van-progress color="#FD5542" :percentage="25" />
                </div>
                <div style="margin-top: 8px">
                  <img src="./image/downtime@2x.png" style="width: 12px;position: relative;top: 2px;" alt="">
                  <span style="font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #9094a8;line-height: 17px;letter-spacing: 1px;">报名截止时间 12月18号 12:00</span>
                </div>
                <div style="margin-top: 5px">
                  <img src="./image/time@2x.png" style="width: 12px;position: relative;top: 3px;" alt="">
                  <span style="font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #9094a8;line-height: 17px;letter-spacing: 1px;">报名截止时间 12月18号 12:00</span>
                </div>
              </div>
            </van-col>
            <van-col span="7">
              <div>
                <img src="./image/11111.png" alt="">
              </div>
            </van-col>
          </van-row>
        </div>
        <div style="background: #ffffff;border-radius: 5px;margin: 10px 10px;padding: 10px">
          <van-row>
            <van-col span="17">
              <div>
                <div class="item-title">园区健身跑步竞赛</div>
                <div style="margin-top: 10px">
                  <span class="ggg" style="position: relative;padding-right:10px;font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #292a2c;line-height: 17px;letter-spacing: 1px;">已报名：8</span>
                  <!--<span style="width: 1px;height: 9px;background: red;margin: 0 10px">1</span>-->
                  <span  style="margin-left:10px;font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #292a2c;line-height: 17px;letter-spacing: 1px;">截止人数：189</span>
                </div>
                <div style="margin-top: 10px;width: 80%">
                  <van-progress color="#FD5542" :percentage="25" />
                </div>
                <div style="margin-top: 8px">
                  <img src="./image/downtime@2x.png" style="width: 12px;position: relative;top: 2px;" alt="">
                  <span style="font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #9094a8;line-height: 17px;letter-spacing: 1px;">报名截止时间 12月18号 12:00</span>
                </div>
                <div style="margin-top: 5px">
                  <img src="./image/time@2x.png" style="width: 12px;position: relative;top: 3px;" alt="">
                  <span style="font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #9094a8;line-height: 17px;letter-spacing: 1px;">报名截止时间 12月18号 12:00</span>
                </div>
              </div>
            </van-col>
            <van-col span="7">
              <div>
                <img src="./image/11111.png" alt="">
              </div>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
    <Tabbar />
</ui-main>
</template>
<style lang="scss" scoped>
  .user-container {
    padding-top: 46px;
    // background-color: #fff;
  }
  .item-title{
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: left;
    color: #2e3032;
    line-height: 22px;
  }
  .ggg::before{
      content: "";
      position: absolute;
      top: 25%;
      bottom: auto;
      right: 0;
      width: 1px;
      height: calc(100% - 45%);
      background-color: #ebebf1;
  }
</style>
<script>
import Tabbar from "@/components/Tabbar";
export default {
  data() {
    return {
      appVersion: process.env.APP_VERSION,
        list: [],
        total: null,
        query: {
            shop: [],
            pageNo: 1,
            pageSize: 0,
        },
    };
  },
  components: {
    Tabbar,
  },
  methods: {
      getDateList(){
          this.$refs.pull.endSuccess();
      }
  },
};
</script>


