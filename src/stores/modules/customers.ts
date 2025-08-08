import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCustomer = defineStore('customer', () => {
  const dataList = ref<unknown[]>([])
  const loading = ref(false)
  const totalRecord = ref(0)

  return {
    dataList,
    loading,
    totalRecord
  }
})