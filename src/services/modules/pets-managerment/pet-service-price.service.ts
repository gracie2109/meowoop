import { API_ROUTER_PREFIX } from '@/contants/data/api-route-prefix'
import { axiosPost } from '@/utils/axios'

export const getServicePriceSlip = async (body: unknown) => {
  return await axiosPost(`/${API_ROUTER_PREFIX.PET_SERVICE}/service-price-slip`, body)
}

export const createData = async (body: unknown) => {
  return await axiosPost(`/${API_ROUTER_PREFIX.SERVICE_PRICE}/create`, body)
}
export const getDetailServicePrice = async (body: unknown) => {
  return await axiosPost(`/${API_ROUTER_PREFIX.SERVICE_PRICE}/service-price-slip`, body)
}
// export const updateData = async (body: unknown) => {
//   return await axiosPatch(`/${API_ROUTER_PREFIX.PET_SERVICE}/update`, body)
// }
// export const deleteData = async (payload: string | string[]) => {
//   const ids = {
//     ids: Array.isArray(payload) ? payload : [payload],
//   }
//   return await axiosDeleteMulti(`/${API_ROUTER_PREFIX.PET_SERVICE}/delete`, ids)
// }

// export const getDetaiPetlService = async (body: {id:string}) => {
//   return await axiosPost(`/${API_ROUTER_PREFIX.PET_SERVICE}/detail-service`, body)
// }
