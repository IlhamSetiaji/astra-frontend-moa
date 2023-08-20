<template>
  <div class="global-container">
    <div class="card login-form">
      <div class="card-body">
        <h1 class="card-title text-center">LOGIN</h1>
      </div>
      <div class="card-text">
        <form @submit.prevent="login">
          <div class="mb-3">
            <label
              for="exampleInputEmail1"
              class="form-label d-flex justify-content-start"
              >Email address</label
            >
            <div class="form-float">
              <i class="icon fa-solid fa-envelope fa-lg envelope-icon"></i>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="email"
              />
            </div>

            <div id="emailHelp" class="form-text"></div>
          </div>
          <div class="mb-4">
            <label
              for="exampleInputPassword1"
              class="form-label d-flex justify-content-start"
              >Password</label
            >
            <div class="form-float">
              <i class="icon fa-solid fa-key fa-lg key-icon"></i>
              <input
                class="form-control"
                id="exampleInputPassword1"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
              />
              <!-- Eye icon to toggle password visibility -->
              <i
                class="icon fa-solid fa-eye eye-icon"
                :class="{ 'fa-eye-slash': !showPassword }"
                @click="showPassword = !showPassword"
              ></i>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary mb-5">LOGIN</button>
            <p class="text-danger">{{ error }}</p>
          </div>
        </form>
      </div>
    </div>
  </div>
  <ErrorModal
    :show="showModal"
    :errorMessage="loginError || 'Invalid email or password'"
    @close="showModal = false"
  />
</template>

<script>
// Import the ErrorModal component
import ErrorModal from "../components/ErrorModal.vue";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
      showModal: false, // New data property for modal visibility
      loginError: null,
      showPassword: false, // New data property for storing error message
    };
  },
  methods: {
    async login() {
      try {
        const actionPayload = {
          email: this.email,
          password: this.password,
        };
        await this.$store.dispatch("login", actionPayload);
        this.$router.replace("/events");
      } catch (error) {
        this.loginError = error.message;
        this.showModal = true;
        console.log(this.loginError);
      }
    },
  },
  components: {
    ErrorModal, // Register the ErrorModal component
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
  background-color: #e0dcdc;
}
.login-form {
  color: white;
}
.key-icon,
.envelope-icon {
  color: rgb(49, 49, 49);
  position: absolute;
  top: calc(50%);
  left: 0.5rem;
}
.eye-icon {
  position: absolute;
  top: calc(50% - 0.5rem);
  right: 0.75rem;
  cursor: pointer;
  color: rgb(49, 49, 49);
}
.form-float {
  position: relative;
}
.form-float label,
.form-float .form-control {
  left: 0.5rem;
  padding-left: 2.25rem;
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
