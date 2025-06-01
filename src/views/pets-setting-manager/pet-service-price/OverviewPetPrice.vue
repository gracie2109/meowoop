<template>
  <Table :columns="columns" :dataSource="dataSource" bordered />
</template>

<script setup lang="ts">
import { usePetServicePrice, usePetServices } from '@/stores'
import { computed, onMounted, ref, toRaw } from 'vue'
import { useRoute } from 'vue-router'
import { groupBy } from 'lodash'
import { Flex, Table } from 'ant-design-vue'
import { getListWeight } from '@/services/modules/pets-managerment/pet-weight.service'
import { useI18n } from 'vue-i18n'
const $servicePrice = usePetServicePrice()
const $service = usePetServices()

const route = useRoute()
const { locale } = useI18n()
const dataPriceSlip = ref([])
const dataService = ref([])
const petWeights = ref([])
const getColTitle = (key) => {
  if (route.query?.service_id && dataService.value?.[0]) {
    const source = dataService.value?.[0]
    if (source?.pet_type_ids?.includes(key)) {
      const find = source?.pet_types_info?.find((i) => i?._id === key)
      return find ? find?.name : ''
    }
  }
}

const getColumnTable = (lang: string) => {
  const weightColumn = {
    title: 'Weight',
    dataIndex: 'weightKey',
    key: 'weightKey',
    width: 100,
    fixed: 'left',
  }
  if (!dataService.value?.length) return [weightColumn]

  const { service_id, pet_id } = route.query || {}
  if (service_id && dataService.value[0]) {
    const columns =
      dataService.value[0].pet_type_ids?.map((id) => ({
        title: getColTitle(id),
        dataIndex: id,
        key: id,
      })) || []

    return [weightColumn, ...columns]
  }

  if (pet_id) {
    const columns = dataService.value.map((item) => ({
      title: item?.name?.[lang],
      dataIndex: item._id,
      key: item._id,
    }))

    return [weightColumn, ...columns]
  }

  return [weightColumn]
}

const columns = computed(() => {
  const petColumns = getColumnTable(locale.value)
  return petColumns
})

const dataSource = computed(() => {
  return petWeights.value.map((weight) => {
    const row = {
      weightKey: weight.key,
      weightId: weight.id || weight?._id,
    }

    if (route.query?.service_id && dataService.value?.[0]) {
      const source = dataService.value?.[0]?.pet_type_ids
      for (const petId of source) {
        const petData = dataPriceSlip.value[petId] ?? []
        const matched = petData.find((item) => item.weight_id.id === weight.id)
        row[petId] = matched?.price ?? null
      }
    }

    if (route.query?.pet_id && dataService.value) {
      dataService.value.forEach((service) => {
        const matched = dataPriceSlip.value?.find(
          (item) => item.service_id === service.id && item.weight_id.id === weight.id,
        )
        row[service._id] = matched?.price || null
      })
    }

    return row
  })
})

onMounted(() => {
  async function getSvPrice() {
    const res = await $servicePrice.getDetailSvPrice(route.query)
    if (res?.success) {
      const response = res.data.data
      const b = groupBy(response, 'pet_id')
      dataPriceSlip.value = route.query?.service_id ? b : response
    }
  }
  async function searchService() {
    const q = route.query?.service_id
      ? {
          id: route.query?.service_id,
        }
      : {
          pet_type_ids: [route.query?.pet_id],
        }
    const res = await $service.searchList(q, true)
    Object.assign(dataService.value, res)
  }

  async function getList() {
    try {
      const a = await getListWeight()
      petWeights.value = a || []
    } catch (error) {
      console.error('Error fetching weight list:', error)
    }
  }

  getSvPrice()
  searchService()
  getList()
})
defineOptions({ name: 'overview-pet-price' })
</script>

<style scoped></style>
