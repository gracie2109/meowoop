import type { IPetService, IPetServiceForm } from '@/types/pet-type'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const usePetServices = defineStore('petServices', () => {
  const dataList = ref<IPetService[]>([
    {
      _id: 'service1',
      id: 'service1',
      created_at: new Date(),
      updated_at: new Date(),
      name: {
        vi: 'tắm',
        en: 'tắm',
      },
      description: {
        en: 'services 1 desc en ',
        vi: 'services 1 desc vi ',
      },
      category_id: 'cate2',
      pet_type_ids: ['type1'],
      duration: 33,
      price: 1200,
      category_data: {
        id: 'cate1',
        name: {
          vi: 'cate 1 vi',
          en: 'cate 1 en',
        },
      },
      pet_target_data: [
        {
          id: 'type1',
          name: 'PET 1',
        },
      ],
      isRetail:true
    },
     {
      _id: 'service2',
      id: 'service2',
      created_at: new Date(),
      updated_at: new Date(),
      name: {
        vi: 'cắt móng, mài móng',
        en: 'cạo lông',
      },
      description: {
        en: 'services 1 desc en ',
        vi: 'services 1 desc vi ',
      },
      category_id: 'cate2',
      pet_type_ids: ['type1'],
      duration: 33,
      price: 1200,
      category_data: {
        id: 'cate1',
        name: {
          vi: 'cate 1 vi',
          en: 'cate 1 en',
        },
      },
      pet_target_data: [
        {
          id: 'type1',
          name: 'PET 1',
        },
      ],
      isRetail:true
    },
    {
      _id: 'service2',
      id: 'service2',
      created_at: new Date(),
      updated_at: new Date(),
      name: {
        vi: 'vệ sinh tai',
        en: 'cạo lông',
      },
      description: {
        en: 'services 1 desc en ',
        vi: 'services 1 desc vi ',
      },
      category_id: 'cate2',
      pet_type_ids: ['type1'],
      duration: 33,
      price: 1200,
      category_data: {
        id: 'cate1',
        name: {
          vi: 'cate 1 vi',
          en: 'cate 1 en',
        },
      },
      pet_target_data: [
        {
          id: 'type1',
          name: 'PET 1',
        },
      ],
      isRetail:true
    },
  ])

  function onCreateData(petType: IPetServiceForm) {
    const payload = {
      ...petType,
      _id: String(dataList.value.length + 1),
      id: String(dataList.value.length + 1),
      created_at: new Date(),
      updated_at: new Date(),
    }
    dataList.value.push(payload as IPetService)
  }

  return {
    dataList,
    onCreateData,
  }
})
