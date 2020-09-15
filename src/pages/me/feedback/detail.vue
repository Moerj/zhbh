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
                <!--<div class="flex" style="padding:0 0 4px;height: 92px;align-items: flex-end">-->
                    <!--<van-uploader v-model="fileList"  multiple :max-size="500 * 1024" :max-count="5"/>-->
                <!--</div>-->
                <div class="upload-img" style="padding:0 0 4px;height: 92px;align-items: flex-end">
                    <div class="img-box" v-for="(item,index) in fileList" :key="index">
                        <img class="image" :src="item" :preview="index">
                    </div>
                    <!-- vant的upload组件 -->
                    <van-uploader :after-read="handleUpload" accept="image/*" style="margin-bottom: 0" v-if="fileList.length<5">
                        <!--　<img src="../card1.png" style="width: 100%;height: 100%;">-->
                    </van-uploader>
                </div>
                <div class="flex optionBar" style="height: 65px;border-top: 1px solid #ccc">
                    <div class="submitBtn" @click="onSubmit()">
                        确认提交
                    </div>
                </div>
                <div class="cImg"  v-for="(cImg,cIndex) in uploadImages" :key="cIndex">
                    <img :src="cImg" :preview="cIndex" width="54px" height="54px" alt="" fit="cover">
                </div>
            </div>
        </div>
    </ui-main>
</template>

<script>
    import memberAPI from "@/api/member.js";
    import vue from "../../../main";
    import mixin from "../../../mixins/mixin";
    export default {
        name: "detail",
        mixins:[mixin],
        data(){
            return{
                // feedContent:'相当麻烦，要排很长时间的队，希望各位领导能增派船源，让景区减少拥堵排队，希望景区发展越来越好，游客也能享受到更好的服务。',
                feedContent:'',
                fileList:[],
                uploadImages:[
                    'http://192.168.1.114:8080/base/uploaders/view/w4/173fd040-aed2-4739-a7e9-4f4a9a46a19b39013234.jpg',
                    'http://192.168.1.114:8080/base/uploaders/view/w4/173fd040-aed2-4739-a7e9-4f4a9a46a19b39013234.jpg'
                ],
                user:JSON.parse(localStorage.user)
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
                let temArr = []
                if(this.fileList.length){
                    if(this.fileList.length==1){
                        imgsUrl = this.fileList[0].url
                    }else{
                        this.fileList.map(key =>{
                            temArr.push(key.url)
                        })
                        imgsUrl = temArr.join(',')
                    }
                }
                let params={
                    content:this.feedContent,
                    imgs:imgsUrl,
                    userId:this.user.id
                }
                console.log('submitparams',params)
                memberAPI.submitFeedback(params).then(res =>{
                    // this.$router.go(-1)
                    this.back()
                })
            }
        }
    }
</script>

<style scoped>
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
    background: #c7000b;
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
    width: 54px;
    height: 54px;
    border-radius: 8px;
    overflow: hidden;
    margin-right: 10px;
}

.image{
    width: 100%;
    height: 100%;

}

</style>
