<template>
  <div class="table_ref" ref="el">
    <Table
      :style="{
        minHeight: props.minHeight ?? 'auto',
        ...(props.style ?? {}),
      }"
      class="table_cs"
      :columns="props.columns"
      :data-source="props.data"
      :scroll="scrollComputed"
      :loading="props.loading"
      :pagination="{
        pageSize: props.pagination?.page_size,
        current: props.pagination?.page,
        total: props.pagination?.total,
      }"
      :size="props.size ?? 'middle'"
      bordered
      :get-popup-container="() => container"
      :locale="locale"
    >
      <template #emptyText>
        <div
          style="height: 100%; width: 100%; border: none; min-height: 72.6vh; position: relative"
        >
          <div style="height: 100%; width: 100%; margin: auto; position: absolute; top: 35%">
            <img :src="iconEmpty" style="width: 120px; height: 120px; object-fit: contain" />
            <p style="margin-top: 12px">{{ $t('common.noData') }}</p>
          </div>
        </div>
      </template>

      <template v-if="props.headerTitle" #title>{{ props.headerTitle }}</template>
      <template v-if="$slots.footer" #footer>
        <slot name="footer" />
      </template>
      <template v-if="$slots.summary" #summary>
        <slot name="summary" />
      </template>
      <!-- <template v-if="$slots.content">
        <slot name="content" />
      </template> -->
    </Table>
  </div>
</template>

<script lang="ts" setup>
import type { AntdTableSize } from '@/types/lib'
import { Table } from 'ant-design-vue'
import { type TableColumnsType } from 'ant-design-vue'
import { defineProps, computed, h } from 'vue'
import iconEmpty from '@/assets/images/common/empt_box.webp'
import { useI18n } from 'vue-i18n'
import { useElementSize } from '@vueuse/core'
import { useTemplateRef } from 'vue'

defineOptions({
  name: 'TableCustom',
})

const { t } = useI18n()
const el = useTemplateRef('el')
const { height } = useElementSize(el)

const props = defineProps<{
  columns: TableColumnsType
  data: Record<string, unknown>[]
  scroll?: {
    x?: number
    y?: number
  }
  container?: HTMLElement | null
  loading?: boolean
  pagination?: {
    page: number
    page_size: number
    total: number
  }
  headerTitle?: string
  size?: AntdTableSize
  style?: object
  minHeight?: string
}>()

const scrollComputed = computed(() => {
  return {
    x: props.scroll?.x ?? undefined,
    y: props.scroll?.y ?? undefined,
  }
})

const container = computed(() => {
  return typeof props.container === 'string'
    ? document.getElementById(props.container) || document.body
    : (props.container ?? document.body)
})

const locale = computed(() => ({
  emptyText: h('div', { style: { height: height, width: '100%' } }, [
    h('img', {
      src: iconEmpty,
      style: { width: '120px', height: '120px', objectFit: 'contain' },
    }),
    h('p', { style: { marginTop: '12px' } }, t('common.noData')),
  ]),
}))
</script>

<style scoped>
.table_ref {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.table_cs {
  height: 100%;
}

::v-deep(.ant-table-wrapper) {
  height: 100%;
  overflow: hidden;
}

::v-deep(.ant-spin-nested-loading) {
  height: 100%;
}

::v-deep(.ant-spin-container) {
  display: flex;
  flex-direction: column;
  height: 100%;
}

::v-deep(.ant-table) {
  height: 100%;
  overflow: hidden;
  flex: 1;
  border: 1px solid rgb(233, 230, 230);
}

::v-deep(.ant-table-container) {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
