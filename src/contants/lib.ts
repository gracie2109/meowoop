import { ICON_PREFIX, iconPets } from '@/components/Icons/utils'
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

export const DEFAULT_COLOR = 'rgb(252, 192, 46)'
export const DEFAULT_ICON = `${ICON_PREFIX.pets}/${iconPets[0]}`
