import { App } from 'ant-design-vue'
import type { MessageInstance } from 'ant-design-vue/es/message/interface'
import type { ModalStaticFunctions } from 'ant-design-vue/es/modal/confirm'
import type { NotificationInstance } from 'ant-design-vue/es/notification/interface'
import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { DEFAULT_LANGUAGE, DEFAULT_THEME } from '@/contants/app'
import { getLocal, setLocal } from '@/utils/utilsLocal'
import type { AppLanguageType, AppThemeType } from '@/types/app'

export const useGlobalStore = defineStore('global', () => {
  const message: Ref<MessageInstance> = ref()
  const notification: Ref<NotificationInstance> = ref()
  const modal: Ref<Omit<ModalStaticFunctions, 'warn'>> = ref()
  const lang: Ref<string> = ref(getLocal('LOCAL', 'LANGUAGE') ?? DEFAULT_LANGUAGE)
  const theme: Ref<string> = ref(getLocal('LOCAL', 'THEME') ?? DEFAULT_THEME)

  const collapseMenu: Ref<boolean> = ref(getLocal('LOCAL', 'EXPAND_MENU'))

  ;(() => {
    const staticFunction = App.useApp()
    message.value = staticFunction.message
    modal.value = staticFunction.modal
    notification.value = staticFunction.notification
  })()

  function changeCollapse() {
    collapseMenu.value = !collapseMenu.value
    setLocal('LOCAL', 'EXPAND_MENU', collapseMenu.value)
  }

  function changeLanguage(data: AppLanguageType) {
    lang.value = data
    setLocal('LOCAL', 'LANGUAGE', collapseMenu.value)
  }

  function changeTheme(data: AppThemeType) {
    theme.value = data
    setLocal('LOCAL', 'THEME', theme.value)
  }

  return {
    message,
    notification,
    modal,
    lang,
    theme,
    collapseMenu,
    changeCollapse,
    changeLanguage,
    changeTheme,
  }
})
