<template>
  <div style="position: relative">
    <PageHeader>
      <FunctionalButton icon="lucide:paw-print" width="20" />&nbsp; &gt;
      {{ $t('menu.menu_10') }}
    </PageHeader>
    <Search
      placeholder="Search data pet types"
      :actionButton="actionButton"
      v-model="dataSearch"
      @onSearch="onSearch"
      @on-eraser="onEraser"
      @onReload="onSearch"
    />

    <Table
      :loading="loading"
      :columns="columns"
      :data="dataList || []"
      min-height="75.6vh"
      style="margin-top: 0.5rem"
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
              name: deleteItem?.name,
            })
          }}
        </template>
      </Modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoles } from '@/stores'
import {  type TableColumnsType } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { computed, h, markRaw, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import RowActions from '@/components/Table/FunctionTable.vue'
import Table from '@/components/Table/Index.vue'
import PageHeader from '@/components/PageHeader.vue'
import { useDynamicTitle } from '@/composables'
import type { TSearch } from '@/types/lib'
import Search from './Search.vue'
import FormCs from './Form.vue'
import Modal from '@/components/Modal/Index.vue'
import FunctionalButton from '@/components/Table/FunctionalButton.vue'

const { t } = useI18n()
const $store = useRoles()
const { loading, dataList } = storeToRefs($store)
const showForm = ref(false)
const dataItem = ref(null)
const deleteItem = ref(null)
const dataSearch = ref<TSearch>({
  search_text: '',
})
const dataPage = ref({
  page: 1,
  page_size: 25,
})

const handleDelete = () => {
  if (deleteItem.value) {
    $store.onDeleteRole(deleteItem.value?._id, () => {
      deleteItem.value = null
      $store.searchList({ ...dataPage.value, ...dataSearch.value })
    })
  }
}
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
const columns = computed<TableColumnsType>(() => [
  {
    title: t('pType.B-01'),
    dataIndex: 'name',
    key: 'name',
    customRender: ({ text }) => text,
  },
  {
    title: t('common.description'),
    dataIndex: 'description',
    key: 'description',
    customRender: ({ text }) => text,
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
        onDelete: (data) => (deleteItem.value = data),
      }),
    width: 100,
    fixed: 'right',
  },
])

onMounted(() => {
  $store.searchList({ isAll: true })
})
useDynamicTitle('menu.menu_10')
defineOptions({ name: 'role-groups' })
</script>

<style scoped></style>
