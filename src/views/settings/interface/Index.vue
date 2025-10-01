<template>
  <div style="position: relative; width: 100%; height: 100%">
    <PageHeader>
      <FunctionalButton icon="uil:setting" width="20" />&nbsp; &gt;
      {{ $t('menu.menu_12') }}
    </PageHeader>

    <Flex align="center" justify="flex-end">
      <Button type="primary" size="large" @click="onClick">
        <Flex align="center">
          <FunctionalButton
            icon="material-symbols:save"
            :iconStyle="{ color: 'var(--color-button)' }"
          />
          {{ !isEditMode ? $t('settings.updateInterface') : $t('common.saveTitle') }}
        </Flex>
      </Button>
    </Flex>

    <InterfaceForm :isEditMode="isEditMode" />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import FunctionalButton from '@/components/Table/FunctionalButton.vue'
import { Button, Flex } from 'ant-design-vue'
import InterfaceForm from './Form.vue'
import { ref } from 'vue'

const isEditMode = ref(false)

const onClick = () => {
  isEditMode.value = !isEditMode.value
}
defineOptions({ name: 'app-settings' })
</script>

<style scoped></style>
