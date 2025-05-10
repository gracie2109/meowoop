<template>
  <SearchView
    :placeholder="placeholder"
    :actionButton="actionButton"
    :data-search="props.dataSearch"
    :form="form"
    :ignoreKeys="props.ignoreKeys"
  >
    <template #filter_content> dada </template>
  </SearchView>
</template>

<script lang="ts" setup>
import SearchView from '@/components/SearchView/Index.vue'
import { Form } from 'ant-design-vue'
const props = defineProps<{
  dataSearch?: string | object
  actionButton?: unknown[]
  placeholder?: string
  ignoreKeys?: string[]
}>()

defineEmits(['onSearch'])

const form = Form.useForm
</script>
