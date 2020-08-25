<template>
  <ui-main>
    <template v-slot:header>
      <van-nav-bar title="嘉宾首页" fixed>
        <div slot="left" @click="$root.back()">
          <van-icon name="cross" size="1rem"></van-icon>
        </div>
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
          <div class="hotel-name">天怡豪生大酒店</div>
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
                :class="journeyActive == 0 ? 'active' : ''"
                @click="journeyHandle(0)"
                >我的行程</span
              >
              <span
                :class="journeyActive == 1 ? 'active' : ''"
                @click="journeyHandle(1)"
                >同行人员</span
              >
              <span
                :class="journeyActive == 2 ? 'active' : ''"
                @click="journeyHandle(2)"
                >同行人员</span
              >
              <span
                :class="journeyActive == 3 ? 'active' : ''"
                @click="journeyHandle(3)"
                >同行人员</span
              >
              <span
                :class="journeyActive == 4 ? 'active' : ''"
                @click="journeyHandle(4)"
                >同行人员</span
              >
              <span
                :class="journeyActive == 5 ? 'active' : ''"
                @click="journeyHandle(5)"
                >同行人员</span
              >
            </div>
          </div>
        </div>
        <div class="journey-container">
          <div
            class="journey-card"
            v-for="item in journeyList"
            :key="item.id"
            :class="
              item.activeState == 0
                ? 'notstarted'
                : item.activeState == 1
                ? 'ongoing'
                : 'finished'
            "
          >
            <div class="card-content">
              <div class="card-title">
                <span>
                  {{ item.scheduleDate }}
                  {{ item.startTime }}到{{ item.endTime }}
                </span>
                <span style="float: right;">
                  {{
                    item.activeState == 0
                      ? "未开始"
                      : item.activeState == 1
                      ? "已开始"
                      : "已结束"
                  }}
                </span>
              </div>
              <div class="card-inner" @click="toDetail(item)">
                <div class="signin-cont">
                  <img
                    src="./image/signedin.png"
                    alt="已签到"
                    v-if="item.schState == 0"
                  />
                  <img
                    src="./image/nosignin.png"
                    alt="未签到"
                    v-if="item.schState == 1"
                  />
                </div>
                <div class="inner-title">{{ item.title }}</div>
                <div class="inner-item flex row-between">
                  <span>
                    <span class="item-title">地址：</span>
                    <span class="item-text">{{ item.place }}</span>
                  </span>
                  <span><img src="./image/right.svg"/></span>
                </div>
                <div class="inner-item" v-if="item.tabNo">
                  <span>
                    <span class="item-title">座位：</span>
                    <span class="item-text">{{ item.tabNo }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="journey-card notstarted">
            <div class="card-content">
              <div class="card-title">
                <span>2020-12-12 12:00到14:00</span>
              </div>
              <div class="card-inner">
                <div class="signin-cont">
                  <img src="./image/nosignin.png" alt="未签到" />
                </div>
                <div class="inner-title">会议名称</div>
                <div class="inner-item flex row-between">
                  <span>
                    <span class="item-title">地址：</span>
                    <span class="item-text">六盘水旅游文化会议中心</span>
                  </span>
                  <span><img src="./image/right.svg"/></span>
                </div>
                <div class="inner-item">
                  <span>
                    <span class="item-title">座位：</span>
                    <span class="item-text">3排27号</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="journey-card ongoing">
            <div class="card-content">
              <div class="card-title flex row-between">
                <span>2020-12-12 12:00到14:00</span>
                <span>进行中</span>
              </div>
              <div class="card-inner">
                <div class="inner-title">会议名称</div>
                <div class="inner-item flex row-between">
                  <span>
                    <span class="item-title">地址：</span>
                    <span class="item-text">六盘水旅游文化会议中心</span>
                  </span>
                  <span><img src="./image/right.svg"/></span>
                </div>
                <div class="inner-item">
                  <span>
                    <span class="item-title">座位：</span>
                    <span class="item-text">3排27号</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="journey-card finished">
            <div class="card-content">
              <div class="card-title">2020-12-12 12:00到14:00</div>
              <div class="card-inner">
                <div class="inner-title">会议名称</div>
                <div class="inner-item flex row-between">
                  <span>
                    <span class="item-title">地址：</span>
                    <span class="item-text">六盘水旅游文化会议中心</span>
                  </span>
                  <span><img src="./image/right.svg"/></span>
                </div>
                <div class="inner-item">
                  <span>
                    <span class="item-title">座位：</span>
                    <span class="item-text">3排27号</span>
                  </span>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </ui-pull>

    <nut-drag
      @click.native="click"
      :attract="true"
      class="my-code"
      :class="isShowCode ? 'big' : 'mini'"
    >
      <div class="code-content">
        <div class="code">
          <div class="close-icon" v-if="isShowCode" @click.stop="closeCode">
            <img src="./image/icons_Popup_close@2x.png" alt="关闭" />
          </div>
          <img v-if="isShowCode" src="./image/big-code.png" />
          <img v-else src="./image/mini-code.png" />
        </div>
      </div>
    </nut-drag>
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
    // CoordPicker,
  },
  data() {
    return {
      active: 0,
      tabCurrent: "",
      dates: [],
      query: getQuery(),
      list: [],
      total: null,
      isShowCode: false,

      journeyList: "",

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
  methods: {
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
        .catch((err) => {
          this.$toast(err);
        });
    },
    getMyJourney() {
      const user = JSON.parse(localStorage.getItem("user"));
      const param = {
        userId: user.id,
        date: this.tabCurrent,
      };
      journeyAPI
        .myJourney(param)
        .then((res) => {
          this.journeyList = res.list;
          this.$refs.pull.endSuccess();
        })
        .catch((err) => {
          this.$toast(err);
          this.$refs.pull.endSuccess();
        });
    },
    toDetail(data) {
      let currentData = data; // 当前点击的行程

      this.$router.push({
        path: "/guest-home/detail",
        query: {
          currentData: currentData, // 添加详情所需要的数据
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
    journeyHandle(index) {
      this.journeyActive = index;
      // TODO 调用行程接口获取数据
      this.$refs.pull.reload();
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
