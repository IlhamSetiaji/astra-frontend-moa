import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Dispatch the autoLogin action before mounting the app
store
  .dispatch("autoLogin")
  .then(() => {
    const app = createApp(App);
    app.use(store).use(router).mount("#app");
  })
  .catch((error) => {
    // Handle the error here (e.g., show an error message or redirect to a specific page)
    console.error("Auto login failed:", error);
  });
