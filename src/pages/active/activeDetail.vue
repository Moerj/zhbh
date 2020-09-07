<template>
  <ui-main>
    <template v-slot:header>
      <van-nav-bar fixed left-arrow @click-left="$root.back()"></van-nav-bar>
    </template>
    <div class="detail-container">
      <img style="width: 100%;min-height: 200px;" :src="detailInfo['coverPath']">
      <div class="main-card">
        <div class="card-content">
			<div style="font-size: 1.25rem;font-weight: 600;text-align: left;color: #292a2c;line-height: 1.75rem;">
				{{detailInfo.title}}
			</div>
			<div style="height: 4.7rem;background: #f6f6f9;padding: 0.9375rem 0.75rem;margin-top: 0.625rem;">
				<div>
				  <img src="./image/downtime@2x.png" style="width: 0.8125rem;position: relative;top: 2px;" alt="">
				  <span style="font-size: 0.9375rem;font-weight: 400;text-align: left;color: #9094a8;line-height: 1.25rem;letter-spacing: 1px;">报名截止时间:</span>
				  <span style="font-size: 0.9375rem;font-weight: 400;float: right;color: #292a2c;line-height: 1.25rem;">{{detailInfo['endTimeCN']}}</span>
				</div>
				<div style="margin-top: 0.3125rem">
				  <img src="./image/time@2x.png" style="width: 0.8125rem;position: relative;top: 2px;" alt="">
				  <span style="font-size: 0.9375rem;font-weight: 400;text-align: left;color: #9094a8;line-height: 1.25rem;letter-spacing: 1px;">活动时间:</span>
				  <span style="font-size: 0.9375rem;font-weight: 400;float: right;color: #292a2c;line-height: 1.25rem;">{{detailInfo['startTimeCN']}}-{{detailInfo['endTimeCN']}}</span>
				</div>
			</div>
        </div>
		<div class="fullwidth-content">
		  <div class="fullwidth-title">活动报名</div>
		  <div class="fullwidth-main">
		    <div>
		      <div style="border-bottom: 1px solid #d8d8d8;border-top: 1px solid #d8d8d8;margin: 0.625rem 0;">
		      	<van-tabs @click="onTabsClick" v-model="active" :ellipsis="false" title-active-color="#C7000B" class="tabs-cont" :line-height="2" :line-width="50">
		      		<van-tab v-for="(item,index) in detailInfo['dayArr']" :key="index" title-style="align-items: inherit;">
		      			<template #title>
		      				<div style="font-size: 0.625rem;text-align: center;">{{item['day']}}</div>
		      				<div style="font-size: 0.875rem;text-align: center;">{{item['dayWeek']}}</div>
		      			</template>
		      		</van-tab>
		      	</van-tabs>
		      </div>
			  <div class="list-group" v-if="list.length>0">
			    <div v-for="item in list" class="list-item">
			      <div class="item-left">
			        <div class="mingci">{{item['groupTitle']}}</div>
			        <div :class="item['hasJioned']===0?'baoming':item['hasJioned']===1?'greenbaoming':item['hasJioned']===3?'graybaoming':'graybaoming'" @click="joinActive(item)">报名</div>
			      </div>
			      <div class="item-right">
			        <div class="renshu">
			          <span>已报名：{{item['jionedNum']}}</span> | <span>截止人数：{{item['jionNum']}}</span>
			        </div>
			        <div class="jindu">
			          <van-progress color="#FD5542" :show-pivot="false" :percentage="(item['jionedNum']*(item['jionNum']/100))*100" />
			        </div>
			        <div class="time">
			          <img src="./image/time@2x.png" height="14" style="position: relative;top: 1px;" />
			          活动时间 {{item['groupStarttimeCN']}}-{{item['groupEndtimeCN']}}
			        </div>
			      </div>
			    </div>
			  </div>
		    </div>
		  </div>
		</div>
        <div class="fullwidth-content">
          <div class="fullwidth-title">活动详情</div>
          <div class="fullwidth-main">
            <div class="main-text">
              {{detailInfo.content}}
            </div>
          </div>
        </div>
        <div class="fullwidth-content">
          <div class="fullwidth-title">活动须知</div>
          <div class="fullwidth-main">
            <div class="main-text">
              {{detailInfo['actNotice']}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Qrcode/>
    <Call/>
  </ui-main>
</template>
<script>
import Qrcode from "@/components/Qrcode";
import journeyAPI from "@/api/journey";
import Call from "@/components/call";

export default {
  components: {
    Qrcode,Call
  },
  name: "Detail",
  data() {
    return {
      current: 0,
      currentData: "",
      detailInfo: {},
	  list:[],
	  active:0,
      user:JSON.parse(localStorage.user)
    };
  },
  mounted() {
      this.getDetailData();
  },
  methods: {
    //获取详情
    getDetailData() {
      journeyAPI.activeDetail({actId: this.$route.query['activeId'], userId:this.user.id}).then((res) => {
        if (res.errorCode==="00000"){
			console.log(res.data)
            this.detailInfo = res.data
			if(this.detailInfo['dayArr'].length>0){
				if (this.detailInfo['dayArr'][0].day){
					this.onTabsClick(this.detailInfo['dayArr'][0].day)
				}
			}
        }else{
            this.$toast(res.msg);
        }
      });
    },
	joinActive(item){
        console.log(item['hasJioned']);
        let index = 0;
		if (item['hasJioned'] === 0) {//报名活动
            journeyAPI.actgroupJoin({actGroupId: item.id, userId:this.user.id}).then((res) => {
                if (res.errorCode==="00000"){
                    console.log(res.data);
                    this.$toast('报名成功');
                    this.getDetailData()
                }else{
                    this.$toast(res.msg);
                }
            });
		} else if (index == 2) {//取消报名
            journeyAPI.activeCancel({userActId: ''}).then((res) => {
                if (res.errorCode==="00000"){
                    console.log(res.data)
					this.getDetailData()
                }else{
                    this.$toast(res.msg);
                }
            });
		}
	},
	onTabsClick(){
		console.log(this.detailInfo['dayArr'][this.active].day)
		let user= JSON.parse(localStorage.user)
		journeyAPI.actgroupInfo({actId: this.$route.query['activeId'], userId:user.id,actDate:this.detailInfo['dayArr'][this.active].day}).then((res) => {
		  if (res.errorCode==="00000"){
				console.log(res.data)
				this.list = res.data
		  }else{
				this.$toast(res.msg);
		  }
		});
	}
  },
};
</script>
<style lang="scss" scoped>
::v-deep .van-nav-bar {background-color: transparent;}
::v-deep.van-hairline--bottom::after {display: none;}

::v-deep .van-nav-bar .van-icon {color: #ffffff;}

.van-swipe-item {
  img {
    width: 100%;
    height: 100%;
  }
}

.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 32px;
  padding: 2px 5px;
  font-size: 11px;
  width: 40px;
  height: 20px;
  line-height: 16px;
  text-align: center;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 11px;
  color: #ffffff;
}

.main-card {
  // height: 300px;
  background-color: #f6f6f9;
  padding: 0 1rem;
  .card-content {
    margin: 0 -1rem;
    transform: translateY(-15px);
    // height: 300px;
    border-radius: 15px 15px 0px 0px;
    background-color: #fff;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
    padding: 1rem;
  }
}

.time-wrapper {
  .time-icon {
    width: 2.125rem;
    height: 2.125rem;
    background-color: #dc3b43;
    padding: 0.4375rem;
    img {
      width: 100%;
    }
  }
  .time-text {
    height: 2.125rem;
    line-height: 2.125rem;
    padding-left: 0.5rem;
    margin-left: 0.25rem;
    background: linear-gradient(90deg, #fee5dd, rgba(255, 255, 255, 0));
  }
}

.title-wrapper {
  margin-top: 1rem;
  p {
    margin: 0;
  }
  .title {
    font-size: 1.25rem;
    font-weight: 600;
  }
  .weather {
    img {
      height: 1.125rem;
      vertical-align: -1px;
    }
  }
}

.info-wrapper {
  background-color: #f7f9fe;
  padding: 10px;
  margin-top: 20px;
  .info-item {
    font-size: 15px;
    padding: 5px 0;
    box-sizing: content-box;
    position: relative;
    .tel {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
    .item-title {
      color: #595b64;
    }
    .black-text {
      color: #292a2c;
    }
    .red-text {
      color: #c7000b;
    }
  }
}

.code-wrapper {
  text-align: center;
  color: #353535;
  font-size: 0.875rem;
  padding: 0 28%;
  img {
    width: 100%;
  }
}

.fullwidth-content {
  margin: 0 -1rem;
  background-color: #fff;
  padding-top: 0.75rem;
  & + .fullwidth-content {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .fullwidth-title {
    font-size: 18px;
    font-weight: 600;
    color: #292a2c;
    line-height: 25px;
    position: relative;
    padding-left: 1rem;
    &::before {
      content: "";
      position: absolute;
      top: 15%;
      left: 0;
      width: 4px;
      height: 70%;
      background-color: #c7000b;
      border-radius: 2px;
    }
  }
  .fullwidth-main {
    .main-img,
    .main-text {
      padding: 0.75rem 1rem;
      color: #9094a8;
      position: relative;
    }
    .main-img {
      .title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #292a2c;
        margin-top: 2rem;
      }
      .subtitle {
        font-size: 1rem;
        color: #595b64;
        padding-bottom: 1rem;
      }
      .text {
        font-size: 1.25rem;
        color: #fff;
        border-radius: 50%;
        width: 3.875rem;
        height: 3.875rem;
        background-color: #c7000b;
        text-align: center;
        line-height: 3.875rem;
      }
      img {
        width: 8.125rem;
      }
    }
  }
}
.list-group{
	padding-bottom: 10px;
}
.list-item {
	margin: 0 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 103px;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
}

.list-item + .list-item {
  margin-top: 16px;
}

.item-left {
  width: 25%;
  padding: 12px 0;
  text-align: center;
  border-right: 1px solid #e5e6ea;
}

.mingci {
  height: 22px;
  font-size: 18px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 600;
  text-align: center;
  color: #2e3032;
  line-height: 22px;
}

.baoming {
  width: 50px;
  height: 25px;
  margin: 4px auto;
  background: #c7000b;
  border-radius: 4px;
  line-height: 25px;
  font-size: 15px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: center;
  color: #ffffff;
  letter-spacing: 0px;
}

.graybaoming {
  background: #f3f4f8;
  color: #c4c6cf;
}
.greenbaoming {
  background: #22b938;
}

.item-right {
	width: 60%;
  padding-left: 20px;
  box-sizing: border-box;
}

.renshu {
  display: inline-block;
  height: 17px;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  color: #292a2c;
  line-height: 17px;
  letter-spacing: 1px;
}

.time {
  height: 20px;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  color: #9094a8;
  line-height: 20px;
  letter-spacing: 1px;
}
.time img {
  vertical-align: -1px;
}

.jindu {
  height: 4px;
  background: #f3f4f8;
  border-radius: 2px;
  margin: 8px 0;
  position: relative;
}
.jindu span {
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  background: #fd5542;
  border-radius: 2px;
}
</style>
