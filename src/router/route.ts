export const ROUTE_NAME = {
  HOME: 'home',
  PET_SETTING_SERVICES: 'pets-setting/services',
  PET_SETTING_PET_TYPE: 'pets-setting/pet-types',
}

export const ROUTER_PATH = {
  HOME: '/',
  PET_SETTING_PET_TYPE: `/admin/${ROUTE_NAME.PET_SETTING_PET_TYPE}`,
  PET_SETTING_SERVICES: `/admin/${ROUTE_NAME.PET_SETTING_SERVICES}`,
}
