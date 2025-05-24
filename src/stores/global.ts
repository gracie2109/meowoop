import { App } from 'ant-design-vue'
import type { MessageInstance } from 'ant-design-vue/es/message/interface'
import type { ModalStaticFunctions } from 'ant-design-vue/es/modal/confirm'
import type { NotificationInstance } from 'ant-design-vue/es/notification/interface'
import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { DEFAULT_LANGUAGE, DEFAULT_THEME } from '@/contants/app'
import { getLocal, setLocal } from '@/utils/utilsLocal'
import type { AppLanguageType, AppThemeType } from '@/types/app'
import type { Key } from 'ant-design-vue/es/_util/type'

export const useGlobalStore = defineStore('global', () => {
  const message = ref<MessageInstance | null>(null) as Ref<MessageInstance>
  const notification = ref<NotificationInstance | null>(null) as Ref<NotificationInstance>
  const modal = ref<Omit<ModalStaticFunctions, 'warn'> | null>(null) as Ref<
    Omit<ModalStaticFunctions, 'warn'>
  >
  const lang: Ref<string> = ref(getLocal('LOCAL', 'LANGUAGE') ?? DEFAULT_LANGUAGE)
  const theme: Ref<string> = ref(getLocal('LOCAL', 'THEME') ?? DEFAULT_THEME)

  const collapseMenu: Ref<boolean> = ref(getLocal('LOCAL', 'toggle') ?? false)
  const selectedMenu = ref(getLocal('LOCAL', 'menu_current', true) || [])
  const opensMenu = ref(getLocal('LOCAL', 'expand_menus', true) || [])

  ;(() => {
    const staticFunction = App.useApp()
    message.value = staticFunction.message
    modal.value = staticFunction.modal
    notification.value = staticFunction.notification
  })()

  function changeCollapse() {
    collapseMenu.value = !collapseMenu.value
    setLocal('LOCAL', 'toggle', collapseMenu.value)
  }

  function changeLanguage(data: AppLanguageType) {
    lang.value = data
    setLocal('LOCAL', 'LANGUAGE', collapseMenu.value)
  }

  function changeTheme(data: AppThemeType) {
    theme.value = data
    setLocal('LOCAL', 'THEME', theme.value)
  }

  const updateSelectedKey = (keys: Key[]) => {
    setLocal('LOCAL', 'menu_current', keys, true)
  }
  const updateOpenKeys = (keys: Key[]) => {
    setLocal('LOCAL', 'expand_menus', keys, true)
  }

  return {
    message,
    notification,
    modal,
    lang,
    theme,
    collapseMenu,
    selectedMenu,
    opensMenu,
    changeCollapse,
    changeLanguage,
    changeTheme,
    updateSelectedKey,
    updateOpenKeys,
  }
})
