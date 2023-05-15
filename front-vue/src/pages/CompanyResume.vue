<template>
  <div class="playtest-page">
    <ul>
      <li v-for="resume in resumeList" :key="resume.id" class="task-item">
        <div class="company-name">Компания: {{ resume.company.name }}</div>
        <div class="name">Название: {{ resume.name }}</div>
        <div class="typeResearch">
          Тип исследования: {{ resume.typeResearch }}
        </div>
        <div class="description">Описание: {{ resume.description }}</div>
        <button type="button" class="btn" @click="onClick(resume.id)">
          Откликнуться
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { getCompanyResumeList, sendResponse } from "@/network/company-resume";

export default {
  name: "PlaytestPage",
  data: () => ({
    resumeList: [] as any[],
  }),
  methods: {
    async fetchPlaytestList() {
      try {
        this.resumeList = await getCompanyResumeList();
        console.log(this.resumeList);
      } catch (error) {
        console.error(error);
      }
    },
    async onClick(id: number) {
      try {
        const res = await sendResponse({ companyResumeId: id });
        console.log(res);
      } catch (e) {
        console.error(e);
      }
    },
  },
  async created() {
    this.fetchPlaytestList();
  },
  computed: {
    position() {
      return localStorage.workerPosition;
    },
  },
};
</script>
