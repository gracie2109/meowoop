import { LAYOUT_TYPE } from '@/contants/app'
import CustomersView from '@/views/customers/Index.vue'

import { ROUTE_NAME, ROUTER_PATH } from '../route'

const a = [
   {
    path: ROUTER_PATH.CUSTOMERS,
    name: ROUTE_NAME.CUSTOMERS,
    component: CustomersView,
  },
]

const customerRoute = a.map((i) => ({
  ...i,
  meta: {
    layout: LAYOUT_TYPE.ADMIN,
    auth: true,
  },
}))

export default customerRoute
