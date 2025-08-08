import { defineStore } from 'pinia'
import { ref } from 'vue'
import { searchListData } from './customers.service'

export const useCustomersService = defineStore('customers', () => {
  const dataList = ref<unknown[]>([])
  const loading = ref(false)
  const totalRecord = ref(0)

  async function searchList(payload: unknown, bool: boolean = false) {
    try {
      loading.value = true
      const res = (await searchListData(payload)) as {
        success: boolean
        totalRecord: number
        data: { data: unknown[] }
      }

      const data = res.data?.data as unknown[]

      if (!bool) {
        dataList.value = data
        totalRecord.value = res.totalRecord
      } else {
        return data
      }
    } catch (err) {
      loading.value = false

      console.log('err', err)
    } finally {
      loading.value = false
    }
  }

  return {
    dataList,
    loading,
    totalRecord,
    searchList,
  }
})
