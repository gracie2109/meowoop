<template>
  <section class="upload-example">
    <p class="instructions">Please upload an avatar</p>

    <!-- chỉ mount Cropper khi đã có image (dạng data-URL string) -->
    <Cropper
      v-if="image"
      class="upload-example-cropper"
      :src="image"
      :stencil-component="FaceStencil"
      ref="cropperRef"
    />

    <div class="button-wrapper">
      <label class="button">
        <input
          type="file"
          accept="image/*"
          @change="uploadImage"
        />
        📸 Upload image
      </label>
      <button
        v-if="image"
        class="button"
        @click="crop"
      >
        Use
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { Cropper } from 'vue-advanced-cropper'
import type { CropperInstance, MoveEvent } from 'vue-advanced-cropper'
import FaceStencil from './face-stencil.vue'
// Đảm bảo import CSS của thư viện
import 'vue-advanced-cropper/dist/style.css'

const image = ref<string | null>(null)
const cropperRef = ref(null)

// Định nghĩa event emit
const emit = defineEmits<{
  (e: 'submit', dataUrl: string): void
}>()

function uploadImage(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    if (typeof reader.result === 'string') {
      image.value = reader.result
    }
  }
  reader.readAsDataURL(file)
}

async function crop() {
  // chờ Vue mount Cropper và render lại canvas
  await nextTick()
  const cropper = cropperRef.value
  if (!cropper) {
    console.warn('Cropper instance chưa sẵn sàng')
    return
  }
  const { canvas } = cropper.getResult()
  if (!canvas) {
    console.error('Không tạo được canvas; có thể image chưa load xong')
    return
  }
  emit('submit', roundEdges(canvas).toDataURL())
}

function roundEdges(canvas: HTMLCanvasElement): HTMLCanvasElement {
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas
  const { width, height } = canvas
  ctx.globalCompositeOperation = 'destination-in'
  ctx.beginPath()
  ctx.scale(1, height / width)
  ctx.arc(width / 2, width / 2, width / 2, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fill()
  return canvas
}
</script>

<style>
.upload-example {
  max-width: 95%;
  width: 40rem;
  margin: 2rem auto;
}

.upload-example .instructions {
  margin-bottom: 1rem;
}

.upload-example .upload-example-cropper {
  border: 1px solid #eee;
  width: 100%;
  height: 300px;
}

.upload-example .button-wrapper {
  margin-top: 1rem;
}

.upload-example .button {
  display: inline-block;
  border: 2px dashed #223;
  padding: 1rem;
  cursor: pointer;
}

.upload-example .button + .button {
  margin-left: 1rem;
}

.upload-example .button input {
  display: none;
}
</style>
