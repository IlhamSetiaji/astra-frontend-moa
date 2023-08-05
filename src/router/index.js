import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import HomeView from "../views/HomeView.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true }, // Tambahkan properti meta untuk menandai halaman yang memerlukan otentikasi
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: { requiresUnauth: true }, // Tambahkan properti meta untuk menandai halaman yang memerlukan non-autentikasi
  },
  {
    path: "/home",
    name: "home-view",
    components: {
      default: HomeView,
    },
    meta: { requiresAuth: true }, // Tambahkan properti meta untuk menandai halaman yang memerlukan otentikasi
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
    next("/home");
  } else {
    next();
  }
});

export default router;
