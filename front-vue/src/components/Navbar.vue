<template>
  <div id="nav">
    <router-link to="/user-resume" v-if="position === 'USER'">
      Резюме
    </router-link>
    <router-link to="/company" v-if="position === 'COMPANY'"
      >Компания
    </router-link>
    <router-link to="/company-resume"> Заявки </router-link>
    <a @click="onLogoutClicked"> Выход </a>
  </div>
</template>

<script lang="ts">
import { logoutReq } from "@/network/auth";
export default {
  name: "NavBar",
  computed: {
    position() {
      return localStorage.systemRole;
    },
  },
  methods: {
    async onLogoutClicked() {
      try {
        await logoutReq();
        this.$router.push("/login");
      } catch (error) {
        this.$router.push("/login");
        console.error(error);
      }
    },
  },
};
</script>
