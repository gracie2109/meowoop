<template>
  <div class="container" id="pet_types" ref="el" style="position: relative">
    <PageHeader>
      <Icon icon="lucide:paw-print" width="20" />&nbsp; &gt;
      {{ $t('menu.menu_7') }}
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
    <Table :columns="columns" :data="dataList" min-height="75.6vh" style="margin-top: 0.5rem" />
    <div v-if="!!deleteItem">
      <Modal
        :loading="loading"
        :open="!!deleteItem"
        :title="$t('pType.T-03')"
        @handle-cancel="
          () => {
            deleteItem = null
            dataItem = null
          }
        "
        @handle-ok="handleDelete"
      >
        <template #content>
          {{
            $t('pType.T-04', {
              name: deleteItem?.name?.[locale] || '',
            })
          }}
        </template>
      </Modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import { useDynamicTitle } from '@/composables'
import { Icon } from '@iconify/vue/dist/iconify.js'
import Search from '@/views/pets-setting-manager/pet-types/Search.vue'
import { computed, h, markRaw, onMounted, reactive, ref, toRaw } from 'vue'
import FormCs from './Form.vue'
import Table from '@/components/Table/Index.vue'
import type { TableColumnsType } from 'ant-design-vue'
import RowActions from '@/components/Table/FunctionTable.vue'
import { useI18n } from 'vue-i18n'
import type { TSearch } from '@/types/lib'
import { usePetCategoryStore } from '@/stores'
import { storeToRefs } from 'pinia'
import type { TPetCategory } from '@/types/pet-type'
import { CommonParam } from '@/types/common'
import { formatFullTime } from '@/utils/time'
import Modal from '@/components/Modal/Index.vue'

const $store = usePetCategoryStore()
const { dataList, loading } = storeToRefs($store)
const dataPage = ref({
  page: 1,
  page_size: 25,
})
const { t, locale } = useI18n()
const showForm = ref(false)
const dataItem = ref<TPetCategory | null>(null)
const deleteItem = ref<TPetCategory | null>(null)
const dataSearch = ref<TSearch>({
  search_text: '',
})

const columns = computed<TableColumnsType>(() => [
  {
    title: t('pType.C-01'),
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
    title: t('common.created_at'),
    dataIndex: CommonParam.createdAt,
    key: CommonParam.createdAt,
    customRender: ({ record }: { record: Partial<TPetCategory> }) => {
      const data = toRaw(record.createdAt)
      return h('p', formatFullTime(data, locale.value))
    },
  },
  {
    title: t('common.updated_at'),
    dataIndex: CommonParam.updatedAt,
    key: CommonParam.updatedAt,
    customRender: ({ record }: { record: Partial<TPetCategory> }) => {
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
        ],
        onEdit: (data) => {
          showForm.value = true
          dataItem.value = data
        },
        onDelete: (data) => (deleteItem.value = data),
      }),
    width: 150,
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
          alert('click reload')
        },
      }),
    ),
  },
])
onMounted(() => {
  $store.searchList({ ...dataPage.value, ...dataSearch.value })
})
useDynamicTitle('menu.menu_7')
defineOptions({ name: 'petCategpries' })
</script>
