import { useEventBus } from '@vueuse/core'

export const useLocaleEventBus = () => {
  const bus = useEventBus<string>('locale-changed')

  const emitLocaleChange = (locale: string) => {
    bus.emit(locale)
  }

  const onLocaleChanged = (callback: () => void) => {
    const unsubscribe = bus.on(callback)
    return unsubscribe
  }

  return {
    emitLocaleChange,
    onLocaleChanged,
  }
}
