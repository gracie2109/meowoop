<script lang="ts" setup>
import { computed, ref } from 'vue'
import DigitalClockDigit from '@/components/Clock/DigitalClock.vue'

// Create reactive date object
const time = ref(new Date())

setInterval(() => {
  time.value = new Date()
}, 1000)

// Computed functions to get units
const getSeconds = computed(() =>
  time.value.getSeconds().toString().padStart(2, '0'),
)
const getMinutes = computed(() =>
  time.value.getMinutes().toString().padStart(2, '0'),
)
const getHours = computed(() =>
  time.value.getHours().toString().padStart(2, '0'),
)
</script>

<template>
  <section class="clock mt-12">
    <div class="clock__col">
      <DigitalClockDigit :value="getHours" />
      <div class="clock__unit">
        Hours
      </div>
    </div>
    <div class="clock__col">
      <DigitalClockDigit :value="getMinutes" />
      <div class="clock__unit">
        Minutes
      </div>
    </div>
    <div class="clock__col">
      <DigitalClockDigit :value="getSeconds" />
      <div class="clock__unit">
        Seconds
      </div>
    </div>
  </section>
</template>

<style>
.clock {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem; /* tương đương với gap-2 */
  background-color: #1f2937; /* bg-gray-900 */
  padding: 2rem; /* p-8 */
}

.clock__col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #374151; /* bg-gray-700 */
  border: 1px solid #4b5563; /* border-gray-600 */
  border-radius: 0.75rem; /* rounded-xl */
  padding-top: 1rem; /* py-4 */
  padding-bottom: 1rem;
}

.clock__unit {
  color: #9ca3af; /* text-gray-400 */
  text-transform: uppercase;
  font-size: 0.75rem; /* text-xs */
  font-weight: 900; /* font-black */
  margin-top: 0.25rem; /* mt-1 */
}

</style>
