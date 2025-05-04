<template>
  <FormItem :name="props.name" :rules="rules" v-bind="validateBinding">
    <RangePicker
      v-bind="attrs"
      :placeholder="props.placeholder ?? ['Start date', 'End date']"
      @change="handleChange"
      @ok="handleOk"
      :presets="props.presets"
      :format="props.format"
      :value="props.modelValue"
      style="position: relative; height: 40px; width: 100%"
    />
    <label
      v-if="props.label"
      class="form_label"
      :class="[
        'floating-label',
        {
          isRequired: props.isRequired,
          error: hasError,
          floated: props.modelValue?.[0] || props.modelValue?.[1],
        },
      ]"
    >
      {{ props.label }}
    </label>
  </FormItem>
</template>

<script lang="ts" setup>
import { computed, inject, useAttrs } from 'vue'
import { DatePicker, FormItem } from 'ant-design-vue'
import type { Dayjs } from 'dayjs'
import { TIME_FORMAT_1 } from '@/contants/lib'
import type { AntdComponentProps, InjectedFormContext } from '@/types/lib'
import type { CustomFormat } from 'ant-design-vue/es/vc-picker/interface'

const { RangePicker } = DatePicker

defineOptions({ name: 'RangePickerCs' })

const attrs = useAttrs()

const props = withDefaults(
  defineProps<
    AntdComponentProps & {
      presets?: { label: string; value: [Dayjs, Dayjs] }[]
      format?: string | CustomFormat<Dayjs> | (string | CustomFormat<Dayjs>)[]
      modelValue?: [Dayjs, Dayjs]
      label?: string
      placeholder?: [string, string]
    }
  >(),
  {
    presets: undefined,
    format: TIME_FORMAT_1,
    modelValue: undefined,
    label: '',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: [Dayjs, Dayjs]): void
  (e: 'onChange', value: [Dayjs, Dayjs], dateString: [string, string]): void
}>()

const form = inject<InjectedFormContext>('form', {} as InjectedFormContext)
const validateInfos = form?.validateInfos ?? {}
const validateBinding = computed(() => validateInfos[props.name] || {})

const hasError = computed(() => validateBinding.value?.validateStatus === 'error')

const emitModelValue = (value: [Dayjs, Dayjs], dateString?: [string, string]) => {
  if (dateString !== undefined) emit('onChange', value, dateString)
  emit('update:modelValue', value)
}

const handleChange = (value: [string, string] | [Dayjs, Dayjs], dateString: [string, string]) => {
  if (Array.isArray(value) && value[0] instanceof Object) {
    emitModelValue(value as [Dayjs, Dayjs], dateString)
  }
}

const handleOk = (value: [string, string] | [Dayjs, Dayjs]) => {
  if (Array.isArray(value) && value[0] instanceof Object) {
    emitModelValue(value as [Dayjs, Dayjs])
  }
}
</script>

<style scoped>
.form_label {
  position: absolute;
  top: -12px;
  left: 12px;
  background-color: white;
  padding: 0 0.5em;
  font-size: 11px;
}
</style>
