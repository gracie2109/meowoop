import type { IPetService, IPetServiceForm } from '@/types/pet-type'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const usePetServices = defineStore('petServices', () => {
  const dataList = ref<IPetService[]>([
    {
      _id: '1',
      id: '1',
      created_at: new Date(),
      updated_at: new Date(),
      name: {
        vi: 'services 1 vi',
        en: 'services 1 en',
      },
      description: {
        en: 'services 1 desc en ',
        vi: 'services 1 desc vi ',
      },
      category_id: 'cate1',
      pet_type_ids: ['1'],
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
          id: '1',
          name: 'PET 1',
        },
        {
          id: '2',
          name: 'PET 2',
        },
      ],
    },
    {
      _id: '2',
      id: '2',
      created_at: new Date(),
      updated_at: new Date(),
      name: {
        vi: 'services 2 vi',
        en: 'services 2 en',
      },
      description: {
        en: 'services 2 desc en ',
        vi: 'services 2 desc vi ',
      },
      category_id: 'cate1',
      pet_type_ids: ['2'],
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
          id: '2',
          name: 'PET 2',
        },
      ],
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
