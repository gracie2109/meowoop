<template>
  <div class="c_layout">
    <Header />


  </div>

  <slot />
</template>

<script setup lang="ts">
import Header from './Header.vue';
defineOptions({ name: 'clientLayout' })
</script>
