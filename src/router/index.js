import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ApplyView from '../views/ApplyView.vue'
import ApplyHistoryView from '../views/ApplyHistoryView.vue'
import ApplyDetailView from '../views/ApplyDetailView.vue'
import BigbuyerFinderView from '../views/BigbuyerFinderView.vue'
import BigbuyerHistoryView from '../views/BigbuyerHistoryView.vue'
import BigbuyerSendView from '../views/BigbuyerSendView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',                   component: HomeView },
    { path: '/apply',              component: ApplyView },
    { path: '/apply/history',      component: ApplyHistoryView },
    { path: '/apply/detail',       component: ApplyDetailView },
    { path: '/bm/big-data',    component: BigbuyerFinderView },
    { path: '/bigbuyer/history',   component: BigbuyerHistoryView },
    { path: '/bm/push',      component: BigbuyerSendView },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
