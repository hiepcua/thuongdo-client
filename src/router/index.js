import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/home/index.vue";

import Meta from "vue-meta";
import auth from "@/router/auth";

Vue.use(VueRouter);

Vue.use(Meta, {
  keyName: "metaInfo", // the component option name that vue-meta looks for meta info on.
  attribute: "data-vue-meta", // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: "data-vue-meta-server-rendered", // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: "vmid", // the property name that vue-meta uses to determine whether to overwrite or append a tag
});

const routes = [
  {
    path: "/",
    name: "home-index",
    component: Home,
    beforeEnter: auth.requireAuth,
  },
  {
    path: "/login",
    name: "account-login",
    component: () => import("@/views/account/Login.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/register",
    name: "account-register",
    component: () => import("@/views/account/Register.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/forgot-password",
    name: "account-forgot-password",
    component: () => import("@/views/account/Forgot.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  {
    path: "/reset-password/:email",
    name: "account-reset-password",
    component: () => import("@/views/account/Reset.vue"),
    beforeEnter: auth.requireAuthV2,
  },
  // Profile
  {
    path: "/profile",
    name: "account-profile",
    component: () => import("@/views/account/Profile.vue"),
    beforeEnter: auth.requireAuth,
  },
  // Order
  {
    path: "/order-create",
    name: "order-create",
    component: () => import("@/views/order/Create.vue"),
    beforeEnter: auth.requireAuth,
  },
  {
    path: "/order-list",
    name: "order-list",
    component: () => import("@/views/order/List.vue"),
    beforeEnter: auth.requireAuth,
  },
  {
    path: "/order-list/:order_id",
    name: "order-detail",
    component: () => import("@/views/order/DetailV2.vue"),
    beforeEnter: auth.requireAuth,
  },
  // Cart
  {
    path: "/cart-create",
    name: "cart-create",
    component: () => import("@/views/cart/Create.vue"),
    beforeEnter: auth.requireAuth,
  },
  // complain
  {
    path: "/complain-list",
    name: "complain-list",
    component: () => import("@/views/complain/List.vue"),
    beforeEnter: auth.requireAuth,
  },
  {
    path: "/complain-list/:complain_id",
    name: "complain-detail",
    component: () => import("@/views/complain/Detail.vue"),
    beforeEnter: auth.requireAuth,
  },
  {
    path: "/complain-create/:order_id/:pack_id",
    name: "complain-create",
    component: () => import("@/views/complain/Create.vue"),
    beforeEnter: auth.requireAuth,
  },
  // Pack
  {
    path: "/pack-list",
    name: "pack-list",
    component: () => import("@/views/pack/List.vue"),
    beforeEnter: auth.requireAuth,
  },
  {
    path: "/pack-list/:pack_id",
    name: "pack-detail",
    component: () => import("@/views/pack/Detail.vue"),
    beforeEnter: auth.requireAuth,
  },
  // Delivery
  {
    path: "/delivery-list",
    name: "delivery-list",
    component: () => import("@/views/delivery/List.vue"),
    beforeEnter: auth.requireAuth,
  },
  {
    path: "/delivery-list/:delivery_id",
    name: "delivery-detail",
    component: () => import("@/views/delivery/Detail.vue"),
    beforeEnter: auth.requireAuth,
  },
  // supplier
  {
    path: "/supplier-list",
    name: "supplier-list",
    component: () => import("@/views/supplier/List.vue"),
    beforeEnter: auth.requireAuth,
  },
  // ký gửi
  {
    path: "/consignment-create",
    name: "consignment-create",
    component: () => import("@/views/consignment/Create.vue"),
    beforeEnter: auth.requireAuth,
  },
  {
    path: "/consignment-list",
    name: "consignment-list",
    component: () => import("@/views/consignment/List.vue"),
    beforeEnter: auth.requireAuth,
  },
  {
    path: "/consignment-list/:consignment_id",
    name: "consignment-detail",
    component: () => import("@/views/consignment/Detail.vue"),
    beforeEnter: auth.requireAuth,
  },
  // transaction
  {
    path: "/transaction-list",
    name: "transaction-list",
    component: () => import("@/views/transaction/List.vue"),
    beforeEnter: auth.requireAuth,
  },
  {
    path: "/transaction-withdraw",
    name: "transaction-withdraw",
    component: () => import("@/views/transaction/Withdraw.vue"),
    beforeEnter: auth.requireAuth,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
