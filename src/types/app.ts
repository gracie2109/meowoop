import { APP_THEMES, LOCAL_STR_PARAMS, WINDOW_STORAGE, APP_LANGUAGES } from '@/contants/app'

export type StorageType = keyof typeof WINDOW_STORAGE
export type LocalParamType = keyof typeof LOCAL_STR_PARAMS
export type AppThemeType = keyof typeof APP_THEMES
export type AppLanguageType = keyof typeof APP_LANGUAGES
