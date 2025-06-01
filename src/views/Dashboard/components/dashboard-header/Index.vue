<template>
  <div style="height: 100%; position: relative">
    <PageHeader>
      <div
        class="flex"
        :style="{
          cursor: route.name !== ROUTE_NAME.HOME ? 'pointer' : 'default',
        }"
        @click="backHome()"
      >
        <Icon icon="fluent-mdl2:b-i-dashboard" width="20" color="green" />&nbsp;
        <span> {{ $t('dashboard.d1') }}</span> &nbsp;
      </div>

      <template v-if="route.name === ROUTE_NAME.DASHBOARD_LIST">
        &gt; {{ $t('dashboard.d3') }}
      </template>
    </PageHeader>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import { ROUTE_NAME } from '@/router/route'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const backHome = () => {
  if (route.name !== ROUTE_NAME.HOME) {
    router.push({ name: ROUTE_NAME.HOME })
  }
}

defineOptions({
  name: 'dashboard-header',
})
</script>

<style scoped>
.flex {
  display: flex;
  align-items: center;
}
</style>
