import axios from "axios";
const API_URL = "/posts/";

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
  async createPost({ commit }, newPost) {
    commit("createPostRequest");
    try {
      const res = await axios.post(`${API_URL}`, newPost);
      if (res.data.success) {
        commit("createPostSuccess");
      }
      return res;
    } catch (error) {
      console.log(error);
    }
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
};

const mutations = {
  createPostRequest(state) {
    state.status = "loading";
  },
  createPostSuccess(state) {
    state.status = "success";
  },
  getPostsRequest(state) {
    state.status = "loading";
  },
  getPostsSuccess(state, posts) {
    state.status = "success";
    state.posts = posts;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
