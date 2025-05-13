<template>
  <Flex gap="8" align="center">
    <template v-for="(action, index) in computedActions" :key="index">
      <Tooltip :title="action.tooltip">
        <span>
          <Popconfirm
            v-if="action.confirm"
            :title="action.confirmMessage || 'Bạn có chắc?'"
            ok-text="Đồng ý"
            cancel-text="Huỷ"
            @confirm="() => handleClick(action)"
          >
            <Icon
              height="25px"
              :icon="action.icon"
              :style="getIconStyle(action)"
              :class="{ 'opacity-50 pointer-events-none': action.disabled }"
            />
          </Popconfirm>
          <Icon
            v-else
            :icon="action.icon"
            :style="getIconStyle(action)"
            height="25px"
            :color="action.color ?? 'var(--vt-c-primary)'"
            :class="{ 'opacity-50 pointer-events-none': action.disabled }"
            @click="() => !action.disabled && handleClick(action)"
          />
        </span>
      </Tooltip>
    </template>
  </Flex>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Tooltip, Popconfirm, Flex } from 'ant-design-vue'
import { type RowAction, normalizeActions } from './useRowActions'
import { computed } from 'vue'

const props = defineProps<{ actions: RowAction[] }>()
const emit = defineEmits(['edit', 'view', 'delete', 'custom'])

const computedActions = computed(() => normalizeActions(props.actions))

function handleClick(action: RowAction) {
  if (action.event) {
    emit(action.event!, action.payload)
  }
}

function getIconStyle(action: RowAction) {
  return {
    fontSize: action.size,
    cursor: action.disabled ? 'not-allowed' : 'pointer',
    color: action.color,
    transition: 'all 0.2s'
  }
}
</script>
