<template>
  <div class="app_content_wrapper">
    <router-view v-if="Layout" v-slot="{ Component, route: curRoute }">
      <component :is="Layout" v-if="isOnline">
        <component :is="Component" :key="curRoute.fullPath" />
      </component>
      <div v-else>
        <ServerOffline />
      </div>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent, markRaw, ref, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import ServerOffline from '@/views/ServerOffline.vue'
const layouts = new Map()

function getLayout(name: string) {
  if (layouts.get(name)) return layouts.get(name)
  const layout = markRaw(defineAsyncComponent(() => import(`@/layouts/${name}/index.vue`)))
  layouts.set(name, layout)
  return layout
}

const route = useRoute()
const isOnline = ref()
const Layout = computed(() => {
  if (!route?.matched?.length) return null
  else {
    return getLayout(route?.meta?.layout as string)
  }
})

function getStatus() {
  const stt = navigator.onLine
  isOnline.value = stt
}
onMounted(() => {
  window.addEventListener('online', () => getStatus())
  window.addEventListener('offline', () => getStatus())
})

watchEffect(() => {
  getStatus()
})
</script>
