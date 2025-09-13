import type { Composer } from 'vue-i18n'

export const DEFAULT_RATIO = (t: Composer['t']) => [
  { label: t('assets.image_ratio', { name: '1:1' }), value: '1:1', ratio: 1 },
  { label: t('assets.image_ratio', { name: '3:4' }), value: '3:4', ratio: 3 / 4 },
  { label: t('assets.image_ratio', { name: '4:3' }), value: '4:3', ratio: 4 / 3 },
  { label: t('assets.image_ratio', { name: '16:9' }), value: '16:9', ratio: 16 / 9 },
  { label: t('assets.image_ratio_free'), value: 'free', ratio: 0 },
]
