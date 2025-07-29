import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TP1 from "@/modules/TP1/TP1.vue";
import CorrectionTp1 from "@/modules/TP1/CorrectionTp1.vue";
import TP2 from "@/modules/TP2/TP2.vue";
import CorrectionTp2 from "@/modules/TP2/correctionTp2.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tp1',
      name: 'tp1',
      component: TP1
    },
    {
      path: '/tp1-correction',
      name: 'tp1-correction',
      component: CorrectionTp1
    },
    {
      path: '/tp2',
      name: 'tp2',
      component: TP2
    },
    {
      path: '/tp2-correction',
      name: 'tp2-correction',
      component: CorrectionTp2
    }
  ]
})

export default router
