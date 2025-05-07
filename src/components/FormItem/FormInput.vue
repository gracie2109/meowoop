<template>
  <div class="form_wrap_content" style="position: relative; width: 100%">
    <FormItem :name="name" :rules="rules" v-bind="validateBinding">
      <Input
        size="large" 
        v-bind="attrs"
        :placeholder="placeholder ?? $t('common.placeholderInput')"
        :value="modelValue ?? ''"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="triggerValidate"
      />
      <label class="form_label" :class="['floating-label', { isRequired, error: hasError }]">
        {{ label }}
      </label>
    </FormItem>
  </div>
</template>

<script lang="ts" setup>
import type { AntdComponentProps, InjectedFormContext } from '@/types/lib'
import { FormItem, Input } from 'ant-design-vue'
import { computed, inject, useAttrs } from 'vue'

const props = withDefaults(defineProps<AntdComponentProps>(), {
  modelValue: '',
})

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

<style>
.isRequired::after {
  content: '*';
  padding-left: 0.3rem;
  color: red;
}

.form_label {
  position: absolute;
  top: -12px;
  left: 12px;
  background-color: white;
  padding: 0 0.5em;
  font-size: 11px;
}

.floating-label.error {
  color: red;
}

.floating-label {
  position: absolute;
  top: -12px;
  left: 12px;
  background-color: white;
  padding: 0 0.5em;
  font-size: 11px;
  color: #333;
}

.floating-label.isRequired::after {
  content: '*';
  color: red;
  margin-left: 4px;
}
/* .ant-input {
  height: 40px;
} */
</style>
