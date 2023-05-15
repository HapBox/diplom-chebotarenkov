<template>
  <div class="main-layout">
    <NavBar />
    <h2 class="page-title">
      {{ $route.meta.title }}
    </h2>
    <div class="page-container">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from "@/components/Navbar.vue";
export default {
  name: "MainLayout",
  components: {
    NavBar,
  },
};
</script>
