<template>
  <form class="auth-form" @submit.prevent="onFormSubmit">
    <div class="form-field">
      <label for="citizenship">Гражданство</label>
      <input v-model="citizenship" id="citizenship" type="text" required />
    </div>
    <div class="form-field">
      <label for="height">Высота</label>
      <input id="height" type="number" v-model="height" required />
    </div>
    <div class="form-field">
      <label for="weight">Вес</label>
      <input v-model="weight" id="weight" type="number" required />
    </div>
    <div class="form-field">
      <label for="age">Возраст</label>
      <input v-model="age" id="age" type="number" required />
    </div>
    <div class="form-field">
      <label for="description">Описание</label>
      <input v-model="description" id="description" type="text" required />
    </div>
    <button type="submit">Обновить</button>
  </form>
</template>

<script lang="ts">
import {
  createResume,
  getUserResume,
  updateResume,
} from "@/network/user-resume";

export default {
  name: "LoginPage",
  data: () => ({
    isNew: true,
    id: 0,
    citizenship: "",
    height: "",
    weight: "",
    age: "",
    description: "",
  }),
  methods: {
    redirect() {
      this.$router.push("/registration");
    },
    async onFormSubmit() {
      try {
        let res: any;
        if (this.isNew) res = await createResume(this.$data);
        else res = await updateResume(this.$data);
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
      const res = await getUserResume();
      this.isNew = false;
      console.log(res);

      this.id = res.id;
      this.citizenship = res.citizenship;
      this.height = res.height;
      this.weight = res.weight;
      this.age = res.age;
      this.description = res.description;

      console.log(JSON.stringify(this.$data));
    } catch (error: any) {
      if (error) {
        console.error(error);
      }
    }
  },
};
</script>
