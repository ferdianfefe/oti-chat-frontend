import axios from "axios";
import io from "socket.io-client";
const API_URL = "chats";

const state = {
  activeContact: null,
  messages: [],
  socket: io.connect(""),
};

const getters = {
  messages: (state) => state.messages,
  activeContact: (state) => state.activeContact,
  socket: (state) => state.socket,
};

const actions = {
  // Get messages
  async getMessages({ commit }, user) {
    commit("messagesRequest");
    try {
      const res = await axios.get(API_URL);
      if (res.data.success) {
        commit("messagesLoaded", res.data.value);
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  },

  // Send message
  async sendMessage({ commit }, mesageObj) {
    commit("sendingMessage");
    try {
      const res = await axios.post(API_URL, mesageObj);
      if (res.data.status) {
        commit("messageSent", res.data.value);
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  },

  // Set selected contact
  setActiveContact({ commit }, user) {
    commit("contactSelected", user);
  },
};

const mutations = {
  messagesRequest(state) {
    state.status = "loading";
  },
  messagesLoaded(state, messages) {
    state.status = "success";
    state.messages = messages;
  },
  sendingMessage(state) {
    state.status = "loading";
  },
  messageSent(state) {
    state.status = "success";
  },
  contactSelected(state, user) {
    state.activeContact = user;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
