<template>
  <div id="index-home">
    <ui-main>
      <template v-slot:header>
        <van-tabs
            v-if="dateList && dateList.length>0"
            class="tabs-cont"
            v-model="active"
            :line-height="0"
            @click="onTabsClick">
          <van-tab v-for="(v, i) of dateList" :title="v" :key="i"/>
        </van-tabs>
        <div style="background-color: #ffffff;border-top: 0.04rem solid #EBEBF1;" v-if="notices">
          <div style="overflow: auto;zoom: 1;padding: 0.625rem 0.75rem 0 0.75rem;">
            <div style="float: left;font-size: 1.125rem;font-weight: 600;text-align: left;color: #292a2c;line-height: 1.5625rem;">
              尊敬的{{ user.realName }}欢迎您！
            </div>
            <div style="float: right;font-size: 0.75rem;font-weight: 500;text-align: left;color: #c7000b;line-height: 1.0625rem;background: #fff3f3;border-radius: 0.3125rem;padding: 0.125rem 0.25rem;"
                @click="toNotic(tabCurrent)">全部<img style="width: 0.5rem;height: 0.4375rem;" src="./image/notice.png" alt=""></div>
          </div>
          <van-notice-bar background="#FFFFFF" color="#666666" left-icon="volume-o" :scrollable="false">
            <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
              <van-swipe-item v-for="notic in notices">{{ notic.title }}</van-swipe-item>
            </van-swipe>
          </van-notice-bar>
        </div>
      </template>
      <!--新版 我的酒店-->
      <div style="position: relative;margin: 10px 18px;height: 172px;padding: 5px" v-if="hotel">
        <!--left top-->
        <div style="position: absolute;top: 0;left: 0;">
          <div style="position:relative;width: 22px;height: 32px;border-top: 1px solid #c7000b;border-left: 1px solid #c7000b;">
            <div style="width: 5px;height: 5px;background: #c7000b;border-radius: 5px;position: absolute;right: 0;top: -3px;"></div>
            <div style="width: 5px;height: 5px;background: #c7000b;border-radius: 5px;position: absolute;left: -3px;bottom: 0;"></div>
          </div>
        </div>
        <!--right top-->
        <div style="position: absolute;top: 0;right: 0;">
          <div style="position:relative;width: 22px;height: 32px;border-top: 1px solid #c7000b;border-right: 1px solid #c7000b;">
            <div style="width: 5px;height: 5px;background: #c7000b;border-radius: 5px;position: absolute;left: 0;top: -3px;"></div>
            <div style="width: 5px;height: 5px;background: #c7000b;border-radius: 5px;position: absolute;right: -3px;bottom: 0;"></div>
          </div>
        </div>
        <!--left bottom-->
        <div style="position: absolute;bottom: 0;left: 0;">
          <div style="position:relative;width: 22px;height: 32px;border-bottom: 1px solid #c7000b;border-left: 1px solid #c7000b;">
            <div style="width: 5px;height: 5px;background: #c7000b;border-radius: 5px;position: absolute;left: -3px;top: 0;"></div>
            <div style="width: 5px;height: 5px;background: #c7000b;border-radius: 5px;position: absolute;right: 0;bottom: -3px;"></div>
          </div>
        </div>
        <!--right bottom-->
        <div style="position: absolute;bottom: 0;right: 0;">
          <div style="position:relative;width: 22px;height: 32px;border-bottom: 1px solid #c7000b;border-right: 1px solid #c7000b;">
            <div style="width: 5px;height: 5px;background: #c7000b;border-radius: 5px;position: absolute;right: -3px;top: 0;"></div>
            <div style="width: 5px;height: 5px;background: #c7000b;border-radius: 5px;position: absolute;left: 0;bottom: -3px;"></div>
          </div>
        </div>
        <!--title 我的酒店img-->
        <div style="position: absolute;top: -5px;width: 100%">
          <div style="display: flex;justify-content: center;position: relative">
            <div style="width: 262px;height: 0;border-bottom: 10px solid #A4020B;border-right: 10px solid transparent;border-left: 10px solid transparent;"></div>
            <div style="position: absolute;top:0;width: 240px;height: 0;border-top: 35px solid #C7000B;border-right: 10px solid transparent;border-left: 10px solid transparent;"></div>
            <img style="position: absolute;top:5px;width: 96px;" src="./image/wodejiudiannew.png" alt="">
          </div>
        </div>
        <!--content-->
        <div style="border: 1px solid #C7000B;height: 100%">
          <div style="margin-top: 35px;position: relative">
            <div style="height: 36px;background: linear-gradient(90deg,rgba(199,0,11,0.11), rgba(199,0,11,0) 53%, rgba(199,0,11,0.1));">
              <div style="font-size: 17px;font-weight: 500;text-align: center;color: #292a2c;line-height: 36px;" @click="toDetailRoom(hotel.id)">{{ hotel.title }}</div>
            </div>
            <div style="position: absolute;top: -3px;width: 0;height: 41px;border-left: 5px solid #C7000B;border-top: 3px solid transparent;border-bottom: 3px solid transparent;"></div>
            <div style="position: absolute;top: -3px;right:0;width: 0;height: 41px;border-right: 5px solid #C7000B;border-top: 3px solid transparent;border-bottom: 3px solid transparent;"></div>
          </div>
          <div style="padding:4px 10px">
            <div class="hotel-info">
              <div class="info-item flex row-between" @click="$wxMap(hotel)">
                  <span>
                    <span class="item-title" style="float: left">地点：</span>
                    <span class="item-text  ellipsis-1">{{ hotel.address }}</span>
                  </span>
                <span><img src="./image/right.svg"/></span>
              </div>
              <div class="info-item flex row-between" @click="toDetailRoom(hotel.id)">
                  <span>
                    <span class="item-title">房间：</span>
                    <span class="item-text">{{ hotel.roomNo }}</span>
                  </span>
              </div>
              <div class="info-item flex row-between">
                <a class="tel" :href="'tel:'+hotel.hotelPhone"></a>
                <span>
                      <span class="item-title">联系电话：</span>
                      <span class="item-text text-phone">{{ hotel.hotelPhone }}</span>
                    </span>
                <span><img src="./image/phone.svg"/></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--行程列表 image title start-->
      <div style="width: 100%;line-height: 70px;position: relative;height: 70px;">
        <img style="width: 100%;position: absolute;z-index: 0;height: 70px;" src="./image/xingchengliebiaobg.png" alt="">
        <div style="position: absolute;z-index: 1;width: 100%;bottom: 5px">
          <div style="position: relative;display: flex;justify-content: space-around">
            <img style="width: 98px;height: 25px;" src="./image/xingchengliebiao.png" alt="行程列表">
            <img style="width: 100px;height: 5px;position: relative;top: 17px;" src="./image/xingchengliebiaoline.png" alt="">
            <img style="width: 115px;height: 33px;position: relative;top: -10px;" src="./image/xingchengliebiaologo.png" alt="">
          </div>
        </div>
      </div>
      <!--行程列表 image title end-->
      <div class="subtitle flex row-left col-center" :style="hotel?'':'margin-top:10px'" v-if="togPeople && togPeople.length>0">
        <div class="peers-group">
          <div>
				  <span
              :class="journeyActive == user.id ? 'active' : ''"
              @click='()=>{
                hotelName = "我"
                journeyActive = user.id
                getList()
              }'
          >我的行程</span>
            <span v-for="people in togPeople"
                  :class="journeyActive == people.id ? 'active' : ''"
                  @click="()=>{
                        journeyActive = people.id
                        hotelName = people.realName
                        getList()
                      }"
            >{{ people['realName'] }}</span>

          </div>
        </div>
      </div>
      <ui-pull
          @load="getList"
          v-model="list"
          :num.sync="query.pageNo"
          :total="total"
          ref="pull"
          v-show="journeyList && journeyList.length > 0">
        <div class="hotel-container">

          <div class="journey-container" v-if="journeyList">
            <div class="journey-card" v-for="(item,index) in journeyList"
                 :key="item.id" @click="toDetail(item)"
                 :class="item['activeState'] == 0? 'notstarted': item['activeState'] == 1? 'ongoing': 'finished'">
              <div class="card-content" style="position: relative">
                <!--箭头 start-->
                <img v-if="index==journeyList.length-1" style="position: absolute;top:54%;left: 5px;width: 10px" src="./image/time_line.png" alt="">
                <div v-if="index==journeyList.length-1" style="width: 5px;height: 50%;background: #ffffff;position: absolute;bottom: -10px;z-index: 3"></div>
                <!--箭头 end-->
                <div style="width: 28px;height: 4px;" :style="item['activeState'] == 2?'background:#b7bacc': 'background:#f95020'"></div>
                <div class="card-title" style="position: relative">
                  <!--时间标题 start-->
                  <img v-if="item['activeState'] == 1" style="position: absolute;width: 15px;height: 14px;left: -5px;top: 3px;z-index: 3;" src="./image/red_round.png" alt="">
                  <img v-else style="position: absolute;width: 15px;height: 14px;left: -5px;top: 3px;z-index: 3;" src="./image/gray_round.png" alt="">
                  <span>{{ item.startTime }}到{{ item.endTime }}</span>
                  <img style="width: 170px;position: absolute;bottom: 0;right: 0;" v-if="item['activeState'] == 0" src="./image/red_line.png" alt="">
                  <img style="width: 170px;position: absolute;bottom: 0;right: 0;" v-else-if="item['activeState'] == 1" src="./image/red_line_jxz.png" alt="">
                  <img style="width: 170px;position: absolute;bottom: 0;right: 0;" v-else src="./image/gray_line.png" alt="">
                  <!--时间标题 end-->
                </div>
                <div class="card-inner" style="position: relative">
                  <div style="width: 100%;height: 100%;position: absolute">
                    <img style="width: 100%;height: 100%" v-if="item['activeState'] == 1" src="./image/red_border.png" alt="">
                    <img style="width: 100%;height: 100%" v-else src="./image/gray_border.png" alt="">
                  </div>
                  <div  style="padding: 20px 12px">
                    <div class="signin-cont">
                      <img src="./image/overSign.png" alt="已结束" v-if="item.isSign == 0 && item.activeState == 2"/>
                      <span v-if="item.isSign == 1">
                       <img src="./image/signedin.png" alt="已签到" v-if="item.schState == 1"/>
                       <img src="./image/nosignin.png" alt="未签到" v-else-if="item['activeState'] != 0"/>
                    </span>

                    </div>
                    <div class="inner-title ellipsis-1">{{ item.title }}</div>
                    <div class="inner-item flex row-between">
					  <span>
                        <span class="item-title" style="float: left">地点：</span>
                        <span class="item-text ellipsis-1">{{ item['place'] }}</span>
					  </span>
                    </div>
                    <div class="inner-item" v-if="item['tabNo'] || item['seatNo']">
					  <span>

						<span class="item-title">{{ item.schType == '2' ? "桌号/座位" : "座位" }}：</span>
						<span class="item-text"
                  v-if="item.schType == '2'">{{ (item['tabNo'] ? item['tabNo'] + '桌' : '') + (item['seatNo'] ? item['seatNo'] + '座' : '') }} </span>
              <span class="item-text"
                    v-else-if="item.schType == '1'">{{ (item['tabNo'] ? item['tabNo'] + '排' : '') + (item['seatNo'] ? item['seatNo'] + '座' : '') }} </span>
               <span class="item-text"
                     v-else-if="item.schType == '3'">{{item['tabNo'] ? item['tabNo'] : '' }} </span>
						<span class="item-text"
                              v-else>{{ (item['tabNo'] ? item['tabNo'] : '') + (item['seatNo'] ? item['seatNo'] + '座' : '') }} </span>
					  </span>
                    </div>
                    <div class="inner-item" style="width: 100%" v-if="item.volunteerPhone">
                      <div style="width: 100%">
                        <span class="item-title">志愿者电话：</span>
                        <span class="item-text-phone">{{ item.volunteerPhone }}</span>
                        <span style="position: relative;right: 0;float: right"><img src="./image/phone.svg"/></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </ui-pull>
      <Empty :textShow="false" :list="journeyList"/>
      <template #footer>
        <Tabbar/>
      </template>
      <van-overlay :show="showLoading">
        <div>
          <van-loading type="spinner"/>
        </div>
      </van-overlay>
    </ui-main>
    <Qrcode v-if="zIndex"/>
    <Call @click-z-index="clickCallShow"/>
    <div v-if="hh>0"
         :style="'position: relative;top: 0;bottom: 0;left: 0;right: 0;z-index:9999;background: transfer;height:'+hh+'px'"/>
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
import Qrcode from "@/components/Qrcode";
import Call from "@/components/call";
import Empty from '@/components/empty'

