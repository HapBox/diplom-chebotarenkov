<template>
  <form class="auth-form" @submit.prevent="onFormSubmit">
    <div class="form-field">
      <label for="login">Почта</label>
      <input v-model="login" id="login" type="text" required />
    </div>
    <div class="form-field">
      <label for="password">Имя</label>
      <input v-model="name" id="name" type="text" required />
    </div>
    <div class="form-field">
      <label for="password">Фамилия</label>
      <input v-model="surname" id="surname" type="text" required />
    </div>
    <div class="form-field">
      <label for="password">Роль</label>
      <select name="systemRole" id="systemRole" v-model="systemRole">
        <option value="USER">Пользователь</option>
        <option value="COMPANY">Компания</option>
      </select>
    </div>
    <div class="form-field">
      <label for="password">Пароль</label>
      <input v-model="password" id="password" type="password" required />
    </div>
    <div>
      <span style="color: red"> {{ errorMessage }} </span>
    </div>
    <button type="submit">Зарегистрироваться</button>
  </form>
  <div class="action-link">
    <span>Есть аккаунт? </span>
    <a class="link-btn" @click="redirect">Зарегистрироваться</a>
  </div>
</template>

<script lang="ts">
import { registrationReq } from "@/network/auth";

export default {
  name: "LoginPage",
  data: () => ({
    errorMessage: "",
    login: "",
    password: "",
    name: "",
    surname: "",
    systemRole: "",
  }),
  methods: {
    redirect() {
      this.$router.push("/login");
    },
    async onFormSubmit() {
      try {
        const token = await registrationReq({
          email: this.login.trim(),
          password: this.password.trim(),
          name: this.name.trim(),
          surname: this.surname.trim(),
          systemRole: this.systemRole.trim(),
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
