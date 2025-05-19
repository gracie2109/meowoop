import type { ICommon, IPfIcon } from './common'

export type FieldMultiLang = {
  vi: string
  en: string
}

export const FieldMultiLangParam = {
  vi: 'vi',
  en: 'en',
}

// types
export type TPetTypeForm = {
  name: string
  uuid?: string
  description: string
  icon: IPfIcon
  status?: boolean
}

export type TPetType = TPetTypeForm & ICommon

export const PetTypeParams = {
  name: 'name',
  desc: 'description',
  icon: 'icon',
  status: 'status',
} as const satisfies Record<string, keyof TPetType>

// category
export type TPetCategoryForm = {
  name: FieldMultiLang
  description: FieldMultiLang
}

export type TPetCategory = TPetCategoryForm & ICommon
export const PetCategoryParams = {
  name: 'name',
  desc: 'description',
} as const satisfies Record<string, keyof TPetCategoryForm>


// services

export type IPetServiceForm = {
  name: FieldMultiLang
  description: FieldMultiLang,
  category_id: string | null,
  pet_type_ids: string[]  | null,
  price: number,
  duration:number,
  isRetail?:boolean,
  category_data?:Partial<TPetCategory>,
  pet_target_data?:Partial<TPetType>[]
}
export type IPetService = IPetServiceForm & ICommon
export const IPetServiceParams = {
  name: 'name',
  desc: 'description',
  category_id: 'category_id',
  pet_type_ids:'pet_type_ids',
  price:'price',
  duration: 'duration',
} as const satisfies Record<string, keyof IPetServiceForm>
