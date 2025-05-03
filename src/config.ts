const primary = getComputedStyle(document.documentElement).getPropertyValue('--vt-c-primary').trim()

export const antdConfig = {
  token: {
    colorPrimary: primary,
  },
}
