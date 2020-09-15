<template>
    <ui-main>

        <div class="feed-container">
            <!--<Empty :textShow="false" :list="feedbackList"/>-->
            <div class="empty w-100 flex row-center col-center" v-if="feedbackList.length==0" style="padding-top: 101px;">
                <img :src="emptyIcon" width="173px" height="149px" alt="" fit="cover">
            </div>
            <ui-pull @load="getFeedList" v-model="feedbackList" ref="pull">
                <div class="feed-box" v-if="feedbackList&&feedbackList.length>0">
                    <div class="feedItem" v-for="(item,index) in feedbackList" :key="index">
                        <div class="f-item flex flex-column">
                            <div class="f-head flex row-between">
                                <div>反馈内容</div>
                                <div>{{item.createTime}}</div>
                            </div>
                            <div class="f-content">
                                <div class="content-me">
                                    <div class="text-content">
                                        {{item.optionContent}}
                                        <div class="img-content" v-if="item.optionImages.length">
                                            <div class="flex">
                                                <!--<van-uploader v-model="item.optionImages" multiple :max-count="5" />-->
                                                <div class="cImg"  v-for="(cImg,cIndex) in item.optionImages" :key="cIndex">
                                                    <img :src="cImg" :preview="index" width="54px" height="54px" alt="" fit="cover">
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="content-customer" v-if="item.replyName&&item.replyContent">
                                        <div class="f-head flex row-between">
                                            <div>{{item.replyName}}</div>
                                            <div>{{item.replyDate}}</div>
                                        </div>
                                        <div class="text-content">
                                            {{item.replyContent}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ui-pull>
        </div>
        <template #footer>
            <div class="feedbackBtn">
                <van-button round @click="toFeedback">
                    我要反馈
                </van-button>
            </div>
        </template>
    </ui-main>
</template>

<script>
    import Empty from '../../../components/empty'
    import memberAPI from "@/api/member.js";
    export default {
        name: "list",
        components:{
            Empty
        },
        data(){
            return {
                emptyIcon: require("../empty_feedbak.png"),
                feedbackList:[],
                user:JSON.parse(localStorage.user)
            }
        },
        mounted(){
            this.feedbackList = []
            console.log(this.feedbackList.length)
            this.getFeedList();
        },
        methods:{
            toFeedback(){
                this.$router.push({path:'/me/feedback/submit'})
            },
            getFeedList(){
                memberAPI.getFeedbackList({userId:this.user.id}).then(res =>{
                    this.$refs.pull.endSuccess();
                    // console.log(res)
                    res.data.map(item =>{
                        // console.log(item.optionImgs.join(','))
                        // if(item.optionImgs.lengt)
                        item.optionImages = item.optionImgs.split(',')

                    })
                    console.log(res.data)
                    this.feedbackList = res.data
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .feed-box{
        width: 100%;
        padding-bottom: 12px;
        .feedItem{
            margin-top: 10px;
            background: #ffffff;
            min-height: 100px;
            .f-item{
                padding: 15px;
                .f-head{
                    /*width: 56px;*/
                    /*height: 22px;*/
                    font-size: 14px;
                    font-family: PingFangSC, PingFangSC-Regular;
                    font-weight: 400;
                    text-align: left;
                    color: #9094a8;
                    line-height: 22px;
                }
            }
        }
    }
    .f-content{
        .text-content{
            padding: 10px 0;
            font-size: 16px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: justify;
            color: #292a2c;
            line-height: 24px;
        }
        .img-content{
            margin-top: 10px;
            .cImg{
                width: 54px;
                height: 54px;
                margin-right: 10px;
                border-radius: 8px;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .content-customer{
            margin-top: 15px;
            padding: 15px;
            min-height: 100px;
            background: #f6f6f9;
        }
    }
    .feedbackBtn {
        width: 100%;
        padding: 10px 15px;
        background-color: #fff;
        button {
        width: 100%;
        height: 45px;
        background: #c7000b;

        &.van-button--disabled {
             background: lightgray !important;
             color: black !important;
         }
        &:not(.van-button--disabled) {
             color: #fff !important;
         }
        }
    }
</style>
