<template>
  <Menu
    v-model:openKeys="opensMenu"
    v-model:selectedKeys="selectedMenu"
    :collapsed="collapseMenu"
    :items="items"
    theme="light"
    mode="inline"
    @update:selected-keys="(vl) => $app.updateSelectedKey(vl)"
    @update:open-keys="(vl) => $app.updateOpenKeys(vl)"
  />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Menu, type ItemType } from 'ant-design-vue'
import { MENU_ADMIN } from '@/contants/menu'
import { transformMenu } from '@/utils/menu'
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores'
import type { MenuItem } from '@/types/menu'

const $app = useGlobalStore()
const { collapseMenu, selectedMenu, opensMenu } = storeToRefs($app)

const { t } = useI18n()

const items = computed<ItemType[]>(() => {
  const rawItems = MENU_ADMIN(t) as MenuItem[]
  return transformMenu(rawItems)
})
</script>

<style scoped>
.mr-3 {
  margin-right: 3rem;
}
</style>
