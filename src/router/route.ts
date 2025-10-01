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
  DASHBOARD_VIEW: 'dashboard',

  CUSTOMERS: 'customers',
  CUSTOMER_ADDRESS_BOOK: `customer/address-book`,
  CUSTOMER_PET_BOSS: `customer/pet-boss`,

  BOSS: 'boss',
  MEDICAL_BOOKS_BY_PET: 'medical-books-by-petId',
  MEDICAL_BOOKS_BY_OWNER: 'medical-books-by-owner',
  MEDICAL_BOOKS_LOGS: 'logs-medical-books',
  MEDICAL_BOOKS: 'medical-books',
  ROLE: 'role',
  SETTING_INTERFACE: 'setting-web-interface',
  SETTING_BANNER: 'setting-banner',
  SETTING_BANNER_CREATE: 'setting-banner/create',
  SETTING_BANNER_EDIT: 'setting-banner/edit',
  TEST: 'test',
}

export const ROUTER_PATH = {
  HOME: '/',
  TEST: '/test',
  PET_SETTING_PET_TYPE: `/admin/${ROUTE_NAME.PET_SETTING_PET_TYPE}`,
  PET_SETTING_SERVICES: `/admin/${ROUTE_NAME.PET_SETTING_SERVICES}`,
  PET_CATEGORY: `/admin/${ROUTE_NAME.PET_CATEGORY}`,
  PET_SERVICES: `/admin/${ROUTE_NAME.PET_SERVICES}`,
  // price
  PET_SETTING_PRICE_BY_SERVICE: `/admin/${ROUTE_NAME.PET_SETTING_PRICE_BY_SERVICE}`,
  PET_SERVICE_OVERVIEW: `/admin/${ROUTE_NAME.PET_SERVICE_OVERVIEW}`,

  DASHBOARD_LIST: '/admin/dashboards',
  DASHBOARD_VIEW: '/admin/dashboard',

  CUSTOMERS: `/admin/${ROUTE_NAME.CUSTOMERS}`,
  CUSTOMER_ADDRESS_BOOK: `/admin/${ROUTE_NAME.CUSTOMERS}/:user_id/address`,
  CUSTOMER_PET_BOSS: `/admin/${ROUTE_NAME.CUSTOMERS}/:user_id/boss`,

  BOSS: `/admin/${ROUTE_NAME.BOSS}`,
  MEDICAL_BOOKS_BY_PET: `/admin/${ROUTE_NAME.MEDICAL_BOOKS_BY_PET}/:pet_id`,
  MEDICAL_BOOKS_BY_OWNER: `/admin/${ROUTE_NAME.MEDICAL_BOOKS_BY_PET}/:owner_id`,
  MEDICAL_BOOKS: `/admin/${ROUTE_NAME.MEDICAL_BOOKS}/:owner_id/:pet_id`,
  ROLE: `/admin/${ROUTE_NAME.ROLE}`,
  SETTING_INTERFACE: `/admin/${ROUTE_NAME.SETTING_INTERFACE}`,
  SETTING_BANNER: `/admin/${ROUTE_NAME.SETTING_BANNER}`,
  SETTING_BANNER_CREATE: `/admin/${ROUTE_NAME.SETTING_BANNER_CREATE}`,
  SETTING_BANNER_EDIT: `/admin/${ROUTE_NAME.SETTING_BANNER_EDIT}/:banner_id`,
}
