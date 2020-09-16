export default [
  {
    path: "/guest-home",
    name: "嘉宾首页",
    component: () => import("./index.vue"),
    children: [
      {
        path: 'huiyi',
        name: "会议",
        component: () => import('./detail/huiyi.vue'),
      },
      {
        path: 'jiudian',
        name: "酒店",
        component: () => import('./detail/jiudian.vue'),
      },
      {
        path: 'zhuanche',
        name: "专车",
        component: () => import('./detail/zhuanche.vue'),
      },
      {
        path: 'bashi',
        name: "巴士",
        component: () => import('./detail/bashi.vue'),
      },
      {
        path: 'canting',
        name: "餐厅",
        component: () => import('./detail/canting.vue'),
      },
      {
        path: 'huodong',
        name: "活动",
        component: () => import('./detail/huodong.vue'),
      },  {
        path: 'notice',
        name: "活动",
        component: () => import('./detail/notice.vue'),
      },
    ]
  },{
    path: '/guest-home/index_novice',
    name: "新手指引",
    component: () => import('./index_novice.vue'),
  },
];
