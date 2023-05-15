<template>
  <form class="auth-form" @submit.prevent="onFormSubmit">
    <div class="form-field">
      <label for="name">Название компании</label>
      <input v-model="name" id="name" type="text" required />
    </div>
    <button type="submit">Обновить</button>
  </form>
</template>

<script lang="ts">
import { createCompany, getCompany, updateCompany } from "@/network/company";

export default {
  name: "LoginPage",
  data: () => ({
    isNew: true,
    id: 0,
    name: "",
  }),
  methods: {
    async onFormSubmit() {
      try {
        let res: any;
        if (this.isNew) res = await createCompany(this.$data);
        else res = await updateCompany(this.$data);
        if (res) {
          console.log(res);
        }
      } catch (e: any) {
        console.error(e);
      }
    },
  },
  async created() {
    try {
      const res = await getCompany();
      if (res) this.isNew = false;
      console.log(res);

      this.id = res.id;
      this.name = res.name;

      console.log(JSON.stringify(this.$data));
    } catch (error: any) {
      if (error) {
        console.error(error);
      }
    }
  },
};
</script>
