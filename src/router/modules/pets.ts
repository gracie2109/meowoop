import { LAYOUT_TYPE } from '@/contants/app'
import { ROUTE_NAME, ROUTER_PATH } from '@/router/route'
import PetService from '@/views/pets-setting-manager/pet-services/Index.vue'
import PetType from '@/views/pets-setting-manager/pet-types/PageTypeIndex.vue'
import PetCategory from '@/views/pets-setting-manager/pet-category/Index.vue'
import PetServices from '@/views/pets-setting-manager/pet-services/Index.vue'
import PetServicesPrice from '@/views/pets-setting-manager/pet-service-price/Index.vue'

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
  {
    path: ROUTER_PATH.PET_CATEGORY,
    name: ROUTE_NAME.PET_CATEGORY,
    component: PetCategory,
  },
  {
    path: ROUTER_PATH.PET_CATEGORY,
    name: ROUTE_NAME.PET_CATEGORY,
    component: PetCategory,
  },
  {
    path: ROUTER_PATH.PET_SERVICES,
    name: ROUTE_NAME.PET_SERVICES,
    component: PetServices,
  },
  {
    path: ROUTER_PATH.PET_SETTING_PRICE_BY_SERVICE,
    name: ROUTE_NAME.PET_SETTING_PRICE_BY_SERVICE,
    component: PetServicesPrice,
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
