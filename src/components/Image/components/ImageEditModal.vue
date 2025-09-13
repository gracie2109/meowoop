
<!-- Component 4: ImageEditModal.vue -->
<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { Cropper } from 'vue-advanced-cropper'
import { Icon } from '@iconify/vue'
import SquareButton from './SquareButton.vue'
import type { UploadedImage } from '../index.vue'

interface CropperResult {
  image: {
    transforms: {
      rotate: number
    }
  }
  canvas: HTMLCanvasElement
}

interface CropperRef {
  getResult: () => CropperResult
  flip: (x: boolean, y: boolean) => void
  rotate: (angle: number) => void
}

interface Props {
  image: UploadedImage | null
}

interface Emits {
  (e: 'save', editedImageData: string): void
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Refs
const cropper = ref<CropperRef | null>(null)
const imageLoaded = ref<boolean>(false)
const error = ref<string>('')

// Watch for image changes
watch(() => props.image, (newImage) => {
  if (newImage) {
    imageLoaded.value = false
    nextTick(() => {
      imageLoaded.value = true
    })
  }
}, { immediate: true })

// Utility functions
const showError = (message: string): void => {
  error.value = message
  setTimeout(() => (error.value = ''), 5000)
}

// Image operations
const flip = (x: boolean, y: boolean): void => {
  if (!cropper.value) return

  try {
    const result = cropper.value.getResult()
    const isRotated = result.image.transforms.rotate % 180 !== 0
    cropper.value.flip(isRotated ? !x : x, isRotated ? !y : y)
  } catch (error) {
    console.error('Error flipping image:', error)
    showError('Không thể lật ảnh. Vui lòng thử lại.')
  }
}

const rotate = (angle: number): void => {
  if (!cropper.value) return

  try {
    cropper.value.rotate(angle)
  } catch (error) {
    console.error('Error rotating image:', error)
    showError('Không thể xoay ảnh. Vui lòng thử lại.')
  }
}

const downloadImage = async (): Promise<void> => {
  if (!cropper.value) return

  try {
    const result = cropper.value.getResult()
    const dataURL = result.canvas.toDataURL('image/png', 0.9)

    const link = document.createElement('a')
    link.href = dataURL
    link.download = `cropped-image-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Error downloading image:', error)
    showError('Không thể tải xuống ảnh. Vui lòng thử lại.')
  }
}

const saveEditedImage = async (): Promise<void> => {
  if (!cropper.value) return

  try {
    const result = cropper.value.getResult()
    const dataURL = result.canvas.toDataURL('image/png', 0.9)
    emit('save', dataURL)
  } catch (error) {
    console.error('Error saving edited image:', error)
    showError('Không thể lưu ảnh đã chỉnh sửa.')
  }
}

const handleClose = (): void => {
  emit('close')
}

const onChange = (args: unknown): void => {
  // console.log('Cropper changed:', args)
}
</script>

<template>
  <Transition name="modal">
    <div class="modal-overlay" @click="handleClose" v-if="image">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Chỉnh sửa ảnh</h3>
          <button @click="handleClose" class="close-btn">
            <Icon icon="material-symbols:close" />
          </button>
        </div>

        <div class="modal-body">
          <Transition name="fade">
            <div v-if="error" class="error-message">
              <Icon icon="material-symbols:error" class="message-icon" />
              {{ error }}
            </div>
          </Transition>

          <div v-if="imageLoaded && image" class="cropper-container">
            <Cropper
              ref="cropper"
              class="modal-cropper"
              :src="image.src"
              :transitions="true"
              image-restriction="fit-area"
              @change="onChange"
            />

            <div class="modal-controls">
              <div class="control-buttons">
                <SquareButton title="Lật ngang" @click="flip(true, false)" class="control-btn">
                  <Icon icon="material-symbols:flip" class="btn-icon" />
                </SquareButton>

                <SquareButton title="Lật dọc" @click="flip(false, true)" class="control-btn">
                  <Icon icon="material-symbols:flip" class="btn-icon vertical-flip" />
                </SquareButton>

                <SquareButton title="Xoay phải" @click="rotate(90)" class="control-btn">
                  <Icon icon="material-symbols:rotate-right" class="btn-icon" />
                </SquareButton>

                <SquareButton title="Xoay trái" @click="rotate(-90)" class="control-btn">
                  <Icon icon="material-symbols:rotate-left" class="btn-icon" />
                </SquareButton>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button @click="handleClose" class="btn btn-secondary">Hủy</button>
          <button @click="downloadImage" class="btn btn-outline">Tải xuống</button>
          <button @click="saveEditedImage" class="btn btn-primary">Lưu thay đổi</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #1f2937;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.modal-body {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: #fef2f2;
  color: #dc2626;
  border-bottom: 1px solid #fecaca;
}

.message-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.cropper-container {
  display: flex;
  gap: 1.5rem;
  padding: 2rem;
  height: 500px;
}

.modal-cropper {
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
}

.modal-controls {
  display: flex;
  flex-direction: column;
}

.control-buttons {
  flex-shrink: 0;
}

.control-btn {
  transition: all 0.2s ease;
}

.control-btn:hover {
  transform: scale(1.05);
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.vertical-flip {
  transform: rotate(90deg);
}

.modal-footer {
  display: flex;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-top: 1px solid #e5e7eb;
  justify-content: flex-end;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.btn-outline {
  background: transparent;
  color: #3b82f6;
  border: 1px solid #3b82f6;
}

.btn-outline:hover {
  background: #3b82f6;
  color: white;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .modal-overlay {
    padding: 1rem;
  }

  .cropper-container {
    flex-direction: column;
    height: auto;
    padding: 1rem;
  }

  .modal-controls {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .control-buttons {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .modal-footer {
    flex-direction: column;
    gap: 0.5rem;
  }

  .btn {
    width: 100%;
  }
}
</style>
