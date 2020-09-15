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
        },{
            path: 'feedback',
            name: "意见反馈",
            component: () => import('./feedback/list.vue'),
            children: [
                {
                    path: 'submit',
                    name: "我要反馈",
                    component: () => import('./feedback/detail'),
                }
            ]
        },{
            path: 'coupons',
            name: "消费劵",
            component: () => import('./coupons/list'),
            children: [
                {
                    path: 'couponRule',
                    name: "详细规则",
                    component: () => import('./coupons/couponRule'),
                }
            ]
        },],
    }
]
