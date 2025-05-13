<template>
  <Flex gap="8" align="center">
    <template v-for="(action, index) in computedActions" :key="index">
      <component v-if="action.customRender" :is="action.customRender" />
      <Tooltip v-else :title="action.tooltip">
        <Icon
          :icon="action.icon ?? 'lucide:dot'"
          height="22"
          :style="getIconStyle(action)"
          :class="{ 'opacity-50 pointer-events-none': action.disabled }"
          @click="() => !action.disabled && handleClick(action)"
        />
      </Tooltip>
    </template>
  </Flex>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Tooltip, Flex } from 'ant-design-vue'
import { ACTION_PRESETS, type RowAction } from './useRowActions'
import { computed } from 'vue'

const props = defineProps<{ actions: RowAction[] }>()
const emit = defineEmits(['edit', 'view', 'delete'])

const computedActions = computed(() =>
  props.actions
    .filter((action) => action.show !== false)
    .map((action) => {
      const preset = ACTION_PRESETS[action.type] || {}
      return {
        ...preset,
        ...action,
      }
    }),
)
function handleClick(action: RowAction) {
  if (
    action.event &&
    (action.event === 'edit' || action.event === 'view' || action.event === 'delete')
  ) {
    emit(action.event, action.payload)
  }
}

function getIconStyle(action: RowAction) {
  return {
    fontSize: action.size,
    cursor: action.disabled ? 'not-allowed' : 'pointer',
    color: action.color,
    transition: 'all 0.2s',
  }
}
</script>
