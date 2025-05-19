<template>
  <div class="container" id="pet_types" ref="el" style="position: relative">
    <PageHeader>
      <Icon
        :icon="MENU_ASSET[ROUTE_NAME.PET_SERVICE_PACK].icon"
        width="20"
        :color="MENU_ASSET[ROUTE_NAME.PET_SERVICE_PACK].color"
      />&nbsp; &gt;
      {{ $t('menu.menu_9') }}
    </PageHeader>

    <div>
      sdas
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import { MENU_ASSET } from '@/contants/menu'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { ROUTE_NAME } from '@/router/route'
defineOptions({ name: 'pet-service-packets' })
</script>

<style scoped></style>
