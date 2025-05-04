<script setup lang="ts">
import { Button } from 'ant-design-vue'
import { Icon } from '@iconify/vue'
</script>

<template>
  <div>
    <Button type="primary">Remove </Button>
    <div style="display: flex; gap: 20px">
      <Icon icon="custom:home" color="blue" />
      <Icon icon="custom:user" color="green" />
    </div>
  </div>
</template>
