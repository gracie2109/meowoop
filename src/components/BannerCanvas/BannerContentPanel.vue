<template>
  <div :style="contentStyle">
    <div style="color: black; font-weight: bold; margin-bottom: 8px;">
      {{ title || 'Content' }} ({{ texts.length }} texts)
    </div>

    <div v-for="(text, index) in texts" :key="index" class="text-item">
      <div class="text-content">{{ text.text }}</div>
      <div class="text-meta">Size: {{ text.fontSize }}px</div>
    </div>

    <div v-if="texts.length === 0" class="empty-message">
      No texts found!
    </div>


  </div>
</template>

<script setup lang="ts">
interface TextItem {
  text: string
  fontSize: number
  [key: string]: unknown
}

interface Props {
  texts: TextItem[]
  contentStyle?: Record<string, string | number>
  title?: string
  showAddButton?: boolean
}

withDefaults(defineProps<Props>(), {
  contentStyle: () => ({}),
  title: 'Content',
  showAddButton: true
})

defineEmits<{
  addText: []
}>()

defineOptions({ name: 'BannerContentPanel' })
</script>

<style scoped>
.text-item {
  margin-bottom: 8px;
  padding: 6px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  font-size: 14px;
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

.empty-message {
  color: #999;
  font-style: italic;
  text-align: center;
  padding: 16px;
}

.add-text-btn {
  background: #1890ff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  margin-top: 8px;
  width: 100%;
  transition: background-color 0.2s;
}

.add-text-btn:hover {
  background: #40a9ff;
}
</style>
