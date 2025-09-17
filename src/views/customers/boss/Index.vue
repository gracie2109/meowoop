<template>
  <div style="position: relative">
    <PageHeader>
      <FunctionalButton icon="bx:user" width="20" />&nbsp; &gt;&nbsp;
      <span
        style="cursor: pointer"
        @click="
          () => {
            $router.push({ name: ROUTE_NAME.CUSTOMERS })
          }
        "
        >user_name</span
      >&nbsp; &gt;
      {{ $t('customers.bossList') }}
    </PageHeader>

    <div>
      <ListBoss :hiddenHead="true" :ownerId="String(userId)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import FunctionalButton from '@/components/Table/FunctionalButton.vue'
import { ROUTE_NAME } from '@/router/route'
import { useRoute } from 'vue-router'
import ListBoss from '@/views/boss/Index.vue'
const props = defineProps<{
  userId?: string
}>()
const route = useRoute()
const userId = computed(() => {
  return props.userId || route.params?.user_id || ''
})
defineOptions({ name: 'CustomerPets' })
</script>

<style scoped></style>
