const primary = getComputedStyle(document.documentElement).getPropertyValue('--vt-c-primary').trim()

export const antdConfig = {
  token: {
    colorPrimary: primary,
  },
}

export const API_BASE_URL = !import.meta.env.PROD ? import.meta.env.VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_PROD
