import { COLOR_PREFIX, COLOR_TYPE } from '@/contants/lib'
import type { ColorInputWithoutInstance } from 'tinycolor2'

export const getColorType = (color: string | ColorInputWithoutInstance | undefined) => {
  if (!color) return COLOR_TYPE.pure
  return color.toString().split('(')[0]?.includes(COLOR_PREFIX.RGB)
    ? COLOR_TYPE.pure
    : COLOR_TYPE.gradient
}
