import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
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
        layout: LAYOUT_TYPE.ADMIN,
      },
    },
    ...petModule,
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
