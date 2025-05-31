import type { ICommon, IData, IPfIcon } from './common'

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
  description: FieldMultiLang
  category_id: string
  pet_type_ids: string[]
  price?: number
  duration?: number
  category_data?: Partial<TPetCategory>
  pet_target_data?: Partial<TPetType>[] 
}
export type IPetService = IPetServiceForm & ICommon
export type IPetServiceDetail = IPetService & {
  pet_service_data?: unknown,
  pet_types_info?: Partial<TPetType>[]
}
export const IPetServiceParams = {
  name: 'name',
  desc: 'description',
  category_id: 'category_id',
  pet_type_ids: 'pet_type_ids',
  price: 'price',
  duration: 'duration',
} as const satisfies Record<string, keyof IPetServiceForm>

// service-price
export type IPetServicerPriceParam = {
  pet_id?: string
  service_id?: string
  isAllService?: boolean
  isAllPets?: boolean
}
export type IPetServicerPriceResponse = {
  pet_data?: TPetType
  service_data?: IPetService
  pets?: TPetType[]
  services?: IPetService[]
}
export const PetServicerPriceParam = {
  pet_id: 'pet_id',
  service_id: 'service_id',
  is_all_service: 'isAllService',
  is_all_pets: 'isAllPets',
} as const satisfies Record<string, keyof IPetServicerPriceParam>
