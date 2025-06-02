import { LAYOUT_TYPE } from '@/contants/app'
import BossView from '@/views/pet-boss/boss/Index.vue'
import UserView from '@/views/pet-boss/users/Index.vue'

import { ROUTE_NAME, ROUTER_PATH } from '../route'

const a = [
  {
    path: ROUTER_PATH.BOSS,
    name: ROUTE_NAME.BOSS,
    component: BossView,
  },
   {
    path: ROUTER_PATH.USERS,
    name: ROUTE_NAME.USERS,
    component: UserView,
  },
]

const petsBossRoute = a.map((i) => ({
  ...i,
  meta: {
    layout: LAYOUT_TYPE.ADMIN,
    auth: true,
  },
}))

export default petsBossRoute
