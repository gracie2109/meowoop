<template>
  <SearchView
    :placeholder="placeholder"
    :actionButton="actionButton ?? []"
    :ignoreKeys="props.ignoreKeys"
    v-model="model"
    :showFilter="true"
    @onSearch="$emit('onSearch')"
    @onEraser="$emit('onEraser')"
    @onReload="$emit('onReload')"
    ref="searchRef"
  >
    <template #filter_content>
      <Form :model="formRef" @finish="handleOk" ref="formInstance">
        <Row :gutter="[20, 12]">
          <Col span="12">
            <FormItemSelect
              v-model:modelValue="formRef.animal_type"
              :name="'animal_type'"
              :label="$t('menu.menu_6')"
              :options="
                dataList
                  ? dataList.map((i) => ({
                      value: i?._id || i?.id,
                      label: i.name,
                    }))
                  : []
              "
              :showSearch="true"
            />
          </Col>
          <Col span="12">
            <FormItemSelect
              v-model:modelValue="formRef.owner_id"
              :name="'owner_id'"
              :label="$t('customers.owner_name')"
              :options="
                owners
                  ? owners?.map((i) => ({
                      value: i?._id || i?.id,
                      label: i.name,
                    }))
                  : []
              "
              :showSearch="true"
              :disabled="!!props.ownerId"
            />
          </Col>
        </Row>
        <Col span="24"> <Button html-type="submit" type="primary">Save</Button> </Col>
      </Form>
    </template>
  </SearchView>
</template>

<script lang="ts" setup>
import SearchView from '@/components/SearchView/Index.vue'
import type { TSearch } from '@/types/lib'
import { Row, Col, Form, Button } from 'ant-design-vue'

import {
  type VNode,
  type RendererNode,
  type RendererElement,
  ref,
  useTemplateRef,
  onMounted,
} from 'vue'
import FormItemSelect from '@/components/FormItem/FormItemSelect.vue'
import { storeToRefs } from 'pinia'
import { usePetTypesStore, useCustomer } from '@/stores'

const $storePetType = usePetTypesStore()
const $useCustomer = useCustomer()

const { dataList } = storeToRefs($storePetType)
const { dataList: owners } = storeToRefs($useCustomer)
const searchRef = useTemplateRef('searchRef')

const props = defineProps<{
  dataSearch?: object
  actionButton?: Array<{
    isShow: boolean
    component: VNode<RendererNode, RendererElement, { [key: string]: unknown }>
  }>
  placeholder?: string
  ignoreKeys?: string[]
  ownerId?: string
}>()

const model = defineModel<TSearch>()
const formRef = ref({
  gender: null,
  animal_type: null,
  owner_id: props?.ownerId || null,
})

const handleOk = (vl: any) => {
  emit('onSearchDf', vl)
  searchRef.value?.setOpen()
}

const onClear = () => {
  formRef.value = {
    gender: null,
    animal_type: null,
    owner_id: null,
  }
}

const emit = defineEmits(['onSearch', 'onEraser', 'onSearchDf', 'onReload'])

onMounted(() => {
  if (props.ownerId) {
    formRef.value.owner_id = props.ownerId || null;

  }
})

defineExpose({
  onClear,
})
defineOptions({
  name: 'CustomSearchView',
})
</script>
