<template>
  <v-card height="400" width="256" class="mx-auto">
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ loggedUser.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            @{{ loggedUser.username }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.action">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>{{ "mdi-logout" }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["loggedUser"],
  data: () => ({
    items: [
      { title: "Home", icon: "mdi-home", action: "/home" },
      { title: "Chat", icon: "mdi-chat", action: "/chat" },
      { title: "Profile", icon: "mdi-account", action: "/profile" },
    ],
  }),
  methods: {
    ...mapActions(["logout", "getUserProfile"]),
  },
  computed: {},
  mounted() {
    this.getUserProfile();
  },
};
</script>
<style scoped>
aside {
  width: 100% !important;
}
</style>
