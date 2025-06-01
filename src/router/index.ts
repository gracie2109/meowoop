import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/Dashboard/Index.vue'
import DashboardListView from '@/views/Dashboard/dashboard/Index.vue'
import HomeView from '@/views/Home.vue'

import ErrorPage from '@/views/ErrorPage.vue'
import { LAYOUT_TYPE } from '@/contants/app'
import { ROUTE_NAME } from '@/router/route'
import petModule from '@/router/modules/pets'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTE_NAME.HOME,
      component: HomeView,
      meta: {
        layout: LAYOUT_TYPE.CLIENT,
      },
    },
    ...petModule,
    {
      path: '/dashboard',
      name: ROUTE_NAME.DASHBOARD_LIST,
      component: DashboardView,
      meta: {
        layout: LAYOUT_TYPE.ADMIN,
      },
    },
    {
      path: '/dashboard-list',
      name: ROUTE_NAME.DASHBOARD_LIST,
      component: DashboardListView,
      meta: {
        layout: LAYOUT_TYPE.ADMIN,
      },
    },

    {
      path: '/:pathMatch(.*)*',
      meta: {
        layout: LAYOUT_TYPE.NO_LAYOUT,
      },
      component: ErrorPage,
      props: () => ({ code: '404' }),
    },
  ],
})

export default router
