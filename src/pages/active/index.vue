<template>
  <ui-main>
    <div class="user-container">
      <van-tabs @click="tabClick" v-model="typeActive" sticky>
        <van-tab title="全部">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list @load="getDateList" v-model="loading" :offset="500" finished-text="没有更多数据了~~~" :finished="finished">
              <div v-for="item in list" @click="toActiveDetail(item.id)" style="position: relative;background: #ffffff;border-radius: 5px;margin: 10px 10px;padding: 10px">
				<div v-if="item.activityState+''=='0'" style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;width: 100%;height: 100%;background-color: rgba(255,255,255,0.5);z-index: 99999;"></div>
				<van-row>
					<van-col span="7">
                    <div style="width: 100%;position: relative;border-radius: 0.375rem;">
                      <div style="position: absolute;width: 36px;height: 16px;background: #c7000b;border-radius: 5px 0px 5px 0px;font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: center;color: #ffffff;line-height: 16px;">置顶</div>
                      <img style="width: 100%;border-radius: 0.375rem;" :src="item['coverPath']" alt="">
					  <div v-if="item.activityState+''=='0'" style="position: absolute;bottom: 0;left: 0;right: 0;width: 100%;z-index: 999999;font-size: 0.75rem;color: #ffffff;text-align: center;background-color: rgba(0,0,0,0.6);border-radius:0 0 0.375rem 0.375rem;">该场次已关闭</div>
                    </div>
                  </van-col>
                  <van-col span="17">
                    <div style="padding-left: 0.625rem;">
                      <div class="item-title">{{item.title}}</div>
                      <div>
                        <span class="ggg" style="position: relative;padding-right:0.625rem;font-size: 0.75rem;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #292a2c;line-height: 17px;letter-spacing: 1px;">已报名：{{item['currentGroup']['jionedNum']}}</span>
                        <span  style="margin-left:0.625rem;font-size: 0.75rem;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #292a2c;line-height: 1.0625rem;letter-spacing: 1px;">截止人数：{{item['currentGroup']['jionNum']}}</span>
                      </div>
                      <div style="margin-top: 0.3125rem;width: 80%">
                        <van-progress color="#FD5542" :show-pivot="false" :percentage="(item['currentGroup']['jionedNum']*(item['currentGroup']['jionNum']/100))*100" />
                      </div>
                      <div style="margin-top: 0.2rem">
                        <img src="./image/downtime@2x.png" style="width: 12px;position: relative;top: 2px;" alt="">
                        <span style="font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 500;text-align: left;color: #595b64;line-height: 17px;letter-spacing: 1px;">报名截止时间:</span>
                        <span style="font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #9094a8;line-height: 17px;letter-spacing: 1px;">{{item['endTimeCN']}}</span>
                      </div>
                      <div>
                        <img src="./image/time@2x.png" style="width: 12px;position: relative;top: 3px;" alt="">
                        <span style="font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 500;text-align: left;color: #595b64;line-height: 17px;letter-spacing: 1px;">活动时间:</span>
                        <span style="font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #9094a8;line-height: 17px;letter-spacing: 1px;">{{item['currentGroup']['groupStarttimeCN']}}-{{item['currentGroup']['groupEndtimeCN']}}</span>
                      </div>
                    </div>
                  </van-col>
                </van-row>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="已报名">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list @load="getActiveList" v-model="loading" :offset="500" finished-text="没有更多数据了~~~" :finished="finished">
              <div v-for="item in list1" style="position: relative;background: #ffffff;border-radius: 5px;margin: 10px 10px;padding: 10px">
                <div v-if="item['activityVo']['activityState']+''=='0'" style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;width: 100%;height: 100%;background-color: rgba(255,255,255,0.5);z-index: 99999;"></div>
                <van-row>
                  <van-col span="7">
                    <div style="width: 100%;position: relative;border-radius: 0.375rem;">
                      <div style="position: absolute;width: 36px;height: 16px;background: #c7000b;border-radius: 5px 0px 5px 0px;font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: center;color: #ffffff;line-height: 16px;">置顶</div>
                      <img style="width: 100%;border-radius: 0.375rem;" :src="item['activityVo']['coverPath']" alt="">
                      <div v-if="item['activityVo']['activityState']+''=='0'" style="position: absolute;bottom: 0;left: 0;right: 0;width: 100%;z-index: 999999;font-size: 0.75rem;color: #ffffff;text-align: center;background-color: rgba(0,0,0,0.6);border-radius:0 0 0.375rem 0.375rem;">该场次已关闭</div>
                    </div>
                  </van-col>
                  <van-col span="17">
                    <div style="padding-left: 0.625rem;">
                      <div class="item-title">{{item['activityVo']['title']}}</div>
                      <div>
                        <span class="ggg" style="position: relative;padding-right:0.625rem;font-size: 0.75rem;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #292a2c;line-height: 17px;letter-spacing: 1px;">已报名：{{item['groupVo']['jionedNum']}}</span>
                        <span  style="margin-left:0.625rem;font-size: 0.75rem;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #292a2c;line-height: 1.0625rem;letter-spacing: 1px;">截止人数：{{item['groupVo']['jionNum']}}</span>
                      </div>
                      <div style="margin-top: 0.3125rem;width: 80%">
                        <van-progress color="#FD5542" :show-pivot="false" :percentage="(item['groupVo']['jionedNum']*(item['groupVo']['jionNum']/100))*100" />
                      </div>
                      <div style="margin-top: 0.2rem">
                        <img src="./image/downtime@2x.png" style="width: 12px;position: relative;top: 2px;" alt="">
                        <span style="font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 500;text-align: left;color: #595b64;line-height: 17px;letter-spacing: 1px;">报名截止时间:</span>
                        <span style="font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #9094a8;line-height: 17px;letter-spacing: 1px;">{{item['activityVo']['endTime']}}</span>
                      </div>
                      <div>
                        <img src="./image/time@2x.png" style="width: 12px;position: relative;top: 3px;" alt="">
                        <span style="font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 500;text-align: left;color: #595b64;line-height: 17px;letter-spacing: 1px;">活动时间:</span>
                        <span style="font-size: 12px;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: left;color: #9094a8;line-height: 17px;letter-spacing: 1px;">{{item['groupVo']['groupStarttime']}}-{{item['groupVo']['groupEndtime']}}</span>
                      </div>
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
    <Call/>
  </ui-main>
