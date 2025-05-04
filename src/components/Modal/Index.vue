<template>
  <Modal
    :open="open"
    centered
    destroyOnClose
    :width="width ?? '550px'"
    :closable="closable"
    @ok="$emit('handleOk')"
    @cancel="$emit('handleCancel')"
    :bodyStyle="bodyStyle"
    :mask="showMask"
    v-bind="attrs"
  >
    <div class="modal_content">
      {{ content }}
    </div>
    <template #title>
      <div ref="modalTitleRef" class="modal_title">
        <p>{{ title || '' }}</p>
      </div>
    </template>

    <template #footer v-if="!hideFooter">
      <slot name="footer">
        <Button size="large" @click="$emit('handle1stBtn')">
          {{ name1stBtn ?? $t('common.cancelTitle') }}
        </Button>
        <Button size="large" type="primary" :loading="loading" @click="$emit('handle2ndBtn')">
          {{ name2ndtBtn ?? $t('common.saveTitle') }}
        </Button>
        <Button
          size="large"
          type="primary"
          :loading="loading"
          @click="$emit('handle3ndBtn')"
          v-if="!hide3ndBtn"
        >
          {{ name3ndtBtn ?? '3nd button' }}
        </Button>
      </slot>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { defineProps, useAttrs, withDefaults, type CSSProperties } from 'vue'
import { Modal, Button } from 'ant-design-vue'

defineOptions({
  name: 'CustomModal',
})
withDefaults(
  defineProps<{
    open: boolean
    title?: string
    content?: string
    width?: number | string
    closable?: boolean
    showMask?: boolean
    hideFooter?: boolean
    name1stBtn?: string
    name2ndtBtn?: string
    name3ndtBtn?: string
    loading?: boolean
    hide3ndBtn?: boolean
    bodyStyle?: CSSProperties
  }>(),
  {
    showMask: true,
    closable: true,
    hideFooter: false,
    loading: false,
  },
)
const attrs = useAttrs()

defineEmits(['handleCancel', 'handleOk', 'handle1stBtn', 'handle2ndBtn', 'handle3ndBtn'])
</script>

<style scoped>
.modal_title {
  height: 50px !important;
  width: 100%;
}

.modal_content {
  min-height: 100px;
}
</style>
