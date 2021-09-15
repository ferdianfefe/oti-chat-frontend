<template>
  <v-app class="app">
    <v-container class="main-container" :class="{ main: isLoggedIn }" fluid>
      <div class="sidebar">
        <Sidebar v-if="isLoggedIn" class="sidebar" :loggedUser="loggedUser" />
      </div>
      <Error v-if="error" :error="error" />
      <router-view class="content" />
      <ContactList
        v-if="$router.currentRoute.path == '/chat'"
        class="contactList"
        :contacts="contacts"
      />
    </v-container>
  </v-app>
</template>

<script>
import Sidebar from "./components/Sidebar";
import Error from "./components/Error.vue";
import { mapGetters, mapActions } from "vuex";
import ContactList from "./components/ContactList.vue";

export default {
  name: "App",
  components: {
    Sidebar,
    Error,
    ContactList,
  },

  data: () => ({
    //
  }),
  methods: {},
  computed: {
    ...mapGetters(["error", "isLoggedIn", "loggedUser", "contacts", "socket"]),
    ...mapActions(["getContacts"]),
  },
  mounted() {
    this.getContacts;
  },
  created() {
    this.socket.emit("online", localStorage.getItem("userId"));
    window.addEventListener("beforeunload", () => {
      this.socket.emit("offline", localStorage.getItem("userId"));
    });
  },
};
</script>

<style lang="scss">
.main-container {
  padding: 0 !important;
}
.main {
  display: grid;
  grid-template-columns: 0.8fr 3fr 1fr;
  grid-template-rows: 100vh;
  grid-template-areas: "sidebar content rightbar";

  .sidebar {
    grid-area: sidebar;
  }
  .content {
    grid-area: content;

    &-body-container {
      margin-top: 64px;
    }
  }

  .contactList {
    grid-area: rightbar;
  }
}
</style>
