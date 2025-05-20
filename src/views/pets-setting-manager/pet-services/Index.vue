<template>
  <div class="container" id="pet_types" ref="el" style="position: relative">
    <PageHeader>
      <Icon icon="lucide:paw-print" width="20" />&nbsp; &gt;
      {{ $t('menu.menu_8') }}
    </PageHeader>
    <Search placeholder="Search data pet types" :actionButton="actionButton" v-model="dataSearch"
      @onSearch="onSearch" />

    <FormCs :data-item="dataItem" :showForm="showForm" @onCancel="
      () => {
        showForm = false
        dataItem = null
      }
    " />
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
import Table from '@/components/Table/Index.vue'
import type { TableColumnsType } from 'ant-design-vue'
import RowActions from '@/components/Table/FunctionTable.vue'
import { useI18n } from 'vue-i18n'
import type { TSearch } from '@/types/lib'
import { usePetServices } from '@/stores'
import { storeToRefs } from 'pinia'
import { PetServicerPriceParam, type TPetType } from '@/types/pet-type'
import { useRouter } from 'vue-router'
import { ROUTE_NAME } from '@/router/route'

const $store = usePetServices()
const { dataList } = storeToRefs($store);
const router = useRouter()
const dataSearch = ref<TSearch>({
  search_text: '',
})

const { t, locale } = useI18n();

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
    title: t('pType.S4'),
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: t('pType.S7'),
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: t('pType.S5'),
    dataIndex: 'category_id',
    key: 'category_id',
    customRender: ({ record }) => h('span', toRaw(record?.category_data?.name?.[locale.value])),
  },
  {
    title: t('pType.S6'),
    dataIndex: 'pet_type_ids',
    key: 'pet_type_ids',
    customRender: ({ record }) => {
      const targets = record?.pet_target_data
        ?.map((i: Partial<TPetType>) => i?.name)
        ?.filter(Boolean)
        ?.join(', ');
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
          { type: 'edit', payload: record, },
          { type: 'delete', payload: record, },
          {
            type: 'custom', payload: record,
            customRender: () => markRaw(
              h(Icon, {
                icon: 'mage:money-exchange',
                height: '30px',
                color: 'var(--vt-c-primary-slate)',
                style: 'cursor: pointer',
                onClick: () => {
                  router.push({ 
                    name: ROUTE_NAME.PET_SETTING_PRICE_BY_SERVICE, query: {
                      [PetServicerPriceParam.service_id]: record.id,
                    }
                  })
                },
              }),
            )
          }
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
useDynamicTitle('menu.menu_8')
defineOptions({ name: 'petServices' })
</script>
