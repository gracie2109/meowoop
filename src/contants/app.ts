export const DEFAULT_LANGUAGE = 'vi'
export const DEFAULT_THEME = 'light'

export const LAYOUT_TYPE = {
  CLIENT: 'client',
  ADMIN: 'admin',
  NO_LAYOUT: 'noLayout',
}

export const WINDOW_STORAGE = {
  LOCAL: 'localStorage',
  SESSION: 'sessionStorage',
  COOKIE: 'cookieStorage',
} as const

export const LOCAL_STR_PARAMS = {
  toggle: 'expand_menu',
  LANGUAGE: 'language',
  THEME: 'theme',
  menu_current: 'menu_current',
  expand_menus: 'expand_menus',
  current_dashboard:'current_dashboard'
} as const

export const APP_LANGUAGES = {
  VI: 'vi',
  EN: 'en',
} as const

export const LANGUAGES = ['vi', 'en']

export const APP_THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const
