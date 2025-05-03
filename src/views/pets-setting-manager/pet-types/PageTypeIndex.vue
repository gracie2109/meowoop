<template>
  <div class="container" id="pet_types" ref="el">
    <icon-picker
      v-model:modelValue="selectedIcon"
      @select="handleIconSelect"
      @change="handleIconChange"
      :container="el"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconPicker from '@/components/Icons/IconPicker.vue'
import { DEFAULT_COLOR, DEFAULT_ICON } from '@/contants/lib'
import { useDynamicTitle } from '@/composables'

useDynamicTitle('menu.menu_6')

const selectedIcon = ref({ icon: DEFAULT_ICON, color: DEFAULT_COLOR })

const handleIconSelect = (iconPath: string) => {
  console.log('Icon selected:', iconPath)
}

const handleIconChange = (iconPath: string) => {
  console.log('Icon changed:', iconPath)
}

const el = ref()
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
}

.selected-icon-preview {
  margin-top: 32px;
  padding: 20px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
}

.preview {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 12px;
}

.icon-large {
  width: 48px;
  height: 48px;
  fill: #1890ff;
}
</style>
