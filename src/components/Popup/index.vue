<template>
    <nut-drag
            @click.native="click"
            :attract="true"
            class="my-pupon"
            :class="isShowCode ? 'big' : 'mini'">

        <div class="code-content" >
            <div class="code">

                <div v-if="isShowCode" style="width: 100%;height: 100%">
                    <img class="puponImg" src="./pupon-50.png" alt="优惠券" @click.stop="openCoupons"/>
                    <div class="close-icon" v-if="isShowCode" @click.stop="closeCode">
                        <img src="./icon_close.png" alt="关闭" />
                    </div>
                </div>
                <img v-else style="width: 2rem;" :src="callImg" />
            </div>
        </div>
        <div v-if="!isShowCode" style="font-size: 0.5rem;text-align: center;margin-top: 0.25rem">
            消费券
        </div>
    </nut-drag>
</template>

<script>
    import journeyAPI from "@/api/journey";
    export default {
        name: "myPupon",
        data(){
            return{
                callImg: require('./icon_pupon.png'),
                url:'',
                isShowCode: false,
                list:[]
            }
        },
        mounted(){
            this.getCallList()
        },
        methods:{
            getCallList(){
                journeyAPI.getCallData().then(res => {
                    this.list = []
                })
            },
            click() {
                this.$emit('click-z-index',true)
                this.isShowCode = true;
            },
            closeCode(ev) {
                this.$emit('click-z-index',false)
                this.isShowCode = false;
            },
            openCoupons(){
                // this.closeCode();
                console.log('optionCoupon>>>>>====')
                this.$emit('optionCoupon',true)
                this.$router.push({path:'/me/coupons'})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .my-pupon.mini {
        right: 2%;
        bottom: 10%;
        border-radius: 5px ;
        background-color: #fff;
        box-shadow: 0px 2px 9px 0px rgba(199, 0, 11, 0.16);
        z-index: 4 !important;
        padding: 0.4rem 0.3rem 0.4rem 0.3rem;
        width: 3.757rem;
        height: 3.75rem;
        .code-content {
            display: flex;
            justify-content: center;
            align-items: center;
            .code {
                width: 31px;
                height: 22px;
                .puponImg{
                    width: 358px;
                    height: 343px;
                    margin-left: 25px;
                }
                .close-icon {
                    /* position: absolute; */
                    /* top: -54px; */
                    /* right: 20px; */
                    width: 30px;
                    z-index: 4 !important;
                    margin:10px auto 0;
                }
                img {
                    width: 100%;
                    vertical-align: middle;
                }
            }
        }
    }

    .my-pupon.big {
        position: relative !important;
        .code-content {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
            margin: auto;
            background-color: rgba(0, 0, 0, 0.40);
            .code {
                position: absolute;
                top: 50%;
                margin-top: -90px;
                left: 50%;
                transform: translate(-50%, -30%);
                background-color: transparent;
                width: 100%;
                border-radius: 10px;
                .puponImg{
                    width: 358px;
                    height: 343px;
                    margin-left: 25px;
                }
                img {
                    width: 100%;
                }
                .close-icon {
                    width: 30px;
                    z-index: 4 !important;
                    margin:10px auto 0;
                }
                .call-item{
                    margin: 0 1.25rem;padding: 15px 0
                }
            }
        }
    }
</style>
