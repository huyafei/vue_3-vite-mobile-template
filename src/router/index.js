import { createRouter, createWebHashHistory } from 'vue-router'
import pinia from "@/stores/pinia";
import { useUserStore } from "@/stores/user";
import cookies from "@plugins/modules/cookies";

import constantRoutes from "./modules/constantRoutes";
import asyncRoutes from "./modules/asyncRoutes";

const routes = [...constantRoutes, ...asyncRoutes];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PROJECT_BASE), // 或者 createWebHistory(import.meta.env.VITE_PROJECT_BASE)
  routes: routes
})
const whiteList = ["Login", "Page404", "Page401"];

router.beforeEach(async (to, from, next) => {
  if (whiteList.includes(to.name)) {
    next();
  } else {
    // 刷新页面重新登陆，更新权限
    // if (!from.name && to.name !== "Login") {
    //   next({
    //     name: "Login",
    //     query: {
    //       redirect: to.fullPath
    //     }
    //   });
    // } else {
    const token = cookies.get("token");
    if (token) {
      const userStore = useUserStore(pinia);
      if (!userStore.userInfo) {
        await userStore._getUserInfo();
      }
      next();
    } else {
      next({
        name: "Login",
        query: {
          redirect: to.fullPath,
        },
      });
    }
    // }
  }
});

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  window.scrollTo(0, 0);
});

export default router;
