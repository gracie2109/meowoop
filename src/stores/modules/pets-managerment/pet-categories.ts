import type { TPetCategory, TPetCategoryForm } from '@/types/pet-type'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const usePetCategoryStore = defineStore('petCategory', () => {
  const dataList = ref<TPetCategory[]>([
    {
      _id: 'cate1',
      id: 'cate1',
      name: {
        vi: 'Chăm sóc sức khoer',
        en: 'cate 1 en',
      },
      description: {
        en: 'cate desc en ',
        vi:  'cate desc vi ',
      },
      created_at: new Date(),
      updated_at: new Date(),
    },
     {
      _id: 'cate2',
      id: 'cate2',
      name: {
        vi: 'cate 2 vi',
        en: 'cate 2 en',
      },
      description: {
        en: 'cate 2 desc en ',
        vi:  'cate 2 desc vi ',
      },
      created_at: new Date(),
      updated_at: new Date(),
    },
  ])

  function createPetType(petType: TPetCategoryForm) {
    const payload = {
      ...petType,
      _id: String(dataList.value.length + 1),
      id: String(dataList.value.length + 1),
      created_at: new Date(),
      updated_at: new Date(),
    }
    dataList.value.push(payload as TPetCategory)
  }
  return {
    dataList,
    createPetType,
  }
})
