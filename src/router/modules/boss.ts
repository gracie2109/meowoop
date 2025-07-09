import { LAYOUT_TYPE } from '@/contants/app'
import BossListView from '@/views/boss/Index.vue'

import { ROUTE_NAME, ROUTER_PATH } from '../route'

const a = [
   {
    path: ROUTER_PATH.BOSS,
    name: ROUTE_NAME.BOSS,
    component: BossListView,
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
