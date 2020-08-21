<template>
    <van-tabbar v-model="active" v-if="show">
        <van-tabbar-item v-for="item in items" :icon="item.icon" :key="item.label" @click="clickItem(item)">{{item.label}}</van-tabbar-item>
    </van-tabbar>
</template>
<script>
    export default {
        data(){
            return {
                active:0,
                items:[
                    { icon:'wap-home-o',label:'首页', path:'/guest-home' },
                    { icon:'sign',label:'活动报名', path:'/activity' },
                    { icon:'user-o',label:'个人中心', path:'/guest-me' },
                ],
                show: false
            }
        },
        mounted(){
        },
        methods:{
            clickItem(item){
                item.path && this.$router.push(item.path)
            },
            updateTabState(){
                this.items.forEach((item,index)=>{
                    if (location.hash.indexOf(item.path)>=1) {
                        this.active = index
                    }
                })
            }
        },
        watch:{
            $route(){
                const rootPathArry = this.items.map((item) => {
                    return item.path
                })
                if (rootPathArry.includes(this.$route.path)) {
                    this.updateTabState()
                    this.show = true
                }else{
                    this.show = false
                }
            }
        },
    }
</script>