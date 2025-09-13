<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { UploadedImage } from '../index.vue'

interface Props {
  images: UploadedImage[]
  showEmpty?: boolean
  showImgInfo?: boolean
}

interface Emits {
  (e: 'edit-image', image: UploadedImage): void
  (e: 'delete-image', imageId: string): void
}

const props = withDefaults(defineProps<Props>(), {
  showEmpty: false,
  showImgInfo: false,
})
const emit = defineEmits<Emits>()

const hasImages = computed(() => props.images.length > 0)

const handleEditImage = (image: UploadedImage): void => {
  emit('edit-image', image)
}

const handleDeleteImage = (imageId: string): void => {
  emit('delete-image', imageId)
}
</script>

<template>
  <div class="gallery-section">
    <div v-if="hasImages">
      <div class="image-grid">
        <div v-for="image in images" :key="image.id" class="image-card">
          <div class="image-preview">
            <img :src="image.thumbnail" :alt="image.name" class="thumbnail" />
            <div class="image-overlay">
              <button
                @click="handleEditImage(image)"
                class="overlay-btn edit-btn"
                title="Chỉnh sửa"
              >
                <Icon icon="material-symbols:edit" />
              </button>
              <button
                @click="handleDeleteImage(image.id)"
                class="overlay-btn delete-btn"
                title="Xóa"
              >
                <Icon icon="material-symbols:delete" />
              </button>
            </div>
          </div>

          <div class="image-info" v-if="showImgInfo">
            <p class="image-name" :title="image.name">{{ image.name }}</p>
            <div class="image-meta">
              <span class="image-size">{{ image.size }}</span>
              <span class="image-time">{{ image.uploadTime }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <div v-if="props.showEmpty">
        <Icon icon="material-symbols:image" class="empty-icon" />
        <h3>Chưa có ảnh nào</h3>
        <p>Tải lên ảnh đầu tiên để bắt đầu sử dụng</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery-section {
  /* margin-bottom: 2rem; */
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1.5rem;
}

.image-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #dcdcdc;
  width: 100%;
  height: 100%;
}

.image-card:hover {
  /* transform: translateY(-4px); */
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
}

.image-preview {
  position: relative;
  aspect-ratio: 1/1;
  overflow: hidden;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.image-preview:hover .thumbnail {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-preview:hover .image-overlay {
  opacity: 1;
}

.overlay-btn {
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1.25rem;
}

.edit-btn {
  background: #3b82f6;
  color: white;
}

.edit-btn:hover {
  background: #2563eb;
  transform: scale(1.1);
}

.delete-btn {
  background: #ef4444;
  color: white;
}

.delete-btn:hover {
  background: #dc2626;
  transform: scale(1.1);
}

.image-info {
  padding: 1rem;
}

.image-name {
  font-weight: 500;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.image-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #6b7280;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
}

.empty-icon {
  width: 4rem;
  height: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #374151;
}

@media (max-width: 768px) {
  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .image-grid {
    grid-template-columns: 1fr;
  }
}
</style>
