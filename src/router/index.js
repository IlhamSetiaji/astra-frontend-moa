import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import HomeView from "../views/HomeView.vue";
import EventsList from "../components/events/EventsList.vue";
import AdexChart from "../components/adex/AdexChart.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: { requiresUnauth: true },
  },

  {
    path: "/events",
    name: "events",
    component: EventsList,
    meta: { requiresAuth: true },
  },
  {
    path: "/events-digital",
    name: "events-digital",
    component: EventsList,
    meta: { requiresAuth: true },
  },
  {
    path: "/adex-brand",
    name: "adex-brand",
    component: AdexChart,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/login");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/events");
  } else if (store.getters.isAuthenticated && to.path === "/") {
    // Pengguna sudah login dan mengakses halaman utama, arahkan ke halaman events
    next("/events");
  } else {
    next();
  }
});

export default router;
