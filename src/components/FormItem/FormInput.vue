<template>
  <div class="form_wrap_content" style="position: relative; width: 100%">
    <FormItem :name="name" :rules="rules" v-bind="validateBinding">
      <Input
        size="large"
        v-bind="attrs"
        :placeholder="placeholder ?? $t('common.placeholderInput')"
        :value="String(modelValue ?? '')"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="triggerValidate"
        
      >
        <template #suffix v-if="props.showPin">
          <Tooltip :title="$t('common.pin')">
            <FunctionalButton
              icon="ic:round-push-pin"
              :color="props.pined ? 'var(--color-primary)' : '#dcdcdc'"
              @click="onPinData"
            />
          </Tooltip>
        </template>
      </Input>
      <label class="form_label" :class="['floating-label', { isRequired, error: hasError }]">
        {{ label }}
      </label>
    </FormItem>
  </div>
</template>

<script lang="ts" setup>
import type { AntdComponentProps, InjectedFormContext, IPined } from '@/types/lib'
import { FormItem, Input, Tooltip } from 'ant-design-vue'
import { computed, inject, useAttrs } from 'vue'
import FunctionalButton from '../Table/FunctionalButton.vue'

const props = withDefaults(defineProps<AntdComponentProps & IPined>(), {
  modelValue: () => '',
  showPin: false,
  pined: false,
  pinedData: () => [],
})

const attrs = useAttrs()
const emit = defineEmits(['update:modelValue', 'update:pin'])
const form = inject('form') as InjectedFormContext
const validateInfos = form?.validateInfos ?? {}

const validateBinding = computed(() => validateInfos[props.name as string] || {})

const hasError = computed(() => {
  return validateBinding.value?.validateStatus === 'error'
})

const triggerValidate = () => {
  form?.validate?.(props.name, { trigger: 'blur' }).catch(() => {})
}

const onPinData = () => {
  const currentPinedData = props.pinedData
  const index = currentPinedData.indexOf(String(props.name))

  if (index === -1) {
    currentPinedData.push(String(props.name))
  } else {
    currentPinedData.splice(index, 1)
  }
  emit('update:pin', currentPinedData)
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
  z-index: 9;
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
