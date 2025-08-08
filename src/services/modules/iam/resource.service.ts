import { API_ROUTER_PREFIX } from '@/contants/data/api-route-prefix'
import { axiosPost } from '@/utils/axios'

type ResponseType = {
  name: string
  _id: string
  [key: string]: unknown
}
export const getListResource = async (body: unknown, hasConvert: boolean) => {
  const data = (await axiosPost(`/${API_ROUTER_PREFIX.RESOURCE}/search`, body)) as {
    success: boolean
    data: unknown[]
  }

  if (data?.success) {
    const response = data?.data as ResponseType[]
    if (!response) return []
    if (!hasConvert && response) return data?.data
    return response.map((i: ResponseType) => ({
      ...(typeof i === 'object' && i !== null
        ? {
            key: i?._id,
            title: i?.name,
          }
        : {}),
      children: Array.isArray(i?.permissions)
        ? i.permissions.map((ii: ResponseType) => ({
            title: ii?.action_name,
            key: ii?._id,
          }))
        : [],
    }))
  }
  return []
}

type Resource = {
  key: string
  title: string
  children?: { title: string; key: string }[]
}


export const convertResourceMap = (ids: unknown[], resources: Resource[]): Record<string, string[]> => {
  if (!Array.isArray(resources) || !ids) return {}

  return resources.reduce((acc, resource) => {
    const childrenKeys = resource.children?.map((c) => c.key) || []
    acc[resource.key] = [resource.key, ...childrenKeys]
    return acc
  }, {} as Record<string, string[]>)
}
