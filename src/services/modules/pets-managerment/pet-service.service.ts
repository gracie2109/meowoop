import { API_ROUTER_PREFIX } from '@/contants/api-route-prefix'
import { axiosPost, axiosPatch, axiosDeleteMulti } from '@/utils/axios'

export const fetchAllService = async (body: unknown) => {
  return await axiosPost(`/${API_ROUTER_PREFIX.PET_SERVICE}/search`, body)
}

export const createData = async (body: unknown) => {
  return await axiosPost(`/${API_ROUTER_PREFIX.PET_SERVICE}/create-service`, body)
}
export const updateData = async (body: unknown) => {
  return await axiosPatch(`/${API_ROUTER_PREFIX.PET_SERVICE}/update-service`, body)
}
export const deleteData = async (payload: string | string[]) => {
  const ids = {
    ids: Array.isArray(payload) ? payload : [payload],
  }
  return await axiosDeleteMulti(`/${API_ROUTER_PREFIX.PET_SERVICE}/delete`, ids)
}

export const getDetaiPetlService = async (body: { id: string }) => {
  return await axiosPost(`/${API_ROUTER_PREFIX.PET_SERVICE}/detail-service`, body)
}
