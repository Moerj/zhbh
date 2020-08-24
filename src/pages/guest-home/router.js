export default [
  {
    path: "/guest-home",
    name: "嘉宾首页",
    component: () => import("./index.vue"),
    children: [
      {
        path: 'detail',
        name: '行程详情',
        component: () => import('./detail/index.vue'),
      },
    ]
  },
];
