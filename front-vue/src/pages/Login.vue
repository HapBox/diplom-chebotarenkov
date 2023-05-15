<template>
  <form class="auth-form" @submit.prevent="onFormSubmit">
    <div class="form-field">
      <label for="login">Логин</label>
      <input v-model="login" id="login" type="text" required />
    </div>
    <div class="form-field">
      <label for="password">Пароль</label>
      <input v-model="password" id="password" type="password" required />
    </div>
    <div>
      <span style="color: red"> {{ errorMessage }} </span>
    </div>
    <button type="submit">Войти</button>
  </form>
  <div class="action-link">
    <span>Нет аккаунта? </span>
    <a class="link-btn" @click="redirect">Зарегистрироваться</a>
  </div>
</template>

<script lang="ts">
import { loginReq } from "@/network/auth";

export default {
  name: "LoginPage",
  data: () => ({
    errorMessage: "",
    login: "",
    password: "",
  }),
  methods: {
    redirect() {
      this.$router.push("/registration");
    },
    async onFormSubmit() {
      try {
        const token = await loginReq({
          email: this.login.trim(),
          password: this.password.trim(),
        });
        if (token) {
          this.$router.push("/company-resume");
        }
      } catch (e: any) {
        this.errorMessage = e.response.data.message;
        console.error(e);
      }
    },
  },
};
</script>
