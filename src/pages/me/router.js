export default [
    {
        path:'/me',
        name:'我的',
        meta:{root:true},
        component:()=>import('./index.vue'),
        children:  [{
            path: 'moments',
            name: "精彩瞬间",
            component: () => import('./detail/moments.vue'),
        }, {
            path: 'guide',
            name: "会务指南",
            component: () => import('./detail/guide.vue'),
        }],
    }
]
