<template>
  <div id="index-home">
    <ui-main>
      <template v-slot:header>
        <div :id="dateList.length>0?'stop1':''">
          <van-tabs
              v-if="dateList && dateList.length>0"
              class="tabs-cont"
              v-model="active"
              :line-height="0"
              >
            <van-tab v-for="(v, i) of dateList" :title="v" :key="i"/>
          </van-tabs>
        </div>
        <div style="background-color: #ffffff;border-top: 0.04rem solid #EBEBF1;" v-if="notices">
          <div style="overflow: auto;zoom: 1;padding: 0.625rem 0.75rem 0 0.75rem;">
            <div style="float: left;font-size: 1.125rem;font-weight: 600;text-align: left;color: #292a2c;line-height: 1.5625rem;">
              尊敬的{{ user.realName }}欢迎您！
            </div>
            <div style="float: right;font-size: 0.75rem;font-weight: 500;text-align: left;color: #c7000b;line-height: 1.0625rem;background: #fff3f3;border-radius: 0.3125rem;padding: 0.125rem 0.25rem;">全部<img style="width: 0.5rem;height: 0.4375rem;" src="./image/notice.png" alt=""></div>
          </div>
          <van-notice-bar background="#FFFFFF" color="#666666" left-icon="volume-o" :scrollable="false">
            <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
              <van-swipe-item v-for="(notic,nIndex) in notices" :key="nIndex">{{ notic }}</van-swipe-item>
            </van-swipe>
          </van-notice-bar>
        </div>
      </template>
        <div class="hotel-container">
          <!--新版 我的酒店-->
          <div id="stop2" style="width: 100%">
            <div style="position: relative;margin: 20px 18px;height: 172px;padding: 5px" v-if="hotel">
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
                    <div style="font-size: 17px;font-weight: 500;text-align: center;color: #292a2c;line-height: 36px;">{{ hotel.title }}</div>
                  </div>
                  <div style="position: absolute;top: -3px;width: 0;height: 41px;border-left: 5px solid #C7000B;border-top: 3px solid transparent;border-bottom: 3px solid transparent;"></div>
                  <div style="position: absolute;top: -3px;right:0;width: 0;height: 41px;border-right: 5px solid #C7000B;border-top: 3px solid transparent;border-bottom: 3px solid transparent;"></div>
                </div>
                <div style="padding:4px 10px">
                  <div class="hotel-info">
                    <div class="info-item flex row-between">
                  <span>
                    <span class="item-title" style="float: left">地点：</span>
                    <span class="item-text  ellipsis-1">{{ hotel.address }}</span>
                  </span>
                      <span><img src="./image/right.svg"/></span>
                    </div>
                    <div class="info-item flex row-between" >
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
          <div class="subtitle flex row-left col-center" :style="hotel?'':'margin-top:10px'">
            <div class="peers-group">
              <div>
				        <span class="active" >我的行程</span>
                <span v-for="people in togPeople">{{ people}}</span>

              </div>
            </div>
          </div>
          <div class="journey-container" v-if="journeyList">
            <div class="journey-card" v-for="(item,index) in journeyList"
                 :id="journeyList.length>0 && index==0?'stop3':''" :key="item.id"
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
          <div style="height: 60px;"></div>
        </div>
          <template #footer>
            <Tabbar/>
          </template>

    </ui-main>
    <Qrcode id="stop5"/>
    <Call id="stop4" @click-z-index="clickCallShow"/>
    <div v-if="hh>0"
         :style="'position: relative;top: 0;bottom: 0;left: 0;right: 0;z-index:9999;background: transfer;height:'+hh+'px'"/>
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
import Qrcode from "@/components/Qrcode";
import Call from "@/components/call";

