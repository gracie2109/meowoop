import { type ICommon } from '@/types/common'
import { BANNER_POSITION } from '@/contants/settings'
import type { CSSProperties } from 'vue'

export type BannerPosition = (typeof BANNER_POSITION)[keyof typeof BANNER_POSITION]

export interface IBannerContentAction {
  type: string
  url: string
}
export interface IBannerContent {
  type: HTMLElement
  text: string
  styles: CSSProperties
  actions?: IBannerContentAction
  id: string
}
export interface IBannerParam {
  image: unknown
  position: BannerPosition
  alt: string
  contents?: IBannerContent[]
}

export interface IBanner extends IBannerParam, ICommon {}

export const BANNER_PARAMS = {
  image: 'image',
  alt: 'alt',
  position: 'position',
  contents: 'contents',
} as const satisfies Record<string, keyof IBannerParam>

export const BANNER_ACTIONS_PARAMS = {
  type: 'type',
  url: 'url',
} as const satisfies Record<string, keyof IBannerContentAction>

export const BANNER_CONTENT_PARAMS = {
  type: 'type',
  text: 'text',
  styles: 'styles',
  id: 'id',
} as const satisfies Record<string, keyof IBannerContent>