</template>
<style lang="scss" scoped>
  .user-container {
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
import Call from "@/components/call";
import journeyAPI from "@/api/journey";
export default {
  data() {
    return {
        list: [],
        list1:[],
        page_no:1,
        page_size:10,
        loading : false,
        isLoading: true,
        finished: false,
        typeActive:0,
    };
  },
  components: {
    Tabbar,Qrcode,Call
  },
    methods: {
      toActiveDetail(id){
          console.log(id)
          this.$router.push({path: '/active-detail', query: {activeId: id,}});
      },
      onRefresh(){
          this.isLoading = true;
          if (this.typeActive===0) {
              this.getDateList()
          }else{
              this.getActiveList()
          }
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
      },
      tabClick(index){
          this.typeActive = index;
          this.page_no = 1;
          this.finished = false;
          if (index===0) {
              this.getDateList()
          }else{
              this.getActiveList()
          }
      },
        getActiveList(){
            this.loading = true;
            let user = '';
            try {
                user = JSON.parse(localStorage.user)
            }catch (e) {
                this.loading = false;
                this.$toast('登录失效');
                return false
            }
            journeyAPI.activeJoined({userId:user.id}).then((res)=>{
                console.log(res);
                this.list = [];
                if (res.errorCode==="00000"){
                    this.list1 = res.data;
                    this.loading = false;
                    this.finished = true;
                    this.isLoading = false;
                }
            });
        }
  },
};
</script>


