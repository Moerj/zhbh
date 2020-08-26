export default [
  {
    path: "/active",
    name: "活动报名",
    meta: { root: true },
    component: () => import("./index.vue"),
  },
    {
        path: "/active-detail",
        name: "active-detail",
        meta: { root: true,title:"活动详情" },
        component: () => import("./activeDetail.vue"),
    }
];
