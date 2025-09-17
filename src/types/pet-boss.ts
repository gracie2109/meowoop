import { type Dayjs } from 'dayjs'
import type { ICommon } from './common'

interface IProfile {
  dob: Date | string | null | Dayjs
  breed: string
  gender: number | string
  hometown: string
}
export interface IPetBoss extends ICommon {
  _id: string
  name: string
  owner_id: string | null
  owner_info: ICommon
  animal_type_info: ICommon
  animal_type?: string | null
  profile_data: IProfile
  indentifycation_card: {
    qr_code: string
    created_at: Date | string | null
    code: string
  }
  regiser_card: boolean
  health_book: string
  avatar: unknown
  [key: string]: unknown
}

export const PET_BOSS_PARAMS = {
  name: 'name',
  owner_id: 'owner_id',
  animal_type: 'animal_type',
  profile_data: 'profile_data',
  gender: 'gender',
  dob: 'dob',
  breed: 'breed',
  hometown: 'hometown',

  avatar: 'avatar',
} as const satisfies Record<string, keyof IPetBoss>

export interface IMedicalParams {
  owner_id?: string
  pet_id?: string
}

export const MEDICAL_PARAMS = {
  owner_id: 'owner_id',
  pet_id: 'pet_id',
} as const satisfies Record<string, keyof IMedicalParams>
