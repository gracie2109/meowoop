<template>
  <IconPicker
    :button-text="props.buttonText"
    :category="props.category"
    :container="props.container"
    :is-all="props.isAll"
    :model-value="props.modelValue"
    @select="(vl) => handleSelect(vl)"
    @change="(vl) => handleChange(vl)"
    @update:model-value="$emit('update:modelValue')"
  >
  </IconPicker>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconPicker from './IconPicker.vue'
import ColorPicker from '@/components/Color/Index.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  buttonText: {
    type: String,
    default: 'Chọn Icon',
  },
  isAll: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String || undefined,
    default: undefined,
  },
  container: {
    type: HTMLElement || null,
    default: document.body,
  },
})

const dataIcon = ref({ icon: '', color: '' })

const handleSelect = (vl) => {}

const handleChange = (vl) => {}
</script>
