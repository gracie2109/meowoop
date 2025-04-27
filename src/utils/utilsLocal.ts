import type { LocalParamType, StorageType } from '@/types/app'
import { WINDOW_STORAGE } from './../contants/app'
import { checkDataIsString } from './stringUtil'

export function setLocal(storage: StorageType, key: LocalParamType, data: unknown) {
  if (!key || !storage) return
  const value = (checkDataIsString(data) ? data : JSON.stringify(data)) as string

  if (storage === 'COOKIE') {
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; path=/;`
  } else {
    window[WINDOW_STORAGE[storage]].setItem(key, value)
  }
}

export function getLocal(storage: StorageType, key: LocalParamType) {
  if (!key) return null
  if (storage === 'COOKIE') {
    const match = document.cookie.match(new RegExp(`(?:^|; )${encodeURIComponent(key)}=([^;]*)`))
    const value = match ? decodeURIComponent(match[1]) : null
    try {
      return value ? JSON.parse(value) : null
    } catch {
      return value
    }
  }
  const value = window[WINDOW_STORAGE[storage]].getItem(key)
  try {
    return value ? JSON.parse(value) : null
  } catch {
    return value
  }
}

export function removeStorage(storage: StorageType, keysToKeep: LocalParamType[]): void {
  const savedItems: { [key: string]: string } = {}

  keysToKeep.forEach((key) => {
    const value = getLocal(storage, key)
    if (value !== null) {
      savedItems[key] = value
    }
  })
  window[WINDOW_STORAGE[storage]].clear()
  Object.keys(savedItems).forEach((key: LocalParamType) => {
    setLocal(storage, key, savedItems[key])
  })
}
