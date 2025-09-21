import { createNewBoss, searchListData } from '@/services/modules/pets.service'
import type { CommonSearchKey } from '@/types/common'
import type { IPetBoss } from '@/types/pet-boss'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePetBoss = defineStore('PetBoss', () => {
  const dataList = ref<IPetBoss[]>([])
  const loading = ref(false)
  const totalRecord = ref(0)

  async function searchBossList(payload: CommonSearchKey) {
    try {
      loading.value = true
      await searchListData(payload).then((data) => {
        dataList.value = data?.data
        totalRecord.value = data?.totalRecord
      })
    } catch (error) {
      console.log('fetch fail', error)
      loading.value = false
    } finally {
      loading.value = false
    }
  }

   async function createBoss(payload: any ) {
    try {
      loading.value = true
      await createNewBoss(payload)
    } catch (error) {
      console.log('fetch fail', error)
      loading.value = false
    } finally {
      loading.value = false
    }
  }

  return {
    dataList,
    loading,
    totalRecord,
    searchBossList,
    createBoss
  }
})
