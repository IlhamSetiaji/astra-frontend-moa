<template>
  <div class="global-container">
    <div class="card login-form">
      <div class="card-body">
        <h1 class="card-title text-center">LOGIN</h1>
      </div>
      <div class="card-text">
        <!-- <font-awesome-icon icon="fa-solid fa-user-secret" /> -->
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Email address</label
            >
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="email"
            />
            <div id="emailHelp" class="form-text"></div>
          </div>
          <div class="mb-4">
            <label for="exampleInputPassword1" class="form-label"
              >Password</label
            >
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              v-model="password"
            />
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary mb-5">LOGIN</button>
            <p class="text-danger">{{ errorMessage }}</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    handleLogin() {
      // Dummy credentials (Replace these with your real authentication logic)
      const dummyCredentials = {
        email: "test@example.com",
        password: "password123",
      };

      if (
        this.email === dummyCredentials.email &&
        this.password === dummyCredentials.password
      ) {
        // Successful login
        this.errorMessage = "";
        alert("Login successful!"); // Replace this with your desired action after successful login

        // Redirect the user to the Main Page after successful login
        this.$router.push({ name: "HomeView" });

        // Set session time (5 minutes)
        const sessionTime = 300000; // 5 minutes in milliseconds
        setTimeout(() => {
          // Logout user after session time expires
          this.logout();
        }, sessionTime);
      } else {
        // Invalid credentials
        this.errorMessage = "Invalid email or password";
      }
    },
    logout() {
      // Reset user credentials and redirect to login page
      this.email = "";
      this.password = "";
      this.errorMessage = "";
      alert("Your session has expired. Please log in again."); // Replace this with your desired action upon logout
      this.$router.push({ name: "LoginPage" });
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
  background-color: #e0dcdc;
}
.card-body,
.login-form {
  color: white;
}
.global-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-form {
  width: 450px;
  height: 400px;
  padding: 20px;
  padding-left: 30px;
  padding-right: 30px;
  background-color: #608474;
}
.btn {
  background-color: #ff9c04;
  font-weight: bold;
  width: 120px;
  border-color: #ff9c04;
}
.btn-primary:hover,
.btn-primary:focus,
.btn-primary:active,
.btn-primary.active,
.open > .dropdown-toggle.btn-primary {
  background-color: #ff9c04;
  border-color: #ff9c04; /*set the color you want here*/
}
</style>
