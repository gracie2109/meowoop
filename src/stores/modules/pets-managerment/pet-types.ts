import {
  createData,
  deleteData,
  fetchAllPets,
  updateData,
} from '@/services/modules/pets-managerment/pet-types.service'
import type { TPetType, TPetTypeForm } from '@/types/pet-type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePetTypesStore = defineStore('petTypes', () => {
  const dataList = ref<TPetType[]>([])
  const loading = ref(false)
  const totalRecord = ref(0)

  async function createPetType(
    petType: TPetTypeForm,
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
    petType: TPetTypeForm & { id: string },
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
        data: { data: TPetType[] }
      }

      const data = res.data?.data as TPetType[]

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
