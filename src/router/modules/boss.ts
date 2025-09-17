import { LAYOUT_TYPE } from '@/contants/app'
import BossListView from '@/views/boss/Index.vue'
import MedicalListView from '@/views/boss/medical-books/Index.vue'

import { ROUTE_NAME, ROUTER_PATH } from '../route'

const a = [
  {
    path: ROUTER_PATH.BOSS,
    name: ROUTE_NAME.BOSS,
    component: BossListView,
  },
  {
    path: ROUTER_PATH.MEDICAL_BOOKS_BY_PET,
    name: ROUTE_NAME.MEDICAL_BOOKS_BY_PET,
    component: MedicalListView,
  },
  {
    path: ROUTER_PATH.MEDICAL_BOOKS_BY_OWNER,
    name: ROUTE_NAME.MEDICAL_BOOKS_BY_OWNER,
    component: MedicalListView,
  },
]

const bossRoute = a.map((i) => ({
  ...i,
  meta: {
    layout: LAYOUT_TYPE.ADMIN,
    auth: true,
  },
}))

export default bossRoute
