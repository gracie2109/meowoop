import { LAYOUT_TYPE } from '@/contants/app'
import { ROUTE_NAME, ROUTER_PATH } from '@/router/route'
import PetType from '@/views/pets-setting-manager/pet-types/PageTypeIndex.vue'
import PetCategory from '@/views/pets-setting-manager/pet-category/Index.vue'
import PetServiceRetail from '@/views/pets-setting-manager/pet-retail-services/Index.vue'
import PetServices from '@/views/pets-setting-manager/service_packages/Index.vue'

const a = [
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
    path: ROUTER_PATH.PET_RETAIL_SERVICES,
    name: ROUTE_NAME.PET_RETAIL_SERVICES,
    component: PetServiceRetail,
  },
  {
    path: ROUTER_PATH.PET_SERVICE_PACK,
    name: ROUTE_NAME.PET_SERVICE_PACK,
    component: PetServices,
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
