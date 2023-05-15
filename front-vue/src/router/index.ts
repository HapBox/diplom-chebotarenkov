import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Registration from "../pages/Registration.vue";
import UserResume from "../pages/UserResume.vue";
import CompanyResume from "../pages/CompanyResume.vue";
import Company from "../pages/Company.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      meta: {
        title: "Авторизация",
        layout: "auth-layout",
      },
      component: Login,
    },
    {
      path: "/registration",
      name: "registartion",
      meta: {
        title: "Регистрация",
        layout: "auth-layout",
      },
      component: Registration,
    },
    {
      path: "/user-resume",
      name: "user-resume",
      meta: {
        title: "Анкета пользователя",
        layout: "main-layout",
      },
      component: UserResume,
    },
    {
      path: "/company-resume",
      name: "company-resume",
      meta: {
        title: "Заявки компаний",
        layout: "main-layout",
      },
      component: CompanyResume,
    },
    {
      path: "/company",
      name: "company",
      meta: {
        title: "Информация о компании",
        layout: "main-layout",
      },
      component: Company,
    },
  ],
});

export default router;
