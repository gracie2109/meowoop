<template>
  <v-stage ref="stage" :config="stageConfig" style="border: 1px solid blue">
    <v-layer>
      <v-image v-if="bgImage" :config="bgImage" />
      <v-text
        v-for="(item, i) in texts"
        :key="i"
        :config="item"
        @click="$emit('textClick', i)"
      />
      <v-transformer
        v-if="selectedIndex !== null && texts[selectedIndex]"
        :nodes="[texts[selectedIndex].node]"
      />
    </v-layer>
  </v-stage>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface TextItem {
  text: string
  x: number
  y: number
  fontSize: number
  draggable: boolean
  fill: string
  [key: string]: unknown
}

interface Props {
  stageConfig: { width: number; height: number }
  bgImage?: object | null
  texts: TextItem[]
  selectedIndex: number | null
}

defineProps<Props>()

defineEmits<{
  textClick: [index: number]
}>()

const stage = ref<HTMLElement | null>(null)

defineExpose({
  stage
})

defineOptions({ name: 'BannerStage' })
</script>
