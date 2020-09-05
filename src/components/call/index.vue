<template>
    <nut-drag
        @click.native="click"
        :attract="true"
        class="my-call"
        :class="isShowCode ? 'big' : 'mini'">
        <div class="code-content" >
            <div class="code" v-if="list && list.length">
                <div class="close-icon" v-if="isShowCode" @click.stop="closeCode">
                    <img src="./image/icons_Popup_close@2x.png" alt="关闭" />
                </div>
                <div v-if="isShowCode" style="width: 100%;height: 100%">
                    <div style="height: 43px;background: #c7000b;line-height: 43px;color: #ffffff;border-radius: 10px 10px 0px 0px;text-align: center;">应急电话列表</div>
                    <div style="max-height: 320px;overflow: scroll;padding-bottom: 10px">
                        <div class="call-item" v-for="(item,index) in list" :style="index==list.length?'border-bottom: 1px solid #D9D9D9;':'border-bottom: 1px solid #FFFFFF;'">
                            <div style="font-size: 1rem;font-family: PingFangSC, PingFangSC-Medium;font-weight: 500;text-align: left;color: #2e3032;line-height: 1.375rem;">{{item.title}}</div>
                            <div style="margin-top: 0.3125rem">
                                <a class="tel" :href="'tel:'+item.phone">
                                  <span>
                                      <span style="font-size: 0.9375rem;font-family: PingFangSC, PingFangSC-Light;font-weight: 300;text-align: left;color: #595b64;line-height: 1.3125rem;">联系电话：</span>
                                      <span style="font-size: 0.9375rem;font-family: PingFangSC, PingFangSC-Light;font-weight: 400;text-align: left;color: #c7000b;line-height: 1.3125rem;">{{item.phone}}</span>
                                  </span>
                                  <span style="float: right"><img src="./image/phone.svg"/></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <img v-else style="width: 2rem;" src="./image/call.png" />
            </div>
        </div>
        <div v-if="!isShowCode" style="font-size: 0.5rem;text-align: center;margin-top: 0.25rem">
            应急电话
        </div>
    </nut-drag>
</template>

<script>
    import journeyAPI from "@/api/journey";
    import empty from '@/components/empty'
    export default {
        name: "qrcode",
        data(){
            return{
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
                    this.list = res.data
                })
            },
            click() {
                this.isShowCode = true;
            },
            closeCode(ev) {
                this.isShowCode = false;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .my-call.mini {
        right: 2%;
        bottom: 10%;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0px 2px 9px 0px rgba(199, 0, 11, 0.16);
		padding: 0.4rem 0.3rem 0.4rem 0.3rem;
		width: 3.757rem;
		height: 3.75rem;
        .code-content {
            display: flex;
            justify-content: center;
            align-items: center;
            .code {
                width: 30px;
                height: 30px;
                img {
                    width: 100%;
                    vertical-align: middle;
                }
            }
        }
    }

    .my-call.big {
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
            background-color: rgba(0, 0, 0, 0.16);
            .code {
                position: absolute;
                top: 50%;
                margin-top: -90px;
                left: 50%;
                transform: translate(-50%, -30%);
                background-color: #fff;
                width: 78%;
                border-radius: 10px;
                img {
                    width: 100%;
                }
                .close-icon {
                    position: absolute;
                    top: -54px;
                    right: 20px;
                    width: 30px;
                    z-index: 10000 !important;
                }
				.call-item{
					margin: 0 1.25rem;padding: 15px 0
				}
            }
        }
    }
</style>
