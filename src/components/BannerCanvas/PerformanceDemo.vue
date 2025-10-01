// Demo component để test performance của BannerViewer
<template>
  <div class="performance-demo">
    <div class="controls">
      <h2>BannerViewer Performance Demo</h2>

      <div class="metrics">
        <div class="metric-card">
          <h3>FPS</h3>
          <div class="metric-value">{{ fps }}</div>
        </div>

        <div class="metric-card" v-if="memoryUsage">
          <h3>Memory (MB)</h3>
          <div class="metric-value">{{ memoryUsage.usedJSHeapSize }}</div>
        </div>

        <div class="metric-card">
          <h3>Content Items</h3>
          <div class="metric-value">{{ contentCount }}</div>
        </div>
      </div>

      <div class="controls-row">
        <button @click="addRandomContent" class="btn">Add Random Content</button>
        <button @click="clearContent" class="btn">Clear Content</button>
        <button @click="toggleMonitoring" class="btn">
          {{ isMonitoring ? 'Stop' : 'Start' }} Monitoring
        </button>
      </div>
    </div>

    <div class="banner-demo">
      <BannerViewer
        :image-url="bannerImageUrl"
        position="left"
        :texts="[]"
        :width="800"
        :height="400"
        :use-dynamic-content="true"
        :dynamic-content="dynamicContent"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import BannerViewer from './BannerViewer.vue'
import type { BannerContent } from '@/types/banner-content'
import { PerformanceMonitor, FPSMonitor, getMemoryUsage } from '@/utils/performance'

// Performance monitoring
const performanceMonitor = PerformanceMonitor.getInstance()
const fpsMonitor = new FPSMonitor()

// Reactive data
const fps = ref(0)
const memoryUsage = ref<Record<string, number> | null>(null)
const isMonitoring = ref(false)

// Demo data
const bannerImageUrl = 'https://static.nutscdn.com/vimg/1920-0/0ad186e9bbf32f86a48e84a6fbaa94a3.jpg'
const dynamicContent = ref<BannerContent[]>([
  {
    type: 'h1',
    text: 'Performance Demo',
    styles: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: 16,
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
    }
  },
  {
    type: 'p',
    text: 'Testing dynamic content rendering performance',
    styles: {
      fontSize: 16,
      color: '#f0f0f0',
      marginBottom: 20,
      lineHeight: 1.5
    }
  }
])

const contentCount = ref(dynamicContent.value.length)

// Random content generation
const randomColors = ['#ff6b35', '#f7931e', '#ffd100', '#6b5b95', '#88d8b0', '#ff6b6b']
const randomTexts = [
  'Amazing pets collection', 'Premium pet care', 'Healthy and happy pets',
  'Best pet accessories', 'Professional pet services', 'Quality pet products'
]

const addRandomContent = () => {
  performanceMonitor.startTiming('add-content')

  const newContent: BannerContent = {
    type: Math.random() > 0.5 ? 'p' : 'button',
    text: randomTexts[Math.floor(Math.random() * randomTexts.length)],
    styles: {
      fontSize: 14,
      color: randomColors[Math.floor(Math.random() * randomColors.length)],
      marginBottom: 8,
      padding: '8px 16px',
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderRadius: '6px'
    }
  }

  dynamicContent.value.push(newContent)
  contentCount.value = dynamicContent.value.length

  performanceMonitor.endTiming('add-content')
}

const clearContent = () => {
  performanceMonitor.startTiming('clear-content')

  dynamicContent.value = [
    dynamicContent.value[0], // Keep header
    dynamicContent.value[1]  // Keep description
  ]
  contentCount.value = dynamicContent.value.length

  performanceMonitor.endTiming('clear-content')
}

const toggleMonitoring = () => {
  isMonitoring.value = !isMonitoring.value

  if (isMonitoring.value) {
    fpsMonitor.start()
    startPerformanceTracking()
  } else {
    fpsMonitor.stop()
    stopPerformanceTracking()
  }
}

let performanceInterval: number | null = null

const startPerformanceTracking = () => {
  performanceInterval = window.setInterval(() => {
    fps.value = fpsMonitor.getCurrentFPS()
    memoryUsage.value = getMemoryUsage()
  }, 1000)
}

const stopPerformanceTracking = () => {
  if (performanceInterval) {
    clearInterval(performanceInterval)
    performanceInterval = null
  }
}

// Auto start monitoring
onMounted(() => {
  toggleMonitoring()
})

onUnmounted(() => {
  fpsMonitor.stop()
  if (performanceInterval) {
    clearInterval(performanceInterval)
  }
})

defineOptions({ name: 'PerformanceDemo' })
</script>

<style scoped>
.performance-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.controls {
  margin-bottom: 30px;
}

.controls h2 {
  color: #333;
  margin-bottom: 20px;
}

.metrics {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.metric-card {
  background: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  min-width: 120px;
}

.metric-card h3 {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #666;
  text-transform: uppercase;
}

.metric-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.controls-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.btn:hover {
  background: #40a9ff;
}

.banner-demo {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .metrics {
    flex-direction: column;
    gap: 12px;
  }

  .controls-row {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
