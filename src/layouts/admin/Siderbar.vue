<template>
  <Menu
    v-model:openKeys="props.state.openKeys"
    v-model:selectedKeys="props.state.selectedKeys"
    :inline-collapsed="state.collapsed"
    :items="items"
    theme="light"
    mode="inline"
  />
</template>
<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Menu } from 'ant-design-vue'
import { MENU_ADMIN } from '@/contants/menu'
import { transformMenu } from '@/utils/menu'
const { t } = useI18n()

const props = defineProps<{
  state: unknown
}>()

const items = computed(() => {
  const rawItems = MENU_ADMIN(t)
  return transformMenu(rawItems)
});



</script>

<style scoped>
.mr-3 {
  margin-right: 3rem;
}
</style>
