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
      <van-tabs @click="tabClick" v-model="active" sticky offset-top="46">
        <van-tab title="全部">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list @load="getDateList" v-model="loading" :offset="500" finished-text="没有更多数据了~~~" :finished="finished">
              <div v-for="item in list" @click="toActiveDetail(item.id)" style="background: #ffffff;border-radius: 5px;margin: 10px 10px;padding: 10px">
                <van-row>
                  <van-col span="17">
                    <div>
                      <div class="item-title">{{item.title}}</div>
                      <div style="margin-top: 10px">
                        <span class="ggg" style="position: relative;padding-right:10px;font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #292a2c;line-height: 17px;letter-spacing: 1px;">已报名：8</span>
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
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="已报名">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list @load="getDateList" v-model="loading" :offset="500" finished-text="没有更多数据了~~~" :finished="finished">
              <div v-for="item in list" @click="toActiveDetail(item.id)" style="background: #ffffff;border-radius: 5px;margin: 10px 10px;padding: 10px">
                <van-row>
                  <van-col span="17">
                    <div>
                      <div class="item-title">{{item.title}}</div>
                      <div style="margin-top: 10px">
                        <span class="ggg" style="position: relative;padding-right:10px;font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #292a2c;line-height: 17px;letter-spacing: 1px;">已报名：8</span>
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
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
    <Tabbar />
  <Qrcode/>
  </ui-main>
</template>
<style lang="scss" scoped>
  .user-container {
    padding-top: 46px;
    padding-bottom: 46px;
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
import Qrcode from "@/components/Qrcode";
import Tabbar from "@/components/Tabbar";
import journeyAPI from "@/api/journey";
export default {
  data() {
    return {
        list: [],
        page_no:1,
        page_size:10,
        loading : false,
        isLoading: true,
        finished: false,
        typeActive:0,
    };
  },
  components: {
    Tabbar,Qrcode
  },
    methods: {
      toActiveDetail(id){
          console.log(id)
          this.$router.push({name: 'active-detail', query: {activeId: id,}});
      },
      onRefresh(){
          this.isLoading = true;
          this.getDateList();
      },
      getDateList(){
          this.loading = true;
          journeyAPI.activeList().then((res)=>{
              console.log(res);
              this.list = [];
              if (res.errorCode==="00000"){
                  this.list = res.data;
                  this.loading = false;
                  this.finished = true;
                  this.isLoading = false;
              }
          });
         //  setTimeout(() => {
         //      if ( this.typeActive){
         //          this.list.push({id:'22222'});
         //      } else{
         //          this.list.push({id:'111111'});
         //      }
         //  }, 2000);
      },
      tabClick(index){
          this.typeActive = index;
          this.page_no = 1;
          this.finished = false;
          this.getDateList()
      }
  },
};
</script>


