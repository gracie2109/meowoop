import type { IconCategory } from '@/types/lib'
import type { ComposerTranslation } from 'vue-i18n'

export const ICON_PREFIX = {
  pets: 'pets',
  nature: 'nature',
  socials: 'socials',
} as const

const petsModules = import.meta.glob('@/assets/icons/pets/*.svg')
const natureModules = import.meta.glob('@/assets/icons/nature/*.svg')
const socialsModules = import.meta.glob('@/assets/icons/socials/*.svg')

export const iconPetsCount = Object.keys(petsModules).length
export const iconNatureCount = Object.keys(natureModules).length
export const iconSocialsCount = Object.keys(socialsModules).length

export const ICON_COUNTS = {
  pets: iconPetsCount,
  nature: iconNatureCount,
  socials: iconSocialsCount,
} as const

const createIconArray = (prefix: string, count: number, fromZero: boolean = false): string[] =>
  Array.from({ length: count }, (_, i) => `${prefix}_${fromZero ? i : i + 1}`)

export const iconPets = createIconArray(ICON_PREFIX.pets, ICON_COUNTS.pets)
export const iconNature = createIconArray(ICON_PREFIX.nature, ICON_COUNTS.nature)
export const iconSocials = createIconArray(ICON_PREFIX.socials, ICON_COUNTS.socials, true)

let cachedIconSources: IconCategory[] | null = null
let cachedTranslationFunction: ComposerTranslation | null = null

export const ICON_SOURCES = (t: ComposerTranslation): IconCategory[] => {
  if (cachedIconSources === null || cachedTranslationFunction !== t) {
    cachedTranslationFunction = t
    cachedIconSources = [
      {
        key: 'pets' as const,
        label: t('common.ic_source_1'),
      },
      {
        key: 'nature' as const,
        label: t('common.ic_source_2'),
      },
      {
        key: 'socials' as const,
        label: t('common.ic_source_3'),
      },
    ]
  }
  return cachedIconSources
}

export const ICON_DATA_LIST = {
  pets: iconPets,
  nature: iconNature,
  socials: iconSocials,
} as const

// Type definitions
export type IconPrefixKeys = keyof typeof ICON_PREFIX
export type IconDataKeys = keyof typeof ICON_DATA_LIST

// Detailed type for ICON_DATA_LIST
export type IconDataList = {
  readonly [K in IconPrefixKeys]: readonly string[]
}

// Type assertion to ensure ICON_DATA_LIST matches the expected structure
export const ICON_DATA_LIST_TYPED: IconDataList = ICON_DATA_LIST
