import type { TABLE_SIZE, COLOR_TYPE, ICON_PREFIX } from '@/contants/lib'

export type AntdTableSize = (typeof TABLE_SIZE)[number]

export type ColorType = keyof typeof COLOR_TYPE

export type IconSourceType = keyof typeof ICON_PREFIX

export interface IconCategory {
  key: IconSourceType
  label: string
}
