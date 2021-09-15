<template>
  <v-card>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          Home
        </div>
        <v-list-item-title v-if="!editMode" class="text-h5 mb-1">
          <h1>OTI-CHAT</h1>
        </v-list-item-title>
        <v-list-item-title v-if="!editMode" class="text-h5 mb-1">
          <h3>Connecting people</h3>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-view-dashboard" },
        { title: "About", icon: "mdi-forum" },
      ],
    };
  },
};
</script>
<style scoped>
.content-container {
  height: 100%;
}
</style>
