import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

Vue.config.productionTip = false;

/* Set axios as default http module */
Vue.prototype.$http = axios;

/* Load token from session storage */
const token = localStorage.getItem("token");

/* If there is token, append it to axios authorization header */
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = token;
}

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
