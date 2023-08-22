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
          <p class="text-white" id="activeLinkText">
            {{ activeLinkText }}
          </p>
        </b>
      </div>
      <table class="table bg-light mt-4">
        <thead>
          <tr class="header-table text-white">
            <th scope="col">PILIH SECTION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              <router-link to="/events">Event</router-link>
            </th>
          </tr>
          <tr>
            <th scope="row">
              <router-link to="/events-digital">Event Digital</router-link>
            </th>
          </tr>
          <tr>
            <th scope="row">
              <router-link to="/adex-brand">Adex/Brand</router-link>
            </th>
          </tr>
          <tr>
            <th scope="row">
              <router-link to="/rekap-data">Rekap Data</router-link>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="button-container">
      <button id="button" class="btn btn-danger btn-block" @click="logout">
        Logout
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "SideBar",
  computed: {
    activeLinkText() {
      const routeName = this.$route.name;
      if (routeName === "events") {
        return "Event";
      } else if (routeName === "events-digital") {
        return "Event Digital";
      } else if (routeName === "adex-brand") {
        return "Adex/Brand";
      } else if (routeName === "rekap-data") {
        return "Rekap Data";
      }
      return "";
    },
  },
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
  width: 200px;
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
#sidebar {
  position: sticky;
  top: 0;
  height: 100vh; /* Adjust as needed */
  overflow-y: auto;
}
#button {
  background-color: #ff9c04;
  font-weight: bold;
  border-color: #ff9c04;
  border-radius: 25px;
  margin: 0;
}

.button-container {
  display: flex;
  justify-content: center;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  position: absolute;
  margin-bottom: 15px;
}
.nav-link.active {
  color: #ff9c04;
}
</style>
