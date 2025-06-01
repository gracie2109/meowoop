<template>
  <div class="sss">
    <Spin :spinning="loading">
      <div style="height: 100%; position: relative">
        <PageHeader>
          <Icon
            icon="fluent:money-settings-24-regular"
            width="24"
            color="var(--vt-c-primary)"
          />&nbsp; &gt;
          {{ $t('pType.P1') }}
          &nbsp; &gt;
          <div v-if="query.pet_id || query.service_id">
            {{ data?.name?.[locale] ?? data?.name }}
          </div>
          <div v-else></div>
        </PageHeader>

        <div align="center" class="backBtnWrap">
          <div @click="handleBack" class="backBtn">
            <Icon icon="ic:baseline-arrow-back-ios-new" width="24" color="var(--vt-c-primary)" />
            <p class="backBtnText">{{ $t('common.backTitle') }}</p>
          </div>
          <div @click="goOverview">
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
          <ListOption :data="data" :isPetList="true" :loading="loading" />
        </div>

        <div v-else-if="!query.service_id && query.pet_id">
          <ListOption :data="data" :isPetList="false" :loading="loading" />
        </div>

        <div v-else>
          <div class="container">
            <PetServicePriceForm
              :service_id="query.service_id"
              :pet_id="query.pet_id"
              :loading="loading"
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
import { usePetServices } from '@/stores'
import { onMounted, ref } from 'vue'
import ListOption from '@/views/pets-setting-manager/pet-service-price/components/ListOption.vue'

import PageHeader from '@/components/PageHeader.vue'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { storeToRefs } from 'pinia'
import { Flex, Spin } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { ROUTE_NAME } from '@/router/route'
import { getListWeight } from '@/services/modules/pets-managerment/pet-weight.service'

const $router = useRouter()
const $service = usePetServices()
const $route = useRoute()
const { locale } = useI18n()
const data = ref<IPetServiceDetail>()
const query = $route.query as IPetServicerPriceParam
const { loading } = storeToRefs($service)
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
      const initialData = petWeights.value.reduce((acc, item) => {
        acc[item.id] = {
          weight_id: item.id,
          weight_name: item.key,
          price: null,
          duration: null,
          key: item.id,
        }
        return acc
      }, {})
      Object.assign(editableData, initialData)
    } catch (error) {
      console.error('Error fetching weight list:', error)
    }
  }

  if ($route.query?.service_id) getDataByService()
  if ($route.query?.pet_id) getDataByPetId()
  getList()
})

defineOptions({ name: 'pet-service-price' })
</script>

<style scoped>
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
