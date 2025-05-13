<template>
  <Popover
    ref="iconPickerRef"
    v-model:open="visible"
    trigger="click"
    overlayClassName="icon-picker-popover"
    :get-popup-container="getPopupContainer"
    style="position: relative"
  >
    <template #content>
      <div class="icon-picker-container">
        <Tabs
          v-model:activeKey="activeCategory"
          class="icon-tabs"
          :renderTabBar="filteredCategories.length > 1 ? undefined : () => null"
        >
          <TabPane v-for="category in filteredCategories" :key="category.key" :tab="category.label">
            <div class="control_wrap">
              <div
                class="picker_controls"
                @click.stop="handlePrevTab(category.key)"
                v-if="filteredCategories.length > 1"
              >
                <IconPrev />
              </div>
              <div class="icon-scroll-container">
                <div v-if="filteredIcons(category.key).length" class="icon-grid">
                  <div
                    v-for="icon in filteredIcons(category.key)"
                    :key="icon"
                    class="icon-item"
                    :class="{ selected: isSelected(category.key, icon) }"
                    @click.stop="handleSelectIcon(category.key, icon)"
                  >
                    <svg class="icon">
                      <use :xlink:href="`#${category.key}-${icon}`" />
                    </svg>
                  </div>
                </div>
                <Empty v-else description="Không tìm thấy icon" />
              </div>
              <div
                class="picker_controls"
                @click.stop="handleNextTab(category.key)"
                v-if="filteredCategories.length > 1"
              >
                <IconNext />
              </div>
            </div>
          </TabPane>
        </Tabs>

        <Flex class="preview_icon_color" align="center" gap="16">
          <div style="height: 100%">
            <IconPreview
              :svgId="`#${dataSelected.icon.replace('/', '-')}`"
              :color="dataSelected.color"
            />
          </div>
          <ColorPicker
            :show-history="false"
            :container="iconPickerRef?.value?.getPopupDomNode?.()"
            @update:model-value="handleColorChange"
            :showValue="true"
            :value="dataSelected.color"
          />
        </Flex>

        <Row>
          <Button style="margin-right: 1rem" @click="handleCancel">
            {{ $t('common.cancelTitle') }}
          </Button>
          <Button type="primary" @click="handleSave">{{ $t('common.saveTitle') }}</Button>
        </Row>
      </div>
    </template>
    <div class="icon-picker-trigger">
  
      <IconPreview :svgId="currentIconPath" :color="props.modelValue.color" />
    </div>
  </Popover>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Popover, Tabs, Button, Empty, Row, Flex } from 'ant-design-vue'
import ColorPicker from '@/components/ColorPicker/Index.vue'
import { iconPets, iconNature, ICON_SOURCES } from '@/contants/lib'
import IconPrev from '@/assets/icons/common/circle-arrow-left.svg'
import IconNext from '@/assets/icons/common/circle-arrow-right.svg'
import { useI18n } from 'vue-i18n'
import IconPreview from './PreviewIcon.vue'
import type { IconSourceType } from '@/types/lib'

const { TabPane } = Tabs
const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    modelValue: {
      color: string
      icon: string
    }
    isAll?: boolean
    category?: IconSourceType
    container?: HTMLElement | null
  }>(),
  {
    isAll: true,
  },
)

const emit = defineEmits(['update:modelValue'])
const iconPickerRef = ref()
const visible = ref(false)
const searchText = ref('')
const activeCategory = ref('')
const dataSelected = ref({ icon: '', color: '' })

const categoriesRaw = computed(() => ICON_SOURCES(t))

const categories = computed(() =>
  props.isAll ? categoriesRaw.value : categoriesRaw.value.filter((i) => i?.key === props.category),
)
const iconsData = ref({ pets: iconPets, nature: iconNature })
const getPopupContainer = () => props.container || document.body

const currentIconPath = computed(() => `#${props.modelValue.icon.replace('/', '-')}`)

const filteredCategories = computed(() => {
  if (!searchText.value) return categories.value
  return categories.value.filter(
    (category) =>
      category.label.toLowerCase().includes(searchText.value.toLowerCase()) ||
      filteredIcons(category.key as IconSourceType).length > 0,
  )
})

const filteredIcons = (category: IconSourceType) => {
  const icons = iconsData.value?.[category] || []
  return searchText.value
    ? icons.filter((icon) => icon.toLowerCase().includes(searchText.value.toLowerCase()))
    : icons
}

const isSelected = (category: string, icon: string) => {
  return dataSelected.value.icon === `${category}/${icon}`
}

const handleSelectIcon = (category: string, icon: string) => {
  dataSelected.value.icon = `${category}/${icon}`
}

const handleColorChange = (val: string) => {
  dataSelected.value.color = val
}

const handlePrevTab = (category: string) => {
  const index = categories.value.findIndex((i) => i.key === category)
  const prevIndex = (index - 1 + categories.value.length) % categories.value.length
  activeCategory.value = categories.value[prevIndex]?.key
}

const handleNextTab = (category: string) => {
  const index = categories.value.findIndex((i) => i.key === category)
  const nextIndex = (index + 1) % categories.value.length
  activeCategory.value = categories.value[nextIndex]?.key
}

const handleSave = () => {
  visible.value = false
  emit('update:modelValue', { ...dataSelected.value })
}

const handleCancel = () => {
  visible.value = false
  dataSelected.value = { ...props.modelValue }
}

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      const [category] = newVal.icon.split('/')
      activeCategory.value = category
      dataSelected.value = { ...newVal }
    }
  },
  { immediate: true, deep: true },
)
</script>

<style scoped>
.icon-picker-container {
  width: 360px;
}

.icon-scroll-container {
  flex: 1;
  height: 150px;
  max-height: 250px;
  overflow-y: auto;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px;
  padding: 8px 0;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.icon-item:hover {
  background-color: #f5f5f5;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.icon-item.selected {
  background-color: #e6f7ff;
}

.icon {
  width: 24px;
  height: 24px;
  margin-bottom: 6px;
  fill: currentColor;
}

.current-icon {
  width: 100%;
  height: 100%;
}

.icon-picker-trigger {
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin-top: 0.25rem;
}

.picker_controls {
  margin: auto 0;
  cursor: pointer;
}

.picker_controls > img {
  width: 24px;
  height: 24px;
}

.control_wrap {
  display: flex;
  gap: 1rem;
  width: 100%;
}

.preview_icon_color {
  border: 1px dashed var(--vt-c-primary);
  height: 35px;
  margin-bottom: 1rem;
}

:deep(.icon-picker-popover .ant-popover-inner-content) {
  padding: 0 !important;
}

:deep(.ant-popover > .ant-popover-inner, .ant-popover-inner) {
  padding: 4px 8px !important;
}
</style>
