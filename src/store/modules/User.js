import axios from "axios";
const API_URL = "/users";

const state = {
  contacts: null,
};

const getters = {
  contacts: (state) => state.contacts,
};

const actions = {
  // Get contact
  async getContacts({ commit }) {
    commit("contactsRequest");
    try {
      const res = await axios.get(`${API_URL}/contacts`);
      if (res.data.success) {
        commit("contactsLoaded", res.data.value);
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  // Update user profile
  async updateUser({ commit }, newData) {
    commit("updateProfileRequest");
    try {
      const res = await axios.put(`${API_URL}/profile`, newData);
      if (res.data.success) {
        commit("updateProfileSuccess");
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  },
};

const mutations = {
  contactsRequest(state) {
    state.status = "loading";
  },
  contactsLoaded(state, contacts) {
    state.status = "success";
    state.contacts = contacts;
  },
  updateProfileRequest(state) {
    state.status = "loading";
  },
  updateProfileSuccess(state) {
    state.status = "success";
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
