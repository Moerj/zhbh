export default [
  {
    path: 'my-journey',
    name: '我的行程',
    component: () => import('./index.vue'),
    children: [
      {
        path: 'detail',
        name: '行程详情',
        component: () => import('./detail/index.vue'),
      },
    ]
  },
]
