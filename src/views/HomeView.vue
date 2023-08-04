<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Sidebar -->
      <nav id="sidebar" class="col-md-3 col-lg-2 min-vh-100 d-md-block sidebar">
        <SideBar />
      </nav>
      <!-- Main Content Area -->
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <!-- Place your content here -->
        <h1>Main Content Area</h1>
      </main>
    </div>
  </div>
</template>

<script>
import SideBar from "../components/SideBar.vue";

export default {
  components: {
    SideBar,
  },
};
</script>

<style scoped>
.sidebar {
  background-color: #e0dcdc;
}
</style>
