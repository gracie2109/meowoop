<template>
  <div class="container" id="pet_types" ref="el" style="position: relative">
    <PageHeader>
      <Icon icon="lucide:paw-print" width="20" />&nbsp; &gt;
      {{ $t('menu.menu_6') }}
    </PageHeader>
    <Search
      placeholder="Search data pet types"
      :dataSearch="dataSearch"
      :actionButton="actionButton"
      @onSearch="onSearch"
    />

    <ModalCs
      :open="showForm"
      :title="dataItem ? $t('pType.T-02') : $t('pType.T-01')"
      @handleCancel="showForm = false"
      :width="'900px'"
      :hide-footer="true"
    >
      <template #content>
        <FormCs />
      </template>
    </ModalCs>
    <Table :columns="columns" :data="data" min-height="75.6vh" style="margin-top: 0.5rem" />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import { useDynamicTitle } from '@/composables'
import { Icon } from '@iconify/vue/dist/iconify.js'
import Search from './Search.vue'
import { h, markRaw, reactive, ref, toRaw } from 'vue'
import FormCs from './Form.vue'
import ModalCs from '@/components/Modal/Index.vue'
import type { TPetType } from '@/types/pet-type'
import { DEFAULT_COLOR, DEFAULT_ICON } from '@/contants/lib'
import Table from '@/components/Table/Index.vue'
import type { TableColumnsType } from 'ant-design-vue'
import type { IPfIcon } from '@/types/common'
import PreviewIcon from '@/components/Icons/PreviewIcon.vue'
import { renderTableField } from '@/utils/helpers'
import RowActions from '@/components/Table/FunctionTable.vue'
useDynamicTitle('menu.menu_6')

const dataSearch = ref({})
const columns = reactive<TableColumnsType>([
  renderTableField('Name', 'name'),
  renderTableField('desc', 'description'),

  {
    title: 'Icon',
    dataIndex: 'icon',
    key: 'icon',
    customRender: ({ record }: { record: Partial<TPetType> }) => {
      const data = toRaw(record.icon) as IPfIcon
      return h(PreviewIcon, {
        svgId: data.icon || DEFAULT_ICON,
        color: data.color || DEFAULT_COLOR,
        size: 24,
      })
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
          { type: 'view', payload: record },
          {
            type: 'delete',
            payload: record,
            confirm: true,
            confirmMessage: 'Bạn có chắc chắn muốn xoá?',
            disabled: !record.deletable,
          },
        ],
        onEdit: (data) => console.log('Edit:', data),
        onView: (data) => console.log('View:', data),
        onDelete: (data) => console.log('Delete:', data),
      }),
  },
])
const data = reactive<TPetType[]>([
  {
    _id: '1',
    id: '1',
    name: 'PET 1',
    description: 'fsdfsdfdsf',
    icon: { color: DEFAULT_COLOR, icon: DEFAULT_ICON },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    _id: '2',
    id: '12',
    name: 'PET 2',
    description: '',
    icon: { color: DEFAULT_COLOR, icon: DEFAULT_ICON },
    created_at: new Date(),
    updated_at: new Date(),
  },
])
const showForm = ref(false)
const dataItem = ref(null)

console.log('columns', columns)
const onSearch = (val: unknown) => {
  console.log('val', val)
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
</script>
