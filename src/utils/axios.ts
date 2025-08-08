// src/utils/apiClient.ts
import axios, { type AxiosRequestConfig } from 'axios'
import { API_BASE_URL } from '@/config'

export const api = axios.create({
  baseURL: API_BASE_URL,
})

export const axiosGet = async <T>(url: string, config?: AxiosRequestConfig) => {
  const response = await api.get<T>(url, config)
  return response.data
}

export const axiosPost = async <T, B>(url: string, body: B, config?: AxiosRequestConfig) => {
  const response = await api.post<T>(url, body, config)
  return response.data
}

export const axiosPut = async <T, B>(url: string, body: B, config?: AxiosRequestConfig) => {
  const response = await api.put<T>(url, body, config)
  return response.data
}
export const axiosPatch = async <T, B>(url: string, body: B, config?: AxiosRequestConfig) => {
  const response = await api.patch<T>(url, body, config)
  return response.data
}

export const axiosDelete = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await api.delete<T>(url, config)
    return response.data
  } catch (error: unknown) {
    throw new Error(`Lỗi khi gửi yêu cầu DELETE tới ${url}: ${error}`)
  }
}

export const axiosDeleteMulti = async <T, B>(url: string, body: B): Promise<T> => {
  try {
    const response = await api.delete<T>(url, { data: body })
    return response.data
  } catch (error) {
    throw new Error(`Lỗi khi gửi yêu cầu DELETE với body tới ${url}: ${error}`)
  }
}
export default api
