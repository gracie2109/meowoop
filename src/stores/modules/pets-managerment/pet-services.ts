import {
  fetchAllService,
  createData,
  getDetaiPetlService,
  updateData
} from '@/services/modules/pets-managerment/pet-service.service'
import type { IPetService, IPetServiceForm } from '@/types/pet-type'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const usePetServices = defineStore('petServices', () => {
  const dataList = ref<IPetService[]>([])
  const loading = ref(false)
  const totalRecord = ref(0)

  async function onCreateData(
    payload: IPetServiceForm,
    callback?: (data?: unknown) => void,
    callbackErr?: (data?: unknown) => void,
  ) {
    try {
      loading.value = true
      await createData(payload)
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

   async function onUpdateData(
    payload: IPetServiceForm & {id: string},
    callback?: (data?: unknown) => void,
    callbackErr?: (data?: unknown) => void,
  ) {
    try {
      loading.value = true
      await updateData(payload)
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

  async function searchList(payload: unknown, bool?: boolean = false) {
    try {
      loading.value = true
      const res = (await fetchAllService(payload)) as {
        success: boolean
        totalRecord: number
        data: { data: IPetService[] }
      }

      const data = res.data?.data as IPetService[]

      if (!bool) {
        dataList.value = data
        totalRecord.value = res.totalRecord
      }else{
        return data
      }
    } catch (err) {
      loading.value = false

      console.log('err', err)
    } finally {
      loading.value = false
    }
  }
  async function getDetailService(payload: { id: string }) {
    try {
      loading.value = true
      const rs = (await getDetaiPetlService(payload)) as {
        success: boolean
        data: any
      }

      return rs
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
    onCreateData,
    searchList,
    getDetailService,
    onUpdateData
  }
})
