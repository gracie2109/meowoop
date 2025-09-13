import { API_ROUTER_PREFIX } from '@/contants/data/api-route-prefix'
import { axiosPost, axiosPatch, axiosDelete, axiosGet } from '@/utils/axios';


export const searchData = async (body: unknown) => {
  return await axiosPost(`/${API_ROUTER_PREFIX.ROLES}/search`, body)
}

export const createData = async (body: unknown) => {
  return await axiosPost(`/${API_ROUTER_PREFIX.ROLES}/create`, body)
}

export const updateData = async (body: { id: string | number; [key: string]: unknown }) => {
  const id = body?.id || null
  if (id) {
    return await axiosPatch(`/${API_ROUTER_PREFIX.ROLES}/update/:${id}`, body)
  }
}

export const getDeatail = async (id: string) => {
  return await axiosGet(`/${API_ROUTER_PREFIX.ROLES}/detail/${id}`)
}

export const deleteRole = async (id: string) => {
  return await axiosDelete(`/${API_ROUTER_PREFIX.ROLES}/${id}`)
}
