<template>
  <div style="position: relative; width: 100%; height: 100%">
    <PageHeader>
      <FunctionalButton icon="uil:setting" width="20" />&nbsp; &gt;
      {{ $t('menu.menu_13') }}
    </PageHeader>
    <div>
      <Button type="primary" @click="showForm = !showForm">Add</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import FunctionalButton from '@/components/Table/FunctionalButton.vue'
import { Button } from 'ant-design-vue'
import { ref } from 'vue'
const showForm = ref(false)

defineOptions({ name: 'setting_banner_view' })
</script>

<style scoped></style>
