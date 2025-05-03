import type { IconCategory } from '@/types/lib'
import type { ComposerTranslation } from 'vue-i18n'

export const TABLE_SIZE = ['middle', 'small', 'large'] as const

export const ICON_PREFIX = {
  pets: 'pets',
  nature: 'nature',
}

export const COLOR_TYPE = {
  pure: 'pure',
  gradient: 'gradient',
} as const

export const COLOR_PREFIX = {
  LINEAR: 'linear-gradient',
  GRADIENT: 'gradient',
  RGB: 'rgb',
}
export const iconPets = Array.from({ length: 21 }, (_, i) => `${ICON_PREFIX.pets}_${i + 1}`)
export const iconNature = Array.from({ length: 1 }, (_, i) => `${ICON_PREFIX.nature}_${i + 1}`)

export const DEFAULT_ICON = `${ICON_PREFIX.pets}/${iconPets[0]}`
export const DEFAULT_COLOR = 'rgb(252, 192, 46)'

export const ICON_SOURCES = (t: ComposerTranslation): IconCategory[] => [
  {
    key: 'pets',
    label: t('common.ic_source_1'),
  },
  {
    key: 'nature',
    label: t('common.ic_source_2'),
  },
]
