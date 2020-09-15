<template>
    <ui-main>
        <div class="coupons-rule-container">
            <div class="content">
                <div class="bg-top">
                    <div class="bg-icon rulesTag" @click="toRule">
                        <div class="title">详细规则</div>
                    </div>
                    <div class="flex head-title">
                        <img class=" title-15" src="./images/bgImg-title-15th.png" fit="cover" alt="">
                    </div>
                    <div class="flex row-center">
                        <img class="star" src="./images/bgIcon-start.png" alt="">
                    </div>
                    <div class=" mini-title">
                        <div class="mtContent">旅游新使命 · 健康新生活</div>
                    </div>
                </div>
                <div class="bg-bottom">
                    <div class="wave">
                        <img src="./images/wave.png" alt="">
                    </div>
                    <div class="coupon-box">
                        <van-pull-refresh v-model="reloading" @refresh="onRefresh">
                            <van-list v-model="loading" :finished="finished" @load="onLoad">
                                <div class="couponItem" v-for="(item,index) in couponList" :key="index">
                                    <!--<img class="couponBgImg" :src="couponBgImg" alt="">-->
                                    <div class="coupon">
                                        <div class="price">
                                            <div class="flex price-top">
                                                <div class="type">¥</div>
                                                <div class="number">{{item.denomination}}</div>
                                            </div>
                                            <div class="price-bottom">
                                                满{{item.purchase}}可用
                                            </div>
                                        </div>
                                        <div class="content flex col-center row-between">
                                            <div class="c-left flex flex-column col-center row-between">
                                                <div class="name">{{item.couponTitle}}</div>
                                                <div class="time">{{item.usePeriod}}</div>
                                            </div>
                                            <!--1 未领取 2 已领取 3 已消费-->
                                            <div v-if="item.userState!==3" class="c-right deductionOption flex flex-column">
                                                <div class="deduction flex col-center" v-if="item.userState==1">
                                                    <img class="Icon_checked" src="./images/icon_check.png" alt="">
                                                    <div class="desc">自动抵扣</div>
                                                </div>
                                                <div v-if="item.userState==1" class="optionBtn flex row-center col-center" @click="handleCoupon(item.stockId)">领取</div>
                                                <div v-else class="optionBtn active flex row-center col-center">已领取</div>
                                            </div>
                                            <div v-else class="c-right received-box">
                                                <div class="receivedImg">
                                                    <img class="Icon_checked" src="./images/icon_used.png" alt="">
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </van-list>
                        </van-pull-refresh>

                    </div>
                    <div class="bg-icon left-bottom-l">
                        <!--<img class="left-bottom-1" src="./images/bgIcon-bottom-1.png" alt="">-->
                    </div>
                    <div class="bg-icon left-bottom-r"></div>
                </div>
            </div>
        </div>
    </ui-main>
</template>

