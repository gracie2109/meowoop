<template>
  <Flex align="center" style="cursor: pointer" :gap="16">
    <div>
      <Icon @click="addWidget" icon="typcn:plus-outline" height="28" color="var(--vt-c-primary)" />
    </div>
    <div v-if="!editMode">
      <Icon @click="handleClick" icon="lucide:edit" height="24" color="var(--vt-c-primary)" />
    </div>

    <Flex v-else style="gap: 1rem">
      <Flex>
        <Button danger @click="handleClick">
          <Flex>
            <Icon icon="ic:round-clear" height="22" color="red" />
            {{ $t('common.cancelTitle') }}
          </Flex>
        </Button>
      </Flex>
      <Button type="primary" @click="saveWidgetSetting">
        <Flex>
          <Icon icon="uil:save" height="22" color="white" />
          {{ $t('common.saveTitle') }}
        </Flex>
      </Button>
    </Flex>
    <slot name="content" />
  </Flex>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'
import { Button, Flex } from 'ant-design-vue'
import { useDashboardStore } from '@/stores'
import { storeToRefs } from 'pinia'

const $store = useDashboardStore()
const { editMode, currentDashboard } = storeToRefs($store)

const handleClick = () => {
  $store.toggleEditMode(!editMode.value)
}

const saveWidgetSetting = () => {}
const addWidget = () => {}

defineOptions({
  name: 'DashboardActions',
})
</script>

<style scoped>
.btn_cancel {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
  cursor: pointer;
  font-size: 1rem;
}
</style>
