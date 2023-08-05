<template>
  <div>
    <!-- Navigation Container -->
    <div class="container-fluid" v-if="shouldShowNavigation">
      <div class="row">
        <!-- Sidebar -->
        <side-bar></side-bar>
        <!-- Main Content Area -->
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <!-- Place your content here -->
          <h1>Main Content Area</h1>
          <router-view></router-view>
        </main>
      </div>
    </div>

    <!-- Router View without Decoration -->
    <router-view v-else></router-view>
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";

export default {
  components: {
    SideBar,
  },
  computed: {
    shouldShowNavigation() {
      // Determine the login page based on the path/route
      const loginPage = "/login"; // Replace with the appropriate login page path
      return this.$route.path !== loginPage;
    },
  },
};
</script>
