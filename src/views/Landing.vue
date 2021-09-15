<template>
  <v-row class="landing">
    <v-col cols="12" class="d-flex align-center">
      <div class="content mx-auto d-flex flex-column justify-center">
        <h1 class="mb-5 ">Join Oti-chat today.</h1>
        <v-btn
          color="blue"
          class="white--text mb-3"
          @click="$router.push('/signup')"
          >Sign up</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          color="blue"
          class="blue--text"
          outlined
          @click="$router.push('/signin')"
          >Sign in</v-btn
        >
      </div>
    </v-col>
  </v-row>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Landing",
  components: {},
  methods() {},
};
</script>
<style scoped>
.landing {
  height: 100vh;
}
</style>
