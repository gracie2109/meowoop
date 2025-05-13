import type { TABLE_SIZE, COLOR_TYPE, ICON_PREFIX } from '@/contants/lib'
import type { NamePath, RuleObject } from 'ant-design-vue/es/form/interface'
import type { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'

export type AntdTableSize = (typeof TABLE_SIZE)[number]

export type ColorType = keyof typeof COLOR_TYPE

export type IconSourceType = keyof typeof ICON_PREFIX

export interface IconCategory {
  key: IconSourceType
  label: string
}

type ValidateInfos = Record<
  string,
  {
    validateStatus?: 'success' | 'warning' | 'error' | 'validating'
    help?: string
  }
>

export interface InjectedFormContext {
  validateInfos: ValidateInfos
  validate?: (
    name?: NamePath,
    options?: { trigger?: string },
  ) => Promise<void | ValidateErrorEntity>
  resetFields?: (name?: NamePath) => void
}

type OptionType = {
  value: string | number
  label: string
  disabled?: boolean
  key?: string | number
  title?: string
}

export type AntdOptionsType = OptionType[]

export interface AntdComponentProps {
  name: string
  placeholder?: string
  label: string
  rules?: RuleObject | RuleObject[] | undefined
  isRequired?: boolean
  modelValue: string | number | undefined | null
}


export type TSearch = {
  search_text: string,
  [key: string]: unknown,
}