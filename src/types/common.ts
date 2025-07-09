export interface ICommon {
  id: string
  _id?: string
  createdAt: Date | string
  updatedAt: Date | string
}

export type IPfIcon = {
  icon: string
  color: string
}

export const CommonParam = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
} as const satisfies Record<string, keyof ICommon>

export interface IData extends ICommon {
  name: string | Record<string, string>
  [key: string]: unknown
}
