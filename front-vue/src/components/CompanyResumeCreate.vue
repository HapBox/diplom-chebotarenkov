<template>
  <h2>Создать заявку</h2>
  <form class="create-card" @submit.prevent="onFormSubmit">
    <div class="form-field">
      <label for="name">Название</label>
      <input v-model="name" id="name" type="text" required />
    </div>
    <div class="form-field">
      <label for="typeResearch">Тип</label>
      <select name="typeResearch" id="typeResearch" v-model="typeResearch">
        <option value="PHARMACEUTICAL">Фармацевтический</option>
        <option value="PSYCHOLOGICAL">Психологический</option>
        <option value="PHYSICAL">Физический</option>
        <option value="SOCIAL">Социальный</option>
      </select>
    </div>
    <div class="form-field">
      <label for="description">Описание</label>
      <input v-model="description" id="description" type="text" required />
    </div>
    <button type="submit">Обновить</button>
  </form>
</template>

<script lang="ts">
import { createCompanyResume } from "@/network/company-resume";

export default {
  name: "LoginPage",
  data: () => ({
    name: "",
    typeResearch: "",
    description: "",
  }),
  methods: {
    redirect() {
      this.$router.push("/registration");
    },
    async onFormSubmit() {
      try {
        const res = await createCompanyResume(this.$data);
        if (res) {
          console.log(res);
        }
      } catch (e: any) {
        console.error(e);
      }
    },
  },
};
</script>
