import { axiosPost } from '@/utils/axios'

export const fetchAllPets = async (body: unknown) => {
  return await axiosPost('/pets/get-all', body)
}


export const createData = async (body: unknown) => {
  return await axiosPost('/pets/create', body)
}
