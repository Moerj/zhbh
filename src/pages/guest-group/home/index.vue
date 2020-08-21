<template>
    <ui-main>
        <!-- 顶部区域, 会悬浮在顶部 -->
        <template #header>
            <div class="p10 c-orange"> 
                <van-icon name="good-job-o" />
                我是顶部栏内容,我会一直悬浮在顶上
            </div>
        </template>

        <!-- 主内容区域, 超长内容会自动生成滚动条 -->
        <van-cell title="我是测试数据" v-for="item in 50" is-link to="/guest-detail"> </van-cell>


        <!-- 悬浮在底部的区域 -->
        <template #footer>
            <div class="p15">
                <van-button @click="$router.push('/guest-detail')" type="primary" block>点我进详情</van-button>
            </div>
        </template>
    </ui-main>
</template>