<template>
  <Spin :spinning="priceLoad || serviceLoad">
    <div style="height: 100%; position: relative">
      <PageHeader>
        <Icon
          icon="fluent:money-settings-24-regular"
          width="24"
          color="var(--vt-c-primary)"
        />&nbsp; &gt;
        {{ pageHeader }}
        <p>&nbsp; &gt; Overview</p>
      </PageHeader>
      <div @click="handleBack" style="margin-bottom: 1.5rem;">
        <Flex class="backBtn" gap="8">
          <Icon icon="icon-park-outline:left-square" width="24" color="var(--vt-c-primary)" />
          <p class="backBtnText">{{ $t('common.backTitle') }}</p>
        </Flex>
      </div>
      <Table :columns="columns" :dataSource="dataSource" bordered />
    </div>
  </Spin>
</template>

<script setup lang="ts">
import { usePetServicePrice, usePetServices } from '@/stores'
import { computed, onMounted, ref, toRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { groupBy } from 'lodash'
import { Flex, Spin, Table } from 'ant-design-vue'
import { getListWeight } from '@/services/modules/pets-managerment/pet-weight.service'
import { useI18n } from 'vue-i18n'
import PageHeader from '@/components/PageHeader.vue'
import { Icon } from '@iconify/vue/dist/iconify.js'
import type { IPetServicerPriceParam } from '@/types/pet-type'
import { storeToRefs } from 'pinia'
const $servicePrice = usePetServicePrice()
const $service = usePetServices()

const { loading: priceLoad } = storeToRefs($servicePrice)
const { loading: serviceLoad } = storeToRefs($service)

const route = useRoute()
const router = useRouter()

const { locale } = useI18n()
const dataPriceSlip = ref([])
const dataService = ref([])
const petWeights = ref([])
const query = route.query as IPetServicerPriceParam

const getColTitle = (key) => {
  if (route.query?.service_id && dataService.value?.[0]) {
    const source = dataService.value?.[0]
    if (source?.pet_type_ids?.includes(key)) {
      const find = source?.pet_types_info?.find((i) => i?._id === key)
      return find ? find?.name : ''
    }
  }
}

const pageHeader = computed(() => {
  const { pet_id, service_id } = query

  if (service_id) {
    const selected = dataService.value.find((i) => i?._id === service_id)

    return selected ? selected?.name?.[locale.value] : ''
  }

  if (pet_id) {
    const selected = dataService.value?.[0]?.pet_types_info?.find((i) => i?._id === pet_id)
    return selected ? selected?.name : ''
  }
  return ''
})
const handleBack = () => {
  router.go(-1)
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
