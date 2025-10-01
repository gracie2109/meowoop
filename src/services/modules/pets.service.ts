import { API_ROUTER_PREFIX } from '@/contants/api-route-prefix'
import { axiosPost } from '@/utils/axios'

export const searchListData = async (body: unknown) => {
  return await axiosPost(`/${API_ROUTER_PREFIX.PET_BOSS}/search`, body).then((data) => {
    return data?.data ?? []
  })
}


export const createNewBoss = async (body: unknown) => {
  return await axiosPost(`/${API_ROUTER_PREFIX.PET_BOSS}/create`, body)
}
