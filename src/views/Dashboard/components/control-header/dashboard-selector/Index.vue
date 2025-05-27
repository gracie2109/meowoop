<template>
  <Select
    v-model:value="value"
    show-search
    placeholder="Select a dashboard"
    allow-clear
    style="width: 300px"
    :options="options"
    :filter-option="true"
    @change="handleChange"
    :size="'middle'"
  />
</template>

<script setup lang="ts">
import type { SelectValue } from 'ant-design-vue/es/select'
import { computed, ref } from 'vue'
import { Select } from 'ant-design-vue'
import { useDashboardStore } from '@/stores'
import { storeToRefs } from 'pinia'

const $store = useDashboardStore()
const { currentDashboard, dashboardList } = storeToRefs($store)

const options = computed(() => {
  return dashboardList.value
    ? dashboardList.value?.map((item) => ({
        label: item.name,
        value: item.id,
      }))
    : []
})

const value = ref(currentDashboard.value)

const handleChange = (value: SelectValue) => {
  $store.setCurrentDashboard(value)
}

defineOptions({
  name: 'DashboardSelector',
})
</script>

<style scoped></style>
