<template>
  <div class="form_wrap_content" style="position: relative; width: 100%">
    <FormItem :name="name" :rules="rules" v-bind="validateBinding">
      <Select
        v-bind="attrs"
        :placeholder="placeholder ?? $t('common.placeholderSelect')"
        :value="modelValue ?? undefined"
        @change="$emit('update:modelValue', $event)"
        @blur="triggerValidate"
        :options="options"
        :disabled="disabled"
        :allowClear="false"
        style="width: 100%"
        :filterOption="
          !props.showFilter
            ? false
            : (input: string, option: any) => {
                const searchTerm = input.toLowerCase()
                return (
                  option.label.toLowerCase().includes(searchTerm) ||
                  option.value.toString().toLowerCase().includes(searchTerm)
                )
              }
        "
        :suffixIcon="props.showPin ?suffixIcon() : null"

      />
      <label class="form_label" :class="['floating-label', { isRequired, error: hasError }]">
        {{ label }}
      </label>
    </FormItem>
  </div>
</template>

<script lang="ts" setup>
import { FormItem, Select, Tooltip } from 'ant-design-vue'
import { inject, computed, useAttrs, h, watch } from 'vue'
import type { AntdComponentProps, InjectedFormContext, IPined } from '@/types/lib'
import FunctionalButton from '../Table/FunctionalButton.vue'
import { useI18n } from 'vue-i18n'

type SelectProps = {
  options: { label: string; value: string | number; disabled?: boolean }[]
  disabled?: boolean
  showFilter?: boolean
}

const props = withDefaults(defineProps<AntdComponentProps & SelectProps & IPined>(), {
  showFilter: false,
  showPin: false,
  pined: false,
  pinedData: () => [],
})
const attrs = useAttrs()
const { t } = useI18n()
const emits = defineEmits(['update:modelValue', 'update:pin'])

const form = inject('form') as InjectedFormContext
const validateInfos = form?.validateInfos ?? {}

const validateBinding = computed(() => validateInfos[props.name as string] || {})

const hasError = computed(() => {
  return validateBinding.value?.validateStatus === 'error'
})

const triggerValidate = () => {
  form?.validate?.(props.name, { trigger: 'blur' }).catch(() => {})
}

const suffixIcon = () =>
  h(
    'div',
    {
      style: {
        width: '50px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      },
      onClick: (e: Event) => {
        e.stopPropagation()
        e.preventDefault()
      },
      onMousedown: (e: Event) => {
        e.stopPropagation()
        e.preventDefault()
      },
    },
    [
      h(
        Tooltip,
        { title: t('common.pin') },
        {
          default: () =>
            h(FunctionalButton, {
              icon: 'ic:round-push-pin',
              color: props.pined ? 'var(--color-primary)' : '#dcdcdc',
              onClick: (e: Event) => {
                e.stopPropagation()
                e.preventDefault()
                onPinData()
              },
            }),
        },
      ),
    ],
  )

const onPinData = () => {
  const currentPinedData = [...props.pinedData]
  const index = currentPinedData.indexOf(String(props.name))

  if (index === -1) {
    currentPinedData.push(String(props.name))
  } else {
    currentPinedData.splice(index, 1)
  }
  emits('update:pin', currentPinedData)
}
</script>

<style scoped>
:deep(.ant-select-selector) {
  height: 40px !important;
  padding: 5px 11px !important;
  padding-right: 60px !important;
}

:deep(.ant-select-arrow) {
  pointer-events: all;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

:deep(.ant-select-selection-search) {
  right: 60px !important;
}
</style>
