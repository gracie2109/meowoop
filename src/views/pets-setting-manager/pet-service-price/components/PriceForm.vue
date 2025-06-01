<template>
  <Flex gap="8" justify="flex-end" align="center" style="margin-bottom: 1rem">
    <Button type="dashed" @click="handleEdit" v-if="!editMode" size="large">
      <template #icon>
        <Icon icon="codicon:save-as" />
      </template>
      {{ $t('common.edit') }}
    </Button>
    <Button danger @click="editMode = !editMode" v-if="editMode" size="large">
      <template #icon>
        <Icon icon="ic:outline-clear" />
      </template>
      {{ $t('common.cancelTitle') }}
    </Button>
    <Button type="primary" @click="handleSave" v-if="editMode" size="large">
      <template #icon>
        <Icon icon="lucide:save" />
      </template>
      {{ $t('common.saveTitle') }}
    </Button>
  </Flex>
  <Table :columns="columns" :data-source="dataSource" bordered :pagination="false" size="middle">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'weight_id'">
        {{ record.weight_name }}
      </template>
      <template v-else-if="['duration', 'price'].includes(column.dataIndex)">
        <InputNumber
          style="width: 100%; margin: 0; padding: 0"
          :readonly="!editMode"
          :value="getCellValue(record.key, column.dataIndex)"
          @update:value="updateCellValue(record.key, column.dataIndex, $event)"
        />
      </template>
    </template>
  </Table>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import type { UnwrapRef } from 'vue'
import { Table, Button, InputNumber, Flex } from 'ant-design-vue'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { usePetServicePrice } from '@/stores'

const detailSlip = ref([])
const editMode = ref(false)
const $store = usePetServicePrice()
const props = defineProps<{
  pet_id?: string
  service_id?: string
  data?: unknown
  loading: boolean
  petWeights: unknown[]
}>()

const columns = [
  {
    title: 'Weight',
    dataIndex: 'weight_id',
    width: 150,
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
  },
]

const editableData: UnwrapRef<Record<string, DataItem>> = reactive({})

interface DataItem {
  key: string
  weight_id: string
  price: number | null
  duration: string | null
  id?: string
  weight_name?: string
}

const dataSource = computed(() => {
  if (props.petWeights && Array.isArray(props.petWeights)) {
    return props.petWeights.map((i) => ({
      weight_id: i?.id,
      weight_name: i?.key,
      price: null,
      duration: null,
      key: i.id,
    }))
  }
  return []
})

const getCellValue = (key: string, dataIndex: string) => {
  return editableData[key]?.[dataIndex] ?? ''
}

const updateCellValue = (key: string, dataIndex: string, value: any) => {
  if (!editableData[key]) {
    editableData[key] = {
      key,
      weight_id: key,
      weight_name: props.petWeights.find((w) => w.id === key)?.key || '',
      price: null,
      duration: null,
    }
  }
  editableData[key][dataIndex] = value
}

const handleEdit = () => {
  editMode.value = !editMode.value
  if (!editMode.value) {
    const result =
      detailSlip.value && detailSlip.value.length > 0
        ? detailSlip.value.reduce((acc, item) => {
            const key = item.weight_id.id
            acc[key] = {
              weight_id: key,
              weight_name: item.weight_id.key,
              price: item.price ?? null,
              duration: item.duration ?? null,
              key: item.id,
            }
            return acc
          }, {})
        : props.petWeights.reduce((acc, item) => {
            acc[item.id] = {
              weight_id: item.id,
              weight_name: item.key,
              price: null,
              duration: null,
              key: item.id,
            }
            return acc
          }, {})
    Object.keys(editableData).forEach((key) => delete editableData[key])
    Object.assign(editableData, result)
  }
}

const handleSave = () => {
  const reversed = Object.values(editableData).map((item) => ({
    ...item,
    pet_id: props.pet_id || (props.data && 'pet_id' in props.data ? props.data.pet_id : undefined),
    service_id:
      props.service_id ||
      (props.data && 'service_id' in props.data ? props.data.service_id : undefined),
  }))

  $store.onSetPrice(reversed, () => {
    alert('success')
  })
}

onMounted(async () => {
  async function getSlip() {
    if (props.pet_id && props.service_id) {
      try {
        const res = await $store.getDetailSvPrice({
          service_id: props.service_id.toString(),
          pet_id: props.pet_id.toString(),
        })
        if (res?.success) {
          const response = res.data.data
          detailSlip.value = response
          const result = response.reduce((acc, item) => {
            const key = item.weight_id.id
            acc[key] = {
              weight_id: key,
              weight_name: item.weight_id.key,
              price: item.price ?? null,
              duration: item.duration ?? null,
              key: item.id,
            }
            return acc
          }, {})
          Object.assign(editableData, result)
        }
      } catch (error) {
        console.error('Error fetching slip details:', error)
      }
    }
  }

  function getList() {
    const initialData = props.petWeights.reduce((acc, item) => {
      acc[item.id] = {
        weight_id: item.id,
        weight_name: item.key,
        price: null,
        duration: null,
        key: item.id,
      }
      return acc
    }, {})
    Object.assign(editableData, initialData)
  }

  getSlip()
  getList()
})
</script>

<style scoped></style>
