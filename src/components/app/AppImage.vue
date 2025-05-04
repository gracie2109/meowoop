<template>
  <div ref="containerRef" class="smart-image">
    <template v-if="!isVisible || isLoading">
      <slot name="placeholder">
        <div class="placeholder">loading...</div>
      </slot>
    </template>

    <template v-else-if="isError">
      <slot name="error">
        <div class="error">Error</div>
      </slot>
    </template>

    <img
      v-else
      :src="props.src"
      :alt="props.alt"
      class="image"
      :class="{ loaded: hasLoaded }"
      @load="handleLoaded"
      @error="handleError"
      ref="imageRef"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { useImage } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    src: string
    alt?: string
    lazy?: boolean
  }>(),
  {
    lazy: true,
  },
)

const containerRef = ref<HTMLElement | null>(null)
const isVisible = ref(props.lazy ? false : true)

const { isLoading } = useImage({ src: props.src })

const isError = ref(false)
const hasLoaded = ref(false)

const handleLoaded = () => {
  isError.value = false
  hasLoaded.value = true
}

const handleError = () => {
  isError.value = true
  hasLoaded.value = false
}

if (props.lazy) {
  useIntersectionObserver(
    containerRef,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        isVisible.value = true
      }
    },
    {
      rootMargin: '100px',
    },
  )
} else {
  isVisible.value = true
}
</script>

<style scoped>
.smart-image {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.image.loaded {
  opacity: 1;
}

.placeholder,
.error {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  text-align: center;
}
</style>
