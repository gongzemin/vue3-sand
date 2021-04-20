import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'DECoreViewer',
    component: () => import(/* webpackChunkName: "sand" */ '../views/DECoreViewer.vue'),
  },
  {
    path: '/sand',
    name: 'DECoreViewer',
    component: () => import(/* webpackChunkName: "sand" */ '../views/DECoreViewer.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
