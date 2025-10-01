<template>
  <div class="simple-banner-canvas">
    <!-- Upload Section -->
    <div class="upload-section">
      <input
        type="file"
        @change="onUpload"
        accept="image/*"
        style="margin-bottom: 10px;"
      />
    </div>

    <!-- Canvas Container -->
    <div
      ref="containerRef"
      :style="containerStyle"
      class="canvas-container"
    >
      <!-- Konva Stage -->
      <v-stage
        ref="stage"
        :config="stageConfig"
        style="border: 1px solid blue"
      >
        <v-layer>
          <v-image v-if="bgImage" :config="bgImage" />
          <v-text
            v-for="(item, i) in texts"
            :key="i"
            :config="item"
            @click="selectText(i)"
          />
          <v-transformer
            v-if="selectedIndex !== null && texts[selectedIndex]"
            :nodes="[texts[selectedIndex].node]"
          />
        </v-layer>
      </v-stage>

      <!-- Content Panel -->
      <div :style="contentPanelStyle" class="content-panel">
        <div class="panel-header">
          Content ({{ texts.length }} texts)
        </div>

        <div v-for="(text, index) in texts" :key="index" class="text-item">
          <div class="text-content">{{ text.text }}</div>
          <div class="text-meta">Size: {{ text.fontSize }}px</div>
        </div>

        <button @click="addText" class="add-text-btn">
          + Add Text
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, computed } from 'vue'

interface Props {
  position: string
  width?: number
  height?: number
  containerStyle?: Record<string, string | number>
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
})

interface TextItem {
  text: string
  x: number
  y: number
  fontSize: number
  draggable: boolean
  fill: string
  [key: string]: unknown
}

const emit = defineEmits<{
  imageUploaded: [data: { image: HTMLImageElement; file: File }]
  textAdded: [text: TextItem]
  textSelected: [index: number]
  stageReady: [config: { width: number; height: number }]
  error: [message: string]
}>()

// Refs
const containerRef = ref<HTMLDivElement | null>(null)
const stage = ref<HTMLElement | null>(null)
const stageConfig = ref({ width: props.width, height: props.height })
const bgImage = ref<object | null>(null)
const texts = reactive<TextItem[]>([])
const selectedIndex = ref<number | null>(null)

// Position constants
const BANNER_POSITION = {
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center',
}

// Computed styles
const contentPanelStyle = computed(() => {
  const containerWidth = stageConfig.value.width || props.width
  const divWidth = containerWidth / 3

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
  await nextTick()

  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect()
    const width = rect.width || containerRef.value.offsetWidth || props.width
    const height = rect.height || containerRef.value.offsetHeight || props.height

    stageConfig.value = { width: Math.floor(width), height: Math.floor(height) }
    emit('stageReady', stageConfig.value)
  }
}

const onUpload = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const img = new window.Image()
  img.src = URL.createObjectURL(file)
  img.onload = () => {
    const containerWidth = stageConfig.value.width
    const containerHeight = stageConfig.value.height

    const scaleX = containerWidth / img.width
    const scaleY = containerHeight / img.height
    const scale = Math.max(scaleX, scaleY)

    const scaledWidth = img.width * scale
    const scaledHeight = img.height * scale

    bgImage.value = {
      image: img,
      width: scaledWidth,
      height: scaledHeight,
      x: (containerWidth - scaledWidth) / 2,
      y: (containerHeight - scaledHeight) / 2,
    }

    emit('imageUploaded', { image: img, file })
  }
}

const selectText = (index: number) => {
  selectedIndex.value = index
  emit('textSelected', index)
}

const addText = () => {
  const newText: TextItem = {
    text: 'New Text',
    x: 100 + texts.length * 20,
    y: 100 + texts.length * 40,
    fontSize: 24,
    draggable: true,
    fill: '#000000',
  }

  texts.push(newText)
  emit('textAdded', newText)
}

onMounted(async () => {
  await updateStageSize()

  // Add default text
  if (texts.length === 0) {
    addText()
  }
})

defineExpose({
  updateStageSize,
  addText,
  texts,
  bgImage,
  stageConfig,
})

defineOptions({ name: 'SimpleBannerCanvas' })
</script>

<style scoped>
.simple-banner-canvas {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.upload-section {
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fafafa;
}

.canvas-container {
  position: relative;
}

.content-panel {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 4px;
}

.panel-header {
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.text-item {
  margin-bottom: 8px;
  padding: 6px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  border-left: 3px solid #1890ff;
}

.text-content {
  font-weight: 500;
  margin-bottom: 2px;
}

.text-meta {
  font-size: 11px;
  color: #666;
}

.add-text-btn {
  background: #1890ff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  width: 100%;
  margin-top: 10px;
}

.add-text-btn:hover {
  background: #40a9ff;
}
</style>
