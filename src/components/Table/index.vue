<template>
  <div class="table_ref">
    <Table
      ref="table_ref" 
      :columns="col"
      :data-source="props.data"
      :scroll="{ x: props.scroll?.x, y: props.scroll?.y }"
      :loading="props.loading"
      :get-popup-container="props.container ?? (() => window.document.body)"
      :pagination="{
        pageSize: props.pagination?.page_size,
        current: props.pagination?.page,
        total: props.pagination?.total,
        showSizeChanger: true,
        showQuickJumper: true,
      }"
      :size="props.size ?? 'large'"
      bordered
      :style="props.style"
    >
      <template #emptyText>
        <div style="text-align: center; padding: 20px">
          <img :src="iconEmpty" style="width: 120px; height: 120px; object-fit: contain;" />
          <p style="margin-top: 12px">{{ $t('common.noData') }}</p>
        </div>
      </template>

      <template v-if="props.headerTitle" #title>{{ props.headerTitle }}</template>
      <template v-if="$slots.footer" #footer><slot name="footer" /></template>
      <template v-if="$slots.summary" #summary><slot name="summary" /></template>
      <template v-if="$slots.content"><slot name="content" /></template>
    </Table>
  </div>
</template>

<script lang="ts" setup>
import type { AntdTable } from '@/types/lib'
import { Table, Tooltip } from 'ant-design-vue'
import type { TableColumnsType } from 'ant-design-vue'
import { ref, defineProps, computed, h } from 'vue'
import iconEmpty from '@/assets/images/common/empt_box.webp'

const table_ref = ref(null)

const props = defineProps<{
  columns: TableColumnsType
  data: any[]
  scroll?: {
    x?: number
    y?: number
  }
  container?: any
  loading?: boolean
  pagination?: {
    page: number
    page_size: number
    total: number
  }
  headerTitle?: string
  size?: AntdTable
  style?: object
}>()

const col = computed(() => {
  const columns = props.columns.map((col, idx, arr) => {
    if (!col.title) return col

    const titleText = typeof col.title === 'string' ? col.title : ''

    const titleNode =
      titleText.length > 10
        ? h(
            Tooltip,
            { title: titleText },
            { default: () => h('div', { style: titleStyle(col) }, titleText) },
          )
        : h('div', { style: titleStyle(col) }, titleText)

    return {
      ...col,
      title: () => titleNode,
      fixed:
        arr.length >= 10
          ? idx === 0
            ? 'left'
            : idx === arr.length - 1
              ? 'right'
              : col.fixed
          : col.fixed,
    }
  })

  return columns
})

const titleStyle = (col: any) => ({
  width: col?.width ? `${col.width}px` : 'auto',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
})
</script>

<style scoped>
.table_ref {
  height: 100%;
  width: 100%;
}
</style>
