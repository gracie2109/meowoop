<template>
  <div class="banner-canvas">
    <!-- Image Upload Component -->
    <BannerImageUpload
      @file-selected="handleFileSelected"
      @image-loaded="handleImageLoaded"
      @error="handleError"
      :show-button="showUploadButton"
    />

    <!-- Main Container -->
    <div ref="containerRef" :style="containerStyle" class="canvas-container">
      <!-- Konva Stage Component -->
      <BannerStage
        :stage-config="stageConfig"
        :bg-image="bgImage"
        :texts="texts"
        :selected-index="selectedIndex"
        @text-click="handleTextClick"
      />

      <!-- Content Panel Component -->
      <!-- <BannerContentPanel
        :texts="texts"
        :content-style="contentPanelStyle"
        :title="contentTitle"
        :show-add-button="showAddButton"
        @add-text="handleAddText"
      /> -->
    </div>

    <!-- Error Display -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, computed, watch } from 'vue'
import BannerStage from './BannerStage.vue'
import BannerContentPanel from './BannerContentPanel.vue'
import BannerImageUpload from './BannerImageUpload.vue'

interface TextItem {
  text: string
  x: number
  y: number
  fontSize: number
  draggable: boolean
  fill: string
  [key: string]: unknown
}

interface Props {
  position: string
  width?: number
  height?: number
  containerStyle?: Record<string, string | number>
  contentTitle?: string
  showUploadButton?: boolean
  showAddButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  width: 800,
  height: 300,
  containerStyle: () => ({
    border: '1px solid red',
    width: '100%',
    height: '300px',
    position: 'relative',
  }),
  contentTitle: 'Content',
  showUploadButton: true,
  showAddButton: true
})

const emit = defineEmits<{
  imageUploaded: [data: { image: HTMLImageElement; file: File }]
  textAdded: [text: TextItem]
  textSelected: [index: number]
  stageReady: [config: { width: number; height: number }]
  error: [message: string]
}>()

// Refs
const containerRef = ref<HTMLDivElement | null>(null)
const stageConfig = ref({ width: props.width, height: props.height })
const bgImage = ref<object | null>(null)
const texts = reactive<TextItem[]>([])
const selectedIndex = ref<number | null>(null)
const errorMessage = ref<string>('')

// Banner position constants
const BANNER_POSITION = {
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center',
}

// Computed styles
const contentPanelStyle = computed(() => {
  const containerWidth = stageConfig.value.width || props.width
  const divWidth = containerWidth / 3 // 1/3 kích thước container

  let left = 0
  if (props.position === BANNER_POSITION.CENTER) {
    left = (containerWidth - divWidth) / 2
  } else if (props.position === BANNER_POSITION.RIGHT) {
    left = containerWidth - divWidth
  }

  return {
    position: 'absolute' as const,
    width: `${divWidth}px`,
    height: '100%',
    left: `${left}px`,
    top: '0px',
    border: '1px solid red',
    padding: '10px',
    boxSizing: 'border-box' as const,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    zIndex: 10,
    overflow: 'auto',
  }
})

// Methods
const updateStageSize = async () => {
  await nextTick()
  await nextTick() // Double nextTick để đảm bảo DOM hoàn toàn ready

  if (containerRef.value) {
    // Force recalculate layout
    containerRef.value.style.display = 'none'
    void containerRef.value.offsetHeight // Trigger reflow
    containerRef.value.style.display = 'block'

    const rect = containerRef.value.getBoundingClientRect()
    const width = rect.width || containerRef.value.offsetWidth || props.width
    const height = rect.height || containerRef.value.offsetHeight || props.height

    stageConfig.value = { width: Math.floor(width), height: Math.floor(height) }

    emit('stageReady', stageConfig.value)
    console.log('Updated stage size:', { width, height })
  } else {
    console.log('Container ref is null!')
  }
}

// Event handlers
const handleFileSelected = (file: File) => {
  console.log('File selected:', file.name)
}

const handleImageLoaded = (data: { image: HTMLImageElement; width: number; height: number; file: File }) => {
  const containerWidth = stageConfig.value.width
  const containerHeight = stageConfig.value.height

  // Tính toán scale để cover toàn bộ container
  const scaleX = containerWidth / data.width
  const scaleY = containerHeight / data.height
  const scale = Math.max(scaleX, scaleY) // Sử dụng max để cover

  const scaledWidth = data.width * scale
  const scaledHeight = data.height * scale

  bgImage.value = {
    image: data.image,
    width: scaledWidth,
    height: scaledHeight,
    x: (containerWidth - scaledWidth) / 2, // Center horizontally
    y: (containerHeight - scaledHeight) / 2, // Center vertically
  }

  emit('imageUploaded', { image: data.image, file: data.file })
}

const handleError = (message: string) => {
  errorMessage.value = message
  emit('error', message)

  // Clear error after 5 seconds
  setTimeout(() => {
    errorMessage.value = ''
  }, 5000)
}

const handleTextClick = (index: number) => {
  selectedIndex.value = index
  emit('textSelected', index)
}

const handleAddText = () => {
  const newText: TextItem = {
    text: 'New Text',
    x: 100 + texts.length * 20, // Offset để không chồng lên nhau
    y: 100 + texts.length * 40,
    fontSize: 24,
    draggable: true,
    fill: '#000000',
  }

  texts.push(newText)
  emit('textAdded', newText)
}

// Watchers
watch(() => props.position, () => {
  console.log('Position changed to:', props.position)
})

// Lifecycle
onMounted(async () => {
  console.log('BannerCanvas mounted')

  // Thêm text mặc định nếu cần
  if (texts.length === 0) {
    handleAddText()
  }

  // Cập nhật kích thước stage sau khi component mount
  await updateStageSize()

  // Thử lại sau một khoảng thời gian ngắn nếu chưa có kích thước
  if (stageConfig.value.width === 0) {
    setTimeout(async () => {
      await updateStageSize()
      console.log('Stage config after timeout:', stageConfig.value)
    }, 300)
  }

  console.log('Stage config after mount:', stageConfig.value)
})

// Expose methods for parent component
defineExpose({
  updateStageSize,
  handleAddText,
  texts,
  bgImage,
  stageConfig,
})

defineOptions({ name: 'BannerCanvas' })
</script>

<style scoped>
.banner-canvas {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.canvas-container {
  position: relative;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  overflow: hidden;
}

.error-message {
  background: #fff2f0;
  border: 1px solid #ffccc7;
  color: #ff4d4f;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
}
</style>
