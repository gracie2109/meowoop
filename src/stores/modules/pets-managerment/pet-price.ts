import type { IPetServicerPriceParam, IPetServicerPriceResponse } from '@/types/pet-type'
import { defineStore, storeToRefs } from 'pinia'
import { usePetServices, usePetTypesStore } from '@/stores'
import { toRaw } from 'vue'

export const usePetServicePrice = defineStore('petServicePrice', () => {
  const $petT = usePetTypesStore()
  const $service = usePetServices()
  const { dataList: pets } = storeToRefs($petT)
  const { dataList: services } = storeToRefs($service)

  function getSeviceByPet(petTypes?: string) {
    const data = toRaw(services.value)
    if (!data || !petTypes) return
    const petTypeSet = new Set(Array.isArray(petTypes) ? petTypes : [petTypes])
    const result = []
    for (const item of data) {
      if (item.pet_type_ids?.some((id) => petTypeSet.has(id))) {
        result.push(item)
      }
    }
    return result
  }

  function getData(data: Partial<IPetServicerPriceParam>): IPetServicerPriceResponse {
    if (!data)
      return {
        service_data: undefined,
        pet_data: undefined,
      }

    const validPet = toRaw(pets.value).find((i) => i?._id === data.pet_id)
    const detailService = toRaw(services.value).find((i) => i?._id === data.service_id)

    const service_by_pets = getSeviceByPet(data.pet_id)
    let rs = {
      service_data: detailService ?? undefined,
      pet_data: validPet ?? undefined,
    }

    if (data.pet_id && data.service_id) {
      Object.assign(rs, { pets: [], services: [] })
    }
    if (!(data.pet_id && data.service_id)) {
      Object.assign(rs, { pets: toRaw(pets.value), services: toRaw(services.value) })
    }

    if (!data.pet_id && data.service_id) {
      Object.assign(rs, { pets: toRaw(pets.value), services: service_by_pets })
    }
    if (data.pet_id && !data.service_id) {
      Object.assign(rs, { pets: [], services: service_by_pets })
    }

    return rs
  }

  return { getData, getSeviceByPet }
})
