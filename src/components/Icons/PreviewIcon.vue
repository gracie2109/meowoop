<script setup lang="ts">
import { defineProps, computed, withDefaults } from 'vue'
const props = withDefaults(
  defineProps<{
    svgId?: string
    size?: number | string
    color?: string
  }>(),
  {},
)
const isSvgId = computed(() => !!props.svgId)

const iconSize = computed(() =>
  typeof props.size === 'number' ? `${props.size}px` : props.size || '24px',
)

const iconColor = computed(() => props.color || 'currentColor')
</script>

<template>
  <svg
    v-if="isSvgId"
    :width="iconSize"
    :height="iconSize"
    :style="{ color: iconColor, height: '100%' }"
  >
    <use
      :xlink:href="svgId?.includes('#') ? svgId?.replace('/', '-') : `#${svgId?.replace('/', '-')}`"
    />
  </svg>
</template>

<style scoped>
svg {
  display: inline-block;
  vertical-align: middle;
}
</style>
