export const TABLE_SIZE = ['middle', 'small', 'large']


export const ICON_PREFIX = {
    PETS: 'pets',
    NATURE: 'nature'
}

export const COLOR_TYPE = {
    pure: 'pure',
    gradient: 'gradient'
} as const

export const COLOR_PREFIX = {
    LINEAR: 'linear-gradient',
    GRADIENT: 'gradient',
    RGB: 'rgb'
}
export const iconPets = Array.from({ length: 21 }, (_, i) => `${ICON_PREFIX.PETS}_${i + 1}`)
export const iconNature = Array.from({ length: 1 }, (_, i) => `${ICON_PREFIX.NATURE}_${i + 1}`);

export const DEFAULT_ICON = `${ICON_PREFIX.PETS}/${iconPets[0]}`;
export const DEFAULT_COLOR = 'rgb(252, 192, 46)'