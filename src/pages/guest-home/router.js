export default [
  {
    path: "/guest-home",
    name: "嘉宾首页",
    component: () => import("./index.vue"),
    children: [
      {
        path: 'huiyi',
        name: "huiyi",
        component: () => import('./detail/huiyi.vue'),
      },
      {
        path: 'jiudian',
        name: "jiudian",
        component: () => import('./detail/jiudian.vue'),
      },
      {
        path: 'zhuanche',
        name: "zhuanche",
        component: () => import('./detail/zhuanche.vue'),
      },
      {
        path: 'bashi',
        name: "bashi",
        component: () => import('./detail/bashi.vue'),
      },
      {
        path: 'canting',
        name: "canting",
        component: () => import('./detail/canting.vue'),
      },
      {
        path: 'huodong',
        name: "huodong",
        component: () => import('./detail/huodong.vue'),
      },
    ]
  },
];
