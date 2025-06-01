export const ROUTE_NAME = {
  HOME: 'home',
  PET_SETTING_SERVICES: 'pets-setting/services',
  PET_SETTING_PET_TYPE: 'pets-setting/pet-types',
  PET_CATEGORY: 'pets-setting/pet-category',
  PET_SERVICES: 'pets-setting/pet-services',
  // price
  PET_SETTING_PRICE_BY_SERVICE: 'pets-setting/price-by-service',
  PET_SERVICE_OVERVIEW: 'pets-setting/price-by-service/overview',

  DASHBOARD_LIST: 'dashboards',
}

export const ROUTER_PATH = {
  HOME: '/',
  PET_SETTING_PET_TYPE: `/admin/${ROUTE_NAME.PET_SETTING_PET_TYPE}`,
  PET_SETTING_SERVICES: `/admin/${ROUTE_NAME.PET_SETTING_SERVICES}`,
  PET_CATEGORY: `/admin/${ROUTE_NAME.PET_CATEGORY}`,
  PET_SERVICES: `/admin/${ROUTE_NAME.PET_SERVICES}`,
  // price
  PET_SETTING_PRICE_BY_SERVICE: `/admin/${ROUTE_NAME.PET_SETTING_PRICE_BY_SERVICE}`,
  PET_SERVICE_OVERVIEW: `/admin/${ROUTE_NAME.PET_SERVICE_OVERVIEW}`,

  DASHBOARD_LIST: 'dashboards',
}
