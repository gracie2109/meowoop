import { DEFAULT_COLOR, DEFAULT_ICON } from '@/contants/lib'
import type { TPetType, TPetTypeForm } from '@/types/pet-type'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const usePetTypesStore = defineStore('petTypes', () => {
  const dataList = ref<TPetType[]>([
    {
      _id: 'type1',
      id: 'type1',
      name: 'Chó',
      description: 'fsdfsdfdsf',
      icon: { color: DEFAULT_COLOR, icon: DEFAULT_ICON },
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      _id: 'type2',
      id: 'type2',
      name: 'Mèo',
      description: '',
      icon: { color: DEFAULT_COLOR, icon: DEFAULT_ICON },
      created_at: new Date(),
      updated_at: new Date(),
    },
  ])

  function createPetType(petType: TPetTypeForm) {
    const payload = {
      ...petType,
      _id: String(dataList.value.length + 1),
      id: String(dataList.value.length + 1),
      created_at: new Date(),
      updated_at: new Date(),
    }
    dataList.value.push(payload as TPetType)
  }
  return {
    dataList,
    createPetType,
  }
})
