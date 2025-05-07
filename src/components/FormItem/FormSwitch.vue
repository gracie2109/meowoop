<template>
  <div class="switch_content">
    <FormItem :name="name">
      <Flex gap="8" align="end">
        <p v-if="content" class="content">{{ content }}</p>
        <Switch v-bind="attrs" style="margin: .7rem 0 0 5px" />
      </Flex>
      <label class="form_label">
        {{ label }}
      </label>
    </FormItem>
  </div>
</template>

<script setup lang="ts">
import { Switch, Flex } from 'ant-design-vue'
import { useAttrs } from 'vue'

defineProps<{
  content?: string
  name: string
  label: string
}>()
const attrs = useAttrs()
</script>

<style>
.switch_content {
  border: 1px solid #d9d9d9;
  height: var(--input-height);
  position: relative;
  width: 100%;
  border-radius: 5px;
}

.content {
  padding-left: 10px;
}
</style>
