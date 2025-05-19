export const ROUTE_NAME = {
  HOME: 'home',
  PET_SETTING_SERVICES: 'pets-setting/services',
  PET_SETTING_PET_TYPE: 'pets-setting/pet-types',
  PET_CATEGORY: 'pets-setting/pet-category',
  PET_RETAIL_SERVICES: 'pets-setting/pet-services-retail',
  PET_SERVICE_PACK: 'pets-setting/pet-services',
}

export const ROUTER_PATH = {
  HOME: '/',
  PET_SETTING_PET_TYPE: `/admin/${ROUTE_NAME.PET_SETTING_PET_TYPE}`,
  PET_SETTING_SERVICES: `/admin/${ROUTE_NAME.PET_SETTING_SERVICES}`,
  PET_CATEGORY: `/admin/${ROUTE_NAME.PET_CATEGORY}`,
  PET_RETAIL_SERVICES: `/admin/${ROUTE_NAME.PET_RETAIL_SERVICES}`,
  PET_SERVICE_PACK: `/admin/${ROUTE_NAME.PET_SERVICE_PACK}`,
}
