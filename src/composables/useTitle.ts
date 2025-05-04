import { watch, onBeforeUnmount } from 'vue'
import { useTitle as setTitle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

let stopWatcher: (() => void) | null = null

export const useDynamicTitle = (titleKey: string, template = '%s | PET HEAVEN') => {
  const { t, locale } = useI18n()

  if (stopWatcher) stopWatcher()

  const stop = watch(
    () => [titleKey, locale.value],
    () => {
      const title = t(titleKey)
      setTitle(title, { titleTemplate: template })
    },
    { immediate: true },
  )

  stopWatcher = stop

  onBeforeUnmount(() => {
    stop()
    stopWatcher = null
  })
}
export default useDynamicTitle
