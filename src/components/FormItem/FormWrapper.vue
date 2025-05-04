<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, computed } from 'vue'
import { useLocaleEventBus } from '@/composables/eventBus/useLocaleEventBus'
import type { FormInstance } from 'ant-design-vue'

const props = defineProps<{
  form: FormInstance
  hasSubmitted: boolean
}>()

const f = props.form
const hasSubmitted = computed(() => props.hasSubmitted)

const { onLocaleChanged: onLocaleChangedHandler } = useLocaleEventBus()

let unsubscribe: () => void

onMounted(() => {
  unsubscribe = onLocaleChangedHandler(() => {
    if (hasSubmitted.value) {
      f.validate()
    }
  })
})

onBeforeUnmount(() => {
  unsubscribe()
})
</script>
