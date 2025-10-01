// Banner Content Types
export type ContentType = 'h1' | 'h2' | 'h3' | 'p' | 'img' | 'button' | 'link' | 'ul' | 'div' | 'span'

export interface ContentStyles {
  fontSize?: number
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  color?: string
  backgroundColor?: string
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  textDecoration?: 'none' | 'underline' | 'line-through'
  textShadow?: string
  opacity?: number
  padding?: string
  margin?: string
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  border?: string
  borderRadius?: number | string
  lineHeight?: number
  width?: number
  height?: number
  display?: 'block' | 'inline' | 'flex' | 'grid' | 'none'
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'
  listStyle?: 'none' | 'bullet' | 'decimal'
}

// Position là optional vì sẽ dùng normal flow
export interface ContentPosition {
  x: number
  y: number
}

export interface ContentAction {
  type: 'link' | 'modal' | 'function'
  url?: string
  modalId?: string
  functionName?: string
  params?: Record<string, unknown>
}

export interface BaseContent {
  type: ContentType
  id?: string
  className?: string
  styles?: ContentStyles
  position?: ContentPosition
  action?: ContentAction
  children?: BannerContent[]
}

export interface TextContent extends BaseContent {
  type: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  text: string
}

export interface ImageContent extends BaseContent {
  type: 'img'
  src: string
  alt?: string
}

export interface ButtonContent extends BaseContent {
  type: 'button'
  text: string
  disabled?: boolean
}

export interface LinkContent extends BaseContent {
  type: 'link'
  text: string
  href?: string
}

export interface ListContent extends BaseContent {
  type: 'ul'
  items: string[]
}

export interface DivContent extends BaseContent {
  type: 'div'
  children?: BannerContent[]
}

export type BannerContent =
  | TextContent
  | ImageContent
  | ButtonContent
  | LinkContent
  | ListContent
  | DivContent

export interface BannerData {
  id: string
  title: string
  status: 'active' | 'draft' | 'archived'
  position: 'left' | 'center' | 'right'
  backgroundImage: string
  content: BannerContent[]
  width?: number
  height?: number
  createdAt?: string
  updatedAt?: string
  author?: string
}

export interface BannersData {
  bannerInfo: BannerData[]
}

// Helper type guards
export const isTextContent = (content: BannerContent): content is TextContent => {
  return ['h1', 'h2', 'h3', 'p', 'span'].includes(content.type)
}

export const isImageContent = (content: BannerContent): content is ImageContent => {
  return content.type === 'img'
}

export const isButtonContent = (content: BannerContent): content is ButtonContent => {
  return content.type === 'button'
}

export const isLinkContent = (content: BannerContent): content is LinkContent => {
  return content.type === 'link'
}

export const isListContent = (content: BannerContent): content is ListContent => {
  return content.type === 'ul'
}

export const isDivContent = (content: BannerContent): content is DivContent => {
  return content.type === 'div'
}
