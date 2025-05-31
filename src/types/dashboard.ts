import type { ICommon } from '@/types/common'

export type TDashboardForm = {
  name: string
  uuid?: string
  description: string
  status?: boolean
}

export type TDashboard = TDashboardForm & ICommon
export const DashboardParams = {
  name: 'name',
  desc: 'description',
  status: 'status',
} as const satisfies Record<string, keyof TDashboardForm>
