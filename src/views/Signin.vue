<template>
  <v-container>
    <v-card class="col-6 mx-auto">
      <v-card-title>Sign In</v-card-title>
      <v-form :lazy-validation="false" ref="loginForm" v-model="valid">
        <v-text-field
          label="Username"
          prepend-icon="mdi-account"
          v-model="username"
          :rules="[rules.required]"
        ></v-text-field>
        <v-text-field
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          :rules="[rules.required, rules.minLen]"
        ></v-text-field>
      </v-form>
      <v-card-actions>
        <v-btn color="blue" class="white--text" @click="onLoginSubmit"
          >Login</v-btn
        >
        <small class="ml-3">
          Need an account?
          <a @click="$router.push('/signup')">Register</a>
        </small>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    valid: false,
    username: "",
    password: "",
    showPassword: false,
    rules: {
      required: (v) => !!v || "This field is required",
    },
  }),
  methods: {
    ...mapActions(["login"]),
    onLoginSubmit() {
      this.$refs.loginForm.validate();
      if (this.valid) {
        const user = {
          username: this.username,
          password: this.password,
        };
        this.login(user).then((res) => {
          console.log(res.data)
          if (res.data.success) this.$router.push("/home");
        });
      }
    },
  },
};
</script>

<style></style>
