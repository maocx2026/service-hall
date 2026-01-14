import { createRouter, createWebHashHistory } from 'vue-router';

import { beforeEach } from '@/helps/navigation';
import { routes } from './routes';


const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    const mainDom = document.querySelector('.main');
    mainDom.scroll({
      top: 0,
    });
  },
});

router.beforeEach((to, from, next) => {
  beforeEach(to, from, next);
});

export default router;
