<template>
  <ConfigProvider :theme="antdConfig">
    <div class="app_content_wrapper">
      <router-view v-if="Layout" v-slot="{ Component, route: curRoute }">
        <component :is="Layout" v-if="isOnline">
          <component :is="Component" :key="curRoute.fullPath" />
        </component>
        <div v-else>
          <ErrorPage code="offline" />
        </div>
      </router-view>
    </div>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent, markRaw } from 'vue'
import { useRoute } from 'vue-router'
import { useOnline } from '@vueuse/core'
import { ConfigProvider } from 'ant-design-vue'
import { antdConfig } from './config'
import { LAYOUT_TYPE } from './contants/app'
import ErrorPage from './views/ErrorPage.vue'

const isOnline = useOnline()

const route = useRoute()
const layouts = new Map<string, unknown>()

function getLayout(name: string) {
  if (layouts.has(name)) return layouts.get(name)
  const layout = markRaw(defineAsyncComponent(() => import(`@/layouts/${name}/index.vue`)))
  layouts.set(name, layout)
  return layout
}

const Layout = computed(() => {
  if (!route.matched.length) return null
  const layoutName = route.meta?.layout as string
  return layoutName ? getLayout(layoutName) : LAYOUT_TYPE.NO_LAYOUT
})
</script>
