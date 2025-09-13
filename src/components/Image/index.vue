<script setup lang="ts">
import { ref } from 'vue'
import ExampleWrapper from './components/ExampleWrapper.vue'
import ImageUploadSection from './components/ImageUploadSection.vue'
import ImageGallery from './components/ImageGallery.vue'
import ImageEditModal from './components/ImageEditModal.vue'
import StatusMessages from './components/StatusMessages.vue'

export interface UploadedImage {
  id: string
  src: string
  uploadTime: string
  thumbnail: string
  size: string
  name: string
  file?: File
}

// Define emits
interface Emits {
  (e: 'upload-to-server', images: UploadedImage[]): void
  (e: 'images-changed', images: UploadedImage[]): void
}

const props = withDefaults(
  defineProps<{
    max?: number
    showButton?: boolean
  }>(),
  {
    max: 1,
    showButton: false,
  },
)
const emit = defineEmits<Emits>()

// Reactive state
const uploadedImages = ref<UploadedImage[]>([])
const isLoading = ref<boolean>(false)
const error = ref<string>('')

// Modal state
const showEditModal = ref<boolean>(false)
const currentEditingImage = ref<UploadedImage | null>(null)

// Utility functions
const showError = (message: string): void => {
  error.value = message
  setTimeout(() => (error.value = ''), 5000)
}

const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const handleImagesUploaded = (files: File[]): void => {
  isLoading.value = true

  files.forEach((file) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const result = e.target?.result as string
      if (result) {
        const newImage: UploadedImage = {
          id: generateId(),
          src: result,
          name: file.name,
          size: formatFileSize(file.size),
          uploadTime: new Date().toLocaleString('vi-VN'),
          thumbnail: result,
          file: file, // Lưu file gốc
        }

        uploadedImages.value.unshift(newImage)
      }
    }

    reader.onerror = () => {
      showError('Không thể đọc file. Vui lòng thử lại.')
    }

    reader.readAsDataURL(file)
  })

  isLoading.value = false
  emit('images-changed', uploadedImages.value)
}
const handleUploadError = (message: string): void => {
  showError(message)
}

const handleEditImage = (image: UploadedImage): void => {
  currentEditingImage.value = image
  showEditModal.value = true
}

const handleDeleteImage = (imageId: string): void => {
  uploadedImages.value = uploadedImages.value.filter((img) => img.id !== imageId)

  emit('images-changed', uploadedImages.value)
}

const uploadAllToServer = (): void => {
  if (uploadedImages.value.length === 0) {
    showError('Không có hình ảnh nào để upload')
    return
  }

  emit('upload-to-server', uploadedImages.value)
}

const handleImageSaved = (editedImageData: string): void => {
  if (currentEditingImage.value) {
    const imageIndex = uploadedImages.value.findIndex(
      (img) => img.id === currentEditingImage.value?.id,
    )
    if (imageIndex !== -1) {
      uploadedImages.value[imageIndex] = {
        ...uploadedImages.value[imageIndex],
        src: editedImageData,
        thumbnail: editedImageData,
      }
    }
  }
  showEditModal.value = false
  currentEditingImage.value = null
}

const handleModalClose = (): void => {
  showEditModal.value = false
  currentEditingImage.value = null
}

defineExpose({
  uploadAllToServer,
})

defineOptions({ name: 'ImageSection' })
</script>

<template>
  <ExampleWrapper class="image-gallery-container">
    <div style="display: flex; gap: 1rem">
      <div v-if="uploadedImages.length < props.max">
        <ImageUploadSection
          :is-loading="isLoading"
          @images-uploaded="handleImagesUploaded"
          @upload-error="handleUploadError"
        />
      </div>
      <ImageGallery
        :images="uploadedImages"
        @edit-image="handleEditImage"
        @delete-image="handleDeleteImage"
      />
    </div>

    <!-- Upload to Server Button -->
    <div v-if="uploadedImages.length > 0 && props.showButton" class="upload-actions">
      <button
        @click="uploadAllToServer"
        class="upload-server-btn"
        :disabled="isLoading"
        type="button"
      >
        <span v-if="!isLoading">Upload {{ uploadedImages.length }} ảnh lên server</span>
        <span v-else>Đang xử lý...</span>
      </button>
    </div>

    <StatusMessages :error="error" :is-loading="isLoading" />

    <ImageEditModal
      v-if="showEditModal"
      :image="currentEditingImage"
      @save="handleImageSaved"
      @close="handleModalClose"
    />
  </ExampleWrapper>
</template>

<style scoped>
.image-gallery-container {
  width: 100%;
  margin: 0 auto;
  /* padding: 2rem; */
}

.upload-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.upload-server-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-server-btn:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-2px);
}

.upload-server-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 768px) {
  .image-gallery-container {
    padding: 1rem;
  }
}
</style>
