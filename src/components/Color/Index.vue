<template>
  <Popover v-model:open="visible" trigger="click">
    <template #content>
      <ColorPicker
        v-model:pureColor="modelPureColor"
        v-model:gradientColor="modelGradientColor"
        :pickerContainer="pickerContainer"
        :shape="props.shape || 'circle'"
        :disable-history="!props.showHistory"
        :disable-alpha="!props.showAlpha"
        lang="En"
        :defaultPopup="false"
        :is-widget="true"
        :use-type="'both'"
        :active-key="activeKey"
        :format="'rgb'"
        @active-key-change="(vl) => (activeKey = vl)"
      />

      <Flex style="margin-top: 1rem" justify="end" :gap="8">
        <Button type="primary" @click="handleSave">Save</Button>
        <Button @click="handleCancel">Close</Button>
      </Flex>
    </template>

    <Button
      class="color_preview"
      :style="{
        background: props.value,
      }"
    >
    </Button>
    <span style="overflow: hidden; height: 100%; width: 100%; font-size: xx-small">{{
      props.value
    }}</span>
  </Popover>
</template>

<script setup lang="ts">
import { ColorPicker } from 'vue3-colorpicker'
import { ref, computed, watch } from 'vue'
import type { ColorInputWithoutInstance } from 'tinycolor2'
import type { PropType } from 'vue'
import { Popover, Flex, Button } from 'ant-design-vue'
import { COLOR_TYPE } from '@/contants/lib'
import { getColorType } from '@/utils/color'
import type { ColorType } from '@/types/lib'

const visible = ref(false)
const activeKey = ref<ColorType>(COLOR_TYPE.pure)
const props = defineProps({
  container: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: () => document.body,
  },
  shape: {
    type: String,
    default: 'circle',
  },
  isWidget: {
    type: Boolean,
    default: true,
  },
  showHistory: {
    type: Boolean,
    default: true,
  },
  showAlpha: {
    type: Boolean,
    default: true,
  },
  value: {
    type: String,
  },
})

const emit = defineEmits(['update:modelValue'])
const modelPureColor = ref<ColorInputWithoutInstance>('')
const modelGradientColor = ref()
const colorSelect = ref();

const pickerContainer = computed(() => {
  return typeof props.container === 'string'
    ? props.container
    : (props.container?.id ?? document.body)
})

const handleSave = () => {
  const color = activeKey.value === 'pure' ? modelPureColor.value : modelGradientColor.value
  colorSelect.value = color
  emit('update:modelValue', color)
  visible.value = !visible.value
}


const handleCancel = () => {
  visible.value = !visible.value;
  colorSelect.value = getColor(props.value)
}


const getColor = (newVal:ColorInputWithoutInstance | undefined | string) => {
  if (newVal) {
      colorSelect.value = newVal
      const type = getColorType(newVal)
      activeKey.value = type
      if (type === COLOR_TYPE.pure) {
        modelPureColor.value = props.value as ColorInputWithoutInstance
      } else {
        modelGradientColor.value = props.value
      }
    }
}
watch(
  () => props.value,
  (newVal) => {
    getColor(newVal)
  },
  { immediate: true, deep: true },
)
</script>

<style scoped>
.color-picker-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
}

:deep(.vc-color-wrap),
:deep(.vc-gradient-picker) {
  width: 100% !important;
}

.color_preview {
  height: 30px;
  width: 30px;
  border-radius: 25px;
  border: 1px solid #dddd;
}
</style>
