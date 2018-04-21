import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import About from "./views/About.vue";
import Sessions from "./views/Sessions.vue";
import Session from "./views/Session.vue";
import Exercises from "./views/Exercises.vue";
import Exercise from "./views/Exercise.vue";
import NotFound from "./views/NotFound.vue";
import store from "./store";

Vue.use(Router);

function ensureLoggedIn(to, from, next) {
  if (store.getters.isLoggedIn) {
    next();
  } else {
    next("/login");
  }
}

const router = new Router({
  mode: "history",
  base: IS_LIVE ? "/fitness/" : "/",
  routes: [
    {
      path: "/",
      component: Home,
      beforeEnter: ensureLoggedIn,
      props(route) {
        return {
          start: route.query.start,
          end: route.query.end
        }
      },
      children: [
        {
          path: "",
          name: "home",
          component: Sessions,
        },
        {
          path: "sessions",
          name: "sessions",
          component: Sessions,
          children: [
            {
              path: "session/:id",
              name: "session",
              component: Session
            }
          ]
        },
        {
          path: "exercises",
          name: "exercises",
          component: Exercises,
          children: [
            {
              path: "exercise/:name",
              name: "exercise",
              component: Exercise
            }
          ]
        }
      ]
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

store.watch(() => store.getters.isLoggedIn, isLoggedIn => {
  if(isLoggedIn) {
    router.replace("/");
  } else {
    router.replace("/login");
  }
})

export default router;