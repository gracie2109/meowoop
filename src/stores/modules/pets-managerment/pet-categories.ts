import {
  createData,
  deleteData,
  fetchAllPets,
  updateData,
} from '@/services/modules/pets-managerment/pet-category.service'

import type { TPetCategory, TPetCategoryForm } from '@/types/pet-type'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const usePetCategoryStore = defineStore('petCategory', () => {
  const dataList = ref<TPetCategory[]>([])
  const loading = ref(false)
  const totalRecord = ref(0)

  async function createPetType(
    petType: TPetCategoryForm,
    callback?: (data?: unknown) => void,
    callbackErr?: (data?: unknown) => void,
  ) {
    try {
      loading.value = true
      await createData(petType)
        .then((vl: unknown) => {
          if (callback) callback(vl)
        })
        .catch((err) => {
          if (callbackErr) callbackErr(err)
        })
    } catch (error) {
      console.log('ee', error)

      loading.value = false
    } finally {
      loading.value = false
    }
  }

  async function updateType(
    petType: TPetCategoryForm & { id: string },
    callback?: (data?: unknown) => void,
    callbackErr?: (error?: unknown) => void,
  ): Promise<void> {
    try {
      loading.value = true
      const result = await updateData(petType)
      if (callback) callback(result)
    } catch (error) {
      console.error('Error updating pet type:', error)
      if (callbackErr) callbackErr(error)
    } finally {
      loading.value = false
    }
  }

  async function deleteType(
    ids: string | string[],
    callback?: (data?: unknown) => void,
    callbackErr?: (error?: unknown) => void,
  ): Promise<void> {
    try {
      loading.value = true
      const result = await deleteData(ids)
      if (callback) callback(result)
    } catch (error) {
      console.error('Error updating pet type:', error)
      if (callbackErr) callbackErr(error)
    } finally {
      loading.value = false
    }
  }

  async function searchList(payload: unknown) {
    try {
      loading.value = true
      const res = (await fetchAllPets(payload)) as {
        success: boolean
        totalRecord: number
        data: { data: TPetCategory[] }
      }

      const data = res.data?.data as TPetCategory[]

      dataList.value = data
      totalRecord.value = res.totalRecord
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
    createPetType,
    searchList,
    updateType,
    deleteType,
  }
})
