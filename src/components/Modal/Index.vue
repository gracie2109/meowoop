<template>
  <Modal
    :open="open"
    centered
    destroyOnClose
    :width="width ?? '550px'"
    :closable="closable"
    @cancel="$emit('handleCancel')"
    :mask="showMask"
    v-bind="attrs"
    class="modalCs"
    :bodyStyle="bodyStyle"
    :closeIcon="
      h(Icon, {
        icon: 'material-symbols:cancel-outline',
        width: '30px',
        border: '1px solid red'
      })
    "
  >
    <div class="modal_content">
      <slot name="content" />
    </div>
    <template #title v-if="!hideHeader">
      <div ref="modalTitleRef" class="modal_title">
        <p>{{ title || '' }}</p>
      </div>
    </template>

    <template #footer>
      <div v-if="!hideFooter" style="padding: 0 20px 20px 0">
        <Button size="large" @click="syncBtn ? $emit('handleCancel') : $emit('handle1stBtn')">
          {{ name1stBtn ?? $t('common.cancelTitle') }}
        </Button>
        <Button
          size="large"
          type="primary"
          :loading="loading"
          @click="syncBtn ? $emit('handleOk') : $emit('handle2ndBtn')"
        >
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
      </div>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { defineProps, h, useAttrs, withDefaults, type CSSProperties } from 'vue'
import { Modal, Button } from 'ant-design-vue'
import { Icon } from '@iconify/vue/dist/iconify.js'

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
    syncBtn?: boolean
    isSecondSubmit?: boolean
    hideHeader?: boolean
  }>(),
  {
    showMask: true,
    closable: true,
    hideFooter: false,
    loading: false,
    hide3ndBtn: true,
    syncBtn: true,
    isSecondSubmit: true,
    hideHeader: false,
  },
)
const attrs = useAttrs()

defineEmits(['handleCancel', 'handleOk', 'handle1stBtn', 'handle2ndBtn', 'handle3ndBtn'])
</script>

<style scoped>
.modal_title {
  height: var(--vt-modal-title-height) !important;
  width: 100%;
}

.modal_content {
  min-height: 100px;
}
</style>
