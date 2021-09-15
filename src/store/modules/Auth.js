import axios from "axios";
import router from "../../router";
const API_URL = "/users/";

const state = {
  loggedUser: {},
  token: localStorage.getItem("token") || "",
  status: "",
  error: null,
};

const getters = {
  isLoggedIn: (state) => !!state.token,
  loggedUser: (state) => state.loggedUser,
  error: (state) => state.error,
};

const actions = {
  // Login action
  async login({ commit }, user) {
    commit("loginRequest");
    try {
      const res = await axios.post(`${API_URL}signin`, user);
      console.log("res.data");
      if (res.data.success) {
        const token = res.data.token;
        const loggedUser = res.data.user;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", loggedUser._id);
        axios.defaults.headers.common.Authorization = token;
        commit("loginSuccess", { token, loggedUser });
      }
      return res;
    } catch (error) {
      console.log(error.response.data.message);
      commit("loginError", error.response.data.message);
    }
  },

  // Register action
  async register({ commit }, user) {
    commit("registerRequest");
    try {
      const res = await axios.post(`${API_URL}signup`, user);
      if (res.data.success) {
        commit("registerSuccess");
      }
      return res;
    } catch (error) {
      commit("registerError", error.response.data.message);
    }
  },

  // Logout actions
  async logout({ commit }) {
    await localStorage.removeItem("token");
    await localStorage.removeItem("userId");
    commit("logout");
    delete axios.defaults.headers.common.Authorization;
    router.push("/");
    return;
  },

  // Get user profile
  async getUserProfile({ commit }) {
    commit("getUserProfileRequest");
    try {
      const res = await axios.get(`${API_URL}profile`);
      if (res.data.success) {
        commit("getUserProfileSuccess", res.data.user);
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  /* Edit user profile */
  async editUserProfile({ commit }, newProfile) {
    commit("editUserProfileRequest");
    try {
      const res = await axios.put(`${API_URL}profile`, newProfile);
      console.log(res);
      if (res.data.success) {
        commit("editUserProfileSuccess");
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  loginRequest(state) {
    state.error = null;
    state.status = "loading";
  },
  loginSuccess(state, { token, loggedUser }) {
    state.status = "success";
    state.token = token;
    state.loggedUser = loggedUser;
    state.error = null;
  },
  loginError(state, error) {
    state.error = error;
  },
  registerRequest(state) {
    state.error = null;
    state.status = "loading";
  },
  registerSuccess(state) {
    state.error = null;
    state.status = "success";
  },
  registerError(state, error) {
    state.error = error;
  },
  logout(state) {
    state.error = null;
    state.status = "";
    state.loggedUser = "";
    state.token = "";
  },
  getUserProfileRequest(state) {
    state.error = null;
    state.status = "loading";
  },
  getUserProfileSuccess(state, user) {
    state.status = "success";
    state.loggedUser = user;
  },
  editUserProfileRequest(state) {
    state.error = null;
    state.status = "loading";
  },
  editUserProfileSuccess(state) {
    state.status = "success";
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
