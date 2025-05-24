import { axiosPost, axiosPatch, axiosDeleteMulti } from '@/utils/axios'

const PREFIX = 'pet-category'
export const fetchAllPets = async (body: unknown) => {
  return await axiosPost(`/${PREFIX}/get-all`, body)
}

export const createData = async (body: unknown) => {
  return await axiosPost(`/${PREFIX}/create`, body)
}
export const updateData = async (body: unknown) => {
  return await axiosPatch(`/${PREFIX}/update`, body)
}
export const deleteData = async (payload: string | string[]) => {
  const ids = {
    ids: Array.isArray(payload) ? payload : [payload],
  }
  return await axiosDeleteMulti(`/${PREFIX}/delete`, ids)
}
