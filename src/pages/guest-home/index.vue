<template>
    <div>
        <ui-main>
            <template v-slot:header>
                <van-nav-bar title="旅发大会行程" fixed>
                </van-nav-bar>
                <div id="stop1">
                    <van-tabs
                        v-if="dateList && dateList.length>0"
                        class="tabs-cont"
                        v-model="active"
                        :line-height="0"
                        @click="onTabsClick">
                        <van-tab v-for="(v, i) of dateList" :title="v" :key="i"/>
                    </van-tabs>
                </div>
                <div style="background-color: #ffffff;border-top: 0.04rem solid #EBEBF1;" v-if="notices">
                    <div style="overflow: auto;zoom: 1;padding: 0.625rem 0.75rem 0 0.75rem;">
                        <div style="float: left;font-size: 1.125rem;font-weight: 600;text-align: left;color: #292a2c;line-height: 1.5625rem;">尊敬的{{user.realName}}欢迎您！</div>
                        <div style="float: right;font-size: 0.75rem;font-weight: 500;text-align: left;color: #c7000b;line-height: 1.0625rem;background: #fff3f3;border-radius: 0.3125rem;padding: 0.125rem 0.25rem;" @click="toNotic(tabCurrent)">
                            全部<img style="width: 0.5rem;height: 0.4375rem;" src="./image/notice.png" alt="">
                        </div>
                    </div>
                    <van-notice-bar background="#FFFFFF" color="#666666" left-icon="volume-o" :scrollable="false">
                        <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
                            <van-swipe-item v-for="notic in notices">{{ notic.title }}</van-swipe-item>
                        </van-swipe>
                    </van-notice-bar>
                </div>
                <div id="stop2">
                    <div class="title" @click="toDetailRoom(hotel.id)"><p v-if="hotel">我的酒店</p></div>
                    <div class="hotel-card" v-if="hotel">
                        <div class="hotel-name" @click="toDetailRoom(hotel.id)">{{ hotel.title }}</div>
                        <div class="hotel-info">
                            <div class="info-item flex row-between" @click.stop="$wxMap(hotel)">
                                <span>
                                    <span class="item-title" style="float: left">地址：</span>
                                    <span class="item-text  ellipsis-1">{{ hotel.address }}</span>
                                </span>
                                <span><img src="./image/right.svg"/></span>
                            </div>
                            <div class="info-item flex row-between">
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
            </template>
            <ui-pull
                @load="getDateList"
                v-model="list"
                :num.sync="query.pageNo"
                :total="total"
                ref="pull"
                v-show="dateList && dateList.length > 0">
                <div class="hotel-container">
                    <div class="subtitle flex row-left col-center">
                        <div class="peers-group">
                            <div>
				                <span :class="journeyActive == user.id ? 'active' : ''" @click="journeyHandle(user.id)">我的行程</span>
                                <span v-for="people in togPeople" :class="journeyActive == people.id ? 'active' : ''" @click="journeyHandle(people.id)">{{people['realName']}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="journey-container" v-if="journeyList">
                        <div class="journey-card" v-for="(item,index) in journeyList" :key="item.id" :id="index==0?'stop3':''" @click="toDetail(item)"
                             :class="item['activeState'] == 0? 'notstarted': item['activeState'] == 1? 'ongoing': 'finished'">
                            <div class="card-content">
                                <div class="card-title">
                                    <span>
                                      {{ item.startTime }}到{{ item.endTime }}
                                    </span>
                                    <span style="float: right" v-if="item['activeState'] == 1">进行中</span>
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
                                        <span><img src="./image/right.svg"/></span>
                                    </div>
                                    <div class="inner-item" v-if="item['tabNo']">
                                        <span>
                                            <span class="item-title">座位：</span>
                                            <span class="item-text">{{ item['tabNo'] + item['seatNo'] }} 座位</span>
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
            <Tabbar/>
            <van-overlay :show="showLoading">
                <div>
                    <van-loading type="spinner"/>
                </div>
            </van-overlay>
        </ui-main>
        <Qrcode id="stop5" v-if="zIndex"/>
        <Call id="stop4" @click-z-index="clickCallShow"/>
        <div v-if="hh>0" :style="'position: relative;top: 0;bottom: 0;left: 0;right: 0;z-index:9999;background: rgba(0,0,0,0.1);height:'+hh+'px'"/>
    </div>
</template>

<script>
    import Tabbar from "@/components/Tabbar";
    import Qrcode from "@/components/Qrcode";
    import Call from "@/components/call";
    import Empty from '@/components/empty'

    import journeyAPI from "@/api/journey";

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
            Empty
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
                hotel: "",
                zIndex: true,
                hh:0
            };
        },
        watch: {
          query: {
              immediate: true,
              deep: true,
              handler(newVal) {
              },
          },
        },
        computed: {
            param() {
                return {
                    userId: this.user.id,
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
            //
            this.getTogPeople();
            this.get_notices();
        },
        methods: {
            shepherd() {
                if (sessionStorage['ISFIRSTLOGIN']) {
                  console.log("新手引导")
                    this.hh = document.documentElement.clientHeight || document.body.clientHeight;
                    let $this = this;
                    this.$nextTick(() => {
                        const tour = this.$shepherd({
                            useModalOverlay: true,
                            cancelIcon: {
                                enabled: true
                            },
                            scrollTo: {behavior: 'smooth'}
                        });
                        tour.addStep({
                            attachTo: {element: document.getElementById("stop1"), on: 'bottom'},
                            text: '点击可查看对应日期查看日程',
                            buttons: [
                                {action() {return this.next();},text: '我知道了'}
                            ],
                        });
                        tour.addStep({
                            attachTo: {element: document.getElementById("stop2"), on: 'bottom'},
                            text: '这里会显示您当日将要居住的酒店的信息',
                            buttons: [
                                {action() {return this.back();},classes: 'shepherd-button-secondary',text: '上一步'},
                                {action() {
                                    return this.next();}, text: '我知道了'}
                            ],
                        });
                        tour.addStep({
                            attachTo: {element: document.getElementById("stop3"), on: 'top'},
                            text: '点击行程列表，可以查看行程详情',
                            buttons: [
                                {action() {
                                    return this.back();},classes: 'shepherd-button-secondary',text: '上一步'},
                                {action() {return this.next();}, text: '我知道了'}
                            ],
                        });
                        tour.addStep({
                            attachTo: {element: document.getElementById("stop4"), on: 'top'},
                            text: '可点击查看应急电话列表',
                            buttons: [
                                {action() {
                                    return this.back();},classes: 'shepherd-button-secondary',text: '上一步'},
                                {action() {
                                    return this.next();}, text: '我知道了'}
                            ],
                        });
                        tour.addStep({
                            attachTo: {element: document.getElementById("stop5"), on: 'top'},
                            text: '可点击查看您的专属二维码和健康码信息',
                            buttons: [
                                {action() {return this.back();},classes: 'shepherd-button-secondary',text: '上一步'},
                                {action() {
                                    console.log("完成了");
                                    $this.hh = 0;
                                    sessionStorage.removeItem('ISFIRSTLOGIN')
                                    return this.next();}, text: '我知道了'}
                            ],
                        });
                        tour.start();
                    });
                }
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
                    userId: this.user.id,
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
                });
            },
            onTabsClick() {
                this.$refs.pull.reload();
            },
            getDateList() {
                journeyAPI
                    .DateList({userId: this.user.id})
                    .then((res) => {
                        this.dates = res.list;
                        this.tabCurrent = res.list[this.active];
                        if (res.list && res.list.length > 0) {
                            const now = this.$dayjs().format('YYYY-MM-DD')
                            for (let i = 0; i<val.length; i++) {
                              let date = val[i]
                              let flag = this.$dayjs(now).isSameOrBefore(this.$dayjs(date))
                              if (flag) {
                                this.active = i
                                break
                              }
                            }
                            this.getMyJourney();
                            this.getHotal();
                        }
                    })
            },
            getTogPeople() {
                journeyAPI.togPeople({id: this.user.id}).then(res => {
                    this.togPeople = res.refUsers
                })
            },
            getMyJourney() {
                journeyAPI.myJourney(this.param)
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
            journeyHandle(id) {
                this.journeyActive = id;
                const param = {
                    userId: id,
                    date: this.tabCurrent,
                };
                journeyAPI
                    .myJourney(param)
                    .then((res) => {
                        this.journeyList = res.list;
                    })
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
