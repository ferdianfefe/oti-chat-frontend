import Vue from "vue";
import Vuex from "vuex";
import Auth from "./modules/Auth";
import User from "./modules/User";
import Chat from "./modules/Chat";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Auth,
    User,
    Chat,
  },
});
