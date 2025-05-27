<template>
  <div
    id="wrap"
    ref="wrap"
    :style="{
      background: `radial-gradient(ellipse at center, ${props.background} 0%, #000000 70%)`,
    }"
  >
    <div id="clock" ref="el">
      <p class="date">{{ date }}</p>
      <p class="time" :style="{ fontSize: `${fontSize}rem` }">{{ time }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
import { useElementSize } from '@vueuse/core'
import { useTemplateRef } from 'vue'

const time = ref('')
const date = ref('')
const el = useTemplateRef('el')
const wrap = useTemplateRef('wrap')

const fontSize = ref(1)

const { width: elW, height: elH } = useElementSize(el)

watchEffect(() => {
  if (elW.value && elH.value) {
    fontSize.value = elW.value > elH.value ? elW.value / elH.value : 1.5
  }
})

const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

function zeroPadding(num: number, digit: number) {
  return String(num).padStart(digit, '0')
}

function updateTime() {
  const cd = new Date()
  time.value = `${zeroPadding(cd.getHours(), 2)}:${zeroPadding(cd.getMinutes(), 2)}:${zeroPadding(cd.getSeconds(), 2)}`
  date.value = `${zeroPadding(cd.getFullYear(), 4)}-${zeroPadding(cd.getMonth() + 1, 2)}-${zeroPadding(cd.getDate(), 2)} ${week[cd.getDay()]}`
}

let timerId: number | undefined
const props = defineProps({
  background: {
    type: String,
    default: '#0a2e38',
  },
})

onMounted(() => {
  updateTime()
  timerId = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timerId)
})
</script>

<style scoped>
#wrap {
  background-size: 100%;
  height: 100%;
  width: 100%;
  position: relative;
}

#clock {
  font-family: 'Share Tech Mono', monospace;
  color: #daf6ff;
  text-align: center;
  text-shadow:
    0 0 20px rgba(10, 175, 230, 1),
    0 0 20px rgba(10, 175, 230, 0);
  position: relative;
  height: 100%;
  width: 100%;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#clock .date {
  letter-spacing: 0.1em;
  font-size: 1em;
}
</style>
