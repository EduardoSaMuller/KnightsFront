import { createRouter, createWebHistory } from 'vue-router';
import HeroTable from '../components/HeroTable.vue';
import KnightTable from "../components/KnightTable"

const routes = [
  { path: '/heroi', component: HeroTable },
  { path: '/', component: KnightTable}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
