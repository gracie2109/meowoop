<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <div class="clock__digit">
    <Transition mode="out-in" name="change">
      <div :key="props.value.charAt(0)">{{ props.value.charAt(0) }}</div>
    </Transition>
    <Transition mode="out-in" name="change">
      <div :key="props.value.charAt(1)">{{ props.value.charAt(1) }}</div>
    </Transition>
  </div>
</template>
<style scoped>
.clock__digit {
  font-size: 2.25rem; /* tương đương text-4xl */
  font-weight: 900; /* tương đương font-black */

  color: #daf6ff;
  text-shadow:
    0 0 20px rgba(10, 175, 230, 1),
    0 0 20px rgba(10, 175, 230, 0);
}

.clock__digit > div {
  position: relative; /* tương đương relative */
  display: inline-block; /* tương đương inline-block */
  vertical-align: top; /* tương đương align-top */
}

.change-leave-active,
.change-enter-active {
  transition: all 200ms ease;
}
.change-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}
.change-leave-to {
  transform: translateY(12px);
  opacity: 0;
}
</style>
