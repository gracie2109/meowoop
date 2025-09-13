import { API_ROUTER_PREFIX } from '@/contants/data/api-route-prefix'
import { axiosPost, axiosPatch, axiosDeleteMulti } from '@/utils/axios'

export const searchListData = async (body: unknown) => {
  return await axiosPost(`/${API_ROUTER_PREFIX.CUSTOMERS}/search`, body).then((data) => {
    return data?.contents
  })
}

export const createData = async (body: unknown) => {
  return await axiosPost(`/${API_ROUTER_PREFIX.CUSTOMERS}/create`, body)
}
export const updateData = async (body: unknown) => {
  return await axiosPatch(`/${API_ROUTER_PREFIX.CUSTOMERS}/update`, body)
}
export const deleteData = async (payload: string | string[]) => {
  const ids = {
    ids: Array.isArray(payload) ? payload : [payload],
  }
  return await axiosDeleteMulti(`/${API_ROUTER_PREFIX.CUSTOMERS}/delete`, ids)
}

export const searchUserAddress = async (body: unknown) => {
  return await axiosPost(`/${API_ROUTER_PREFIX.ADDRESS}/search-address`, body).then((data) => {
    return data?.data?.data
  })
}

export const updateUserAddress = async (body: unknown) => {
  return await axiosPatch(`/${API_ROUTER_PREFIX.ADDRESS}/${body?._id}`, body)
}

export const createAddress = async (body: unknown) => {
  return await axiosPost(`/${API_ROUTER_PREFIX.ADDRESS}/create-address`, body)
}
