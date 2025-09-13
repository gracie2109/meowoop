import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  createAddress,
  createData,
  searchListData,
  searchUserAddress,
  updateUserAddress,
} from '@/services/modules/customers.service'
import { deleteAddress } from '@/services/address.service'

export const useCustomer = defineStore('customer', () => {
  const dataList = ref<unknown[]>([])
  const loading = ref(false)
  const totalRecord = ref(0)

  async function createCustomer(
    payload: any,
    callback?: (data?: unknown) => void,
    callbackErr?: (error?: unknown) => void,
  ): Promise<void> {
    try {
      loading.value = true
      await createData(payload)
        .then((vl: unknown) => {
          if (callback) callback(vl)
        })
        .catch((err) => {
          if (callbackErr) callbackErr(err)
        })
    } catch (err) {
      loading.value = false
      if (callbackErr) callbackErr(err)
      console.log('err', err)
    } finally {
      loading.value = false
    }
  }

  async function searchCustomers(payload: any, isShowAddress?: boolean) {
    try {
      loading.value = true
      await searchListData({ ...payload, isShowAddress: isShowAddress ?? true }).then((data) => {
        // dataList.value = data?.data.map(i => ({
        //   ...i,
        //   ...i?.address,
        //   address: i?.address?.[0],

        // }))
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

  async function getUserAddress(payload: string) {
    try {
      loading.value = true
      return await searchUserAddress({ customerId: payload })
    } catch (error) {
      console.log('fetch fail', error)
      loading.value = false
    } finally {
      loading.value = false
    }
  }
  async function deleteUserAddress(payload: string) {
    try {
      loading.value = true
      return await deleteAddress(payload)
    } catch (error) {
      console.log('fetch fail', error)
      loading.value = false
    } finally {
      loading.value = false
    }
  }
  async function updateAddress(payload: any) {
    try {
      loading.value = true
      return await updateUserAddress(payload)
    } catch (error) {
      console.log('fetch fail', error)
      loading.value = false
    } finally {
      loading.value = false
    }
  }

async function createUserAddress(payload: any) {
    try {
      loading.value = true
      return await createAddress(payload)
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
    createCustomer,
    searchCustomers,
    getUserAddress,
    deleteUserAddress,
    updateAddress,
    createUserAddress
  }
})
