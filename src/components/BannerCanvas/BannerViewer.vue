<template>
  <div class="banner-viewer">
    <div ref="containerRef" :style="containerStyle" class="banner-container">
      <v-stage
        ref="stage"
        :config="stageConfig"
        class="banner-stage"
        :style="{ width: stageConfig.width + 'px', height: stageConfig.height + 'px' }"
      >
        <v-layer>
          <v-image v-if="backgroundImage" :config="backgroundImage" />
        </v-layer>
      </v-stage>
      <div
        v-if="!backgroundImage"
        class="banner-fallback"
        :style="{
          width: stageConfig.width + 'px',
          height: stageConfig.height + 'px',
          backgroundImage: `url(${props.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }"
      ></div>

      <!-- Content Panel (positioned based on position prop) -->
      <div v-if="showContentPanel" :style="contentPanelStyle" class="content-panel">
        <!-- Content wrapper với background chỉ cho phần có nội dung -->
        <div class="content-wrapper" v-if="dynamicContent?.length > 0">
          <!-- Dynamic Content System -->
          <template v-if="shouldShowDynamicContent">
            <div class="dynamic-content">
              <component
                v-for="(item, index) in memoizedDynamicContent"
                :key="item.id || `content-${index}`"
                :is="getComponentTag(item)"
                :class="item.className"
                :style="getComputedStyles(item)"
                v-bind="getComponentProps(item)"
                @click="handleClick(item)"
              >
                <!-- Text content (h1, h2, p, span) -->
                <template v-if="isTextContent(item)">
                  {{ item.text }}
                </template>

                <!-- Button content -->
                <template v-if="isButtonContent(item)">
                  {{ item.text }}
                </template>

                <!-- Link content -->
                <template v-if="isLinkContent(item)">
                  {{ item.text }}
                </template>

                <!-- List content -->
                <template v-if="isListContent(item)">
                  <li v-for="(listItem, idx) in item.items" :key="idx">
                    {{ listItem }}
                  </li>
                </template>

                <!-- Nested children (for div containers) -->
                <template v-if="isDivContent(item) && item.children">
                  <div class="nested-content">
                    <component
                      v-for="(child, childIndex) in item.children"
                      :key="child.id || `child-${childIndex}`"
                      :is="getComponentTag(child)"
                      :class="child.className"
                      :style="getComputedStyles(child)"
                      v-bind="getComponentProps(child)"
                      @click="handleClick(child)"
                    >
                      <template v-if="isTextContent(child)">
                        {{ child.text }}
                      </template>
                      <template v-if="isButtonContent(child)">
                        {{ child.text }}
                      </template>
                      <template v-if="isLinkContent(child)">
                        {{ child.text }}
                      </template>
                    </component>
                  </div>
                </template>
              </component>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, computed, watch, shallowRef, markRaw } from 'vue'
import type { BannerContent } from '@/types/banner-content'
import {
  isTextContent,
  isImageContent,
  isButtonContent,
  isLinkContent,
  isListContent,
  isDivContent,
} from '@/types/banner-content'

interface TextItem {
  text: string
  x: number
  y: number
  fontSize: number
  fill: string
  fontFamily?: string
  fontStyle?: string
}

interface Props {
  imageUrl: string
  position: 'left' | 'center' | 'right'
  texts: TextItem[] // Legacy support
  width?: number
  height?: number
  showContentPanel?: boolean
  containerStyle?: Record<string, string | number>
  // New dynamic content system
  dynamicContent?: BannerContent[]
  useDynamicContent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  width: 800,
  height: 300,
  showContentPanel: true,
  useDynamicContent: false,
  dynamicContent: () => [],
  containerStyle: () => ({
    border: '1px solid #d9d9d9',
    borderRadius: '8px',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#ffffff',
  }),
})

// Refs - Sử dụng shallowRef cho performance
const containerRef = ref<HTMLDivElement | null>(null)
const stage = ref<HTMLElement | null>(null)
const backgroundImage = shallowRef<object | null>(null) // Shallow ref cho image object
const stageConfig = shallowRef({ width: props.width, height: props.height })

// Computed styles với memoization
const contentPanelStyle = computed(() => {
  const containerWidth = stageConfig.value.width
  const panelWidth = containerWidth / 3

  let left = 0
  if (props.position === 'center') {
    left = (containerWidth - panelWidth) / 2
  } else if (props.position === 'right') {
    left = containerWidth - panelWidth
  }

  return {
    position: 'absolute' as const,
    width: `${panelWidth}px`,
    height: '100%',
    left: `${left}px`,
    top: '0px',
    zIndex: 10,
    padding: '16px',
    boxSizing: 'border-box' as const,
    // Đẩy content từ bottom lên
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'flex-end', // Content sẽ bắt đầu từ bottom
    // Không có background tổng thể - chỉ có ở content wrapper
  }
})

// Memoized dynamic content cho performance
const memoizedDynamicContent = computed(() => {
  return props.dynamicContent || []
})

// Computed boolean cho điều kiện hiển thị
const shouldShowDynamicContent = computed(() => {
  return props.useDynamicContent && memoizedDynamicContent.value.length > 0
})

// Cache để tránh reload image không cần thiết
const imageCache = new Map<string, HTMLImageElement>()

// Methods
const loadBackgroundImage = () => {
  if (!props.imageUrl) {
    console.log('No imageUrl provided')
    return
  }

  console.log('Loading image:', props.imageUrl)

  // Kiểm tra cache trước
  const cachedImg = imageCache.get(props.imageUrl)
  if (cachedImg && cachedImg.complete) {
    console.log('Using cached image')
    updateBackgroundImageConfig(cachedImg)
    return
  }

  const img = new window.Image()
  img.crossOrigin = 'anonymous' // Handle CORS

  img.onload = () => {
    console.log('Image loaded successfully:', { width: img.width, height: img.height })
    // Cache image
    imageCache.set(props.imageUrl, img)
    updateBackgroundImageConfig(img)
  }

  img.onerror = (error) => {
    console.error('Failed to load banner image:', props.imageUrl, error)
  }

  img.src = props.imageUrl
}

// Tách logic tính toán scale để tái sử dụng
const updateBackgroundImageConfig = (img: HTMLImageElement) => {
  const containerWidth = stageConfig.value.width
  const containerHeight = stageConfig.value.height

  console.log('Container dimensions:', { containerWidth, containerHeight })
  console.log('Image dimensions:', { width: img.width, height: img.height })

  // Calculate scale to cover the entire container
  const scaleX = containerWidth / img.width
  const scaleY = containerHeight / img.height
  const scale = Math.max(scaleX, scaleY)

  const scaledWidth = img.width * scale
  const scaledHeight = img.height * scale

  console.log('Scale calculations:', { scaleX, scaleY, scale, scaledWidth, scaledHeight })

  // Sử dụng markRaw để tránh Vue reactive trên DOM object
  backgroundImage.value = markRaw({
    image: img,
    width: scaledWidth,
    height: scaledHeight,
    x: (containerWidth - scaledWidth) / 2,
    y: (containerHeight - scaledHeight) / 2, // Fix lỗi này - phải dùng containerHeight
  })

  console.log('Background image config set:', backgroundImage.value)
}

// Debounce utility
let resizeTimeout: number | null = null

const updateStageSize = async () => {
  // Debounce để tránh gọi quá nhiều lần
  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
  }

  resizeTimeout = setTimeout(async () => {
    await nextTick()

    if (containerRef.value) {
      const rect = containerRef.value.getBoundingClientRect()
      const width = Math.floor(rect.width || props.width)
      const height = Math.floor(rect.height || props.height)

      // console.log('BannerViewer container rect:', {
      //   rectWidth: rect.width,
      //   rectHeight: rect.height,
      //   propsWidth: props.width,
      //   propsHeight: props.height,
      //   finalWidth: width,
      //   finalHeight: height,
      // })

      // Chỉ update nếu thực sự có thay đổi
      if (stageConfig.value.width !== width || stageConfig.value.height !== height) {
        stageConfig.value = { width, height }
        // Reload background image với dimensions mới
        loadBackgroundImage()
        console.log('Stage updated:', { width, height })
      }
    }
  }, 150) // 150ms debounce
}

// Watchers với tối ưu performance
watch(
  () => props.imageUrl,
  () => {
    loadBackgroundImage()
  },
  { immediate: true },
)

watch(
  () => [props.width, props.height],
  () => {
    console.log('Props width/height changed:', { width: props.width, height: props.height })
    stageConfig.value = { width: props.width, height: props.height }
    loadBackgroundImage()
  },
  { flush: 'post' },
) // Chạy sau khi DOM đã update

watch(
  () => stageConfig.value,
  () => {
    loadBackgroundImage()
  },
  { deep: true, flush: 'post' },
)

// Cache cho component tags
const tagCache = new Map<string, string>()

// Dynamic content methods với caching
const getComponentTag = (item: BannerContent): string => {
  const cacheKey = item.type
  if (tagCache.has(cacheKey)) {
    return tagCache.get(cacheKey)!
  }

  let tag: string
  switch (item.type) {
    case 'img':
      tag = 'img'
      break
    case 'button':
      tag = 'button'
      break
    case 'link':
      tag = 'a'
      break
    case 'ul':
      tag = 'ul'
      break
    case 'div':
      tag = 'div'
      break
    case 'h1':
    case 'h2':
    case 'h3':
    case 'p':
    case 'span':
    default:
      tag = item.type
  }

  tagCache.set(cacheKey, tag)
  return tag
}

// Cache cho computed styles
let stylesCache = new WeakMap<BannerContent, Record<string, string | number>>()

const getComputedStyles = (item: BannerContent) => {
  if (stylesCache.has(item)) {
    return stylesCache.get(item)!
  }

  const styles = item.styles || {}
  const cssStyles: Record<string, string | number> = {}

  // Apply styles - không cần position absolute
  Object.entries(styles).forEach(([key, value]) => {
    if (value !== undefined) {
      // Convert camelCase to kebab-case
      const cssProperty = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      cssStyles[cssProperty] = value
    }
  })

  stylesCache.set(item, cssStyles)
  return cssStyles
}

const getComponentProps = (item: BannerContent) => {
  const props: Record<string, unknown> = {}

  if (isImageContent(item)) {
    props.src = item.src
    props.alt = item.alt || ''
  }

  if (isLinkContent(item)) {
    props.href = item.href || item.action?.url || '#'
    if (item.action?.url?.startsWith('http')) {
      props.target = '_blank'
      props.rel = 'noopener noreferrer'
    }
  }

  if (isButtonContent(item)) {
    props.type = 'button'
    props.disabled = item.disabled || false
  }

  return props
}

const handleClick = (item: BannerContent) => {
  if (!item.action) return

  switch (item.action.type) {
    case 'link':
      if (item.action.url) {
        if (item.action.url.startsWith('http')) {
          window.open(item.action.url, '_blank', 'noopener,noreferrer')
        } else {
          window.location.href = item.action.url
        }
      }
      break

    case 'modal':
      if (item.action.modalId) {
        console.log('Open modal:', item.action.modalId)
      }
      break

    case 'function':
      if (item.action.functionName) {
        console.log('Call function:', item.action.functionName, item.action.params)
      }
      break
  }
}

// Lifecycle
onMounted(async () => {
  await updateStageSize()
  loadBackgroundImage()
})

// Cleanup khi component unmount
const cleanup = () => {
  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
    resizeTimeout = null
  }
  // Clear caches
  imageCache.clear()
  tagCache.clear()
  stylesCache = new WeakMap()
}

// Auto cleanup
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', cleanup)
}

defineExpose({
  updateStageSize,
  loadBackgroundImage,
})

defineOptions({ name: 'BannerViewer' })
</script>

<style scoped>
.banner-viewer {
  width: 100%;
  height: 100%;
  /* GPU acceleration */
  transform: translateZ(0);
  will-change: transform;
  /* Prevent overflow */
  overflow: hidden;
  box-sizing: border-box;
}

.banner-container {
  position: relative;
  width: 100%;
  height: 100%;
  /* GPU acceleration cho container */
  transform: translateZ(0);
  /* Prevent overflow */
  overflow: hidden;
  box-sizing: border-box;
}

.banner-stage {
  width: 100%;
  height: 100%;
  /* Optimized rendering */
  contain: layout style paint;
}

.banner-fallback {
  width: 100%;
  height: 100%;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
}

.content-panel {
  /* Panel container - không có background */
  pointer-events: none;
  /* Optimize cho position changes */
  will-change: transform, left;
}

.content-wrapper {
  /* Chỉ wrapper mới có background và chỉ bao quanh content */
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 16px;
  pointer-events: auto;
  /* Đảm bảo content có độ trong suốt đầy đủ */
  opacity: 1;
  /* GPU acceleration */
  transform: translateZ(0);
  will-change: opacity;
}

.dynamic-content {
  /* Optimize cho dynamic content rendering */
  contain: layout style;
}

.nested-content {
  /* Optimize cho nested rendering */
  contain: layout;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.panel-header h3 {
  margin: 0;
  font-size: 16px;
  color: #fff; /* Đổi thành màu trắng cho nền đen */
  font-weight: 600;
  opacity: 1;
}

.text-count {
  font-size: 12px;
  color: #ccc; /* Màu xám sáng cho nền đen */
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 8px;
  border-radius: 12px;
  opacity: 1;
}

.text-list {
  flex: 1;
  overflow-y: auto;
  /* Smooth scrolling */
  scroll-behavior: smooth;
  /* Optimize scrolling */
  contain: layout;
}

.text-item {
  margin-bottom: 8px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1); /* Nền trắng mờ cho nền đen */
  border-radius: 6px;
  border-left: 3px solid #1890ff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  opacity: 1;
  /* Optimize cho hover effects */
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.text-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.text-content {
  font-weight: 500;
  color: #fff; /* Màu trắng cho text trên nền đen */
  margin-bottom: 4px;
  line-height: 1.4;
  opacity: 1;
}

.text-meta {
  font-size: 11px;
  color: #ccc; /* Màu xám sáng */
  line-height: 1.3;
  opacity: 1;
}

.empty-message {
  text-align: center;
  color: #ccc; /* Màu xám sáng cho nền đen */
  font-style: italic;
  padding: 20px;
}

/* Performance optimized responsive */
@media (max-width: 768px) {
  .content-panel {
    position: static !important;
    width: 100% !important;
    height: auto !important;
    margin-top: 16px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
  }

  .banner-container {
    flex-direction: column;
  }

  /* Tối ưu cho mobile */
  .content-wrapper {
    backdrop-filter: none; /* Tắt blur trên mobile cho performance */
  }
}

/* Animation optimizations */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
