<template>
  <v-container>
    <v-card class="col-6 mx-auto">
      <v-card-title>Sign Up</v-card-title>
      <v-form v-model="valid" :lazy-validation="false" ref="registerForm">
        <v-text-field
          label="Email"
          prepend-icon="mdi-account"
          v-model="email"
          :rules="[rules.required, rules.email]"
        ></v-text-field>
        <v-text-field
          label="Name"
          prepend-icon="mdi-account"
          v-model="name"
          :rules="[rules.required]"
        ></v-text-field>
        <v-text-field
          label="Username"
          prepend-icon="mdi-account"
          v-model="username"
          :rules="[rules.required]"
        ></v-text-field>
        <v-text-field
          min="8"
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          :type="showPassword ? 'text' : 'password'"
          hint="At least 8 character"
          v-model="password"
          :rules="[rules.minLen, rules.required]"
        ></v-text-field>
        <v-text-field
          label="Repeat Password"
          prepend-icon="mdi-lock"
          :append-icon="showRepeatPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showRepeatPassword = !showRepeatPassword"
          :type="showRepeatPassword ? 'text' : 'password'"
          v-model="confirmPassword"
          :rules="[
            () => confirmPassword === password || 'Password must match',
            rules.required,
          ]"
        ></v-text-field>
      </v-form>
      <v-card-actions>
        <v-btn color="blue" class="white--text" @click="onSubmitRegister"
          >Register</v-btn
        >
        <small class="ml-3">
          Already had an account?
          <a @click="$router.push('/signin')">Login</a>
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
    email: "",
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showRepeatPassword: false,
    rules: {
      minLen: (v) => v.length >= 8 || "Should be at least 8 characters",
      required: (v) => !!v || "This field is required",
      email: (v) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(v) || "Invalid email";
      },
    },
  }),
  methods: {
    ...mapActions(["register"]),
    onSubmitRegister() {
      this.$refs.registerForm.validate();
      if (this.valid) {
        const newUser = {
          email: this.email,
          name: this.name,
          username: this.username,
          password: this.password,
          confirmPassword: this.confirmPassword,
        };

        this.register(newUser)
          .then((res) => {
            if (res) this.$router.push("/signin");
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>

<style></style>
