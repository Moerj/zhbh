<template>
    <nut-drag
        @click.native="click"
        :attract="true"
        class="my-code"
        :class="isShowCode ? 'big' : 'mini'">
        <div class="code-content">
            <div class="code">
                <div class="close-icon" v-if="isShowCode" @click.stop="closeCode">
                    <img src="./image/icons_Popup_close@2x.png" alt="关闭" />
                </div>
                <img v-if="isShowCode" style="width: 100%;height: 100%" :src="url" />
                <img v-else src="./image/mini-code.png" />
            </div>
        </div>
        <div v-if="!isShowCode" style="font-size: 8px;text-align: center">
            我的专属
            <br/>
            二维码
        </div>
    </nut-drag>
</template>

<script>
    import QRCode from 'qrcode'
    export default {
        name: "qrcode",
        data(){
            return{
                url:'',
                isShowCode: false,
            }
        },
        mounted(){
            let opengId = localStorage.getItem("openId")?localStorage.getItem("openId"):'数据错误';
            QRCode.toDataURL(opengId)
                .then(url => {
                    this.url = url
                }).catch(err => {
                    this.$toast("二维码错误");
                })
        },
        methods:{
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
    // 二维码部分
    .my-code.mini {
        right: 2%;
        bottom: 21%;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0px 2px 9px 0px rgba(199, 0, 11, 0.16);
        padding: 5px;
        .code-content {
            display: flex;
            justify-content: center;
            align-items: center;
            .code {
                width: 36px;
                height: 36px;
                img {
                    width: 100%;
                    vertical-align: middle;
                }
            }
        }
    }

    .my-code.big {
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
            text-align: center;
            .code {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -30%);
                background-color: #fff;
                width: 78%;
                padding: 32px;
                border-radius: 24px;
                img {
                    width: 100%;
                }
                .close-icon {
                    position: absolute;
                    top: -50px;
                    right: 20px;
                    width: 30px;
                    z-index: 10000 !important;
                }
            }
        }
    }
</style>
