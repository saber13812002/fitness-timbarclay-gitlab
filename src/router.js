import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import About from "./views/About.vue";
import NotFound from "./views/NotFound.vue";
import store from "./store";

Vue.use(Router);

function ensureLoggedIn(to, from, next) {
  console.log(store);
  if (store.getters.isLoggedIn) {
    next();
  } else {
    next("/login");
  }
}

export default new Router({
  mode: "history",
  base: IS_LIVE ? "/fitness/" : "/",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: ensureLoggedIn,
      props(route) {
        return {
          start: route.query.start,
          end: route.query.end
        }
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter(to, from, next) {
        if (store.getters.isLoggedIn) {
          next("/");
        } else {
          next();
        }
      }
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "*",
      component: NotFound
    }
  ]
});
