<template>
    <nut-drag
        @click.native="click"
        :attract="true"
        class="my-code"
        :class="isShowCode ? 'big' : 'mini'" :style="'z-index:'+zIndex1 +'!important'">
        <div class="code-content">
            <div class="code">
                <div class="close-icon" v-if="isShowCode" @click.stop="closeCode">
                    <img src="./image/icons_Popup_close@2x.png" alt="关闭" />
                </div>
				<div v-if="isShowCode" style="position: relative;width: 100%;height: 32rem;">
					<img style="position: absolute;z-index: 3;top: 0;left: 0;height: 14.9rem;" v-if="this.index==1" src="./image/codebg1.png" alt=""/>
					<img style="position: absolute;z-index: 3;top: 0;left: 0;height: 14.9rem;" v-if="this.index==2" src="./image/codebg2.png" alt=""/>
					<img style="position: absolute;z-index: 3;top: 0;left: 0;height: 14.9rem;" v-if="this.index==3" src="./image/codebg3.png" alt=""/>
					<div style="position: absolute;top: 0;z-index: 4;width:100%;padding: 0.9375rem;">
						<div style="font-size: 1.5rem;margin-top: 0.9375rem;font-weight: 600;text-align: center;color: #ffffff;line-height: 2.0625rem;letter-spacing: 0.125rem;">健康状态：{{state}}</div>
						<div style="width: 100%;font-size: 1rem;margin-top: 0.9375rem;font-weight: 400;text-align: center;color: #ffffff;line-height: 1.375rem;letter-spacing: 0.0625rem;">{{user.realName}}</div>
						<div v-if="index==2" style="width: 15.25rem;margin: 0.4375rem auto;font-size: 1rem;font-weight: 400;text-align: left;color: #ffffff;line-height: 1.5rem;height: 5.6rem;">您好！为了您的健康安全和疫情防控需要，请您实行居家隔离医学观察,<br/><p style="color:red;margin: 0;">持有健康绿码且体温低于37.3℃的嘉宾方可参会。</p></div>
						<div v-if="index==3" style="width: 15.25rem;margin: 0.4375rem auto;font-size: 1rem;font-weight: 400;text-align: left;color: #ffffff;line-height: 1.5rem;height: 5.6rem;">您好！为了您的健康安全和疫情防控需要，请您到指定的集中隔离医学观察点，实行集中隔离,<br/><p style="color:red;margin: 0;">持有健康绿码且体温低于37.3℃的嘉宾方可参会。</p></div>
						<div v-if="index==1" style="width: 15.25rem;margin: 0.4375rem auto;font-size: 1rem;font-weight: 400;text-align: center;color: #ffffff;line-height: 1.5rem;height: 5.6rem;">防控疫情，人人有责，<br/> 请您继续做好个人防护,<br/><p style="color:red;margin: 0;">持有健康绿码且体温低于37.3℃的嘉宾方可参会。</p></div>
						<div style="border-top: 0.0625rem dashed #ffffff;padding-top: 0.4375rem;font-size: 1rem;font-weight: 400;text-align: center;color: #ffffff;line-height: 1.375rem;">
              {{ healthData.codeDate }}</div>
					</div>
					<div style="height: 13.5rem;"/>
					<div style="margin: 1.9375rem 0.625rem 0 0.625rem;background-color: #F6F6F9;padding: 0.625rem 0.75rem;">
						<div style="overflow: auto;zoom: 1;">
							<div style="float: left;font-size: 15px;font-weight: 300;color: #595b64;line-height: 1.375rem;">姓名</div>
							<div style="float: right;font-size: 15px;font-weight: 400;color: #292a2c;line-height: 1.375rem;">{{user.realName}}</div>
						</div>
						<div style="overflow: auto;zoom: 1;margin-top: 0.2rem;" v-if="user.duty">
							<div style="float: left;font-size: 15px;font-weight: 300;color: #595b64;line-height: 1.375rem;">职务</div>
							<div style="float: right;font-size: 15px;font-weight: 400;color: #292a2c;line-height: 1.375rem;">{{user.duty}}</div>
						</div>
					</div>
					<img style="width: 10rem;height: 10rem;margin-top: 0.625rem;" :src="url" />
					<div style="font-size: 16px;font-weight: 500;text-align: center;color: #e01414;line-height: 1.375rem;letter-spacing: -0.0625rem;">专属二维码</div>
				</div>
				<div v-else>
					<img style="width: 2rem;" src="./image/mini-code.png" />
				</div>
          </div>
        </div>
        <div v-if="!isShowCode" style="text-align: center;margin-top: 0.1875rem;">
        	<div style="font-size: 0.5rem;line-height: 0.5rem;">专属</div>
            <div style="font-size: 0.5rem;">二维码</div>
        </div>
    </nut-drag>
</template>

<script>
	import journeyAPI from "@/api/journey";
    import QRCode from 'qrcode'
    const user = JSON.parse(localStorage.user)
    export default {
        name: "qrcode",
		props:{
            zIndex:{
                type:Number,
			}
		},
		watch:{
      zIndex:{
          handler(newValue, _){
          this.zIndex1 = newValue
        },
        deep:true
      }
		},
        data(){
            return{
              url:'',
              isShowCode: false,
              index: 1,
              codebg:'./image/codebg1.png',
              user:user,
              state:'正常',
              isClick: user && user.phoneNo ? 1:0,
              healthData:"",
                zIndex1:333,
            }
        },
        mounted(){
            let joinCode = user && user.joinCode?user.joinCode:'数据错误';
            QRCode.toDataURL(joinCode,{width:180,qzone:0,margin:1})
                .then(url => {
                    this.url = url
                }).catch(err => {
                    this.$toast("二维码错误");
                })
        },
        methods:{
			getHealthCode(){
				let params = {phone:user.phoneNo,userId:user.id}
				journeyAPI.healthCode(params).then(res => {
				  console.log(res)
          let data = this.healthData = res.data
          if(data.color=="green"){
            this.index = 1
            this.state = '正常'
          }else if(data.color=="orange"){
            this.index = 2
            this.state = '居家隔离'
          }else if(data.color=="red"){
            this.index = 3
            this.state = '集中隔离'
          }
        })
			},
      click() {
				if (this.isClick) {
          this.getHealthCode()
					this.isShowCode = true;
				}else{
					this.$toast("获取二维码数据异常");
				}
            },
            closeCode(ev) {
                this.isShowCode = false;
            },
        }
    }
</script>
<style lang="scss" scoped>
	.my-code{
		z-index: 9999 !important;
	}
    // 二维码部分
    .my-code.mini {
        right: 2%;
        bottom: 21%;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0px 2px 9px 0px rgba(199, 0, 11, 0.16);
        padding: 0.4rem 0.3rem 0.4rem 0.3rem;
		width: 3.757rem;
		height: 4.2rem;
        .code-content {
            display: flex;
            justify-content: center;
            align-items: center;
            .code {
                width: 2rem;
                height: 2rem;
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
            background-color: rgba(0, 0, 0, 0.40);
            text-align: center;
            .code {
                position: absolute;
                top: 35%;
                left: 50%;
                transform: translate(-50%, -30%);
                background-color: #fff;
                width: 78%;
				border-radius: 9px;
				z-index: 40000 !important;
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
            }
        }
    }
</style>
