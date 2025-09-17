<template>
  <SearchView
    :placeholder="placeholder"
    :actionButton="actionButton ?? []"
    :ignoreKeys="props.ignoreKeys"
    v-model="model"
    :showFilter="true"
    @onSearch="$emit('onSearch')"
    @onEraser="$emit('onEraser')"
    @onFilterContentChange="onClear"
  >
    <template #filter_content>
      <Form :model="formRef" @finish="handleOk" ref="formInstance">
        <Row :gutter="[20, 12]">
          <Col span="24">
            <FormItemSelect
              v-model:modelValue="formRef.animal_type"
              :name="'animal_type'"
              :label="$t('customers.genderTitle')"
              :options="
                dataList.map((i) => ({
                  value: i?._id || i?.id,
                  label: i.name,
                }))
              "
              :showSearch="true"
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

import { type VNode, type RendererNode, type RendererElement, ref } from 'vue'
import FormItemSelect from '@/components/FormItem/FormItemSelect.vue'
import { storeToRefs } from 'pinia'
import { usePetTypesStore } from '@/stores'

const $storePetType = usePetTypesStore()

const { dataList } = storeToRefs($storePetType)

const props = defineProps<{
  dataSearch?: object
  actionButton?: Array<{
    isShow: boolean
    component: VNode<RendererNode, RendererElement, { [key: string]: unknown }>
  }>
  placeholder?: string
  ignoreKeys?: string[]
}>()

const model = defineModel<TSearch>()
const formRef = ref({
  gender: null,
  animal_type: null,
})

const handleOk = (vl: any) => {
  emit('onSearchDf', vl)
}

const onClear = () => {}
const emit = defineEmits(['onSearch', 'onEraser', 'onSearchDf'])
defineOptions({
  name: 'CustomSearchView',
})
</script>
