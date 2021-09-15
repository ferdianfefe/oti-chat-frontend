<template>
  <v-card>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          PROFILE
        </div>
        <v-list-item-title v-if="!editMode" class="text-h5 mb-1">
          {{ loggedUser.name }}
        </v-list-item-title>
        <v-col cols="12">
          <v-text-field
            v-if="editMode"
            v-model="newProfile.name"
            label="Name"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-list-item-subtitle v-if="!editMode">{{
            loggedUser.bio || ""
          }}</v-list-item-subtitle>
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-if="editMode"
            name="bio"
            label="Bio"
            :value="newProfile.bio"
            hint="Bio here"
            v-model="newProfile.bio"
          ></v-textarea>
        </v-col>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn
        :color="editMode ? 'success' : 'primary'"
        outlined
        rounded
        text
        @click="editBtnClicked"
      >
        {{ editMode ? "Save" : "Edit" }}
      </v-btn>
      <v-btn
        v-if="editMode"
        color="error"
        outlined
        rounded
        text
        @click="editMode = false"
      >
        Cancel
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// import PostList from "@/components/PostList";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    // PostList,
  },
  watch: {
    $route(to, from) {
      if (to != "home") {
        this.getUserByRoute();
      }
    },
  },
  data() {
    return {
      profilePhoto: null,
      editMode: false,
      newProfile: {
        name: "",
        bio: "",
      },
    };
  },
  computed: {
    ...mapGetters(["posts", "loggedUser", "selectedUser"]),
    userPost() {
      return this.posts.filter(
        (post) => post.creator._id == this.selectedUser._id
      );
    },
  },
  methods: {
    ...mapActions(["editUserProfile", "getUserProfile"]),
    editBtnClicked() {
      if (this.editMode) {
        this.editUserProfile(this.newProfile);
      }
      this.editMode = !this.editMode;
    },
  },
  created() {
    this.getUserProfile();
  },
};
</script>

<style lang="scss" scoped>
.profile-photo-container {
  position: relative;
  .profile-photo-input {
    position: absolute;
    bottom: 20px;
    right: -20px;
    color: white;
    .mdi-camera::before {
      content: "\F0100";
      color: rgb(6, 197, 255) !important;
    }
  }
}
</style>
