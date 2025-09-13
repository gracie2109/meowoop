<template>
  <div id="pet_types" ref="el" style="position: relative">
    <PageHeader>
      <FunctionalButton icon="bx:user" width="20" />&nbsp; &gt;
      {{ $t('customers.L1') }}
    </PageHeader>
    <Search
      :placeholder="$t('customers.L2')"
      :actionButton="actionButton"
      v-model="dataSearch"
      @onSearch="onSearch"
      @on-eraser="onEraser"
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
    <Table :loading="loading" :columns="columns" :data="listCustomers" style="margin-top: 0.5rem" />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import { useDynamicTitle } from '@/composables'
import Search from '@/views/pets-setting-manager/pet-types/Search.vue'
import { computed, h, markRaw, onMounted, reactive, ref } from 'vue'
import FormCs from './Form.vue'
import Table from '@/components/Table/Index.vue'
import { type TableColumnsType } from 'ant-design-vue'
import RowActions from '@/components/Table/FunctionTable.vue'
import { useI18n } from 'vue-i18n'
import type { TSearch } from '@/types/lib'
import { useCustomer } from '@/stores'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { ROUTE_NAME } from '@/router/route'
import FunctionalButton from '@/components/Table/FunctionalButton.vue'
import { CUSTOMER_PARAMS } from '@/types/customers'
import { getIndex } from '@/utils/helpers'

const $store = useCustomer()

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

const { t } = useI18n()

const columns = computed<TableColumnsType>(() => [
  {
    title: t('common.index'),
    dataIndex: 'index',
    key: 'index',
    width: 60,
    align: 'center',
  },
  {
    title: t('customers.P1'),
    dataIndex: CUSTOMER_PARAMS.displayName,
    key: CUSTOMER_PARAMS.displayName,
  },
  {
    title: t('customers.P2'),
    dataIndex: CUSTOMER_PARAMS.phoneNumber,
    key: CUSTOMER_PARAMS.phoneNumber,
  },
  {
    title: t('customers.P3'),
    dataIndex: CUSTOMER_PARAMS.email,
    key: CUSTOMER_PARAMS.email,
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
                icon: 'system-uicons:contacts',
                title: t('customers.addressBook'),
                onClick: () => {
                  router.push({
                    name: ROUTE_NAME.CUSTOMER_ADDRESS_BOOK,
                    params: { user_id: record._id },
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
  $store.searchCustomers({ ...dataPage.value, ...dataSearch.value })
}
const onEraser = () => {
  Object.assign(dataSearch.value, { search_text: null })
  $store.searchCustomers({ ...dataPage.value })
}

const actionButton = reactive([
  {
    isShow: true,
    component: markRaw(
      h(FunctionalButton, {
        title: t('common.create'),
        icon: 'eva:plus-fill',
        onClick: () => {
          showForm.value = true
        },
      }),
    ),
  },
  {
    isShow: true,
    component: markRaw(
      h(FunctionalButton, {
        title: t('common.reload'),
        icon: 'tabler:reload',
        onClick: () => {
          $store.searchCustomers({ ...dataPage.value, ...dataSearch.value })
        },
      }),
    ),
  },
])
const listCustomers = computed(() => {
  if (dataList && dataList?.value.length > 0) {
    return dataList.value.map((i: any, j) => ({
      ...i,
      index: getIndex(dataPage.value, j),
    }))
  }
  return []
})

onMounted(() => {
  $store.searchCustomers({ ...dataPage.value, ...dataSearch.value, isShowAddress: true })
})
useDynamicTitle('menu.menu_8')
defineOptions({ name: 'admin_customers' })
</script>
