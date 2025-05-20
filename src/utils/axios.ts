// src/utils/apiClient.ts
import axios, { type AxiosRequestConfig } from 'axios'
import { API_BASE_URL } from '@/config'

const api = axios.create({
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

export const axiosDelete = async <T>(url: string, config?: AxiosRequestConfig) => {
  const response = await api.delete<T>(url, config)
  return response.data
}

export default api
