
import type { ICommon } from "./common"
export interface ICustomers extends ICommon  {
  name: string
  fullName: string
  email: string
  phone_number: string
  avatar?: unknown
  addressInfo?: unknown[],
  dob?:string | Date
  password: string
  gender: string
}

export const CUSTOMER_PARAMS = {
  displayName: 'name',
  fullName: 'fullName',
  email: 'email',
  phoneNumber: 'phone_number',
  addressInfo: 'addressInfo',
  avartarUrl: 'avatar',
  password: 'password',
  gender: 'gender',
  dob: 'dob'
} as const satisfies Record<string, keyof ICustomers>

