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
        <div class="notice-div" v-if="notices">
          <div class="notice-title">
            <div class="greeting">
              尊敬的{{ user.realName }}欢迎您！
            </div>
            <div class="notic-all" @click="toNotic(tabCurrent)">全部<img src="./image/notice.png" alt=""></div>
          </div>
          <van-notice-bar background="#FFFFFF" color="#666666" left-icon="volume-o" :scrollable="false">
            <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
              <van-swipe-item v-for="notic in notices">{{ notic.title }}</van-swipe-item>
            </van-swipe>
          </van-notice-bar>
        </div>
      </template>

      <ui-pull
          @load="getList"
          v-model="list"
          :num.sync="query.pageNo"
          :total="total"
          ref="pull">
        <div class="hotel-container">
          <!--新版 我的酒店-->
          <div class="hotel-div" v-if="hotel">
            <!--left top-->
            <div class="abs-left-top">
              <div class="border-box top-l left-l">
                <div class="point" style="right: 0;top: -3px;"/>
                <div class="point" style="left: -3px;bottom: 0;"/>
              </div>
            </div>
            <!--right top-->
            <div class="abs-right-top">
              <div class="border-box top-l right-l">
                <div class="point" style="left: 0;top: -3px;"/>
                <div class="point" style="right: -3px;bottom: 0;"/>
              </div>
            </div>
            <!--left bottom-->
            <div class="abs-left-bottom">
              <div class="border-box bottom-l left-l">
                <div class="point" style="left: -3px;top: 0;"/>
                <div class="point" style="right: 0;bottom: -3px;"/>
              </div>
            </div>
            <!--right bottom-->
            <div class="abs-right-bottom">
              <div class="border-box bottom-l right-l">
                <div class="point" style="right: -3px;top: 0;"/>
                <div class="point" style="left: 0;bottom: -3px;"/>
              </div>
            </div>
            <!--title 我的酒店img-->
            <div class="hotel-title">
              <div class="title-inner">
                <div class="bg-l bg-inner"/>
                <div class="bg-l bg-out"/>
                <img src="./image/wodejiudiannew.png" alt="">
              </div>
            </div>
            <!--content-->
            <div class="hotel-content border-all">
              <div style="margin-top: 35px;position: relative">
                <div class="hotel-name">
                  <div class="name" @click="toDetailRoom(hotel.id)">{{ hotel.title }}</div>
                </div>
                <div class="name_left-l name-l" />
                <div class="name_right-l name-l" />
              </div>
              <div style="padding:4px 10px">
                <div class="hotel-info">
                  <div class="info-item flex row-between" @click="$wxMap(hotel)">
                    <span>
                      <span class="item-title" style="float: left">地点：</span>
                      <span class="item-text  ellipsis-1">{{ hotel.address }}</span>
                    </span>
                    <span><img src="./image/right.svg"/></span>
                    <img class="absolute hotel_right-tag" src="./image/hotel-right-tag.png">
                  </div>
                  <div class="info-item flex row-between" @click="toDetailRoom(hotel.id)">
                    <span>
                      <span class="item-title">房间：</span>
                      <span class="item-text">{{ hotel.roomNo }}</span>
                    </span>
                    <img class="absolute hotel_left-tag" src="./image/hotel-left-tag.png">
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
          <div class="relative" style="width: 100%;line-height: 70px;height: 70px;">
            <img class="absolute" style="width: 100%;z-index: 0;height: 70px;" src="./image/xingchengliebiaobg.png" alt="">
            <div class="absolute" style="z-index: 1;width: 100%;bottom: 5px">
              <div class="relative flex" style="justify-content: space-around">
                <img style="width: 98px;height: 25px;" src="./image/xingchengliebiao.png" alt="行程列表">
                <img class="relative" style="width: 100px;height: 5px;top: 17px;" src="./image/xingchengliebiaoline.png" alt="">
                <img class="relative" style="width: 115px;height: 33px;top: -10px;" src="./image/xingchengliebiaologo.png" alt="">
              </div>
            </div>
          </div>
          <!--行程列表 image title end-->
          <div class="subtitle flex row-left col-center" :style="hotel?'':'margin-top:10px'" v-if="togPeople && togPeople.length>0">
            <div class="peers-group">
              <div>
				<span :class="journeyActive == user.id ? 'active' : ''"
                  @click='()=>{
                    hotelName = "我"
                    journeyActive = user.id
                    getList()
                  }'>我的行程</span>
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
          <div class="journey-container" v-if="journeyList">
            <div class="journey-card" v-for="(item,index) in journeyList"
                 :key="item.id" @click="toDetail(item)"
                 :class="item['activeState'] == 0? 'notstarted': item['activeState'] == 1? 'ongoing': 'finished'">
              <div class="card-content relative">
                <div class="card-title relative" :class="item.activeState == 2 ? 'gray-title':'red-title'">
                  <!--时间标题 start-->
                  <span>{{ item.startTime }}到{{ item.endTime }}</span>
                  <img class="absolute" style="width: 170px;bottom: 0;right: 0;" v-if="item['activeState'] == 0" src="./image/red_line.png" alt="">
                  <img class="absolute" style="width: 170px;bottom: 0;right: 0;" v-else-if="item['activeState'] == 1" src="./image/red_line_jxz.png" alt="">
                  <img class="absolute" style="width: 170px;bottom: 0;right: 0;" v-else src="./image/gray_line.png" alt="">
                  <!--时间标题 end-->
                </div>
                <div class="card-inner relative">
                  <!--圆图片 start-->
                  <div style="width: 20px">
                    <img v-if="item['activeState'] != 2" class="absolute left-2" style="width: 15px;height: 14px;top: 0;z-index: 3;" src="./image/red_round.png" alt="">
                    <img v-else class="absolute left-2" style="width: 15px;height: 14px;top: 3px;z-index: 3;" src="./image/gray_round.png" alt="">
                  </div>
                  <!--圆图片 end-->
                  <!--箭头 start-->
                  <img v-if="index==journeyList.length-1" class="absolute" style="top:54%;left: 7px;width: 10px" src="./image/time_line.png" alt=""/>
                  <div v-if="index==journeyList.length-1" class="absolute shade" style="width: 7px;height: 50%;background: #ffffff;bottom: -10px;z-index: 3"/>
                  <!--箭头 end-->
                  <div class="card-inner-content">
                    <!--边框 start-->
                    <div class="absolute height3 border-bg-h" :class="systemIsAndroid?'top-1 left-1':'top-2 left-2'" style="width: 30px;"></div>
                    <div class="absolute border-bg-v" :class="systemIsAndroid?'left-1':'left-2'" style="top:1px;width: 3px;height: 20px;"></div>
                    <div class="absolute flex" :class="systemIsAndroid?'top-1':'top-2'" style="margin-left: 40%;">
                      <div class="height3 border-bg-h" style="width: 12px;"></div>
                      <div class="height3 border-bg-h" style="width: 4px;margin-left: 7px"></div>
                      <div class="height3 border-bg-h" style="width: 4px;margin-left: 3px"></div>
                    </div>
                    <div class="absolute height3 border-bg-h" :class="systemIsAndroid?'bottom-1':'bottom-2'" style="left: 10%;width: 30px;"></div>
                    <div class="absolute height3 border-bg-h" :class="systemIsAndroid?'bottom-1 right-1':'bottom-2 right-2'" style="width: 19px;"></div>
                    <div class="absolute border-bg-v" :class="systemIsAndroid?'right-1':'right-2'" style="bottom:1px;width: 3px;height: 22px;"></div>
                    <div class="absolute bottom-left-round" :class="systemIsAndroid?'bottom-1 left-1':'bottom-2 left-2'"></div>
                    <div class="absolute top-right-edge"></div>
                    <!--边框 end-->
                    <div class="signin-cont">
                      <img src="./image/overSign.png" alt="已结束" v-if="item.isSign == 0 && item.activeState == 2"/>
                      <span v-if="item.isSign == 1">
                       <img src="./image/signedin.png" alt="已签到" v-if="item.schState == 1"/>
                       <img src="./image/nosign.png" alt="未签到" v-else-if="item['activeState'] != 0"/>
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
                         <span class="item-text" v-if="item.schType == '2'">{{ (item['tabNo'] ? item['tabNo'] + '桌' : '') + (item['seatNo'] ? item['seatNo'] + '座' : '') }} </span>
                         <span class="item-text" v-else-if="item.schType == '1'">{{ (item['tabNo'] ? item['tabNo'] + '排' : '') + (item['seatNo'] ? item['seatNo'] + '座' : '') }} </span>
                         <span class="item-text" v-else-if="item.schType == '3'">{{item['tabNo'] ? item['tabNo'] : '' }} </span>
                         <span class="item-text" v-else>{{ (item['tabNo'] ? item['tabNo'] : '') + (item['seatNo'] ? item['seatNo'] + '座' : '') }} </span>
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
<!--      <Empty :textShow="false" :list="journeyList"/>-->
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
    <Pupon v-if="user.userRole==1" @click-z-index="clickPuponShow"/>
    <div v-if="hh>0"
         :style="'position: relative;top: 0;bottom: 0;left: 0;right: 0;z-index:9999;background: transfer;height:'+hh+'px'"/>
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
import Qrcode from "@/components/Qrcode";
import Call from "@/components/call";
import Empty from '@/components/empty'
import Pupon from '@/components/Popup'

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
    Pupon
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
      showPupon:false,
      systemIsAndroid:true
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
       // const userAgent = navigator.userAgent.toLowerCase();
       // console.log(userAgent)
      //Android终端
      //let isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('android') > -1;
      //Ios终端
      //let isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        //Ios
        console.log('iOS')
        this.systemIsAndroid = false
    } else if (/(Android)/i.test(navigator.userAgent)) {
        //Android终端
        console.log('Android')
        this.systemIsAndroid = true
    }
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
    clickPuponShow(showPupon) {
       this.showPupon = !showPupon
    },
    toNotic() {
      this.$router.push({
        path: '/guest-home/notice/',
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
            const now = this.$dayjs(this.param.date).format('YYYY-MM-DD');
            const nowDysjs = this.$dayjs(now);
            if ((!res.list || res.list.length === 0) && this.param.userId === this.user.id && this.schDates.indexOf(now) == -1) {
              this.$dialog.confirm({
                title: '行程跳转确认',
                message: '您当日无行程,是否跳转到最近有行程的日期?',
                confirmButtonText: '是',
                cancelButtonText: '否',
              }).then(() => {
                // on confirm
                let minMill = '';
                let val = "";
                for (let i=0; i<this.schDates.length; i++){
                  console.log('date  '+this.schDates[i])
                  const date = this.$dayjs(this.schDates[i])
                  let diffMill = nowDysjs.diff(date);
                  console.log(this.schDates[i])
                  if ((!minMill && minMill !== 0) || (minMill>diffMill && minMill>0)){
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
    optionCoupon(){
        this.$router.push({path:'/me/coupons'})
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
<style>
  .notice-div .van-notice-bar {
    height: 30px;
  }
</style>
