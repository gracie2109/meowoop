<template>
  <Flex class="search_view_wrapper" gap="16">
    <div class="search_input" style="height: 100%">
      <Input size="large" :placeholder="placeholder ?? $t('common.searchDefaultTitle')"
        v-model:value="model.search_text" @pressEnter="handleEnter">
      <template #suffix>
        <Icon icon="ic:baseline-search" height="20px" />
      </template>
      </Input>
    </div>
    <Flex :gap="8" class="buttons_" align="center">
      <Tooltip :title="$t('common.clearFilter')">
        <FunctionalButton icon="lucide:eraser" class="icons" @click="onEraser" />
      </Tooltip>
      <div id="filter_search"></div>

      <Popover :open="open" trigger="click" placement="bottom" v-if="showFilter" :get-popup-container="() => container"
        @open-change="setOpen">
        <template #content>
          <div style="width: auto; min-width: 450px">
            <slot name="filter_content" />
          </div>
        </template>
        <Tooltip :title="$t('common.advanceFilter')">
          <Badge :count="filterNumb" :overflow-count="9">
            <FunctionalButton icon="tabler:filter" class="icons" />
          </Badge>
        </Tooltip>
      </Popover>

      <Flex class="action-buttons" :gap="8">
        <div v-for="(btn, index) in actionButton" :key="index" class="action-button">
          <component :is="btn.component" v-if="btn.isShow" />
        </div>

        <Tooltip :title="$t('common.reload')">
          <FunctionalButton icon="tabler:reload" class="icons" @click="onReload" />
        </Tooltip>
      </Flex>
    </Flex>
  </Flex>
</template>

<script lang="ts" setup>
import type { TSearch } from '@/types/lib'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { Input, Flex, Tooltip, Popover, Badge } from 'ant-design-vue'
import { computed, ref, type VNode } from 'vue'
import FunctionalButton from '../Table/FunctionalButton.vue'
const props = withDefaults(
  defineProps<{
    showFilter?: boolean
    placeholder?: string
    actionButton?: {
      isShow: boolean
      component: VNode
    }[]
    ignoreKeys?: string[]
    listenFilterChange?: boolean
  }>(),
  {
    showFilter: true,
    listenFilterChange: false,
  },
)
defineOptions({
  name: 'CustomSearchView',
})
const emits = defineEmits(['onSearch', 'onEraser', 'onFilterContentChange', 'onReload'])
const excludeKeys = ['search_text', 'from_time', 'to_time']
const container = (window && window.document.getElementById('filter_search')) || document.body

const model = defineModel<TSearch>({ default: { search_text: '' } })
const open = ref(false)
const filterNumb = computed(() => {
  if (model.value && typeof model.value === 'object') {
    const keys = [...excludeKeys, ...(props.ignoreKeys || [])]
    const filteredKeys = Object.entries(model.value)
      .filter(
        ([key, value]) =>
          !keys.includes(key) && value !== undefined && value !== null && value !== '',
      )
      .map(([key]) => key)
    return filteredKeys.length
  }
  return 0
})

const setOpen = () => {
  open.value = !open.value
  if (props.listenFilterChange) {
    emits('onFilterContentChange', open.value)
  }
}

const onReload = () => {
  emits('onReload')
}
const onEraser = () => {
  emits('onEraser')
}

const handleEnter = () => {
  emits('onSearch')
}

defineExpose({
  setOpen,
})
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
