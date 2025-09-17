<template>
  <div id="pet_types" ref="el" style="position: relative">
    <PageHeader v-if="!props.hiddenHead">
      <FunctionalButton icon="bx:user" width="20" />&nbsp; &gt;
      {{ $t('customers.bossList') }}
    </PageHeader>
    <Search
      v-model="dataSearch"
      :actionButton="actionButton"
      :placeholder="t('customers.bossSearchPlh')"
      @onSearch="onSearch"
      @onEraser="onEraser"
      @onSearchDf="(vl) => handleSearch(vl)"
    />
    <Table :loading="loading" :columns="columns" :data="listBoss" style="margin-top: 0.5rem" />

    <FormCs
      :data-item="dataItem"
      :showForm="showForm"
      :dataSearch="{ ...dataSearch, ...dataPage }"
      @onCancel="
        () => {
          onFinish(false)
        }
      "
      @onFinish="
        () => {
          onFinish(true)
        }
      "
    />
    <Modal
      :open="!!deleteItem"
      :title="$t('customers.addAddress')"
      @handle-cancel="deleteItem = null"
      @handle-ok="onDelete"
      :loading="loading"
    >
      <template #content> deete </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import FunctionalButton from '@/components/Table/FunctionalButton.vue'
import { usePetBoss, usePetTypesStore, useCustomer } from '@/stores'
import type { TSearch } from '@/types/lib'
import { Flex, type TableColumnsType } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { computed, h, markRaw, onMounted, reactive, ref, toRaw } from 'vue'
import { useI18n } from 'vue-i18n'
import RowActions from '@/components/Table/FunctionTable.vue'
import Table from '@/components/Table/Index.vue'
import { getIndex } from '@/utils/helpers'
import { MEDICAL_PARAMS, PET_BOSS_PARAMS, type IPetBoss } from '@/types/pet-boss'
import { useRouter } from 'vue-router'
import { ROUTE_NAME } from '@/router/route'
import { mergeString } from '@/utils/stringUtil'
import { PET_GENDER_ARRAYS } from '../customers/contants'
import Search from '@/views/boss/components/Search.vue'
import FormCs from '@/views/boss/components/Form.vue'
import Modal from '@/components/Modal/Index.vue'

const $store = usePetBoss()
const $storePetType = usePetTypesStore()
const $customers = useCustomer()

const { t } = useI18n()
const { dataList, loading } = storeToRefs($store)

const showForm = ref(false)
const dataItem = ref(null)
const deleteItem = ref()
const dataPage = ref({
  page: 1,
  page_size: 25,
})
const router = useRouter()
const props = withDefaults(
  defineProps<{
    hiddenHead?: boolean
    ownerId?: string
  }>(),
  {
    hiddenHead: false,
  },
)

const dataSearch = ref<TSearch>({
  search_text: '',
  owner_id: props.ownerId || null,
})
const columns = computed<TableColumnsType>(() => [
  {
    title: t('common.index'),
    dataIndex: 'index',
    key: 'index',
    width: 60,
    align: 'center',
  },
  {
    title: t('common.name'),
    dataIndex: PET_BOSS_PARAMS.name,
    key: PET_BOSS_PARAMS.name,
  },
  {
    title: t('customers.owner_name'),
    dataIndex: PET_BOSS_PARAMS.owner_id,
    key: PET_BOSS_PARAMS.owner_id,
    customRender: ({ record }: { record: IPetBoss }) => h('span', String(record?.owner_info?.name)),
  },
  {
    title: t('customers.bossBread'),
    dataIndex: 'breed',
    key: 'breed',
    customRender: ({ record }: { record: IPetBoss }) =>
      h(
        'span',
        mergeString([String(record?.animal_type_info?.name), record?.profile_data.breed], ' '),
      ),
  },
  {
    title: t('customers.genderTitle'),
    dataIndex: 'gender',
    key: 'gender',
    customRender: ({ record }: { record: IPetBoss }) =>
      h('span', PET_GENDER_ARRAYS(t)[Number(record.profile_data.gender) || 0]?.label),
  },
  {
    title: 'function',
    dataIndex: 'function',
    key: 'function',
    customRender: ({ record }: { record: IPetBoss }) =>
      h(RowActions, {
        actions: [
          { type: 'edit', payload: record },
          { type: 'delete', payload: record },
          {
            type: 'custom',
            payload: record,
            customRender: () =>
              h(Flex, { gap: 6 }, [
                h(FunctionalButton, {
                  icon: 'fluent-mdl2:medical',
                  title: t('customers.medicalBooks'),
                  height: '18px',
                  onClick: () => {
                    if (props.ownerId) {
                      router.push({
                        name: ROUTE_NAME.MEDICAL_BOOKS_BY_OWNER,
                        params: { [MEDICAL_PARAMS.owner_id]: props.ownerId },
                        state: {
                          dataa: props.ownerId,
                        },
                      })
                    }
                    router.push({
                      name: ROUTE_NAME.MEDICAL_BOOKS_BY_PET,
                      params: { [MEDICAL_PARAMS.pet_id]: record._id },
                    })
                  },
                }),
              ]),
          },
        ],
        onEdit: (data) => {
          dataItem.value = data
          showForm.value = true
        },
        onDelete: (data) => {
          deleteItem.value = data
        },
      }),
    width: 100,
    fixed: 'right',
  },
])

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
          $store.searchBossList({ ...dataPage.value, ...dataSearch.value })
        },
      }),
    ),
  },
])

const onSearch = () => {
  dataPage.value = {
    page: 1,
    page_size: 25,
  }
  $store.searchBossList({ ...dataPage.value, ...dataSearch.value, page: 1 })
}

const handleSearch = (vl: never) => {
  dataSearch.value = {
    ...dataSearch.value,
    ...toRaw(vl),
  }
  const payload = {
    ...dataSearch.value,
    ...toRaw(vl),
    ...dataPage.value,
    page: 0,
  }
  $store.searchBossList(payload)
}
const onEraser = () => {
  dataSearch.value = {
    search_text: '',
  }
  dataPage.value = {
    page: 1,
    page_size: 25,
  }
  $store.searchBossList({ ...dataPage.value, ...dataSearch.value })
}

const listBoss = computed(() => {
  if (dataList && dataList?.value.length > 0) {
    return dataList.value.map((i: any, j) => ({
      ...i,
      index: getIndex(dataPage.value, j),
    }))
  }
  return []
})

const onFinish = (bool: boolean) => {
  showForm.value = false
  dataItem.value = null
  if (bool) $store.searchBossList({ ...dataPage.value, ...dataSearch.value })
}

const onDelete = () => {
  
}
onMounted(() => {
  const payload = { ...dataPage.value, ...dataSearch.value }
  $store.searchBossList(payload)
  $storePetType.searchList({})
  $customers.searchCustomers({ page: 1, page_size: 500 }, false)
})

defineOptions({ name: 'list_boss' })
</script>

<style scoped></style>
