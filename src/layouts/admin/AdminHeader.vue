<template>
  <Header
    class=""
    style="background: #ffff; border-left: 1px solid #dddd; color: #fff; color: #000"
  >
    <Flex
      :gutter="16"
      justify="end"
      align="middle"
      style="height: 100%; margin: 0 auto; padding-top: 0.5rem"
    >
      <Languages />
    </Flex>
  </Header>
</template>

<script lang="ts" setup>
import Languages from '@/components/app/AppLanguages.vue'
import { Flex, Layout } from 'ant-design-vue'
const { Header } = Layout
</script>
