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
                    @click="onTabsClick">
                <van-tab v-for="(v, i) of dateList" :title="v" :key="i" />
            </van-tabs>
        </div>
	  <div style="background-color: #ffffff;border-top: 0.04rem solid #EBEBF1;" v-if="notices">
	    <div style="overflow: auto;zoom: 1;padding: 0.625rem 0.75rem 0 0.75rem;">
	  	<div style="float: left;font-size: 1.125rem;font-weight: 600;text-align: left;color: #292a2c;line-height: 1.5625rem;">尊敬的{{user.realName}}欢迎您！</div>
	  	<div style="float: right;font-size: 0.75rem;font-weight: 500;text-align: left;color: #c7000b;line-height: 1.0625rem;background: #fff3f3;border-radius: 0.3125rem;padding: 0.125rem 0.25rem;" @click="toNotic(tabCurrent)">全部<img style="width: 0.5rem;height: 0.4375rem;" src="./image/notice.png" alt=""></div>
	    </div>
	    <van-notice-bar background="#FFFFFF" color="#666666" left-icon="volume-o" :scrollable="false">
	  	<van-swipe vertical  class="notice-swipe" :autoplay="3000" :show-indicators="false" >
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
      ref="pull"
      v-show="dateList && dateList.length > 0">
      <div class="hotel-container">
          <div :id="hotel?'stop2':''">
              <div class="title" @click="toDetailRoom(hotel.id)"> <p v-if="hotel">我的酒店</p></div>
              <div class="hotel-card" v-if="hotel">
                  <div class="hotel-name" @click="toDetailRoom(hotel.id)" >{{ hotel.title }}</div>
                  <div class="hotel-info">
                <div class="info-item flex row-between" @click="$wxMap(hotel)">
                  <span>
                    <span class="item-title" style="float: left">地点：</span>
                    <span class="item-text  ellipsis-1">{{ hotel.address }}</span>
                  </span>
                  <span><img src="./image/right.svg"/></span>
                </div>
                <div class="info-item flex row-between" @click="toDetailRoom(hotel.id)" >
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
			<div class="subtitle flex row-left col-center" :style="hotel?'':'margin-top:10px'">
			  <div class="peers-group">
				<div>
				  <span
					:class="journeyActive == user.id ? 'active' : ''"
					@click="()=>{journeyActive = user.id; getList()}"
					>我的行程</span>
				  <span v-for="people in togPeople"
					:class="journeyActive == people.id ? 'active' : ''"
					@click="()=>{journeyActive = people.id; getList()}"
					>{{people['realName']}}</span>

				</div>
			  </div>
			</div>
			<div class="journey-container" v-if="journeyList">
			  <div class="journey-card" v-for="(item,index) in journeyList" :id="journeyList.length>0 && index==0?'stop3':''" :key="item.id" @click="toDetail(item)"
				:class="item['activeState'] == 0? 'notstarted': item['activeState'] == 1? 'ongoing': 'finished'">
				<div class="card-content">
				  <div class="card-title">
					<span>
					  {{ item.startTime }}到{{ item.endTime }}
					</span>
					<span style="float: right" v-if="item['activeState'] == 1">
					  进行中
					</span>
				  </div>
				  <div class="card-inner">
					<div class="signin-cont" v-if="item['activeState'] == 2">
					  <img src="./image/signedin.png" alt="已签到" v-if="item.schState == 0"/>
					  <img src="./image/nosignin.png" alt="未签到" v-else/>
					</div>
					<div class="inner-title">{{ item.title }}</div>
					<div class="inner-item flex row-between">
					  <span>
						<span class="item-title" style="float: left">地址：</span>
						<span class="item-text ellipsis-1">{{ item['place'] }}</span>
					  </span>
					</div>
					<div class="inner-item" v-if="item['tabNo'] || item['seatNo']">
					  <span>

						<span class="item-title">{{ item.schType=='2' ? "桌号/座位":"座位"}}：</span>
						<span class="item-text" v-if="item.schType == '2'">{{(item['tabNo']? item['tabNo']+'桌':'') + (item['seatNo']? item['seatNo']+'座':'')}} </span>
						<span class="item-text" v-else>{{(item['tabNo']? item['tabNo']:'') + (item['seatNo']? item['seatNo']+'座':'')}} </span>
					  </span>
					</div>
            <div class="inner-item" style="width: 100%" v-if="item.volunteerPhone">
              <div style="width: 100%">
                <span class="item-title">志愿者电话：</span>
                <span class="item-text-phone">{{item.volunteerPhone}}</span>
                <span style="position: relative;right: 0;float: right"><img src="./image/phone.svg"/></span>
              </div>
            </div>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</ui-pull>
    <Empty :textShow="false" :list="journeyList"/>
		<!-- 106.681549,26.558844 -->
		<!-- <CoordPicker
		  :show.sync="showMap"
		  apiKey=""
		  lng.sync="106.681549"
		  lat.sync="26.558844"
		  address.sync="花果园M区"
		/> -->
		<Tabbar />
		<van-overlay :show="showLoading">
		  <div>
			<van-loading type="spinner" />
		  </div>
		</van-overlay>
	  </ui-main>
      <Qrcode id="stop5" v-if="zIndex"/>
	  <Call id="stop4" @click-z-index="clickCallShow" />
        <div v-if="hh>0" :style="'position: relative;top: 0;bottom: 0;left: 0;right: 0;z-index:9999;background: transfer;height:'+hh+'px'"/>
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
      hotel:"",
      zIndex:true,
        hh:0,
    };
  },
  watch: {
    query: {
      immediate: true,
      deep: true,
      handler(newVal) {},
    },
    dates: function() {
      this.getList()
    },
    active: function() {

    }
  },
  computed: {
    param() {
      return {
        userId: this.journeyActive,
        date: this.tabCurrent}
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
    //
    this.getTogPeople();
    this.get_notices();

  },
  methods: {

    getList () {
      if (!this.dates || !this.dates.length>0) {
        this.getDateList()
        return
      }
      this.tabCurrent = this.dates[this.active]
      this.getMyJourney();
      this.getHotal();

    },
      shepherd() {
          console.log("新手引导",sessionStorage['ISFIRSTLOGIN'])
          if (sessionStorage['ISFIRSTLOGIN']) {
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
                          {action() {return this.next();},text: '<div style="font-size: 15px;font-weight: 500;text-align: center;color: #ffffff;line-height: 11px;">我知道了</div>'}
                      ],
                      defaultStepOptions: {
                          classes: 'shepherd-theme-custom'
                      },
                      classPrefix: 'my-tour1-',
                      id:'stop11'
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
                          buttons: [{action() {return this.next();}, text: '<div style="font-size: 15px;font-weight: 500;text-align: center;color: #ffffff;line-height: 11px;">我知道了</div>'}],
                          id:'stop22',
						  classPrefix: 'my-tour2-',
                      });
                  }

                  if ($this.journeyList.length>0){
                      tour.addStep({
                          attachTo: {element: document.getElementById("stop3"), on: 'top'},
                          text: `<div>
								<div style="text-align: center;font-weight: 400;color: #ffffff;line-height: 40px;font-size: 15px;height: 40px;background: linear-gradient(180deg,#e9483c, #e55068);border-radius: 58px;">点击行程列表，可以查看行程详情</div>
								<div>
									<div style="margin-left: 30px;height: 62px;width: 1px;border-left: 1px dashed white"></div>
									<div style="margin-left: 27px;width: 7px;height: 7px;border-radius: 5px;background-color: #ffffff"></div>
								</div>
							</div>`,
                          buttons: [{action() {return this.next();}, text: '<div style="font-size: 15px;font-weight: 500;text-align: center;color: #ffffff;line-height: 11px;">我知道了</div>'}],
                          id:'stop33',
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
                      buttons: [{action() {return this.next();}, text: '<div style="font-size: 15px;font-weight: 500;text-align: center;color: #ffffff;line-height: 11px;">我知道了</div>'}],
                      id:'stop44',
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
                          {action() {
                                  $this.hh = 0;
                                  sessionStorage.removeItem('ISFIRSTLOGIN')
                                  return this.next();}, text: '<div style="font-size: 15px;font-weight: 500;text-align: center;color: #ffffff;line-height: 11px;">我知道了</div>'}
                      ],
                      id:'stop55',
                      classPrefix: 'my-tour5-',
                  });
                  tour.start();
              });
          }
      },
    get_notices() {
      const date = new Date();
      const day =  date.getFullYear()+"-" + (date.getMonth()+1) + "-" + date.getDate();
      journeyAPI.notices({todayDate : day}).then((res)=> {
        this.notices = res.data
      })
    },
      clickCallShow(index){
          this.zIndex = !index
      },
    toNotic () {
      this.$router.push({
        path: '/notice/',
      });
    },
    getHotal() {
      const param = {
          userId: this.journeyActive,
          liveDate: this.tabCurrent}
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
    toDetailRoom(id){
      this.$router.push({
        path: '/guest-home/jiudian',
        query: {
          userHotelId : id
        }
      })
    },
    onTabsClick() {
      this.$refs.pull.reload();
    },
    getDateList() {
      journeyAPI
        .DateList({userId : this.user.id})
        .then((res) => {
          if (res.list) {

            const now = this.$dayjs().format('YYYY-MM-DD')
            for (let i = 0; i<res.list.datelist.length; i++) {
              let date = res.list[i]
              let flag = this.$dayjs(now).isSameOrBefore(this.$dayjs(date))
              if (flag) {
                this.active = i
                break
              }
            }
            this.dates = res.list.datelistFull;
          }
        })
    },
    getTogPeople () {
      journeyAPI.togPeople({id : this.user.id}).then(res => {
        this.togPeople = res.refUsers
      })
    },
    getMyJourney() {
      journeyAPI
        .myJourney(this.param)
        .then((res) => {
          this.journeyList = res.list;
          this.$refs.pull.endSuccess();
            this.shepherd()
        })
        .catch((err) => {
          this.$refs.pull.endSuccess();
        });
    },
    async toDetail(data) {
      let currentData = data; // 当前点击的行程
      const urls = { "1":"huiyi", "2":"canting", "4":"huodong"}
      let subFix = urls[data.schType]
      if (data.schType == 3) {
        await journeyAPI.schduleInfo({usId: data.usId}).then((res)=> {
          const carUrls = {"1": "zhuanche", "2": "bashi"}
          subFix = carUrls[res.data]
        })
      }
      this.$router.push({
        path: '/guest-home/'+subFix,
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
body .shepherd-element{
	background: transparent;
}
	.shepherd-theme-custom{
		background: transparent;
	}
	#stop11{
		background: transparent !important;
	}

</style>
