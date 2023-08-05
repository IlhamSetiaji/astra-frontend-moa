import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
    },
    logout(state) {
      state.token = null;
      state.userId = null;
      state.tokenExpiration = null;
    },
    setLogoutTimer(state, expirationTime) {
      state.tokenExpiration = expirationTime;
    },
  },
  actions: {
    async login(context, payload) {
      // Simulate a login with dummy data
      const users = [
        {
          id: 1,
          email: "user@example.com",
          password: "password123",
        },
      ];

      const expirationDate = new Date().getTime() + 300 * 1000; // 1 minute from now
      localStorage.setItem("tokenExpiration", expirationDate);

      const user = users.find(
        (user) =>
          user.email === payload.email && user.password === payload.password
      );

      if (!user) {
        const error = new Error("Invalid email or password.");
        throw error;
      }

      // Simulate a successful login
      const dummyResponse = {
        data: {
          meta: {
            code: 200,
            message: "Login successful",
          },
          data: {
            token: "dummy_token",
            user: {
              id: user.id,
              // other user data
            },
          },
        },
      };

      const responseMeta = dummyResponse.data.meta;
      const responseData = dummyResponse.data.data;

      if (responseMeta.code !== 200) {
        const error = new Error(
          responseMeta.message ||
            "Failed to authenticate. Check your login data."
        );
        throw error;
      }

      localStorage.setItem("token", responseData.token);
      localStorage.setItem("userId", responseData.user.id);
      context.commit("setUser", {
        token: responseData.token,
        userId: responseData.user.id,
      });
    },
    autoLogin(context) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const expirationDate = localStorage.getItem("tokenExpiration");
      if (token && userId && expirationDate) {
        const currentTime = new Date().getTime();
        if (currentTime < +expirationDate) {
          context.commit("setUser", {
            token: token,
            userId: userId,
          });

          const expiresIn = +expirationDate - currentTime;
          context.dispatch("setLogoutTimer", expiresIn);
        } else {
          context.dispatch("logout");
        }
      }
    },
    logout(context) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      context.commit("logout");
    },
    setLogoutTimer(context, expirationTime) {
      setTimeout(() => {
        context.dispatch("logout");
      }, expirationTime);
      context.commit("setLogoutTimer", expirationTime); // Tambahkan baris ini
    },
  },
  modules: {},
});
