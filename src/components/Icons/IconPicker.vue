<template>
  <Popover
    ref="iconPickerRef"
    id="iconPickerRef"
    v-model:open="visible"
    trigger="click"
    overlayClassName="icon-picker-popover"
    :get-popup-container="getPopupContainer"
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
                <img :src="iconPrev" alt="i" />
              </div>
              <div style="flex: 1; height: 150px; max-height: 250px; overflow-y: auto">
                <div v-if="filteredIcons(category.key).length > 0" class="icon-grid">
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
                <img :src="iconNext" alt="i" />
              </div>
            </div>
          </TabPane>
        </Tabs>
        <Flex class="preview_icon_color" align="center" gap="16">
          <div style="height: 100%">
            <svg class="icon" :style="{ color: modelValue.color, height: '100%' }">
              <use
                :xlink:href="`#${modelValue.icon.replace('/', '-')}`"
                :style="{ color: modelValue.color }"
              />
            </svg>
          </div>
          <ColorPicker
            :show-history="false"
            :container="() => iconPickerRef?.value?.getPopupDomNode?.() || document.body"
            @update:model-value="handleColorChange"
            :showValue="true"
          />
        </Flex>
      </div>

      <Row>
        <Button @click="visible = false">Close</Button>
        <Button @click="visible = false">Save</Button>
      </Row>
    </template>
    <Button class="icon-picker-trigger">
      <template #icon>
        <svg class="current-icon">
          <use :xlink:href="currentIconPath" />
        </svg>
      </template>
      {{ buttonText }}
    </Button>
  </Popover>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Popover, Tabs, Button, Empty, Row, Flex } from 'ant-design-vue'
import { iconPets, iconNature } from '@/components/Icons/contants'
import iconPrev from '@/assets/icons/common/circle-arrow-left.svg'
import iconNext from '@/assets/icons/common/circle-arrow-right.svg'
import ColorPicker from '@/components/Color/Index.vue'

const { TabPane } = Tabs

const props = withDefaults(
  defineProps<{
    modelValue: {
      color: string
      icon: string
    }
    buttonText?: string
    isAll?: boolean
    category?: string
    container?: HTMLElement | null
  }>(),
  {
    isAll: true,
  },
)

const emit = defineEmits(['update:modelValue', 'select', 'change'])
const categoriesRaw = ref([
  { key: 'pets', label: 'Thú cưng' },
  { key: 'nature', label: 'Thời tiết' },
])

const iconsData = ref<{ [key: string]: string[] }>({
  pets: iconPets,
  nature: iconNature,
})

const categories = computed(() => {
  if (props.isAll) {
    return categoriesRaw.value
  } else {
    return categoriesRaw.value.filter((i) => i?.key === props.category)
  }
})

const getPopupContainer = () => props.container || document.body
const iconPickerRef = ref()
const visible = ref(false)
const activeCategory = ref(categories.value?.[0]?.key || '')
const searchText = ref('')

const currentIconPath = computed(() => {
  if (!props.modelValue.icon) return '#icon-empty'
  const [category, icon] = props.modelValue.icon.split('/')
  return `#${category}-${icon}`
})

const filteredCategories = computed(() => {
  if (!searchText.value) return categories.value

  return categories.value.filter((category) => {
    return (
      category.label.toLowerCase().includes(searchText.value.toLowerCase()) ||
      filteredIcons(category.key).length > 0
    )
  })
})

const filteredIcons = (category: string) => {
  const icons = iconsData.value?.[category] || []
  if (!searchText.value) return icons

  return icons.filter((icon: string) => icon.toLowerCase().includes(searchText.value.toLowerCase()))
}

const isSelected = (category: string, icon: string) => {
  return props.modelValue.icon === `${category}/${icon}`
}

const handleSelectIcon = (category: string, icon: string) => {
  const fullPath = `${category}/${icon}`
  const val = {
    ...props.modelValue,
    icon: fullPath,
  }
  emit('update:modelValue', val)
}

const handlePrevTab = (category: string) => {
  const index = categories.value.findIndex((i) => i.key === category)
  if (index === 0) {
    activeCategory.value = categories.value?.[categories.value.length - 1]?.key
  }
  activeCategory.value = categories.value?.[index - 1]?.key
}

const handleNextTab = (category: string) => {
  const index = categories.value.findIndex((i) => i.key === category)
  if (index === categories.value.length - 1) {
    activeCategory.value = categories.value?.[0]?.key
  }
  activeCategory.value = categories.value?.[index + 1]?.key
}

const handleColorChange = (val: any) => {
  const rs = {
    ...props.modelValue,
    color: val,
  }
  emit('update:modelValue', rs)
}

watch(
  () => props.modelValue.icon,
  (newVal) => {
    if (newVal) {
      const [category] = newVal.split('/')
      activeCategory.value = category
    }
  },
  { immediate: true, deep: true },
)
</script>

<style scoped>
.icon-picker-container {
  width: 360px;
}

.search-input {
  margin-bottom: 12px;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px;
  max-height: 300px;
  overflow-y: auto;
  padding: 8px 0;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 8px; */
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  /* border: 1px solid #f0f0f0; */
}

.icon-item:hover {
  background-color: #f5f5f5;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.icon-item.selected {
  background-color: #e6f7ff;
  border-color: #1890ff;
}

.icon {
  width: 24px;
  height: 24px;
  margin-bottom: 6px;
  fill: currentColor;
}

.current-icon {
  width: 16px;
  height: 16px;
  margin-right: 6px;
}

.icon-name {
  font-size: 12px;
  text-align: center;
  word-break: break-word;
  color: #666;
}

.icon-picker-trigger {
  display: inline-flex;
  align-items: center;
}
.picker_controls {
  position: relative;
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
  position: relative;
  width: 100%;
  height: 100%;
}
:deep(.icon-picker-popover .ant-popover-inner-content) {
  padding: 0 !important;
}
:deep(.ant-popover > .ant-popover-inner, .ant-popover-inner) {
  background-color: red !important;
  padding: 4px 8px !important;
}

.preview_icon_color {
  border: 1px dashed var(--vt-c-primary);
  height: 35px;
  margin-bottom: 1rem;
}
</style>
