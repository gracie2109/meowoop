import { defineStore } from 'pinia'
import { ref } from 'vue'
import { searchData, createData, deleteRole } from '@/services/modules/iam/roles.service'
export const useRoles = defineStore('Roles', () => {
  const dataList = ref<unknown[]>([])
  const loading = ref(false)
  const totalRecord = ref(0)

  async function searchList(payload: unknown) {
    try {
      loading.value = true
      const res = (await searchData(payload)) as {
        success: boolean
        totalRecord: number
        data: { data: unknown[] }
      }

      const data = res.data?.data as unknown[]

      dataList.value = data
      totalRecord.value = res.totalRecord
    } catch (err) {
      loading.value = false

      console.log('err', err)
    } finally {
      loading.value = false
    }
  }

  async function createRole(
    payload: { name: string; description: string; resource_actions: any },
    callback?: (data?: unknown) => void,
    callbackErr?: (error?: unknown) => void,
  ): Promise<void> {
    try {
      loading.value = true
      const result = await createData(payload)
        .then((vl: unknown) => {
          if (callback) callback(vl)
        })
        .catch((err) => {
          if (callbackErr) callbackErr(err)
        })
      if (callback) callback(result)
    } catch (err) {
      loading.value = false
      if (callbackErr) callbackErr(err)

      console.log('err', err)
    } finally {
      loading.value = false
    }
  }

  async function onDeleteRole(
    ids: string,
    callback?: (data?: unknown) => void,
    callbackErr?: (error?: unknown) => void,
  ): Promise<void> {
    try {
      loading.value = true
      const result = await deleteRole(ids)
      if (callback) callback(result)
    } catch (error) {
      console.error('Error updating pet type:', error)
      if (callbackErr) callbackErr(error)
    } finally {
      loading.value = false
    }
  }

  return {
    dataList,
    loading,
    totalRecord,
    searchList,
    createRole,
    onDeleteRole,
  }
})
