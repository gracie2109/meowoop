<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

interface Props {
  isLoading: boolean
}

interface Emits {
  (e: 'images-uploaded', files: File[]): void
  (e: 'upload-error', message: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

// Constants
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

// Refs
const fileInput = ref<HTMLInputElement | null>(null)

// Utility functions
const validateFile = (file: File): boolean => {
  if (!SUPPORTED_FORMATS.includes(file.type)) {
    emit('upload-error', 'Định dạng file không được hỗ trợ. Vui lòng chọn file JPG, PNG, WebP hoặc GIF.')
    return false
  }

  if (file.size > MAX_FILE_SIZE) {
    emit('upload-error', 'File quá lớn. Vui lòng chọn file nhỏ hơn 10MB.')
    return false
  }

  return true
}

// Event handlers
const handleFileInput = (event: Event): void => {
  const target = event.target as HTMLInputElement
  const files = target.files

  if (files) {
    const validFiles = Array.from(files).filter(validateFile)
    if (validFiles.length > 0) {
      emit('images-uploaded', validFiles)
    }

    // Reset file input
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
}

const handleFileDrop = (event: DragEvent): void => {
  event.preventDefault()
  event.stopPropagation()

  const files = event.dataTransfer?.files
  if (files) {
    const validFiles = Array.from(files).filter(validateFile)
    if (validFiles.length > 0) {
      emit('images-uploaded', validFiles)
    }
  }
}

const handleDragOver = (event: DragEvent): void => {
  event.preventDefault()
  event.stopPropagation()
}

const triggerFileInput = (): void => {
  fileInput.value?.click()
}
</script>

<template>
  <div class="upload-section">

    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      multiple
      @change="handleFileInput"
      class="file-input-hidden"
      :disabled="isLoading"
    />

    <div
      class="drop-zone"
      :class="{ 'is-loading': isLoading }"
      @drop="handleFileDrop"
      @dragover="handleDragOver"
      @click="triggerFileInput"
    >
      <Icon icon="icons8:upload-2" class="upload-icon" />
      <!-- <p class="upload-text"><strong>Nhấp để chọn ảnh</strong> hoặc kéo thả ảnh vào đây</p>
      <p class="upload-hint">Hỗ trợ: JPG, PNG, WebP, GIF (tối đa 10MB) - Có thể chọn nhiều ảnh</p> -->
    </div>
  </div>
</template>

<style scoped>
.upload-section {
  width: 100px;
  height: 100px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.file-input-hidden {
  display: none !important;
}

.drop-zone {
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  /* padding: 2rem; */
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #fafafa;
  display: grid;
  place-content: center;
width: 100px;
  height: 100px;

}

.drop-zone:hover:not(.is-loading) {
  border-color: #3b82f6;
  background: #f0f9ff;
}

.drop-zone.is-loading {
  opacity: 0.6;
  cursor: not-allowed;
}

.upload-icon {
  width: 2rem;
  height: 2rem;
  color: #6b7280;
  /* margin-bottom: 1rem; */
}

.upload-text {
  margin: 0.5rem 0;
  color: #374151;
  font-size: 1rem;
}

.upload-hint {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}
</style>
