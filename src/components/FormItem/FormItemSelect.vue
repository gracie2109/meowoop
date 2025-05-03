<template>
  <div class="form_wrap_content" style="position: relative; width: 100%">
    <FormItem :name="name" :rules="rules" v-bind="validateBinding">
      <Select
        v-bind="attrs"
        :placeholder="placeholder ?? $t('common.placeholderSelect')"
        :value="modelValue"
        @change="$emit('update:modelValue', $event)"
        @blur="triggerValidate"
        :options="options"
        :disabled="disabled"
        allowClear
        style="width: 100%"
      />
      <label class="form_label" :class="['floating-label', { isRequired, error: hasError }]">
        {{ label }}
      </label>
    </FormItem>
  </div>
</template>

<script lang="ts" setup>
import { FormItem, Select } from 'ant-design-vue'
import { inject, computed, useAttrs } from 'vue'
import type { RuleObject } from 'ant-design-vue/es/form'
import type { InjectedFormContext } from '@/types/lib'

const props = defineProps<{
  name: string
  placeholder?: string
  label: string
  rules?: RuleObject | RuleObject[]
  isRequired: boolean
  modelValue: string | number | undefined | string[]
  options: { label: string; value: string | number; disabled?: boolean }[]
  disabled?: boolean
}>()
const attrs = useAttrs()

defineEmits(['update:modelValue'])

const form = inject('form') as InjectedFormContext
const validateInfos = form?.validateInfos ?? {}

const validateBinding = computed(() => validateInfos[props.name] || {})

const hasError = computed(() => {
  return validateBinding.value?.validateStatus === 'error'
})

const triggerValidate = () => {
  form?.validate?.(props.name, { trigger: 'blur' }).catch(() => {})
}
</script>

<style scoped>
:deep(.ant-select-selector) {
  height: 40px !important;
  padding: 5px 11px !important;
}
</style>
