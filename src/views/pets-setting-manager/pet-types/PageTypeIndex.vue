<template>
  <div id="pet_types" ref="el" style="position: relative">
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

    <Modal
      :loading="loading"
      :open="!!deleteItem"
      :title="$t('pType.T-03')"
      @handle-cancel="deleteItem = null"
      @handle-ok="handleDelete"
    >
      <template #content>
        {{
          $t('pType.T-04', {
            name: deleteItem?.name || '',
          })
        }}
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import { useDynamicTitle } from '@/composables'
import { Icon } from '@iconify/vue/dist/iconify.js'
import Search from '@/views/pets-setting-manager/pet-types/Search.vue'
import { computed, h, markRaw, onMounted, reactive, ref, toRaw } from 'vue'
import FormCs from './Form.vue'
import { PetServicerPriceParam, PetTypeParams, type TPetType } from '@/types/pet-type'
import { DEFAULT_COLOR, DEFAULT_ICON } from '@/contants/lib'
import Table from '@/components/Table/Index.vue'
import { Tooltip, type TableColumnsType } from 'ant-design-vue'
import { CommonParam, type IPfIcon } from '@/types/common'
import PreviewIcon from '@/components/Icons/PreviewIcon.vue'
import RowActions from '@/components/Table/FunctionTable.vue'
import { useI18n } from 'vue-i18n'
import type { TSearch } from '@/types/lib'
import { usePetTypesStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { formatFullTime } from '@/utils/time'
import Modal from '@/components/Modal/Index.vue'
import { ROUTE_NAME } from '@/router/route'
import { useRouter } from 'vue-router'
const $store = usePetTypesStore()
const { dataList, loading } = storeToRefs($store)
const dataPage = ref({
  page: 1,
  page_size: 25,
})

const showForm = ref(false)
const dataItem = ref<TPetType | null>(null)
const deleteItem = ref<TPetType | null>(null)
const dataSearch = ref<TSearch>({
  search_text: '',
})

const { t, locale } = useI18n()
const router = useRouter()

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
    customRender: ({ record }: { record: Partial<TPetType> }) => {
      const data = toRaw(record.createdAt)
      return h('p', formatFullTime(data, locale.value))
    },
  },
  {
    title: t('common.updated_at'),
    dataIndex: CommonParam.updatedAt,
    key: CommonParam.updatedAt,
    customRender: ({ record }: { record: Partial<TPetType> }) => {
      const data = toRaw(record.updatedAt)
      return h('p', formatFullTime(data, locale.value))
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
              markRaw(
                h(
                  Tooltip,
                  {
                    title: t('pType.P2'),
                  },
                  [
                    h(Icon, {
                      icon: 'lucide:settings',
                      height: '25px',
                      color: 'var(--vt-c-primary-slate)',
                      style: 'cursor: pointer',
                      onClick: () => {
                        router.push({
                          name: ROUTE_NAME.PET_SETTING_PRICE_BY_SERVICE,
                          query: {
                            [PetServicerPriceParam.pet_id]: record.id,
                          },
                        })
                      },
                    }),
                  ],
                ),
              ),
          },
        ],
        onEdit: (data) => {
          showForm.value = true
          dataItem.value = data
        },
        onDelete: (data) => (deleteItem.value = data),
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

const handleDelete = () => {
  if (deleteItem.value) {
    $store.deleteType(deleteItem.value?.id, () => {
      deleteItem.value = null
      $store.searchList({ ...dataPage.value, ...dataSearch.value })
    })
  }
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
