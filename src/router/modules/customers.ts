import { LAYOUT_TYPE } from '@/contants/app'
import CustomersView from '@/views/customers/Index.vue'
import CustomersAddressBooksView from '@/views/customers/address-books/Index.vue'
import CustomersBossView from '@/views/customers/boss/Index.vue'

import { ROUTE_NAME, ROUTER_PATH } from '../route'

const a = [
  {
    path: ROUTER_PATH.CUSTOMERS,
    name: ROUTE_NAME.CUSTOMERS,
    component: CustomersView,
  },
  {
    path: ROUTER_PATH.CUSTOMER_ADDRESS_BOOK,
    name: ROUTE_NAME.CUSTOMER_ADDRESS_BOOK,
    component: CustomersAddressBooksView,
  },
  {
    path: ROUTER_PATH.CUSTOMER_PET_BOSS,
    name: ROUTE_NAME.CUSTOMER_PET_BOSS,
    component: CustomersBossView,
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
