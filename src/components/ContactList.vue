<template>
  <v-card tile>
    <v-list rounded>
      <v-subheader>CONTACTS</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="contact in contacts"
          :key="contact._d"
          @click="selectContact(contact)"
        >
          <v-icon :color="contact.isOnline ? 'teal' : 'red'" class="mr-2"
            >mdi-checkbox-blank-circle</v-icon
          >
          <v-list-item-content>
            <v-list-item-title v-text="contact.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Chat",
  props: ["contacts"],
  methods: {
    ...mapActions(["setActiveContact", "getMessages"]),
    selectContact(contact) {
      this.setActiveContact(contact);
      this.socket.emit("enter-chat", {
        sender: localStorage.getItem("userId"),
        receiver: contact._id,
      });
    },
  },
  computed: {
    ...mapGetters(["activeContact", "socket"]),
    ...mapActions(["getContacts"]),
  },
  mounted() {
    console.log(this.contacts);
  },
};
</script>

<style scoped>
.list-group {
  border-radius: 0;
  height: 100%;
}

.list-group button.active {
  background: #95c8ff;
}
</style>
