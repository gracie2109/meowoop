<template>
  <div class="form_wrap_content" style="position: relative; width: 100%">
    <FormItem :name="props.name" :rules="props.rules" v-bind="bindingg">
      <Input
        :disabled="false"
        :placeholder="props.placeholder"
        type="text"
        style="position: relative; height: 40px"
        @change="(vl) => $emit('update:modelValue', vl.target.value)"
      />
      <label :class="['floating-label', { isRequired: props.isRequired, error: hasError }]">
        {{ props.label }}
      </label>
    </FormItem>
  </div>
</template>

<script lang="ts" setup>
import { FormItem, Input } from 'ant-design-vue'
import { computed } from 'vue'

const props = defineProps<{
  name: string
  placeholder?: string
  label: string
  rules?: any
  isRequired: boolean
  form: any
}>()

defineEmits(['update:modelValue'])

const { validateInfos } = props.form

const bindingg = validateInfos[props.name]

const hasError = computed(() => {
  return bindingg?.validateStatus === 'error'
})
</script>

<style scoped>
.isRequired::after {
  content: '*';
  padding-left: 0.3rem;
  color: red;
}

label {
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
.floating-label.error {
  color: red;
}
</style>
