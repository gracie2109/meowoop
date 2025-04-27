<template>
  <div class="wrapper">
    <Result :title="$t('common.404PageDesc')" :sub-title="$t('common.404pageCode')">
      <template #icon>
        <img
          src="https://d9hhrg4mnvzow.cloudfront.net/info.protime.eu/en-gb/login-404/88ec7332-404-oops-robot_10xi0yl000000000000028.png"
        />
      </template>
      <template #extra>
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
import { ROUTE_NAME } from '@/router/route'
</script>

<style scope>
.wrapper {
  height: 100vh;
  margin: 0 auto;
  display: grid;
  place-content: center;
}
img {
  height: 250px;
}
</style>
