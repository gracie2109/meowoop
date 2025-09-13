import { LAYOUT_TYPE } from '@/contants/app'
import RolesView from "@/views/iam/roles/Index.vue"
import { ROUTE_NAME, ROUTER_PATH } from '../route'

const a = [
   {
    path: ROUTER_PATH.ROLE,
    name: ROUTE_NAME.ROLE,
    component: RolesView,
  },
]

const IAMRoute = a.map((i) => ({
  ...i,
  meta: {
    layout: LAYOUT_TYPE.ADMIN,
    auth: true,
  },
}))

export default IAMRoute
