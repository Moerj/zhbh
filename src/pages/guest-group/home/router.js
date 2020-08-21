export default [
    {
        path:'/guest-home',
        name: '嘉宾首页',
        component: ()=>import('./index.vue'),
        children:[
            {
                path:'/guest-detail',
                name: '嘉宾详情',
                component: ()=>import('./detail.vue'),
            }
        ]
    }
]