<template>
    <ui-main>
        <div class="coupons-rule-container">
            <div class="content">
                <div class="bg-top">
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
                    <div class="rules-box">
                        <div class="rules">
                            <div class="ruleItem">
                                <div class="titleBtn">
                                    <div class="flex col-center">
                                        <img src="./images/Icon-titleLeft.png" alt="">
                                        <div class="titleText">参与对象</div>
                                        <img src="./images/Icon-titleLeft.png" alt="">
                                    </div>
                                </div>
                                <div class="rContent">
                                    第十五届贵州旅游产业发展大会所有参会嘉宾，不包括志愿者、会务组工作人员和新闻媒体工作者。
                                </div>
                            </div>
                            <div class="ruleItem">
                                <div class="titleBtn">
                                    <div class="flex col-center">
                                        <img src="./images/Icon-titleLeft.png" alt="">
                                        <div class="titleText">活动时间</div>
                                        <img src="./images/Icon-titleLeft.png" alt="">
                                    </div>
                                </div>
                                <div class="rContent">
                                    <div class="text-center">惠民券领取时间：</div>
                                    <div class="text-center time">2020年9月20日00:00至2020年9月22日23:59</div>
                                    <!--<div class="text-center">活动期间均可领取消费券</div>-->
                                    <div class="text-center">惠民券使用时间：</div>
                                    <div class="text-center time">2020年9月20日00:00至2020年10月31日23:59
                                    </div>
                                </div>
                            </div>
                            <div class="ruleItem">
                                <div class="titleBtn">
                                    <div class="flex col-center">
                                        <img src="./images/Icon-titleLeft.png" alt="">
                                        <div class="titleText">使用规则</div>
                                        <img src="./images/Icon-titleLeft.png" alt="">
                                    </div>
                                </div>
                                <div class="rContent">
                                    <div class="rule-use">
                                        1.有效期使用时间内嘉宾可正常使用惠民券，逾期自动作废。
                                    </div>
                                    <div class="rule-use">
                                        2.惠民券分为3种面值，分别为10元、20元、20元，共计50元。
                                    </div>
                                    <div class="rule-use">
                                        3.惠民券一经使用，系统即将该券标记为“已使用”状态。<p class="noticeText">惠民券不能兑换现金，不得转让</p>。
                                    </div>
                                    <div class="rule-use">
                                        4.嘉宾若发生退货行为，其消费过程中使用的惠民券依然标记为“已使用”，不能再次使用;退款金额为消费者实际支付金额，不含惠民券扣减部分。
                                    </div>
                                    <div class="rule-use">
                                        5.因系统故障、电力或通讯中断、网络异常等不可抗拒因素导致惠民券无法使用时，请立即联系会务组工作人员。
                                    </div>
                                </div>
                            </div>
                            <div class="ruleItem">
                                <div class="titleBtn">
                                    <div class="flex col-center">
                                        <img src="./images/Icon-titleLeft.png" alt="">
                                        <div class="titleText">适用范围</div>
                                        <img src="./images/Icon-titleLeft.png" alt="">
                                    </div>
                                </div>
                                <!--<div class="table-box">-->
                                    <!--<table class="flex flex-column">-->
                                        <!--<tr class="flex header">-->
                                            <!--&lt;!&ndash;<td><div class="content">&ndash;&gt;-->
                                                <!--&lt;!&ndash;序号&ndash;&gt;-->
                                            <!--&lt;!&ndash;</div><div class="right-line"></div></td>&ndash;&gt;-->
                                            <!--<td>序号</td>-->
                                            <!--<td class="merchant">商户名</td>-->
                                            <!--<td>导航</td>-->
                                        <!--</tr>-->
                                        <!--<tr class="flex tcontent" :class="index%2===0?'deepBg':'lightBg'" v-for="(item,index) in 3" :key="index">-->
                                            <!--<td>0{{index+1}}</td>-->
                                            <!--<td class="merchant">商户名</td>-->
                                            <!--<td @click="navigateToShop">-->
                                                <!--<img class="Icon_navigator" src="./images/navbar.png" alt="">-->
                                            <!--</td>-->
                                        <!--</tr>-->
                                    <!--</table>-->
                                <!--</div>-->
                                <div class="rContent">
                                    <div class="rule-use">
                                        1.一码游贵州平台“旅发专区”所有商品。
                                    </div>
                                    <div class="rule-use">
                                        2.第十五届贵州旅游产业发展大会特色旅游商品博览馆、“多彩贵州”美食汇、盘州全域旅游集散中心参会商家展出的所有商品。
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ui-main>
</template>

