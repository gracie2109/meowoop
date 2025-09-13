import type { IconCategory } from '@/types/lib'
import type { ComposerTranslation } from 'vue-i18n'
import dayjs from 'dayjs'

export const TABLE_SIZE = ['middle', 'small', 'large'] as const
export const TIME_FORMAT_1 = 'DD-MM-YYYY'
export const TIME_FORMAT_2 = 'DD-MM-YYYY HH:mm:ss'

export const PRESET_OPTION_1 = [
  { label: 'Yesterday', value: dayjs().add(-1, 'd') },
  { label: 'Last Week', value: dayjs().add(-7, 'd') },
  { label: 'Last Month', value: dayjs().add(-1, 'month') },
]

export const PRESET_OPTION_2 = [
  { label: 'Yesterday', value: [dayjs().add(-1, 'd'), dayjs()] },
  { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
  { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
  { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
]



export const COLOR_TYPE = {
  pure: 'pure',
  gradient: 'gradient',
} as const

export const COLOR_PREFIX = {
  LINEAR: 'linear-gradient',
  GRADIENT: 'gradient',
  RGB: 'rgb',
}

export const ICON_PREFIX = {
  pets: 'pets',
  nature: 'nature',
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
