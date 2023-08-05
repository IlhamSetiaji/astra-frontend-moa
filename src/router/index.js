import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import HomeView from "../views/HomeView.vue";
import store from "../store"; // Pastikan path-nya sesuai dengan struktur folder Anda

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView, // Add the component that should be rendered for the home page
    beforeEnter: (to, from, next) => {
      store.dispatch("autoLogin").then(() => {
        if (store.getters.isAuthenticated) {
          // If the user is authenticated, allow access to the home page
          next();
        } else {
          // If the user is not authenticated, redirect to the login page
          next({ name: "login" });
        }
      });
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/home",
    name: "home-view",
    components: {
      default: HomeView,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
