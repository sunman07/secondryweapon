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
        import("./views/demo/scan-home.vue")
    },
    {
      path: "/studentlist",
      name: "studentlist",
      component: () =>
        import("./views/demo/studentlist.vue")
    },
    {
      path: "/scandetails",
      name: "scandetails",
      component: () =>
        import("./views/demo/scandetails.vue")
    }
  ]
});
