<template>
  <Tooltip :title="title">
    <Icon
      v-if="icon"
      :icon="icon"
      :height="height ?? iconStyle?.height ?? '25px'"
      :color="iconStyle?.color ?? 'var(--vt-c-primary-slate)'"
      :style="{
        cursor: 'pointer',
        ...(iconStyle || {})
      }"
      v-bind="attrs"
      @click="() => $emit('onClick')"
    />
  </Tooltip>

  <slot name="icon" />
</template>

<script setup lang="ts">
import { Tooltip } from 'ant-design-vue'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { useAttrs, type CSSProperties } from 'vue'

const attrs = useAttrs()

defineProps<{
  title?: string
  icon?: string
  iconStyle?: CSSProperties
  height?: string
}>()
defineEmits(['onClick'])

defineOptions({ name: 'IconButton' })
</script>

<style scoped></style>
