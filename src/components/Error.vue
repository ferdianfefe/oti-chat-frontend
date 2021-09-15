<template>
  <v-alert class="ma-5 col-6 mx-auto" type="error" dense dismissible>{{error}}</v-alert>
</template>

<script>
export default {
  name: "Error",
  props: ["error"],
};
</script>

<style>
</style>