<template>
  <div id="app_logo_wrap" :style="props.style">
    <img :src="logo" id="app_logo" />
  </div>
</template>

<script lang="ts" setup>
import logo from '@/assets/logo_pet.png'
const props = defineProps<{
  style?: unknown
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
