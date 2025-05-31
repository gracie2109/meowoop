import { API_ROUTER_PREFIX } from '@/contants/data/api-route-prefix'
import { axiosGet } from '@/utils/axios'

export const getPetWeights = async () => {
  return await axiosGet(`/${API_ROUTER_PREFIX.PET_WEIGHT}/search`)
}

export const getListWeight = async () => {
  const data = (await getPetWeights()) as any
  return data.data
}
