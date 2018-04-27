import Vue from "vue";
import Router from "vue-router";
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

const Sessions = () => import("./views/Sessions.vue");

const router = new Router({
  mode: "history",

  base: IS_LIVE ? "/fitness/" : "/",
  
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash){
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  },
  
  routes: [
    {
      path: "/",
      component: () => import("./views/Home.vue"),
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
          component: Sessions
        },
        {
          path: "index.html",
          component: Sessions
        },
        {
          path: "sessions",
          name: "sessions",
          component: Sessions,
          children: [
            {
              path: "session/:id",
              name: "session",
              component: () => import("./views/Session.vue")
            }
          ]
        },
        {
          path: "exercises",
          name: "exercises",
          component: () => import("./views/Exercises.vue"),
          children: [
            {
              path: "exercise/:name",
              name: "exercise",
              component: () => import("./views/Exercise.vue")
            }
          ]
        },
        {
          path: "settings",
          name: "settings",
          component: () => import("./views/Settings.vue")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
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
      component: () => import("./views/About.vue")
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("./views/Contact.vue")
    },
    {
      path: "/privacy",
      name: "privacy",
      component: () => import("./views/PrivacyPolicy.vue")
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