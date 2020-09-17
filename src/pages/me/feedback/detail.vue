<template>
    <ui-main>
        <div>
            <div class="subForm">
                <van-field
                        v-model="feedContent"
                        rows="6"
                        label=""
                        type="textarea"
                        maxlength="200"
                        placeholder="请填写意见描述以便我们提供更好的帮助"
                        show-word-limit
                >
                </van-field>
                <div class="upload-img" style="padding:0 0 4px;height: 92px;align-items: flex-end">
                    <div class="img-box" v-for="(item,index) in fileList" :key="index" @click="checkView(fileList,index)">
                        <img class="close-icon" src="./icon_delete.png" @click.stop="deleteImg(index)"/>
                        <img class="image" :src="item">
                    </div>
                    <van-uploader :after-read="handleUpload" accept="image/*" style="margin-bottom: 0" :max-size="10 * 1024 * 1024" @oversize="onOversize" :max-count="5" v-if="fileList.length<5">
                    </van-uploader>
                </div>
                <div class="flex optionBar" style="height: 65px;border-top: 1px solid #ccc">
                    <div class="submitBtn" :style="{background: izCanSubmit?'#c7000b':'#ccc'}"  @click="onSubmit()">
                        确认提交
                    </div>
                </div>
            </div>
        </div>
    </ui-main>
</template>

<script>
    import memberAPI from "@/api/member.js";
    import vue from "../../../main";
    import mixin from "../../../mixins/mixin";
    import Vue from 'vue'
    import { ImagePreview } from 'vant';
    Vue.use(ImagePreview);
    export default {
        name: "detail",
        mixins:[mixin],
        data(){
            return{
                feedContent:'',
                fileList:[],
                user:JSON.parse(localStorage.user),
                izCanSubmit:false
            }
        },
        watch:{
            feedContent(newVal){
                if(newVal===''){
                    this.izCanSubmit = false
                }else{
                    this.izCanSubmit = true
                }
            },
            fileList(newVal){
                if(newVal.length&&newVal.length>0){
                    this.izCanSubmit = true
                }else{
                    this.izCanSubmit = false
                }
            }
        },
        methods:{
            handleUpload(file, filename = 'file') {
                const formData = new FormData()
                file.file.file = file.content
                formData.append('file', file.file)
                vue.$http({
                    url:`/h5api/file/upload/img`,
                    method: 'POST',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data;'
                    }
                }).then(res =>{
                    this.fileList.push(res.data.basePath.replace('null',''))
                }).catch(()=>{})

            },
            onSubmit(){
                let imgsUrl = ''
                if(this.fileList.length){
                    if(this.fileList.length==1){
                        imgsUrl = this.fileList[0]
                    }else{
                        let temArr=[]
                        this.fileList.map(key =>{
                            temArr.push(key)
                        })
                        imgsUrl = temArr.join(',')
                    }
                }
                let params={
                    content:this.feedContent,
                    imgs:imgsUrl==''?null:imgsUrl,
                    userId:this.user.id
                }
                if(this.izCanSubmit){
                    memberAPI.submitFeedback(params).then(res =>{
                        if (res.errorCode==="00000"){
                            this.$toast('提交成功');
                            this.navigateEvent.$emit('gobackRersher',1)
                            setTimeout(()=>{
                                this.back()
                            },2000)

                        }else{
                            this.$toast(res.message);
                        }

                    }).catch(()=>{
                        this.$toast('提交失败');
                    })
                }else{
                    this.$toast('请您先填写反馈建议内容或图片后再提交')
                }
            },
            openLightbox(index = 0) {
                // 画廊组件开启,index可指定初始图片
                this.$refs.lightbox.open(index)
            },
            checkView(imgList,index){
                ImagePreview(
                    {
                        images: imgList,
                        startPosition: index
                    });
            },
            onOversize(file) {
                this.$toast('文件大小不能超过10M');
            },
            deleteImg(index){
                this.fileList.splice(index,1)
            }
        }
    }
</script>

<style scoped>
.close-icon{
    width:14px;
    height: 14px;
    position: absolute;
    right: -4px;
    top: -4px;
}
.subForm{
    margin-top: 10px;
    padding:10px 15px 0;
    width: 100%;
    height: 330px;
    background: #ffffff;
    position: relative;
    /*overflow: hidden;*/
}
/deep/.van-cell {
    overflow: initial !important;
    padding: 10px 0px
}
/deep/.van-field__word-limit {
    position: absolute !important;
    bottom: -146px !important;
    right: 100px !important;
    z-index: 999;
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #9094a8;
    line-height: 22px;
}
/deep/ .van-cell::after {
    border-bottom: 1px solid #fff !important;
}
/deep/ .van-field__control {
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: justify;
    color: #292a2c;
    line-height: 24px;
}
/deep/.van-uploader__preview-image {
    display: block;
    width: 54px;
    height: 54px;
    border-radius: 8px;
    overflow: hidden;
}
/deep/.van-uploader__upload {
    width: 54px !important;
    height: 54px !important;
}
/deep/.van-uploader__upload {
    width: 54px !important;
    height: 54px !important;
    border-radius: 8px;
    margin-bottom: 10px;
}
/deep/.van-uploader__preview-delete {
    top: -4px;
    right: -4px;
    background-color: #333;
    border-radius: 100%;
}
/deep/.van-uploader__preview-delete-icon {
     position: absolute;
     top: -1px;
     right: -1px;
}
.submitBtn{
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    width: 84px;
    height: 36px;
    background: #eeeeee;
    border-radius: 6px;
}
.optionBar{
    background: #ffffff;
    border-top: 1px solid #eeeeee;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #ffffff;
    /*position: absolute;*/
    /*bottom: 0;*/
}
.upload-img{
    display: flex;
    flex-wrap: wrap;
}
.img-box{
    position: relative;
    width: 54px;
    height: 54px;
    border-radius: 8px;
    /*overflow: hidden;*/
    margin-right: 10px;
    margin-bottom: 10px;
}
.image{
    width: 100%;
    height: 100%;
}
.img-item{
    width: 54px;
    height: 54px;
    margin: 0 10px 0 0;
    background-size: cover;
    background-repeat: no-repeat;
}
</style>
