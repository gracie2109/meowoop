<template>
  <Flex class="search_view_wrapper" gap="16">
    <div class="search_input" style="height: 100%">
      <Input
        size="large"
        :placeholder="placeholder ?? $t('common.searchDefaultTitle')"
        v-model:value="model.search_text"
       @pressEnter="handleEnter"
      >
        <template #suffix>
          <Icon icon="ic:baseline-search" height="20px" />
        </template>
      </Input>
    </div>
    <Flex :gap="8" class="buttons_">
      <Tooltip :title="$t('common.clearFilter')">
        <Icon
          icon="lucide:eraser"
          width="30px"
          color="var(--vt-c-primary-slate)"
          class="icons"
          @click="onEraser"
        />
      </Tooltip>
      <div id="filter_search"></div>

      <Popover
        trigger="click"
        placement="bottom"
        v-if="showFilter"
        :get-popup-container="() => container"
      >
        <template #content>
          <div style="width: auto; min-width: 450px">
            <slot name="filter_content" />
          </div>
        </template>
        <Tooltip :title="$t('common.advanceFilter')">
          <Badge :count="filterNumb" :overflow-count="9">
            <Icon icon="tabler:filter" width="30px" color="var(--vt-c-primary-slate)" class="icons"
          /></Badge>
        </Tooltip>
      </Popover>

      <Flex class="action-buttons" :gap="8">
        <div v-for="(btn, index) in actionButton" :key="index" class="action-button">
          <component :is="btn.component" v-if="btn.isShow" />
        </div>
      </Flex>
    </Flex>
  </Flex>
</template>

<script lang="ts" setup>
import type { TSearch } from '@/types/lib';
import { isString } from '@/utils/stringUtil'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { Input, Flex, Tooltip, Popover, Badge } from 'ant-design-vue'
import { computed, type VNode } from 'vue'
const props = withDefaults(
  defineProps<{
    showFilter?: boolean
    placeholder?: string
    dataSearch?: object | string
    actionButton?: {
      isShow: boolean
      component: VNode
    }[]
    ignoreKeys?: string[]
  }>(),
  {
    showFilter: true,
  },
)
defineOptions({
  name: 'CustomSearchView',
})
const emits = defineEmits(['onSearch', 'onEraser'])

const excludeKeys = ['search_text', 'from_time', 'to_time']
const container = (window && window.document.getElementById('filter_search')) || document.body

const model = defineModel<TSearch>({ default: { search_text: '' } })
const filterNumb = computed(() => {
  if (props.dataSearch && !isString(props.dataSearch)) {
    const keys = [...excludeKeys, ...(props.ignoreKeys || [])]
    const filteredKeys = Object.entries(props.dataSearch)
      .filter(
        ([key, value]) =>
          !keys.includes(key) && value !== undefined && value !== null && value !== '',
      )
      .map(([key]) => key)
    return filteredKeys.length
  }
  return 0
})

const onEraser = () => {
  emits('onEraser')
}


const handleEnter = () => {
  emits('onSearch')
}
</script>

<style scoped>
.search_view_wrapper {
  height: 40px;
}

.search_input {
  flex: 1;
}

.icons {
  cursor: pointer;
}
</style>
