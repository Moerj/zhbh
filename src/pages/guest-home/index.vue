<template>
  <ui-main>
    <template v-slot:header>
      <van-nav-bar title="嘉宾首页" fixed>
      </van-nav-bar>
      <van-tabs
        class="tabs-cont"
        v-model="active"
        :line-height="0"
        @click="onTabsClick"
      >
        <van-tab v-for="(v, i) of dateList" :title="v" :key="i" />
      </van-tabs>
    </template>
    <ui-pull
      @load="getDateList"
      v-model="list"
      :num.sync="query.pageNo"
      :total="total"
      ref="pull"
    >
      <div class="hotel-container">
        <div class="title">我的酒店</div>
        <div class="hotel-card">
          <div class="hotel-name" @click="toDetailRoom">天怡豪生大酒店</div>
          <div class="hotel-info">
            <div class="info-item flex row-between" @click.stop="showMapHandle">
              <span>
                <span class="item-title">地址：</span>
                <span class="item-text">六盘水</span>
              </span>
              <span><img src="./image/right.svg"/></span>
            </div>
            <div class="info-item flex row-between">
              <span>
                <span class="item-title">房间：</span>
                <span class="item-text">A座8楼8002</span>
              </span>
            </div>
            <div class="info-item flex row-between">
              <a class="tel" href="tel:13678391637"></a>
              <span>
                <span class="item-title">联系电话：</span>
                <span class="item-text text-phone">13678391637</span>
              </span>
              <span><img src="./image/phone.svg"/></span>
            </div>
          </div>
        </div>

        <div class="subtitle flex row-left col-center">
          <div class="peers-group">
            <div>
              <span
                :class="journeyActive == user.id ? 'active' : ''"
                @click="journeyHandle(user.id)"
                >我的行程</span
              >
              <span v-for="people in togPeople"
                :class="journeyActive == people.id ? 'active' : ''"
                @click="journeyHandle(people.id)"
                >{{people['realName']}}</span
              >

            </div>
          </div>
        </div>
        <div class="journey-container">
          <div class="journey-card" v-for="item in journeyList" :key="item.id"
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
                <div @click="toDetail(item)" class="signin-cont" v-if="item['activeState'] == 2">
                  <img src="./image/signedin.png" alt="已签到" v-if="item.schState == 0"/>
                  <img src="./image/nosignin.png" alt="未签到" v-else/>
                </div>
                <div @click="toDetail(item)" class="inner-title">{{ item.title }}</div>
                <div @click="toDetail(item)" class="inner-item flex row-between">
                  <span>
                    <span class="item-title">地址：</span>
                    <span class="item-text">{{ item['place'] }}</span>
                  </span>
                  <span><img src="./image/right.svg"/></span>
                </div>
                <div @click="toDetail(item)" class="inner-item" v-if="item['tabNo']">
                  <span>
                    <span class="item-title">座位：</span>
                    <span class="item-text">{{ item['tabNo'] + item['seatNo'] }} 座位</span>
                  </span>
                </div>
                <a class="tel"  :href="'tel:'+ item.chargerPhone">
                  <div class="inner-item" style="width: 100%">
                    <div style="width: 100%">
                      <span class="item-title">志愿者电话：</span>
                      <span class="item-text-phone">{{item.chargerPhone}}</span>
                      <span style="position: relative;right: 0;float: right"><img src="./image/phone.svg"/></span>
                    </div>
                  </div>
                </a>
              </div>
          </div>
        </div>

          <!--观摩测试数据-->
<!--        <div class="journey-card notstarted" v-if="tabCurrent === '2020-08-27'">-->
<!--          <div class="card-content">-->
<!--            <div class="card-title">-->
<!--                <span>-->
<!--                  15.00到16.00-->
<!--                </span>-->
<!--            </div>-->
<!--            &lt;!&ndash;观摩测试数据&ndash;&gt;-->
<!--            <div class="card-inner">-->
<!--              <div @click="toDetail({schType: 4})" class="inner-title">野玉海景区观摩</div>-->
<!--              <div @click="toDetail({schType: 4})" class="inner-item flex row-between">-->
<!--                  <span>-->
<!--                    <span class="item-title">地址：</span>-->
<!--                    <span class="item-text">水城县S212玉舍镇海平村</span>-->
<!--                  </span>-->
<!--                <span><img src="./image/right.svg"/></span>-->
<!--              </div>-->
<!--              <a class="tel" :href="'tel:'+ item.chargerPhone">-->
<!--                <div class="inner-item" style="width: 100%">-->
<!--                  <div style="width: 100%">-->
<!--                    <span class="item-title">志愿者电话：</span>-->
<!--                    <span class="item-text-phone">{{item.chargerPhone}}</span>-->
<!--                    <span style="position: relative;right: 0;float: right"><img src="./image/phone.svg"/></span>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </a>-->
<!--            </div>-->
<!--          </div>-->
<!--          </div>-->
        </div>
      </div>
    </ui-pull>

    <Qrcode/>
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
</template>

<script>
import Tabbar from "@/components/Tabbar";
import Qrcode from "@/components/Qrcode";

import journeyAPI from "@/api/journey.js";

// import "coord-picker/dist/coord-picker.css";
// import { CoordPicker } from "coord-picker";

function getQuery() {
  return {
    shop: [],
    pageNo: 1,
    pageSize: 0,
  };
}
export default {
  name: "GuesetHome",
  components: {
    Tabbar,
     Qrcode,
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      active: 0,
      tabCurrent: "",
      dates: [],
      query: getQuery(),
      list: [],
      total: null,
      isShowCode: false,
      journeyList: "",
      togPeople: [],
      showMap: false,
      showLoading: false,
      journeyActive: 0,
    };
  },
  watch: {
    query: {
      immediate: true,
      deep: true,
      handler(newVal) {},
    },
  },
  computed: {
    dateList() {
      const dates = this.dates.map((item) => {
        let items = item.split("-");
        return `${items[1]}月${items[2]}日`;
      });
      return dates;
    },
  },
  mounted() {
    //获取传过来的openid
    //this.$route.query.openId
    localStorage.setItem("openId", "1234567890");
    this.getTogPeople ()
  },
  methods: {
    toDetailRoom(){
        this.$router.push({name: 'jiudian'});
    },
    onTabsClick() {
      this.$refs.pull.reload();
    },
    getDateList() {
      journeyAPI
        .DateList()
        .then((res) => {
          this.dates = res.list;
          this.tabCurrent = res.list[this.active];
          this.getMyJourney();
        })
    },
    getTogPeople () {
      journeyAPI.togPeople({id : this.user.id}).then(res => {
        this.togPeople = res.refUsers
      })
    },
    getMyJourney() {
      const param = {
        userId: this.user.id,
        date: this.tabCurrent,
      };
      journeyAPI
        .myJourney(param)
        .then((res) => {
          this.journeyList = res.list;
          this.$refs.pull.endSuccess();
        })
        .catch((err) => {
          this.$refs.pull.endSuccess();
        });
    },
    toDetail(data) {
      let currentData = data; // 当前点击的行程
      let urls = { "1":"huiyi", "2":"canting", "3":"bashi", "4":"huodong"}
      console.log(data)
      if (data.schType == 3) {
        journeyAPI.schduleInfo({usId: data.userId})
      }
      let subFix = urls[data.schType]
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
</style>
