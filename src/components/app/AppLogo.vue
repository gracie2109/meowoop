<template>
  <div id="app_logo_wrap" :style="props.style">
    <Image :src="logo" id="app_logo" />
  </div>
</template>

<script lang="ts" setup>
import logo from '@/assets/logo_pet.png'
import Image from '@/components/app/AppImage.vue'
import type { StyleValue } from 'vue'

const props = defineProps<{
  style?: StyleValue
}>()
</script>

<style scoped>
#app_logo_wrap {
  height: 150px;
}

#app_logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
