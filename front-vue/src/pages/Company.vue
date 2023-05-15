<template>
  <CompanyInfo />
  <div class="separator">
    <hr />
  </div>
  <CompanyResumeCreate />
  <div class="separator">
    <hr />
  </div>
  <h2>Заявки компании</h2>
  <ul>
    <li v-for="resume in resumeList" :key="resume.id" class="task-item">
      <div class="name">Название: {{ resume.name }}</div>
      <div class="typeResearch">
        Тип исследования: {{ resume.typeResearch }}
      </div>
      <div class="description">Описание: {{ resume.description }}</div>
      <button type="button" class="btn" @click="showModal(resume.id)">
        Отклики
      </button>
      <UserResponse v-show="isModalVisible" @close="closeModal" :list="list" />
    </li>
  </ul>
</template>

<script lang="ts">
import {
  getCompanyResumeListByCompanyId,
  getCompanyResumeListByResumeId,
} from "@/network/company-resume";
import CompanyInfo from "@/components/CompanyInfo.vue";
import CompanyResumeCreate from "@/components/CompanyResumeCreate.vue";
import UserResponse from "@/modals/UserResponse.vue";
import { getCompany } from "@/network/company";

export default {
  data: () => ({
    resumeList: [] as any[],
    list: [] as any[],
    isModalVisible: false,
    companyInfo: {} as any,
  }),
  components: {
    CompanyInfo,
    CompanyResumeCreate,
    UserResponse,
  },
  methods: {
    async fetchCompanyResumeList() {
      try {
        this.resumeList = await getCompanyResumeListByCompanyId(
          this.companyInfo.id
        );
        console.log(this.resumeList);
      } catch (error) {
        console.error(error);
      }
    },
    async showModal(id: number) {
      this.isModalVisible = true;
      try {
        const res = await getCompanyResumeListByResumeId(id);
        this.list = res.userResumeList;
        console.log(this.list);
      } catch (e) {
        console.error(e);
      }
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
  async created() {
    try {
      this.companyInfo = await getCompany();
    } catch (error: any) {
      if (error) {
        console.error(error);
      }
    }
    this.fetchCompanyResumeList();
  },
  computed: {
    position() {
      return localStorage.workerPosition;
    },
  },
};
</script>
