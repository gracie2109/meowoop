import { LAYOUT_TYPE } from '@/contants/app'
import { ROUTE_NAME, ROUTER_PATH } from '@/router/route'
import PetService from '@/views/pets-setting-manager/pet-services/index.vue'
import PetType from '@/views/pets-setting-manager/pet-types/index.vue'

const a = [
  {
    path: ROUTER_PATH.PET_SETTING_SERVICES,
    name: ROUTE_NAME.PET_SETTING_SERVICES,
    component: PetService,
  },
  {
    path: ROUTER_PATH.PET_SETTING_PET_TYPE,
    name: ROUTE_NAME.PET_SETTING_PET_TYPE,
    component: PetType,
  },
]

const petsRoute = a.map((i) => ({
  ...i,
  meta: {
    layout: LAYOUT_TYPE.ADMIN,
    auth: true,
  },
}))

export default petsRoute
