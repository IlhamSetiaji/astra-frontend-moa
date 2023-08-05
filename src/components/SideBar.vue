<template>
  <nav id="sidebar" class="col-md-3 col-lg-2 min-vh-100 d-md-block sidebar">
    <div class="position-sticky">
      <b>
        <h1 class="text-white">
          PROM <br />
          DEPT
        </h1>
      </b>

      <div class="aktif">
        <b>
          <p class="text-white" id="activeLinkText">Event</p>
        </b>
      </div>
      <!-- Menu 1: Event -->
      <table class="table bg-light mt-4">
        <thead>
          <tr class="header-table text-white">
            <th scope="col">PILIH SECTION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              <a href="#">Event</a>
            </th>
          </tr>
          <tr>
            <th scope="row">
              <a href="#">Event Digital</a>
            </th>
          </tr>
          <tr>
            <th scope="row">
              <a href="#">Adex/Brand</a>
            </th>
          </tr>
          <tr>
            <th scope="row">
              <a href="#">Rekap Data</a>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </nav>
  <!-- Tombol Logout -->
  <div class="position-absolute bottom-0 mb-3">
    <button class="btn btn-danger btn-block" @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/login");
    },
  },
};
</script>

<style scoped>
.btn {
  background-color: #ff9c04;
  font-weight: bold;
  width: 170px;
  border-color: #ff9c04;
  border-radius: 25px;
}
.sidebar {
  background-color: #e0dcdc;
}
.aktif {
  background-color: #ff9c04;
  border-radius: 25px;
  width: 120px;
  height: 25px;
  text-align: center;
}
.header-table {
  background-color: #608474;
  text-align: center;
}
a {
  color: black;
  text-decoration: none;
}
.sidebar {
  background-color: #e0dcdc;
}
</style>
