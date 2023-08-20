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
      try {
        const response = await fetch("http://127.0.0.1:8000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const responseData = await response.json();
          if (responseData.data && responseData.data.user) {
            const user = responseData.data.user;
            const token = responseData.data.token;
            const expirationDate = new Date().getTime() + 300 * 1000;

            localStorage.setItem("token", token);
            localStorage.setItem("userId", user.id);
            localStorage.setItem("tokenExpiration", expirationDate);

            context.commit("setUser", {
              token: token,
              userId: user.id,
            });
          } else {
            throw new Error("Invalid response format");
          }
        } else {
          throw new Error("Failed to authenticate. Check your login data.");
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
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

    setLogoutTimer(context, expirationTime) {
      setTimeout(() => {
        context.dispatch("logout");
      }, expirationTime);
      context.commit("setLogoutTimer", expirationTime);
    },
    logout(context) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("tokenExpiration");
      context.commit("logout");
    },
  },
  modules: {},
});
