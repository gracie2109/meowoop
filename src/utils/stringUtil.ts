export const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const capitalizeAll = (text: string): string => {
  return text
    .replaceAll('_', ' ')
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const isString = (data: unknown) => {
  return typeof data === 'string'
}
export const checkDataIsString = (data: unknown) => {
  if (!isString(data)) return false
  try {
    const parsed = JSON.parse(data as string)
    return typeof parsed === 'object' && parsed !== null
  } catch {
    return false
  }
}

export function truncateText(text: string, maxLength: number) {
  const newText = text.slice(0, maxLength)
  return text.length > maxLength ? `${newText}...` : newText
}
