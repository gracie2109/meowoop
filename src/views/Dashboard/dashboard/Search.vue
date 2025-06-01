<template>
  <SearchView
    :placeholder="placeholder"
    :actionButton="actionButton ?? []"
    :ignoreKeys="props.ignoreKeys"
    v-model="model"
    :showFilter="false"
    @onSearch="$emit('onSearch')"
    @onEraser="$emit('onEraser')"
  />
</template>

<script lang="ts" setup>
import SearchView from '@/components/SearchView/Index.vue'
import type { TSearch } from '@/types/lib'

import type { VNode, RendererNode, RendererElement } from 'vue'

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
defineEmits(['onSearch', 'onEraser'])
defineOptions({
  name: 'CustomSearchView',
})
</script>
