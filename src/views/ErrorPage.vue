<template>
  <div class="wrapper">
    <Result :title="content.title" :sub-title="content.sub">
      <template #icon>
        <div class="error_wrap">
          <Image :src="codeImage" alt="Error icon" />
        </div>
      </template>

      <template #extra>
        <p class="code" v-if="CODE">{{ CODE }}</p>

        <Button type="primary">{{ $t('common.backTitle') }}</Button>
        <Button @click="$router.push({ name: ROUTE_NAME.HOME })">
          {{ $t('common.backHome') }}</Button
        >
      </template>
    </Result>
  </div>
</template>

<script lang="ts" setup>
import { Result, Button } from 'ant-design-vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ROUTE_NAME } from '@/router/route'
import Image from '@/components/app/AppImage.vue'
import iconOffline from '@/assets/images/common/offline.webp'
import iconNotfound from '@/assets/images/common/notfoundPage.png'
import { CODE_OFFLINE, CODE_PAGE_NOT_FOUND } from '@/contants/code'

const { t } = useI18n()

const props = defineProps<{
  code: 'offline' | '404'
}>()

const codeImage = computed(() => {
  switch (props.code) {
    case 'offline':
      return iconOffline
    case '404':
      return iconNotfound
    default:
      return iconNotfound
  }
})

const content = computed(() => {
  switch (props.code) {
    case 'offline':
      return {
        title: t('common.svOfflineTitle'),
        sub: t('common.svOfflineDesc'),
      }
    case '404':
      return {
        title: t('common.404PageTitle'),
        sub: t('common.404PageDesc'),
      }
    default:
      return {
        title: t('common.svNotFoundTitle'),
        sub: t('common.svNotFoundDesc'),
      }
  }
})
const CODE = computed(() => {
  switch (props.code) {
    case 'offline':
      return CODE_OFFLINE
    case '404':
      return CODE_PAGE_NOT_FOUND
    default:
      return ''
  }
})
</script>

<style scoped>
.wrapper {
  height: 100vh;
  margin: 0 auto;
  display: grid;
  place-content: center;
}

.code {
  color: rgba(0, 0, 0, 0.45);
  margin: 1rem 0;
}

.error_wrap {
  height: 250px;
}
</style>