<script>
    export default {
        name: "couponRule",
        data(){
            return{
                ruleList:[
                    {
                        name:'参与对象'
                    },
                    {
                        name:'name'
                    }
                ]
            }
        },
        methods:{
            navigateToShop(){
                window.location.href='http://api.map.baidu.com/geocoder?location=39.990912172420714,116.32715863448607&coord_type=gcj02&output=html&src=webapp.baidu.openAPIdemo'
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "./index.scss";
.coupons-rule-container{
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    background: #ffa436;
}
.bg-bottom{
    background: linear-gradient(135deg,#ffc357 13%, #ffa436 59%);
    box-shadow: 0px 12px 25px 0px rgba(255,221,151,0.85) inset;
    min-height: 600px;
    padding-bottom: 50px;
}
.rules-box{
    flex:1;
    position: relative;
    display: flex;
    min-height: 10px;
    margin:0 20px;
    /*background: #eee;*/
    .rules{
        flex:1;
        display: flex;
        flex-direction: column;
        /*background: pink;*/
        .ruleItem{
            /*background: #26a2ff;*/
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-bottom: 28px;
            width: 100%;
            .rItem{
                width: 100%;
            }
            .titleBtn{
                width: 131px;
                min-height: 30px;
                background: linear-gradient(109deg,#fff469 9%, #ffe538 93%);
                border-radius: 15px;
                box-shadow: 0px 3px 3px 0px #f99123;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
                img{
                    width: 12px;
                    height: 10px;
                }
                .titleText{
                    font-size: 16px;
                    font-family: SourceHanSansCN, SourceHanSansCN-Medium;
                    font-weight: 500;
                    text-align: center;
                    color: #a1590a;
                    line-height: 24px;
                }
            }
            .rContent{
                width: 100%;
                display: flex;
                flex-direction: column;
                min-height: 80px;
                padding: 20px 20px;
                background: #ffffff;
                border-radius: 11px;
                box-shadow: 0px 2px 15px 0px #ff8c00, 0px 1px 18px 0px #ffd6a4 inset;
                font-size: 14px;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
                text-align: left;
                color: #a1590a;
                line-height: 20px;
                .rule-use{
                    margin-bottom: 15px;
                }
                .time{
                    font-weight: 600;
                    color: #f45a30;
                    margin-bottom: 4px;
                }
                .rule-use{
                    p{
                        margin: 0;
                        display: initial;
                    }
                    .noticeText{
                        color: #f45a30;
                    }
                }
            }

        }
    }
}
.table-box{
    width: 100%;
    border-radius: 3px;
    overflow: hidden;
    .header{
        height: 41px;
        background: #db7700;
        display: flex;
        align-items: center;
        td{
            font-size: 14px;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            text-align: left;
            color: rgba(255,255,255,0.85);
            line-height: 21px;
        }
    }
    td{
        height: 100%;
        display: flex;
        align-items: center;
    }
    td:first-child{
        width: 50px;
        text-align: center;
        border-right: 1px solid #e8e8e8;
        justify-content: center;
    }
    td:nth-child(2){
        padding: 0 20px;
        flex:1;
        border-right: 1px solid #e8e8e8;
    }
    td:last-child{
        width: 70px;
        text-align: center;
        justify-content: center;
    }
    .merchant{
        flex:1;
    }
    .right-line{
        width: 1px;
        height: 37px;
        opacity: 0.5;
        background: #e8e8e8;
    }
    .tcontent{
        /*min-height: 38px;*/
        td{
            min-height: 38px;
            font-size: 14px;
            line-height: 21px;
        }
    }
    .lightBg{
        background: #ffffff;
    }
    .deepBg{
        background: #fff9f1;
    }
    .Icon_navigator{
        width: 21px;
        heighr:17px;
    }
}
</style>
