import { DEFAULT_COLOR, DEFAULT_ICON } from '@/contants/lib'
import type { TPetType } from '@/types/pet-type'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const usePetTypesStore = defineStore('petTypes', () => {
  const dataList = ref<any[]>([])

  return {
    dataList,
  }
})
