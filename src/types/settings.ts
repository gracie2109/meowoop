import type { IPfIcon } from "./common"

export interface Socical {
  name: string
  link: string
  id: string
  icon: IPfIcon
}

export interface ISettingInterface {
  name: string
  description: string
  logo: unknown
  favicon: unknown
  address: unknown
  _id: string
  socials: Socical[]
}

export const SETTING_INTERFACE = {
  name: 'name',
  description: 'description',
  logo: 'logo',
  favicon: 'favicon',
  address: 'address',
  socials: 'socials',
} as const satisfies Record<string, keyof ISettingInterface>

export const SOCIAL_PARAMS = {
  name: 'name',
  link: 'link',
  icon: 'icon'
} as const satisfies Record<string, keyof Socical>
