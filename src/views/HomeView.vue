<script setup lang="ts">
import { Button } from "ant-design-vue";
import { removeStorage } from "@/utils/utilsLocal";
const ddd = () => {
  removeStorage("LOCAL", ['EXPAND_MENU','LANGUAGE']);
};
</script>

<template>
  <div>
    <Button type="primary" @click="ddd()">Remove </Button>
  </div>
</template>
