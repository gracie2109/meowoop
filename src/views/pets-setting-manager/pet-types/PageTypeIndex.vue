<template>
  <div class="container" id="pet_types" ref="el" style="position: relative">
    <PageHeader>
      <Icon icon="lucide:paw-print" width="20" />&nbsp; &gt;
      {{ $t('menu.menu_6') }}
    </PageHeader>
    <Search
      placeholder="Search data pet types"
      :actionButton="actionButton"
      v-model="dataSearch"
      @onSearch="onSearch"
      @on-eraser="onEraser"
    />

    <FormCs
      :data-item="dataItem"
      :showForm="showForm"
      :dataSearch="{...dataSearch, ...dataPage}"
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
import { Icon } from '@iconify/vue/dist/iconify.js'
import Search from '@/views/pets-setting-manager/pet-types/Search.vue'
import { computed, h, markRaw, onMounted, reactive, ref, toRaw } from 'vue'
import FormCs from './Form.vue'
import { PetTypeParams, type TPetType } from '@/types/pet-type'
import { DEFAULT_COLOR, DEFAULT_ICON } from '@/contants/lib'
import Table from '@/components/Table/Index.vue'
import type { TableColumnsType } from 'ant-design-vue'
import { CommonParam, type IPfIcon } from '@/types/common'
import PreviewIcon from '@/components/Icons/PreviewIcon.vue'
import RowActions from '@/components/Table/FunctionTable.vue'
import { useI18n } from 'vue-i18n'
import type { TSearch } from '@/types/lib'
import { usePetTypesStore } from '@/stores'
import { storeToRefs } from 'pinia'

const $store = usePetTypesStore()
const { dataList, loading } = storeToRefs($store)
const dataPage = ref({
  page: 1,
  page_size: 25,
})

const dataSearch = ref<TSearch>({
  search_text: '',
})

const { t } = useI18n()
const columns = computed<TableColumnsType>(() => [
  {
    title: t('pType.param1'),
    dataIndex: PetTypeParams.name,
    key: PetTypeParams.name,
    width: 300,
  },
  {
    title: 'Icon',
    dataIndex: PetTypeParams.icon,
    key: PetTypeParams.icon,
    customRender: ({ record }: { record: Partial<TPetType> }) => {
      const data = toRaw(record.icon) as IPfIcon
      return h(PreviewIcon, {
        svgId: data?.icon || DEFAULT_ICON,
        color: data?.color || DEFAULT_COLOR,
        size: 24,
      })
    },
    width: 100,
  },
  {
    title: t('common.description'),
    dataIndex: PetTypeParams.desc,
    key: PetTypeParams.desc,
  },

  {
    title: t('common.created_at'),
    dataIndex: CommonParam.createdAt,
    key: CommonParam.createdAt,
  },
  {
    title: t('common.updated_at'),
    dataIndex: CommonParam.updatedAt,
    key: CommonParam.updatedAt,
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

const showForm = ref(false)
const dataItem = ref(null)

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
      h(Icon, {
        icon: 'eva:plus-fill',
        height: '30px',
        color: 'var(--vt-c-primary-slate)',
        style: 'cursor: pointer',
        onClick: () => {
          showForm.value = true
        },
      }),
    ),
  },
  {
    isShow: true,
    component: markRaw(
      h(Icon, {
        icon: 'tabler:reload',
        height: '30px',
        color: 'var(--vt-c-primary-slate)',
        style: 'cursor: pointer',
        onClick: () => {
          $store.searchList({ ...dataPage.value, ...dataSearch.value })
        },
      }),
    ),
  },
])

onMounted(() => {
  $store.searchList({ ...dataPage.value, ...dataSearch.value })
})
useDynamicTitle('menu.menu_6')
</script>
