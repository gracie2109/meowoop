import type { ICommon, IPfIcon } from './common'

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
