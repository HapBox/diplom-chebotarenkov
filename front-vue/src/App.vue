<template>
  <div id="app">
    <component :is="layout"> </component>
  </div>
</template>

<script lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
export default {
  name: "App",
  components: {
    MainLayout,
    AuthLayout,
  },
  // data: () => ({
  //   updateTask: {},
  // }),
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>
