<template>
  <div id="pet_types" ref="el" style="position: relative">
    <PageHeader>
      <FunctionalButton icon="lucide:paw-print" width="20" />&nbsp; &gt;
      {{ $t('menu.menu_8') }}
    </PageHeader>
    <Search
      placeholder="Search data pet types"
      :actionButton="actionButton"
      v-model="dataSearch"
      @onSearch="onSearch"
      @on-eraser="onEraser"
      @onReload="onSearch"
    />

    <FormCs
      :data-item="dataItem"
      :showForm="showForm"
      :dataSearch="{ ...dataSearch, ...dataPage }"
      @onCancel="
        () => {
          showForm = false
          dataItem = null
        }
      "
    />
    <Table
      :loading="loading"
      :columns="columns"
      :data="dataList"
      min-height="75.6vh"
      style="margin-top: 0.5rem"
    />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import { useDynamicTitle } from '@/composables'
import Search from '@/views/pets-setting-manager/pet-types/Search.vue'
import { computed, h, markRaw, onMounted, reactive, ref, toRaw } from 'vue'
import FormCs from './Form.vue'
import Table from '@/components/Table/Index.vue'
import { type TableColumnsType } from 'ant-design-vue'
import RowActions from '@/components/Table/FunctionTable.vue'
import { useI18n } from 'vue-i18n'
import type { TSearch } from '@/types/lib'
import { usePetServices, usePetTypesStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { PetServicerPriceParam, type TPetType } from '@/types/pet-type'
import { useRouter } from 'vue-router'
import { ROUTE_NAME } from '@/router/route'
import FunctionalButton from '@/components/Table/FunctionalButton.vue'

const $store = usePetServices()
const $petType = usePetTypesStore()

const { dataList, loading } = storeToRefs($store)
const router = useRouter()
const showForm = ref(false)
const dataItem = ref(null)
const dataSearch = ref<TSearch>({
  search_text: '',
})
const dataPage = ref({
  page: 1,
  page_size: 25,
})

const { t, locale } = useI18n()

const columns = computed<TableColumnsType>(() => [
  {
    title: t('pType.B-01'),
    dataIndex: 'name',
    key: 'name',
    customRender: ({ text }) => h('span', toRaw(text[locale.value])),
  },
  {
    title: t('common.description'),
    dataIndex: 'description',
    key: 'description',
    customRender: ({ text }) => h('span', toRaw(text[locale.value])),
  },
  {
    title: t('pType.S6'),
    dataIndex: 'pet_types_info',
    key: 'pet_types_info',
    customRender: ({ record }) => {
      const targets = record?.pet_types_info
        ?.map((i: Partial<TPetType>) => i?.name)
        ?.filter(Boolean)
        ?.join(', ')
      return h('span', targets)
    },
  },
  {
    title: 'function',
    dataIndex: 'function',
    key: 'function',
    customRender: ({ record }) =>
      h(RowActions, {
        actions: [
          { type: 'edit', payload: record },
          { type: 'delete', payload: record },
          {
            type: 'custom',
            payload: record,
            customRender: () =>
              h(FunctionalButton, {
                icon: 'lucide:settings',
                title: t('pType.P2'),
                onClick: () => {
                  router.push({
                    name: ROUTE_NAME.PET_SETTING_PRICE_BY_SERVICE,
                    query: {
                      [PetServicerPriceParam.service_id]: record.id,
                    },
                  })
                },
              }),
          },
        ],
        onEdit: (data) => {
          showForm.value = true
          dataItem.value = data
        },
        onView: (data) => console.log('View:', data),
        onDelete: (data) => console.log('Delete:', data),
      }),
    width: 100,
    fixed: 'right',
  },
])

const onSearch = () => {
  $store.searchList({ ...dataPage.value, ...dataSearch.value })
}
const onEraser = () => {
  Object.assign(dataSearch.value, { search_text: null })
  $store.searchList({ ...dataPage.value })
}

const actionButton = reactive([
  {
    isShow: true,
    component: markRaw(
      h(FunctionalButton, {
        icon: 'eva:plus-fill',
        onClick: () => {
          showForm.value = true
        },
      }),
    ),
  },
])

onMounted(() => {
  $store.searchList({ ...dataPage.value, ...dataSearch.value })
  $petType.searchList({ page: 1, page_size: 500 })
})
useDynamicTitle('menu.menu_8')
defineOptions({ name: 'petServices' })
</script>
