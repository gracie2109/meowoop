// Main BannerCanvas component
export { default as BannerCanvas } from './index.vue'

// Sub-components
export { default as BannerStage } from './BannerStage.vue'
export { default as BannerContentPanel } from './BannerContentPanel.vue'
export { default as BannerImageUpload } from './BannerImageUpload.vue'

// Types
export interface TextItem {
  text: string
  x: number
  y: number
  fontSize: number
  draggable: boolean
  fill: string
  [key: string]: unknown
}

export interface ImageData {
  image: HTMLImageElement
  width: number
  height: number
  x: number
  y: number
}

export interface StageConfig {
  width: number
  height: number
}
