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
    />

    <FormCs
      :data-item="dataItem"
      :showForm="showForm"
      @onCancel="
        () => {
          showForm = false
          dataItem = null
        }
      "
    />
    <Table :columns="columns" :data="dataList" min-height="75.6vh" style="margin-top: 0.5rem" />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import { useDynamicTitle } from '@/composables'
import { Icon } from '@iconify/vue/dist/iconify.js'
import Search from '@/views/pets-setting-manager/pet-types/Search.vue'
import { computed, h, markRaw, reactive, ref, toRaw } from 'vue'
import FormCs from './Form.vue'
import type { TPetType } from '@/types/pet-type'
import { DEFAULT_COLOR, DEFAULT_ICON } from '@/contants/lib'
import Table from '@/components/Table/Index.vue'
import type { TableColumnsType } from 'ant-design-vue'
import type { IPfIcon } from '@/types/common'
import PreviewIcon from '@/components/Icons/PreviewIcon.vue'
import RowActions from '@/components/Table/FunctionTable.vue'
import { useI18n } from 'vue-i18n'
import type { TSearch } from '@/types/lib'
import { usePetTypesStore } from '@/stores'
import { storeToRefs } from 'pinia'

const $store = usePetTypesStore()
const { dataList } = storeToRefs($store)
const dataSearch = ref<TSearch>({
  search_text: '',
})

const { t } = useI18n()
const columns = computed<TableColumnsType>(() => [
  {
    title: t('pType.param1'),
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: t('common.description'),
    dataIndex: 'description',
    key: 'description',
  },
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
useDynamicTitle('menu.menu_6')
</script>
