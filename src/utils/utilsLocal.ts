import type { LocalParamType, StorageType } from '@/types/app'
import { WINDOW_STORAGE } from '@/contants/app'
import { checkDataIsString } from './stringUtil'
export function setLocal(
  storage: StorageType,
  key: LocalParamType,
  data: unknown,
  encode?: boolean,
) {
  if (!key || !storage) return

  let value: string

  try {
    const raw = checkDataIsString(data) ? data : JSON.stringify(data)
    value = encode ? btoa(unescape(encodeURIComponent(raw))) : raw
  } catch {
    console.error('Error encoding value for storage')
    return
  }

  if (storage === 'COOKIE') {
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; path=/;`
  } else {
    window[WINDOW_STORAGE[storage]].setItem(key, value)
  }
}

export function getLocal(storage: StorageType, key: LocalParamType, decode?: boolean) {
  if (!key || !storage) return null

  if (storage === 'COOKIE') {
    const match = document.cookie.match(new RegExp(`(?:^|; )${encodeURIComponent(key)}=([^;]*)`))
    const value = match ? decodeURIComponent(match[1]) : null
    try {
      return value ? JSON.parse(value) : null
    } catch {
      return value
    }
  }

  let value = window[WINDOW_STORAGE[storage]].getItem(key)
  if (!value) return null

  try {
    if (decode) {
      value = decodeURIComponent(escape(atob(value)))
    }
    return JSON.parse(value)
  } catch {
    return null
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

  const store = window[WINDOW_STORAGE[storage] as 'localStorage' | 'sessionStorage'] as Storage
  store.clear()
  Object.keys(savedItems).forEach((key) => {
    setLocal(storage, key as LocalParamType, savedItems[key])
  })
}
