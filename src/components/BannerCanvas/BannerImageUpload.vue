<template>
  <div class="image-upload">
    <input
      ref="fileInput"
      type="file"
      @change="handleFileChange"
      accept="image/*"
      :style="{ display: inputVisible ? 'block' : 'none' }"
    />

    <button
      v-if="showButton"
      @click="triggerFileInput"
      class="upload-btn"
      :class="{ loading: isUploading }"
      :disabled="isUploading"
    >
      {{ isUploading ? 'Uploading...' : 'Choose Image' }}
    </button>

    <div v-if="previewImage" class="preview">
      <img :src="previewImage" alt="Preview" class="preview-image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  showButton?: boolean
  inputVisible?: boolean
  maxFileSize?: number // in MB
  acceptedTypes?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  showButton: true,
  inputVisible: true,
  maxFileSize: 5,
  acceptedTypes: () => ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
})

const emit = defineEmits<{
  fileSelected: [file: File]
  imageLoaded: [imageData: {
    image: HTMLImageElement,
    width: number,
    height: number,
    file: File
  }]
  error: [message: string]
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const previewImage = ref<string | null>(null)
const isUploading = ref(false)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  // Validate file type
  if (!props.acceptedTypes.includes(file.type)) {
    emit('error', `Invalid file type. Accepted types: ${props.acceptedTypes.join(', ')}`)
    return
  }

  // Validate file size
  if (file.size > props.maxFileSize * 1024 * 1024) {
    emit('error', `File too large. Max size: ${props.maxFileSize}MB`)
    return
  }

  emit('fileSelected', file)
  loadImage(file)
}

const loadImage = (file: File) => {
  isUploading.value = true

  const img = new window.Image()
  const url = URL.createObjectURL(file)

  previewImage.value = url

  img.onload = () => {
    isUploading.value = false

    emit('imageLoaded', {
      image: img,
      width: img.naturalWidth,
      height: img.naturalHeight,
      file
    })

    // Clean up
    URL.revokeObjectURL(url)
  }

  img.onerror = () => {
    isUploading.value = false
    emit('error', 'Failed to load image')
    previewImage.value = null
  }

  img.src = url
}

defineExpose({
  triggerFileInput,
  fileInput
})

defineOptions({ name: 'BannerImageUpload' })
</script>

<style scoped>
.image-upload {
  margin-bottom: 16px;
}

.upload-btn {
  background: #52c41a;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.upload-btn:hover:not(:disabled) {
  background: #73d13d;
}

.upload-btn:disabled {
  background: #d9d9d9;
  cursor: not-allowed;
}

.upload-btn.loading {
  background: #faad14;
}

.preview {
  margin-top: 12px;
}

.preview-image {
  max-width: 200px;
  max-height: 120px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
