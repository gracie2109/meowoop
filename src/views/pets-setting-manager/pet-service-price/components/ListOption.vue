<template>
  <Flex wrap="wrap" gap="16" v-if="dataMap && Array.isArray(dataMap) && dataMap.length > 0">
    <Col
      :lg="2"
      :md="4"
      :sm="8"
      :xs="24"
      v-for="i in dataMap"
      :key="i._id"
      class="card"
      @click="handleClick(i)"
      style="cursor: pointer"
      :style="{
        background: dataSelected?.id === i.id || dataSelected?.id === i._id ? 'white' : '',
      }"
    >
      <div :justify="'center'" :align="'center'" gap="16" class="content">
        <PreviewIcon
          v-if="i.icon"
          :svg-id="i.icon.icon"
          :color="i.icon.color"
          style="margin: 0 auto"
        />
        <p v-if="props.isPetList">{{ i.name }}</p>
        <p v-else>{{ i.name?.[locale] }}</p>
      </div>
    </Col>
  </Flex>

  <div v-if="dataSelected">
    <Modal
      :open="!!dataSelected"
      @handleCancel="() => (dataSelected = null)"
      :width="'900px'"
      :hide-footer="true"
      :title="props.isPetList ? dataSelected.name : dataSelected.name[locale]"
    >
      <template #content>
        <Flex wrap="wrap" gap="16">
      

          <Col
            :lg="4"
            :md="8"
            :sm="12"
            :xs="24"
            class="card card_modal"
            @click="() => goToSettingPrice()"
          >
            <Icon style="text-align: center" :height="'30px'" :icon="'grommet-icons:overview'" />
            <p>Setting price</p>
          </Col>
        </Flex>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import PreviewIcon from '@/components/Icons/PreviewIcon.vue'
import Modal from '@/components/Modal/Index.vue'
import { PetServicerPriceParam, type IPetServiceDetail } from '@/types/pet-type'
import { Col, Flex, Spin } from 'ant-design-vue'
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { useRoute, useRouter } from 'vue-router'
import { ROUTE_NAME } from '@/router/route'
import type { IData } from '@/types/common'
import { useI18n } from 'vue-i18n'

const props = withDefaults(
  defineProps<{
    data?: IPetServiceDetail
    isPetList: boolean
    loading: boolean
  }>(),
  {
    isPetList: false,
    loading: true,
  },
)

const $router = useRouter()
const $route = useRoute()
const { locale } = useI18n()
const dataSelected = ref<IData | null>(null)
const dataMap = computed(() => {
  if (props.isPetList) {
    return props.data?.pet_types_info
  } else return props.data
})

function goToSettingPrice() {
  if (dataSelected.value) {
    const q = props.isPetList
      ? {
          ...$route.query,
          [PetServicerPriceParam.pet_id]: dataSelected.value._id,
        }
      : {
          ...$route.query,
          [PetServicerPriceParam.service_id]: dataSelected.value._id,
        }
    $router.push({
      name: ROUTE_NAME.PET_SETTING_PRICE_BY_SERVICE,
      query: q,
    })
  }
}
function handleClick(item: IData) {
  dataSelected.value = item
}

defineOptions({ name: 'pet-service-list-option' })
</script>

<style scoped>
.card {
  padding: 1rem;
  height: 120px;
  max-height: 120px;
  border-radius: 15px;
  border: 1px solid var(--vt-c-primary);
  cursor: pointer;
}

.card_modal {
  display: grid;
  place-content: center;
  justify-items: center;
}

.content {
  height: 100%;
  width: 100%;
  text-align: center;
  display: grid;
  gap: 0.5rem;
  place-content: center;
  overflow-x: hidden;
}
</style>
