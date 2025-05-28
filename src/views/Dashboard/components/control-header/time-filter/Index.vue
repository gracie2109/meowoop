<template>
  <RangePicker
  
    format="DD/MM/YYYY HH:mm:ss"
    :presets="PRESET_OPTION_2"
    @change="onRangeChange"
    size="middle"
    :value="filterValue"
  />
</template>

<script setup lang="ts">
import dayjs, { Dayjs } from 'dayjs'

import { PRESET_OPTION_2 } from '@/contants/lib'
import { RangePicker } from 'ant-design-vue'

import { useDashboardStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const $store = useDashboardStore()
const { timeFilter } = storeToRefs($store)
const filterValue = ref()

const onRangeChange = (value: [string, string] | [Dayjs, Dayjs]) => {
  if (value && value[0] && value[1]) {
    $store.setTimeFilter(dayjs(value[0]), dayjs(value[1]))
    filterValue.value = value
  }
}

onMounted(() => {
  if (timeFilter.value) {
    filterValue.value = [timeFilter.value.from_time, timeFilter.value.to_time]
  }
})
defineOptions({
  name: 'DashboardTimeFilter',
})
</script>

<style scoped></style>
