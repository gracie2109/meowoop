<template>
  <div class="sss">
    <Spin :spinning="loading || priceLoad ">
      <div style="height: 100%; position: relative">
        <PageHeader>
          <Icon
            icon="fluent:money-settings-24-regular"
            width="24"
            color="var(--vt-c-primary)"
          />&nbsp; &gt;
          {{ $t('pType.P1') }}

          <div v-if="query.pet_id && query.service_id" style="display: flex; gap: 1rem">
            <div v-for="(item, index) in priceHeader" :key="index">
              <span v-if="index !== 1"> &nbsp; &gt; </span>
              {{ item }}
              <span v-if="index !== 1">&nbsp;></span>
            </div>
          </div>
          <div v-else-if="query.service_id && !query.pet_id">
            &nbsp; &gt; &nbsp;{{ data?.name?.[locale] }}
          </div>
          <div v-else>&nbsp; &gt; &nbsp; {{ petTitle }}</div>
        </PageHeader>

        <div align="center" class="backBtnWrap">
          <div @click="handleBack" class="backBtn">
            <Icon icon="icon-park-outline:left-square" width="28" color="var(--vt-c-primary)" />
            <p class="backBtnText">{{ $t('common.backTitle') }}</p>
          </div>
          <div @click="goOverview" v-if="!(query.pet_id && query.service_id)">
            <Flex gap="6" style="cursor: pointer">
              <Icon
                style="text-align: center"
                :height="'20px'"
                :icon="'grommet-icons:overview'"
                color="red"
              />
              <p>Overview</p>
            </Flex>
          </div>
        </div>

        <div v-if="!query.pet_id && query.service_id">
          <ListOption :data="data" :isPetList="true" :loading="loading || priceLoad" />
        </div>

        <div v-else-if="!query.service_id && query.pet_id">
          <ListOption :data="data" :isPetList="false" :loading="loading || priceLoad" />
        </div>

        <div v-else>
          <div class="container">
            <PetServicePriceForm
              :service_id="query.service_id"
              :pet_id="query.pet_id"
              :loading="loading || priceLoad"
              :petWeights="petWeights"
            />
          </div>
        </div>
      </div>
    </Spin>
  </div>
</template>

<script setup lang="ts">
import PetServicePriceForm from '@/views/pets-setting-manager/pet-service-price/components/PriceForm.vue'
import { useRoute, useRouter } from 'vue-router'
import {
  PetServicerPriceParam,
  type IPetServiceDetail,
  type IPetServicerPriceParam,
} from '@/types/pet-type'
import { usePetServices, usePetServicePrice } from '@/stores'
import { computed, onMounted, onUnmounted, ref, watch, watchEffect } from 'vue'
import ListOption from '@/views/pets-setting-manager/pet-service-price/components/ListOption.vue'

import PageHeader from '@/components/PageHeader.vue'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { storeToRefs } from 'pinia'
import { Flex, Spin } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { ROUTE_NAME } from '@/router/route'
import { getListWeight } from '@/services/modules/pets-managerment/pet-weight.service'
import { checkQueryNamePosition } from '@/utils/url'

const $router = useRouter()
const $service = usePetServices()
const $servicePrice = usePetServicePrice()

const $route = useRoute()
const { locale } = useI18n()
const data = ref<IPetServiceDetail>()
const query = $route.query as IPetServicerPriceParam

const { loading } = storeToRefs($service)
const { loading: priceLoad } = storeToRefs($servicePrice)

const petWeights = ref([])

const handleBack = () => {
  $router.go(-1)
}
function goOverview() {
  $router.push({
    name: ROUTE_NAME.PET_SERVICE_OVERVIEW,
    query: $route.query,
  })
}

  const service_position = computed(() => {
    const fullPath = $route.fullPath
    return checkQueryNamePosition(fullPath, 'service_id')
  })

const priceHeader = computed(() => {
  const { service_id, pet_id } = $route.query

  if (!service_id || !pet_id || !data.value || !Array.isArray(data.value)) {
    return ''
  }

  const selected = data.value.find((item) => item._id === service_id)
  if (!selected) {
    return ''
  }

  const petType = Array.isArray(selected.pet_types_info)
    ? selected.pet_types_info.find((item) => item._id === pet_id)
    : null
  if (!petType || !petType.name) {
    return ''
  }

  return service_position.value && service_position.value === 0
    ? [selected.name[locale.value], petType.name]
    : [petType.name, selected.name[locale.value]]
});

const petTitle = computed(() => {
  if ($route.query.pet_id && data.value && Array.isArray(data.value)) {
    const selected = data.value?.[0]?.pet_types_info?.find((i) => i?._id === $route.query.pet_id)
    return selected ? selected?.name : ''
  }
  return ''
})



onMounted(async () => {
  const getDataByService = async () => {
    if ($route.query && $route.query?.service_id) {
      const res = await $service.getDetailService({
        id: $route.query?.[PetServicerPriceParam.service_id]?.toString(),
      })
      if (res?.success) {
        data.value = res.data
      }
    }
  }

  const getDataByPetId = async () => {
    if ($route.query && $route.query?.pet_id) {
      const res = await $service.searchList(
        {
          pet_type_ids: [$route.query?.[PetServicerPriceParam.pet_id]?.toString()],
        },
        true,
      )
      data.value = res ?? []
    }
  }

  async function getList() {
    try {
      const a = await getListWeight()
      petWeights.value = a || []
    } catch (error) {
      console.error('Error fetching weight list:', error)
    }
  }

  if ($route.query?.service_id) getDataByService()
  if ($route.query?.pet_id) getDataByPetId()
  getList()
})

onUnmounted(() => Object.assign(service_position.value, null))
defineOptions({ name: 'pet-service-price' })
</script>

<style>
.backBtnWrap {
  position: relative;
  top: -1rem;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.backBtn {
  cursor: pointer;

  display: flex;
  align-items: center;
}
.backBtnText {
  font-weight: 450;
  font-size: 18px;
}

.backBtn:hover > .backBtnText {
  text-decoration: underline;
}
</style>
