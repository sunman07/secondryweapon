import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () =>
        import(/* webpackChunkName: "home" */ "./views/home/home.vue")
    },
    {
      path: "/report",
      name: "report",
      component: () =>
        import(/* webpackChunkName: "report" */ "./views/report/report.vue")
    },
    {
      path: "/reportdetail",
      name: "reportdetail",
      component: () =>
        import(
          /* webpackChunkName: "reportdetail" */ "./views/report/detail.vue"
        )
    }
  ]
});
