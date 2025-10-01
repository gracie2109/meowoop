import { API_ROUTER_PREFIX } from '@/contants/api-route-prefix'
import type { AddressResponse } from '@/types/address'
import { axiosDelete, axiosPost } from '@/utils/axios'

export const searchAddressProvider = async (body: unknown) => {
  return await axiosPost(`/${API_ROUTER_PREFIX.ADDRESS}/get-providers`, body)
  .then((res) => {
    const response = res as AddressResponse
    if (response?.success) return response?.data
  })
}

export const getDistrictsByCityCode = async (providerId: string) => {
  return await axiosPost(`/${API_ROUTER_PREFIX.ADDRESS}/get-districs`, { providerId })
  .then((res) => {
    const response = res as AddressResponse
    if (response?.success) return response?.data
  })
}

export const getWardsByDistrictCode = async (districId: string) => {
  return await axiosPost(`/${API_ROUTER_PREFIX.ADDRESS}/get-wards`, { districId })
  .then((res) => {
    const response = res as AddressResponse
    if (response?.success) return response?.data
  })
}
export const deleteAddress = async (id: string) => {
  return await axiosDelete(`/${API_ROUTER_PREFIX.ADDRESS}/${id}`)
}
