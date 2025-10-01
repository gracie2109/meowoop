<template>
  <div class="banner-showcase">
    <h2>Dynamic Banner Content Showcase</h2>

    <div class="banner-controls">
      <label>
        Select Banner:
        <select v-model="selectedBannerId" @change="loadSelectedBanner">
          <option v-for="banner in banners" :key="banner.id" :value="banner.id">
            {{ banner.title }} ({{ banner.status }})
          </option>
        </select>
      </label>

      <div class="banner-info" v-if="selectedBanner">
        <p><strong>Position:</strong> {{ selectedBanner.position }}</p>
        <p><strong>Status:</strong> {{ selectedBanner.status }}</p>
        <p><strong>Content Items:</strong> {{ selectedBanner.content.length }}</p>
      </div>
    </div>

    <!-- Banner Preview -->
    <div
      class="banner-preview"
      :style="{
        backgroundImage: selectedBanner ? `url('${selectedBanner.backgroundImage}')` : 'none'
      }"
    >
      <DynamicBannerContent
        v-if="selectedBanner"
        :content="selectedBanner.content"
      />
    </div>

    <!-- Content Structure Debug -->
    <details class="debug-section">
      <summary>Debug: Content Structure</summary>
      <pre>{{ JSON.stringify(selectedBanner?.content, null, 2) }}</pre>
    </details>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DynamicBannerContent from './DynamicBannerContent.vue'
import type { BannerData } from '@/types/banner-content'
import dummyData from '@/views/settings/banners/dummyData.json'

// Reactive data
const banners = ref<BannerData[]>([])
const selectedBannerId = ref<string>('')
const selectedBanner = ref<BannerData | null>(null)

// Load banners data
const loadBanners = () => {
  banners.value = dummyData.bannerInfo as BannerData[]
  if (banners.value.length > 0) {
    selectedBannerId.value = banners.value[0].id
    selectedBanner.value = banners.value[0]
  }
}

// Load selected banner
const loadSelectedBanner = () => {
  const banner = banners.value.find(b => b.id === selectedBannerId.value)
  selectedBanner.value = banner || null
}

// Lifecycle
onMounted(() => {
  loadBanners()
})

defineOptions({
  name: 'BannerShowcase'
})
</script>

<style scoped>
.banner-showcase {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.banner-showcase h2 {
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.banner-controls {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
}

.banner-controls label {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-weight: 500;
}

.banner-controls select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-width: 200px;
}

.banner-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.banner-info p {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.banner-preview {
  position: relative;
  width: 100%;
  height: 400px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  margin-bottom: 20px;
}

.banner-preview::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  pointer-events: none;
}

.debug-section {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.debug-section summary {
  padding: 10px;
  background: #f8f9fa;
  cursor: pointer;
  font-weight: 500;
}

.debug-section pre {
  padding: 15px;
  background: #f8f9fa;
  border-top: 1px solid #ddd;
  margin: 0;
  font-size: 12px;
  overflow-x: auto;
  white-space: pre-wrap;
}

/* Responsive */
@media (max-width: 768px) {
  .banner-controls {
    flex-direction: column;
    align-items: flex-start;
  }

  .banner-preview {
    height: 300px;
  }
}
</style>