<script>
    import memberApi from '@/api/member.js'
    export default {
        name: "coupons",
        data(){
            return{
                couponBgImg:require('./images/bg-coupons.png'),
                couponList:[],
                loading:false,
                finished:false,
                reloading:false,
                user:JSON.parse(localStorage.user)
            }
        },
        methods:{
            toRule(){
                this.$router.push({path:'./coupons/couponRule'})
            },
            onLoad() {//滚动加载
                // setTimeout(() => {
                //     for (let i = 0; i < 3; i++) {
                //         this.couponList.push(this.couponList.length + 1);
                //     }
                //     this.loading = false;
                //
                //     if (this.couponList.length >=10) {
                //         this.finished = true;
                //     }
                // }, 1000);
                this.getCouponList()

            },
            onRefresh(){//下拉刷新
                this.reloading = false;
                this.getCouponList()

            },
            getCouponList(){
                this.couponList =[]
                memberApi.getCouponList({userId:this.user.id}).then(res =>{
                    if(res.data&&res.data.length){
                        this.couponList = res.data
                        this.loading = false;
                        this.finished = true;
                        this.$refs.uiPull.endSuccess()
                    }else{
                        this.loading = false;
                        this.finished = true;
                    }
                })
            },
            handleCoupon(stockId){
                memberApi.useCoupon({stockId:stockId,userId:this.user.id}).then(res =>{
                    this.getCouponList()
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "./index.scss";
    .coupons-rule-container{
        width: 100%;
        min-height: 306px;
        overflow: hidden;
        background: papayawhip;
    }
    .rulesTag{
        top:30px;
        right: 0;
        width: 92px;
        height: 30px;
        background: linear-gradient(109deg,#fff469 9%, #ffe538 93%);
        border-radius: 15px 0px 0px 15px;
        box-shadow: 0px 3px 3px 0px #f99123;
        display: flex;
        justify-content: center;
        align-items: center;
        .title{
            font-size: 16px;
            font-family: SourceHanSansCN, SourceHanSansCN-Medium;
            font-weight: 500;
            text-align: center;
            color: #a1590a;
            line-height: 24px;
        }
    }
    .bg-bottom{
        background: linear-gradient(180deg,#ffbe51 13%, #ffa436 59%);
        min-height: 300px;
        padding-bottom: 50px;
    }
    .coupon-box{
        flex:1;
        position: relative;
        display: flex;
        min-height: 10px;
        flex-direction: column;
        /*background: #eee;*/

    }
    .couponItem{
        z-index: 9999;
        width: 100%;
        max-width: 370px;
        margin: 0 auto;
        min-height: 92px;
        max-height: 120px;
        height: 6.5rem;
        background-size: cover;
        background-image: url('./images/bg-coupons.png');
        display: flex;
        align-items: center;
        padding: 0px;
        position: relative;
        background-repeat: round;
        overflow: hidden;
        .coupon{
            padding: 10px 15px;
            display: -webkit-box;
            display: flex;
            max-height: 77px;
            -webkit-box-align: center;
            align-items: center;
            margin: 0 auto;
            width: 100%;
            height: 66%;
            .price{
                z-index: 999;
                /*min-width: 67px;*/
                /*max-width: 80px;*/
                width: 27%;
                height: 100%;
                border-right:1px dashed #d5d9fa;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .price-top{
                    /*height: 21px;*/
                    align-items: flex-end;
                    .type{
                        /*width: 14px;*/
                        /*height: 14px;*/
                        font-size: 16px;
                        font-family: SourceHanSansCN, SourceHanSansCN-Heavy;
                        font-weight: 800;
                        text-align: left;
                        color: #ff5140;
                        line-height: 24px;
                    }
                    .number{
                        /*width: 31px;*/
                        /*height: 21px;*/
                        font-size: 25px;
                        font-family: SourceHanSansCN, SourceHanSansCN-Heavy;
                        font-weight: 800;
                        text-align: left;
                        color: #ff5140;
                        line-height: 30px;
                    }
                }
                .price-bottom{
                    /*width: 62px;*/
                    /*height: 17px;*/
                    font-size: 13px;
                    font-family: PingFangSC, PingFangSC-Regular;
                    font-weight: 400;
                    text-align: center;
                    color: #ff5140;
                    line-height: 26px;
                }
            }
            .content{
                flex:1;
                padding: 0 0 0 10px;
                align-items: center;
                background: #fff;
                /*justify-content: center;*/
                height: 100%;
                .c-left{
                    flex:1;
                    height: 100%;
                    justify-content: space-between;
                    .name{
                        /*width: 147px;*/
                        height: 31px;
                        font-size: 16px;
                        font-family: SourceHanSansCN, SourceHanSansCN-Heavy;
                        font-weight: 800;
                        text-align: left;
                        color: #333333;
                        line-height: 24px;
                    }
                    .time{
                        /*width: 157px;*/
                        /*height: 17px;*/
                        font-size: 13px;
                        font-family: PingFangSC, PingFangSC-Regular;
                        font-weight: 400;
                        text-align: left;
                        color: #9f9f9f;
                        line-height: 16px;
                    }
                }

                .c-right{
                    /*flex:1;*/
                    /*background: #26a2ff;*/
                    .deduction{
                        /*width: 60px;*/
                        .Icon_checked{
                            width: 12px;
                            height: 12px;
                            margin-right:2px;
                        }
                        .desc{
                            font-size: 11px;
                            font-family: PingFangSC, PingFangSC-Regular;
                            font-weight: 400;
                            text-align: left;
                            color: #9f9f9f;
                            line-height: 15px;
                        }
                    }
                    .optionBtn{
                        margin-top: 6px;
                        width: 67px;
                        height: 23px;
                        background: #ff5140;
                        border-radius: 13px;
                        font-size: 13px;
                        font-family: PingFangSC, PingFangSC-Regular;
                        font-weight: 400;
                        text-align: center;
                        color: #ffffff;
                        line-height: 16px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .active{
                        opacity: 0.4;
                        background: #ff5140;
                    }
                }
                .deductionOption{
                    width: 70px;
                    justify-content: center;
                    align-items: flex-end;
                    margin-right: 10px;
                }
            }
        }
    }
    .received-box{
        display: flex;
        width: 70px;
        height: 100%;
        position: relative;
    }
    .receivedImg{
        flex:1;
        position:absolute;
        top:-16px;
        right: -2px;
        .Icon_checked{
            width:62px;
            height: 69px;
        }
    }
    .left-bottom-l{
        z-index: -1;
        width: 292px;
        height: 298px;
        bottom: 14px;
        left: -100px;
        background-image: url("./images/bgIcon-bottom-1.png");
    }
    .left-bottom-r{
        z-index: -1;
        width: 220px;
        height: 215px;
        bottom: -100px;
        right: -110px;
        background-image: url("./images/bgIcon-bottom-2.png");
    }
</style>
