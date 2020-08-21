<template>
    <div id="app" class="h-100 flex-column">
        <div class="flex-1 relative">
            <router-view/>
        </div>
        
        <guestTabbar />
    </div>
</template>

<script>
    // 嘉宾一级页面底部栏
    import guestTabbar from '@/pages/guest-group/rootMenu'
    export default {
        name: 'App',
        components:{
            guestTabbar
        }
    }
</script>