const user = JSON.parse(localStorage.user);
export default {
  name: "GuesetHome",
  components: {
    Tabbar,
    Qrcode,
    Call,
  },
  data() {
    return {
      user: user,
      active: 0,
      journeyList: [
          { "tabNo":"2号车",
            "latitude":"26.548249",
            "activeState":"1",
            "chargerPhone":"",
            "destination":"贵州省贵阳市白云区艳山红镇云峰大道",
            "schTypeName":"车辆接送",
            "title":"去国际会议中心",
            "destinationLongitude":"106.625587",
            "schType":3,
            "scheduleDate":"2020-09-05",
            "startTime":"8:30",
            "endTime":"9:00",
            "place":"贵州省贵阳市南明区永乐乡尖坡",
            "seatNo":2,
            "destinationLatitude":"26.667350",
            "longitude":"106.826088"},
        {"tabNo":"12",
          "latitude":"26.581836",
          "activeState":"0",
          "chargerPhone":"13011112222",
          "schTypeName":"会议",
          "title":"旅发大会",
          "schType":1,
          "scheduleDate":"2020-09-05",
          "startTime":"18:00",
          "endTime":"20:30",
          "place":"国际商务会议室",
          "seatNo":26,
          "longitude":"106.751372"}],
      togPeople: ["张虎","李雪"],
      notices: ['您报名的卡丁车活动即将开始.','您的会议将在一小时后开始'],
      hotel: {
        "title":"盘江雅阁大酒店",
        "hotelPhone":"18685199875",
        "roomNo":"506",
        "longitude":"106.545936",
        "latitude":"26.755675",
        "address":"贵州省贵阳市白云区麦架镇马路河"
      },
      hh: 0,
    };
  },
  computed: {
    dateList() {
      let res = []
      const type = "MM月DD日"
      const now = this.$dayjs();
      res.push(now.format(type))
      for (let i=1; i<10; i++) {
        res.push(now.add(i,'day').format(type))
      }
      return res;
    },
  },
  created() {
    this.shepherd()
  },
  methods: {

    shepherd() {
        this.hh = document.documentElement.clientHeight || document.body.clientHeight;
        let $this = this;
        this.$nextTick(() => {
          const tour = this.$shepherd({
            useModalOverlay: true,
            cancelIcon: {
              enabled: true
            },
            defaultStepOptions: {
              classes: 'shepherd-theme-custom3'
            },

          });
          tour.addStep({
            attachTo: {element: document.getElementById("stop1"), on: 'bottom-start'},
            text: `<div>
								<div>
									<div style="margin-left: 27px;width: 7px;height: 7px;border-radius: 5px;background-color: #ffffff"></div>
									<div style="margin-left: 30px;height: 62px;width: 1px;border-left: 1px dashed white"/>
								</div>
								<div style="text-align: center;font-weight: 400;color: #ffffff;line-height: 40px;font-size: 15px;height: 40px;background: linear-gradient(180deg,#e9483c, #e55068);border-radius: 58px;">可点击切换日期，查看对应行程</div>
							</div>`,
            buttons: [
              {
                action() {
                  return this.next();
                },
                text: '<div style="font-size: 15px;font-weight: 500;text-align: center;color: #ffffff;line-height: 11px;">我知道了</div>'
              }
            ],
            defaultStepOptions: {
              classes: 'shepherd-theme-custom'
            },
            classPrefix: 'my-tour1-',
            id: 'stop11'
          });
          if ($this.hotel) {
            tour.addStep({
              attachTo: {element: document.getElementById("stop2"), on: 'bottom'},
              text: `<div>
								<div>
									<div style="margin-left: 27px;width: 7px;height: 7px;border-radius: 5px;background-color: #ffffff"></div>
									<div style="margin-left: 30px;height: 62px;width: 1px;border-left: 1px dashed white"/>
								</div>
								<div style="text-align: center;font-weight: 400;color: #ffffff;line-height: 40px;font-size: 15px;height: 40px;background: linear-gradient(180deg,#e9483c, #e55068);border-radius: 58px;">这里会显示您当日将要居住的酒店的信息</div>
							</div>`,
              buttons: [{
                action() {
                  return this.next();
                },
                text: '<div style="font-size: 15px;font-weight: 500;text-align: center;color: #ffffff;line-height: 11px;">我知道了</div>'
              }],
              id: 'stop22',
              classPrefix: 'my-tour2-',
            });
          }

          if ($this.journeyList.length > 0) {
            tour.addStep({
              attachTo: {element: document.getElementById("stop3"), on: 'top'},
              text: `<div>
								<div style="text-align: center;font-weight: 400;color: #ffffff;line-height: 40px;font-size: 15px;height: 40px;background: linear-gradient(180deg,#e9483c, #e55068);border-radius: 58px;">点击行程列表，可以查看行程详情</div>
								<div>
									<div style="margin-left: 30px;height: 62px;width: 1px;border-left: 1px dashed white"></div>
									<div style="margin-left: 27px;width: 7px;height: 7px;border-radius: 5px;background-color: #ffffff"></div>
								</div>
							</div>`,
              buttons: [{
                action() {
                  return this.next();
                },
                text: '<div style="font-size: 15px;font-weight: 500;text-align: center;color: #ffffff;line-height: 11px;">我知道了</div>'
              }],
              id: 'stop33',
              classPrefix: 'my-tour3-',
            });
          }

          tour.addStep({
            attachTo: {element: document.getElementById("stop4"), on: 'top'},
            text: `<div>
								<div style="text-align: center;font-weight: 400;color: #ffffff;line-height: 40px;font-size: 15px;height: 40px;background: linear-gradient(180deg,#e9483c, #e55068);border-radius: 58px;">可点击查看应急电话列表</div>
								<div>
									<div style="position: relative;height: 62px;width: 30px;border-left: 1px dashed white;border-bottom: 1px dashed white;float: right;margin-right: 69px;">
										<div style="position: absolute;bottom: -4px;right: -8px;width: 7px;height: 7px;border-radius: 5px;background-color: #ffffff"></div>
									</div>
								</div>
							</div>`,
            buttons: [{
              action() {
                return this.next();
              },
              text: '<div style="font-size: 15px;font-weight: 500;text-align: center;color: #ffffff;line-height: 11px;">我知道了</div>'
            }],
            id: 'stop44',
            classPrefix: 'my-tour4-',
          });
          tour.addStep({
            attachTo: {element: document.getElementById("stop5"), on: 'top'},
            text: `<div>
								<div style="text-align: center;font-weight: 400;color: #ffffff;line-height: 40px;font-size: 15px;height: 40px;background: linear-gradient(180deg,#e9483c, #e55068);border-radius: 58px;">可点击查看您的专属二维码和健康码信息</div>
								<div>
									<div style="position: relative;margin-left: 30px;height: 62px;width: 30px;border-left: 1px dashed white;border-bottom: 1px dashed white;float: right;margin-right: 69px;">
										<div style="position: absolute;bottom: -4px;right: -8px;width: 7px;height: 7px;border-radius: 5px;background-color: #ffffff"></div>
									</div>
								</div>
							</div>`,
            buttons: [
              {
                action() {
                  $this.hh = 0;
                  sessionStorage.removeItem('ISFIRSTLOGIN')
                  $this.$router.replace({path:"/guest-home", query:{openId: $this.user.wxOpenId}})
                  return this.next();
                },
                text: '<div style="font-size: 15px;font-weight: 500;text-align: center;color: #ffffff;line-height: 11px;">我知道了</div>'
              }
            ],
            id: 'stop55',
            classPrefix: 'my-tour5-',
          });
          tour.start();
        });
    },
    clickCallShow(index) {
      this.zIndex = !index
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

body .shepherd-element {
  background: transparent;
}

.shepherd-theme-custom {
  background: transparent;
}

#stop11 {
  background: transparent !important;
}

</style>
