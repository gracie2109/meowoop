<template>
  <div class="form_wrap_content" style="position: relative; width: 100%">
    <FormItem :name="name" :rules="rules" v-bind="validateBinding">
      <InputNumber
        size="large"
        v-bind="attrs"
        :min="min"
        :max="max"
        :formatter="
          (value) => (props.isMoney ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : formatter(value))
        "
        :parser="(value) => (props.isMoney ? value.replace(/\$\s?|(,*)/g, '') : parser(value))"
        :keyboard="true"
        :placeholder="placeholder ?? $t('common.placeholderInput')"
        :value="modelValue"
        @change="$emit('update:modelValue', $event)"
        @blur="triggerValidate"
      >
        <template #prefix>
          <template v-if="props.isMoney">
            <Icon icon="tdesign:money" />
          </template>
        </template>
      </InputNumber>
      <label class="form_label" :class="['floating-label', { isRequired, error: hasError }]">
        {{ label }}
      </label>
    </FormItem>
  </div>
</template>

<script lang="ts" setup>
import { FormItem, InputNumber } from 'ant-design-vue'
import { computed, inject, useAttrs } from 'vue'
import type { AntdComponentProps, InjectedFormContext } from '@/types/lib'
import { Icon } from '@iconify/vue/dist/iconify.js'

const props = withDefaults(
  defineProps<
    AntdComponentProps & {
      formatter?: (value: string | number) => string
      parser?: (value: string) => number
      min?: number
      max?: number
      isMoney?: boolean
    }
  >(),
  {
    modelValue: '',
    min: undefined,
    max: undefined,
    formatter: undefined,
    parser: undefined,
    isMoney: true,
  },
)

defineEmits(['update:modelValue'])

const attrs = useAttrs()
const form = inject('form') as InjectedFormContext
const validateInfos = form?.validateInfos ?? {}

const validateBinding = computed(() => validateInfos[props.name as string] || {})

const hasError = computed(() => {
  return validateBinding.value?.validateStatus === 'error'
})

const triggerValidate = () => {
  form?.validate?.(props.name, { trigger: 'blur' }).catch(() => {})
}
</script>

<style scoped>
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
  z-index: 12;
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
</style>
