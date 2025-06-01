import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  createData,
  getDetailServicePrice,
} from '@/services/modules/pets-managerment/pet-service-price.service'

export const usePetServicePrice = defineStore('petServicePrice', () => {
  const loading = ref(false)

  async function onSetPrice(
    payload: any,
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

  async function getDetailSvPrice(payload: any) {
    try {
      loading.value = true
      const rs = (await getDetailServicePrice(payload)) as {
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


  return { onSetPrice, getDetailSvPrice , loading}
})
