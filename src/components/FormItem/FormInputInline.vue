<template>
  <div class="form_wrap_content" style="position: relative; width: 100%">
    <FormItem :name="name" :rules="rules" v-bind="validateBinding">
      <Input
        v-bind="attrs"
        :placeholder="plh ?? $t('common.placeholderInput')"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="triggerValidate"
        :class="{
          error_inline: hasError,
        }"
      />
    </FormItem>
  </div>
</template>

<script lang="ts" setup>
import type { InjectedFormContext } from '@/types/lib'
import { FormItem, Input } from 'ant-design-vue'
import type { RuleObject } from 'ant-design-vue/es/form'
import { computed, inject, useAttrs } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  name: string
  placeholder?: string
  label: string
  rules?: RuleObject | RuleObject[] | undefined
  isRequired: boolean
  modelValue: string | number | undefined
}>()

const attrs = useAttrs()
defineEmits(['update:modelValue'])
const form = inject('form') as InjectedFormContext
const validateInfos = form?.validateInfos ?? {}
const { t } = useI18n()
const validateBinding = computed(() => validateInfos[props.name] || {})

const plh = computed(() => {
  return props.isRequired
    ? props.placeholder
      ? `${props.placeholder} *`
      : t('common.placeholderInput')
    : props.placeholder
})
const triggerValidate = () => {
  form?.validate?.(props.name, { trigger: 'blur' }).catch(() => {})
}

const hasError = computed(() => {
  return validateBinding.value?.validateStatus === 'error'
})
</script>

<style scoped>
:deep(.ant-input) {
  border: none !important;
  border-bottom: 1px solid var(--vt-c-primary) !important;
  border-radius: 0%;
}

:deep(.ant-input:hover),
:deep(.ant-input:focus) {
  border-bottom: 1px solid var(--vt-c-primary) !important;
  outline: none !important;
}

:deep(.ant-input-status-error) {
  border-bottom: 1px solid red !important;
}

:deep(.ant-input-status-error:hover),
:deep(.ant-input-status-error:focus) {
  border-bottom: 1px solid red !important;
}
</style>