import journeyAPI from "@/api/journey.js";


function getQuery() {
  return {
    shop: [],
    pageNo: 1,
    pageSize: 0
  };
}

const user = JSON.parse(localStorage.user);
export default {
  name: "GuesetHome",
  components: {
    Tabbar,
    Qrcode,
    Call,
    Empty,
  },
  data() {
    return {
      user: user,
      active: 0,
      tabCurrent: "",
      dates: [],
      schDates:[],
      query: getQuery(),
      list: [],
      total: null,
      isShowCode: false,
      journeyList: [],
      togPeople: [],
      showMap: false,
      showLoading: false,
      journeyActive: user.id,
      notices: "",
      hotel: "",
      hotelName:"我",
      zIndex: true,
      hh: 0,
    };
  },
  watch: {
    query: {
      immediate: true,
      deep: true,
      handler(newVal) {
      },
    },
    dates: function () {
      this.getList()
    },
    active: function () {

    }
  },
  computed: {
    param() {
      return {
        userId: this.journeyActive,
        date: this.tabCurrent
      }
    },
    dateList() {
      const dates = this.dates.map((item) => {
        let items = item.split("-");
        return `${items[1]}月${items[2]}日`;
      });
      return dates;
    },
  },
  created() {
    //获取传过来的openid
    this.getTogPeople();
    this.get_notices();

  },
  methods: {

    getList() {
      if (!this.dates || !this.dates.length > 0) {
        this.getDateList()
        return
      }
      this.tabCurrent = this.dates[this.active]
      this.getMyJourney();
      this.getHotal();
    },
    get_notices() {
      const date = new Date();
      const day = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      journeyAPI.notices({todayDate: day}).then((res) => {
        this.notices = res.data
      })
    },
    clickCallShow(index) {
      this.zIndex = !index
    },
    toNotic() {
      this.$router.push({
        path: '/notice/',
      });
    },
    getHotal() {
      const param = {
        userId: this.journeyActive,
        liveDate: this.tabCurrent
      }
      journeyAPI
          .getHotal(param)
          .then((res) => {
            if (res.data == null) {
              this.hotel = ""
              return
            }
            this.hotel = res.data
            this.hotel.place = this.hotel.address
          })
    },
    toDetailRoom(id) {
      this.$router.push({
        path: '/guest-home/jiudian',
        query: {
          userHotelId: id
        }
      })
    },
    onTabsClick() {
      this.$refs.pull.reload();
    },
    getDateList() {
      journeyAPI
        .DateList({userId: this.user.id})
        .then((res) => {
          if (res.list) {
            const now = this.$dayjs().format('YYYY-MM-DD')
            this.dates = res.list.datelistFull.concat();
            if (this.dates.indexOf(now) == -1){
              this.dates.push(now);
              this.dates.sort()
            }
            this.schDates = res.list.datelistFull;
            this.active = this.dates.indexOf(now)
          }
        })
    },
    getTogPeople() {
      journeyAPI.togPeople({id: this.user.id}).then(res => {
        this.togPeople = res.refUsers
      })
    },
    getMyJourney() {
      journeyAPI
          .myJourney(this.param)
          .then((res) => {
            this.journeyList = res.list;
            this.$refs.pull.endSuccess();
            if ((!res.list || res.list.length === 0) && this.param.userId === this.user.id) {
              this.$dialog.confirm({
                title: '行程跳转确认',
                message: '您当日无行程,是否跳转到最近有行程的一天?',
              }).then(() => {
                // on confirm
                const now = this.$dayjs().format('YYYY-MM-DD');
                let minMill;
                let val = "";
                for (let i=0; i<this.schDates.length; i++){
                  const date = this.$dayjs(this.schDates[i])
                  let diffMill = date.diff(now);

                  if (!minMill || minMill<diffMill){
                    minMill = diffMill;
                    val = this.schDates[i]
                  } else {
                    break;
                  }
                }

                if (val){
                  this.active = this.dates.indexOf(val)
                  this.getList()
                }
              }).catch((err) => {
                console.log(err)
              });
            }
          })
          .catch((err) => {
            this.$refs.pull.endSuccess();
          });
    },
    async toDetail(data) {
      let currentData = data; // 当前点击的行程
      const urls = {"1": "huiyi", "2": "canting", "4": "huodong"}
      let subFix = urls[data.schType]
      if (data.schType == 3) {
        await journeyAPI.schduleInfo({usId: data.usId}).then((res) => {
          const carUrls = {"1": "zhuanche", "2": "bashi"}
          subFix = carUrls[res.data]
        })
      }
      this.$router.push({
        path: '/guest-home/' + subFix,
        query: {
          usId: data.usId, // 添加详情所需要的数据
        },
      });
    },
    click() {
      this.isShowCode = true;
    },
    closeCode(ev) {
      this.isShowCode = false;
    },
    showMapHandle() {
      this.showLoading = true;
      setTimeout(() => {
        this.showLoading = false;
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";

.van-overlay {
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.notice-swipe {
  height: 40px;
  line-height: 40px;
}


</style>
