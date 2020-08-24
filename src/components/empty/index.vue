<style lang="scss" scoped>
    .empty{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .empty-icon{
        width: 100px;
        height: 124px;
    }
    .empty-center{
        transform: translateY(-50%);
    }
    .empty-label{
        font-size: 12px;
        color: #9B9B9B;
        text-align: center;
    }
</style>
<template>
    <div class="empty" v-if="list && list.length==0">
        <div class="empty-center">
            <img src="./empty.png" class="empty-icon">
            <div class="empty-label">{{label}}</div>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            label:{
                type:String,
                default: '暂无记录'
            },
            list:{}
        },
    }
</script>