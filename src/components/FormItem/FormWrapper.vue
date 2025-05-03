<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useLocaleEventBus } from '@/composables/eventBus/useLocaleEventBus'
import type { FormInstance } from 'ant-design-vue'

const { onLocaleChanged: onLocaleChangedHandler } = useLocaleEventBus()
const props = defineProps<{
  form: FormInstance
}>()

const f = props.form

let unsubscribe: () => void

onMounted(() => {
  unsubscribe = onLocaleChangedHandler(() => f.validate())
})

onBeforeUnmount(() => {
  unsubscribe()
})
</script>
