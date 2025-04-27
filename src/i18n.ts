import { createI18n } from 'vue-i18n'
import { ref } from 'vue'
import { getLocal, setLocal } from './utils/utilsLocal'
import { DEFAULT_LANGUAGE, LANGUAGES } from './contants/app'

function loadLocaleMessages() {
  const locales = import.meta.glob('@/locales/**/!(index).{json,ts}', { eager: true })
  const messages: any = {}

  for (const path in locales) {
    const matched = path.match(/locales\/([a-z0-9-_]+)\/([a-z0-9-_]+)\.(json|ts)$/i)

    if (matched) {
      const locale = matched[1] // en, vi
      const module = matched[2] // common, menu

      if (!messages[locale]) {
        messages[locale] = {}
      }

      messages[locale][module] = (locales[path] as any).default
    }
  }

  return messages
}

function getDefaultLocale() {
  const savedLocale = getLocal('LOCAL', 'LANGUAGE')
  if (savedLocale && LANGUAGES.includes(savedLocale)) {
    return savedLocale
  }
  return DEFAULT_LANGUAGE
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getDefaultLocale(),
  fallbackLocale: DEFAULT_LANGUAGE,
  messages: loadLocaleMessages(),
})

export const currentLocale = ref(i18n.global.locale.value)

export async function changeLanguage(locale: string) {
  if (!LANGUAGES.includes(locale)) {
    console.warn(`Locale ${locale} is not supported.`)
    return
  }
  i18n.global.locale.value = locale
  currentLocale.value = locale
  setLocal('LOCAL', 'LANGUAGE', locale)
}

export default i18n
