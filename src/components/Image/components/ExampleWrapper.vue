<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Props {
  href?: string
  noBorder?: boolean
}

withDefaults(defineProps<Props>(), {
  href: '',
  noBorder: false,
})
</script>

<template>
  <div class="example-wrapper" :class="{ 'example-wrapper--no-border': noBorder }">
    <slot />
    <a
      v-if="href"
      :href="href"
      title="Full Source"
      class="example-wrapper__icon"
      target="_blank"
      rel="nofollow noopener"
    >
      <Icon icon="material-symbols:link" class="icon" />
    </a>
  </div>
</template>

<style scoped>
.example-wrapper {
  position: relative;
  user-select: none;
  /* border: solid 1px #eee; */
  /* margin-top: 20px; */
  /* margin-bottom: 20px; */
  /* top: 10rem; */
}

.example-wrapper--no-border {
  border: none;
}

.example-wrapper__icon {
  opacity: 0.5;
  position: absolute;
  top: 0;
  right: -32px;
  height: 16px;
  display: flex;
  cursor: pointer;
  transition: 0.5s;
}

.example-wrapper__icon:hover {
  opacity: 1;
}

.icon {
  width: 16px;
  height: 16px;
}

@media screen and (max-width: 1090px) {
  .example-wrapper__icon {
    right: -24px;
  }
}
</style>
