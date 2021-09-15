<template>
  <v-container class="content-container pa-0">
    <Message class="message" v-if="activeContact != null" />
    <v-container v-else class="no-msg-placeholder">
      <small>Click one of the contacts to start chatting!</small>
    </v-container>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ContactList from "@/components/ContactList";
import Message from "@/components/Message";

export default {
  components: {
    ContactList,
    Message,
  },
  computed: {
    ...mapGetters(["contacts", "activeContact", "socket"]),
  },
  methods: {
    ...mapActions(["getContacts", "getMessages"]),
  },
  created() {
    this.getMessages();

    this.socket.on("online", (userId) => {
      this.contacts.find((contact) => contact._id == userId).isOnline = true;
    });
    this.socket.on("offline", (userId) => {
      this.contacts.find((contact) => contact._id == userId).isOnline = false;
    });

    this.socket.on("message", (msg) => {
      this.getMessages();
    });

    this.getContacts();
    this.socket.emit("online", localStorage.getItem("userId"));
  },
  beforeDestroy() {
    this.socket.emit("offline", localStorage.getItem("userId"));
  },
};
</script>
scss
<style lang="scss" scoped>
.chat {
  display: grid;
  grid-template-columns: 25vw 75vw;
  grid-template-rows: calc(100vh - 56px);
}
.contact-list {
  border-right: 1px solid #ccc;
}
.message {
  height: calc(100vh - 56px);
}
.no-msg-placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    text-align: center;
  }
}
</style>
