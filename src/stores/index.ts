import { createPinia } from 'pinia'
import type { App } from 'vue'

export function setupStore(app: App<Element>) {
  const pinia = createPinia()
  app.use(pinia)
}
export * from './modules'
