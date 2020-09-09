import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", redirect: "home" },
    {
      path: "*",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: () =>
        import("./views/mainpage/index.vue")
    },
    {
      path: "/apply",
      name: "apply",
      component: () =>
        import("./views/mainpage/applypage.vue")
    },
    {
      path: "/approve",
      name: "approve",
      component: () =>
        import("./views/mainpage/approvepage.vue")
    },
    {
      path: "/appdetails",
      name: "appdetails",
      component: () =>
        import("./views/mainpage/approvedetailpage.vue")
    },
    
  ]
});
