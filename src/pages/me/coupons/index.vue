<template>
    <ui-main>
        <div class="coupon-container">
            <div>
                <div class="bg-top">
                    <div class="bg-icon rules" @click="toRule">
                        <div class="title">详细规则</div>
                    </div>
                    <div class="bg-icon head-title">
                        <img class="bg-icon title-15" src="./images/bgImg-title-15th.png" alt="">
                    </div>
                    <div class="bg-icon line-start">
                        <div class="bgIcon-start">
                            <img class="bg-icon left-top-6" src="./images/bgIcon-top-7.png" alt="">
                            <img class="star" src="./images/bgIcon-start.png" alt="">
                        </div>
                    </div>
                    <div class="bg-icon mini-title">
                        <div class="mtContent">旅游新使命 · 健康新生活</div>
                    </div>
                </div>
                <div class="bg-bottom">
                    <!--<div class="wave"></div>-->
                    <img class="wave" src="./images/wave.png" alt="">

                    <div class="couponlist-container">
                        <div class="couponItem" v-for="(item,index) in couponList" :key="index">
                            <div class="coupon">
                                <div class="price">
                                    <div class="flex price-top">
                                        <div class="type">¥</div>
                                        <div class="number">10</div>
                                    </div>
                                    <div class="price-bottom">
                                        满100可用
                                    </div>
                                </div>
                                <div class="content flex col-center row-between">
                                    <div class="c-top flex flex-column col-center row-between">
                                        <div class="name">特产通用劵</div>
                                        <div class="time">有效期至2020年8月30日</div>
                                    </div>
                                    <div v-if="index!==1" class="c-bottom flex flex-column col-center row-between">
                                        <div class="deduction flex col-center"  v-if="index!==1">
                                            <img class="Icon_checked" src="./images/icon_check.png" alt="">
                                            <div class="desc">自动抵扣</div>
                                        </div>
                                        <div v-if="index==1" class="optionBtn flex row-center col-center">领取</div>
                                        <div v-else class="optionBtn active flex row-center col-center">已领取</div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
    export default {
        name: "list",
        data(){
            return{
                couponList:[
                    {
                        id:1,
                    },
                    {
                        id:2,
                    },
                    {
                        id:3,
                    }
                ]
            }
        },
        methods:{
            toRule(){
                this.$router.push({path:'./coupons/couponRule'})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .coupon-container{
        width: 100%;
        min-height: 100vh;
        background: linear-gradient(134deg,#ff4700 18%, #ffd170 91%);
    }
    .bg-top{
        width: 100%;
        height: 336px;
        overflow: hidden;
        position: absolute;
        -webkit-background-size: cover;
        background-size: cover;
        background-image: url('./images/bg-banner.png');
        .left-top-l{
            width: 109px;
            height: 86px;
            .left-top-1{
                left: -13px;
                top: -5px;
            }
            .left-top-2{
                left: 49px;
                top: 57px;
            }
        }
        .left-top-c{
            .left-top-3{
                left: 127px;
                top: 12px;
                width: 9px;
                height: 8px;
            }
        }
        .rules{
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
        .head-title{
            top:61px;
            width: 100%;
            height: 336px;
            /*background: linear-gradient(134deg,#ff4700 18%, #ffd170 91%);*/
            display: flex;
            justify-content: center;
            .title-15{
                max-width: 450px;
                width: 80%;
                height: auto;
            }
        }
        .line-start{
            top:146px;
            width: 100%;
            height: 30px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .bgIcon-start{
                width: 210px;
                height:25px;
                position: relative;
                .left-top-6{
                    left: 10px;
                    bottom: 9px;
                    width: 18px;
                    height: 23px;
                }
                .star{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .mini-title{
            top:168px;
            margin:0 auto;
            width: 100%;
            .mtContent{
                margin:0 auto;
                height: 16px;
                font-size: 16px;
                font-family: SourceHanSansCN, SourceHanSansCN-Bold;
                font-weight: 700;
                text-align: center;
                color: #fffbed;
                line-height: 24px;
                text-shadow:2px 2px 2px #fa7921;
            }
        }
        .bgImg-house{
            z-index: 0;
            width: 100%;
            height: 318px;
            position: absolute;
            top: 158px;
            background-size: cover;
            background-position: 0px -40px;
            background-image: url('./images/bgIcon_house.png');
        }
    }
    .bg-bottom{
        z-index: 9999 !important;
        position: absolute;
        top: 336px;
        width: 100%;
        min-height: 435px;
        background: linear-gradient(180deg,#ffbd50 0%, #ffa436 59%);
        box-shadow: 0px -10px 25px 10px #ffa436;
        .wave{
            position: absolute;
            top: -44px;
            width: 100%;
            height: 44px;
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
    }
    .couponlist-container{
        .couponItem{
            z-index: 9999;
            width: 100%;
            max-width: 550px;
            margin: 0 auto;
            min-height: 102px;
            height: 127px;
            background-size: cover;
            background-image: url('./images/bg-coupons.png');
            display: flex;
            align-items: center;
            .coupon{
                padding: 24px 30px;
                display: flex;
                max-height: 77px;
                /*background: pink;*/
                display: flex;
                align-items: center;
                .price{
                    min-width: 67px;
                    max-width: 80px;
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
                            font-size: 16px;
                            font-family: SourceHanSansCN, SourceHanSansCN-Heavy;
                            font-weight: 800;
                            text-align: left;
                            color: #ff5140;
                            line-height: 24px;
                        }
                        .number{
                            font-size: 25px;
                            font-family: SourceHanSansCN, SourceHanSansCN-Heavy;
                            font-weight: 800;
                            text-align: left;
                            color: #ff5140;
                            line-height: 30px;
                        }
                    }
                    .price-bottom{
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
                    padding: 0px 10px;
                    align-items: center;
                    height: 100%;
                    .c-top{
                        height: 100%;
                        justify-content: space-between;
                        .name{
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

                    .c-bottom{
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
                            margin-top: 10px;
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
                        }
                        .active{
                            opacity: 0.4;
                            background: #ff5140;
                        }
                    }
                }
            }
        }
    }
    .bg-icon{
        position: absolute;
    }
</style>

